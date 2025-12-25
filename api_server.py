"""
Gmail Classifier API Server
Go uygulaması için HTTP API sağlar.
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime, timedelta
from gmail_classifier import GmailClassifier, AIProvider

DATA_DIR = os.path.dirname(__file__)
EMAILS_FILE = os.path.join(DATA_DIR, "emails_cache.json")
SETTINGS_FILE = os.path.join(DATA_DIR, "settings.json")

def load_settings():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"fetch_hour": 10, "fetch_minute": 0, "last_fetch": None}

def save_settings(settings):
    with open(SETTINGS_FILE, 'w', encoding='utf-8') as f:
        json.dump(settings, f, ensure_ascii=False)

def load_cached_emails():
    if os.path.exists(EMAILS_FILE):
        with open(EMAILS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_emails(emails):
    with open(EMAILS_FILE, 'w', encoding='utf-8') as f:
        json.dump(emails, f, ensure_ascii=False, indent=2)

def should_fetch_now():
    settings = load_settings()
    last_fetch = settings.get("last_fetch")
    fetch_hour = settings.get("fetch_hour", 10)
    fetch_minute = settings.get("fetch_minute", 0)
    
    now = datetime.now()
    
    if not last_fetch:
        return True
    
    last_dt = datetime.fromisoformat(last_fetch)
    # Farklı gün ve saat geçmişse
    if last_dt.date() < now.date() and now.hour >= fetch_hour and now.minute >= fetch_minute:
        return True
    return False

class APIHandler(BaseHTTPRequestHandler):
    classifier = None
    
    def do_GET(self):
        if self.path == "/emails":
            self.handle_emails()
        elif self.path == "/emails/cached":
            self.handle_cached_emails()
        elif self.path == "/emails/refresh":
            self.handle_refresh_emails()
        elif self.path == "/emails/refresh-stream":
            self.handle_refresh_stream()
        elif self.path == "/settings":
            self.handle_get_settings()
        elif self.path == "/providers":
            self.send_json(AIProvider.PROVIDERS)
        elif self.path == "/account":
            self.handle_get_account()
        elif self.path == "/health":
            self.send_json({"status": "ok"})
        else:
            self.send_error(404)
    
    def do_POST(self):
        if self.path == "/settings":
            self.handle_save_settings()
        elif self.path == "/account/logout":
            self.handle_logout()
        elif self.path == "/account/clear-data":
            self.handle_clear_data()
        elif self.path == "/account/setup-oauth":
            self.handle_setup_oauth()
        else:
            self.send_error(404)
    
    def handle_get_account(self):
        """Hesap bilgilerini döner."""
        token_path = os.path.join(DATA_DIR, 'token.json')
        client_path = os.path.join(DATA_DIR, 'client.json')
        
        account_info = {
            "logged_in": os.path.exists(token_path),
            "oauth_configured": os.path.exists(client_path),
            "email": None,
            "emails_count": len(load_cached_emails())
        }
        
        if account_info["logged_in"]:
            try:
                with open(token_path, 'r') as f:
                    token_data = json.load(f)
                    # Token'dan email alamıyoruz, Gmail API'den alacağız
                    if APIHandler.classifier and APIHandler.classifier.gmail_service:
                        profile = APIHandler.classifier.gmail_service.users().getProfile(userId='me').execute()
                        account_info["email"] = profile.get("emailAddress")
            except:
                pass
        
        self.send_json(account_info)
    
    def handle_logout(self):
        """Gmail oturumunu kapatır."""
        token_path = os.path.join(DATA_DIR, 'token.json')
        try:
            if os.path.exists(token_path):
                os.remove(token_path)
            APIHandler.classifier = None
            self.send_json({"success": True, "message": "Oturum kapatıldı"})
        except Exception as e:
            self.send_json({"success": False, "error": str(e)}, 500)
    
    def handle_clear_data(self):
        """Tüm verileri siler."""
        try:
            files_to_delete = ['token.json', 'emails_cache.json', 'settings.json']
            for f in files_to_delete:
                path = os.path.join(DATA_DIR, f)
                if os.path.exists(path):
                    os.remove(path)
            APIHandler.classifier = None
            self.send_json({"success": True, "message": "Tüm veriler silindi"})
        except Exception as e:
            self.send_json({"success": False, "error": str(e)}, 500)
    
    def handle_setup_oauth(self):
        """OAuth client.json'ı kaydeder."""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        client_id = data.get('client_id', '').strip()
        client_secret = data.get('client_secret', '').strip()
        
        if not client_id or not client_secret:
            self.send_json({"success": False, "error": "Client ID ve Secret gerekli"}, 400)
            return
        
        client_config = {
            "installed": {
                "client_id": client_id,
                "client_secret": client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": ["http://localhost:9090/"]
            }
        }
        
        client_path = os.path.join(DATA_DIR, 'client.json')
        with open(client_path, 'w') as f:
            json.dump(client_config, f)
        
        self.send_json({"success": True, "message": "OAuth yapılandırması kaydedildi"})
    
    def handle_emails(self):
        """Zamanlama kontrolü ile mail çeker veya cache döner."""
        if should_fetch_now():
            self.handle_refresh_emails()
        else:
            self.handle_cached_emails()
    
    def handle_cached_emails(self):
        """Cache'deki mailleri döner."""
        emails = load_cached_emails()
        settings = load_settings()
        self.send_json({
            "emails": emails, 
            "count": len(emails),
            "last_fetch": settings.get("last_fetch"),
            "from_cache": True
        })
    
    def handle_refresh_emails(self):
        """Yeni mailleri çeker ve kaydeder."""
        try:
            if not APIHandler.classifier:
                APIHandler.classifier = GmailClassifier()
            
            if not APIHandler.classifier.gmail_service:
                APIHandler.classifier.authenticate_gmail()
            
            # Son çekim tarihinden sonraki mailleri al
            settings = load_settings()
            last_fetch = settings.get("last_fetch")
            after_date = None
            
            if last_fetch:
                # ISO formatından YYYY/MM/DD formatına çevir
                dt = datetime.fromisoformat(last_fetch)
                after_date = dt.strftime("%Y/%m/%d")
            
            emails = APIHandler.classifier.fetch_emails(max_results=50, after_date=after_date)
            
            if not emails:
                # Yeni mail yoksa cache'i döndür
                cached = load_cached_emails()
                self.send_json({
                    "emails": cached, 
                    "count": len(cached), 
                    "from_cache": True,
                    "message": "Yeni mail yok"
                })
                return
            
            classified = APIHandler.classifier.classify_emails(emails)
            
            result = [{
                "id": e.id,
                "subject": e.subject,
                "sender": e.sender,
                "snippet": e.snippet,
                "date": e.date,
                "category": e.category,
                "priority": e.priority,
                "summary": e.summary,
                "gmail_url": f"https://mail.google.com/mail/u/0/#inbox/{e.id}"
            } for e in classified]
            
            # Mevcut cache ile birleştir (yeni mailler üstte)
            cached = load_cached_emails()
            existing_ids = {e["id"] for e in cached}
            new_emails = [e for e in result if e["id"] not in existing_ids]
            all_emails = new_emails + cached
            
            # Kaydet
            save_emails(all_emails)
            settings["last_fetch"] = datetime.now().isoformat()
            save_settings(settings)
            
            self.send_json({
                "emails": all_emails, 
                "count": len(all_emails), 
                "new_count": len(new_emails),
                "from_cache": False
            })
        except FileNotFoundError as e:
            if "OAuth not configured" in str(e):
                self.send_json({"error": "setup_required", "message": "Please complete setup wizard first"}, 400)
            else:
                self.send_json({"error": str(e)}, 500)
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_json({"error": str(e)}, 500)
    
    def handle_get_settings(self):
        self.send_json(load_settings())
    
    def handle_save_settings(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        new_settings = json.loads(post_data.decode('utf-8'))
        
        settings = load_settings()
        settings.update(new_settings)
        save_settings(settings)
        
        self.send_json({"success": True, "settings": settings})
    
    def handle_refresh_stream(self):
        """SSE ile gerçek zamanlı ilerleme gösteren refresh."""
        self.send_response(200)
        self.send_header('Content-Type', 'text/event-stream')
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        def send_event(event_type, data):
            try:
                msg = f"event: {event_type}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"
                self.wfile.write(msg.encode('utf-8'))
                self.wfile.flush()
            except Exception as e:
                print(f"SSE send error: {e}")
        
        try:
            # Gmail bağlantısı
            send_event("progress", {"step": "gmail", "message": "Gmail'e bağlanılıyor..."})
            if not APIHandler.classifier:
                APIHandler.classifier = GmailClassifier()
            
            if not APIHandler.classifier.gmail_service:
                APIHandler.classifier.authenticate_gmail()
            
            send_event("progress", {"step": "gmail", "message": "✓ Gmail bağlantısı başarılı"})
            
            # Tarih hesapla
            settings = load_settings()
            last_fetch = settings.get("last_fetch")
            after_date = None
            if last_fetch:
                dt = datetime.fromisoformat(last_fetch)
                after_date = dt.strftime("%Y/%m/%d")
            
            # Mailleri çek
            date_info = f" ({after_date} sonrası)" if after_date else ""
            send_event("progress", {"step": "fetch", "message": f"Mailler çekiliyor{date_info}..."})
            emails = APIHandler.classifier.fetch_emails(max_results=50, after_date=after_date)
            send_event("progress", {"step": "fetch", "message": f"✓ {len(emails)} mail çekildi{date_info}"})
            
            if not emails:
                cached = load_cached_emails()
                send_event("complete", {
                    "emails": cached,
                    "count": len(cached),
                    "new_count": 0,
                    "message": "Yeni mail yok"
                })
                return
            
            # AI sınıflandırma
            send_event("progress", {"step": "classify", "message": "AI ile sınıflandırılıyor..."})
            classified = APIHandler.classifier.classify_emails(emails)
            send_event("progress", {"step": "classify", "message": "✓ Mailler sınıflandırıldı"})
            
            result = [{
                "id": e.id,
                "subject": e.subject,
                "sender": e.sender,
                "snippet": e.snippet,
                "date": e.date,
                "category": e.category,
                "priority": e.priority,
                "summary": e.summary,
                "gmail_url": f"https://mail.google.com/mail/u/0/#inbox/{e.id}"
            } for e in classified]
            
            # Cache ile birleştir
            cached = load_cached_emails()
            existing_ids = {e["id"] for e in cached}
            new_emails = [e for e in result if e["id"] not in existing_ids]
            all_emails = new_emails + cached
            
            # Kaydet
            save_emails(all_emails)
            settings["last_fetch"] = datetime.now().isoformat()
            save_settings(settings)
            
            send_event("complete", {
                "emails": all_emails,
                "count": len(all_emails),
                "new_count": len(new_emails)
            })
            
        except FileNotFoundError as e:
            if "OAuth not configured" in str(e):
                send_event("error", {"message": "setup_required", "detail": "Please complete setup wizard first"})
            else:
                send_event("error", {"message": str(e)})
        except Exception as e:
            import traceback
            traceback.print_exc()
            send_event("error", {"message": str(e)})
    
    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))
    
    def log_message(self, format, *args):
        pass  # Sessiz mod

def run_server(port=8765):
    server = HTTPServer(('localhost', port), APIHandler)
    print(f"🚀 API Server başlatıldı: http://localhost:{port}")
    server.serve_forever()

if __name__ == "__main__":
    run_server()
