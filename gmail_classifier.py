"""
Gmail Mail Sınıflandırıcı
Gmail'den mailleri çeker, AI ile sınıflandırır ve önem sırasına göre listeler.
"""

import os
import base64
import json
from datetime import datetime
from typing import Optional
from dataclasses import dataclass
from dotenv import load_dotenv
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import google.generativeai as genai
import requests

load_dotenv()

SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
SETTINGS_FILE = os.path.join(os.path.dirname(__file__), "settings.json")

def load_ai_settings():
    if os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {}

@dataclass
class Email:
    id: str
    subject: str
    sender: str
    snippet: str
    date: str
    category: str = ""
    priority: int = 0
    summary: str = ""

class AIProvider:
    """Farklı AI sağlayıcıları için wrapper."""
    
    PROVIDERS = {
        "gemini": {
            "name": "Google Gemini",
            "models": ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.5-flash-lite", "gemini-2.0-flash"],
            "default": "gemini-2.5-flash"
        },
        "openai": {
            "name": "OpenAI",
            "models": ["gpt-4o-mini", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
            "default": "gpt-4o-mini"
        },
        "openrouter": {
            "name": "OpenRouter",
            "models": ["google/gemini-2.5-flash", "google/gemini-2.5-pro", "anthropic/claude-3.5-sonnet", "openai/gpt-4o-mini", "meta-llama/llama-3.1-70b-instruct"],
            "default": "google/gemini-2.5-flash"
        }
    }
    
    def __init__(self):
        self.settings = load_ai_settings()
        self.provider = self.settings.get("ai_provider", "gemini")
        self.model = self.settings.get("ai_model", self.PROVIDERS[self.provider]["default"])
        self.api_key = self.settings.get("ai_api_key", os.getenv("GEMINI_API_KEY", ""))
    
    def generate(self, prompt: str) -> str:
        if self.provider == "gemini":
            return self._gemini(prompt)
        elif self.provider == "openai":
            return self._openai(prompt)
        elif self.provider == "openrouter":
            return self._openrouter(prompt)
        raise ValueError(f"Bilinmeyen provider: {self.provider}")
    
    def _gemini(self, prompt: str) -> str:
        genai.configure(api_key=self.api_key)
        model = genai.GenerativeModel(self.model)
        response = model.generate_content(prompt)
        return response.text
    
    def _openai(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3
        }
        resp = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]
    
    def _openrouter(self, prompt: str) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}]
        }
        resp = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"]

class GmailClassifier:
    def __init__(self):
        self.gmail_service = None
        self.ai = AIProvider()
        
    def authenticate_gmail(self) -> None:
        """Gmail API ile kimlik doğrulama yapar."""
        creds = None
        token_path = os.path.join(os.path.dirname(__file__), 'token.json')
        client_path = os.path.join(os.path.dirname(__file__), 'client.json')
        
        if os.path.exists(token_path):
            creds = Credentials.from_authorized_user_file(token_path, SCOPES)
        
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(client_path, SCOPES)
                creds = flow.run_local_server(port=9090, open_browser=True)
            with open(token_path, 'w') as token:
                token.write(creds.to_json())
        
        self.gmail_service = build('gmail', 'v1', credentials=creds)
        print("✓ Gmail bağlantısı başarılı!")

    def fetch_emails(self, max_results: int = 20, after_date: str = None) -> list[Email]:
        """Gmail'den mailleri çeker. after_date varsa sadece o tarihten sonrakileri alır."""
        query = ""
        if after_date:
            # Gmail API için YYYY/MM/DD formatı
            query = f"after:{after_date}"
        
        results = self.gmail_service.users().messages().list(
            userId='me', maxResults=max_results, labelIds=['INBOX'], q=query
        ).execute()
        
        messages = results.get('messages', [])
        emails = []
        
        for msg in messages:
            msg_data = self.gmail_service.users().messages().get(
                userId='me', id=msg['id'], format='metadata',
                metadataHeaders=['Subject', 'From', 'Date']
            ).execute()
            
            headers = {h['name']: h['value'] for h in msg_data.get('payload', {}).get('headers', [])}
            
            emails.append(Email(
                id=msg['id'],
                subject=headers.get('Subject', '(Konu yok)'),
                sender=headers.get('From', 'Bilinmeyen'),
                snippet=msg_data.get('snippet', ''),
                date=headers.get('Date', '')
            ))
        
        print(f"✓ {len(emails)} mail çekildi" + (f" ({after_date} sonrası)" if after_date else ""))
        return emails

    def classify_emails(self, emails: list[Email]) -> list[Email]:
        """AI kullanarak mailleri sınıflandırır."""
        email_data = [{"subject": e.subject, "sender": e.sender, "snippet": e.snippet} for e in emails]
        
        prompt = f"""Aşağıdaki e-postaları analiz et ve her biri için JSON formatında yanıt ver.

Kategoriler: İŞ, FATURA, SOSYAL, PROMOSYON, SPAM, KİŞİSEL, DİĞER
Öncelik: 1 (en yüksek) - 5 (en düşük)

E-postalar:
{json.dumps(email_data, ensure_ascii=False, indent=2)}

Her mail için şu formatta yanıt ver:
[{{"index": 0, "category": "KATEGORİ", "priority": 1-5, "summary": "kısa özet"}}]

Sadece JSON array döndür, başka bir şey yazma."""

        response = self.ai.generate(prompt)
        
        try:
            # Bazen markdown code block içinde döndürüyor
            content = response.strip()
            if content.startswith("```"):
                content = content.split("```")[1]
                if content.startswith("json"):
                    content = content[4:]
            classifications = json.loads(content)
            for item in classifications:
                idx = item.get('index', 0)
                if idx < len(emails):
                    emails[idx].category = item.get('category', 'DİĞER')
                    emails[idx].priority = item.get('priority', 3)
                    emails[idx].summary = item.get('summary', '')
        except json.JSONDecodeError:
            print("⚠ AI yanıtı parse edilemedi, varsayılan değerler kullanılıyor")
            for email in emails:
                email.category = "DİĞER"
                email.priority = 3
        
        print("✓ Mailler sınıflandırıldı")
        return sorted(emails, key=lambda x: x.priority)

    def display_results(self, emails: list[Email]) -> None:
        """Sınıflandırılmış mailleri gösterir."""
        priority_colors = {1: "🔴", 2: "🟠", 3: "🟡", 4: "🟢", 5: "⚪"}
        category_icons = {
            "İŞ": "💼", "FATURA": "💰", "SOSYAL": "👥", 
            "PROMOSYON": "🏷️", "SPAM": "🚫", "KİŞİSEL": "👤", "DİĞER": "📧"
        }
        
        print("\n" + "="*80)
        print("📬 GMAIL MAIL SINIFLANDIRMA SONUÇLARI")
        print("="*80)
        
        # Kategoriye göre grupla
        categories = {}
        for email in emails:
            cat = email.category
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(email)
        
        # Önce yüksek öncelikli kategorileri göster
        priority_order = ["İŞ", "FATURA", "KİŞİSEL", "SOSYAL", "DİĞER", "PROMOSYON", "SPAM"]
        
        for cat in priority_order:
            if cat in categories:
                icon = category_icons.get(cat, "📧")
                print(f"\n{icon} {cat} ({len(categories[cat])} mail)")
                print("-" * 40)
                
                for email in categories[cat]:
                    p_icon = priority_colors.get(email.priority, "⚪")
                    sender_short = email.sender[:30] + "..." if len(email.sender) > 30 else email.sender
                    subject_short = email.subject[:50] + "..." if len(email.subject) > 50 else email.subject
                    
                    print(f"  {p_icon} [{email.priority}] {subject_short}")
                    print(f"      📤 {sender_short}")
                    if email.summary:
                        print(f"      📝 {email.summary}")
                    print()

def main():
    print("🚀 Gmail Mail Sınıflandırıcı Başlatılıyor...\n")
    
    classifier = GmailClassifier()
    
    # Gmail'e bağlan
    classifier.authenticate_gmail()
    
    # Mailleri çek
    emails = classifier.fetch_emails(max_results=15)
    
    # AI ile sınıflandır
    classified_emails = classifier.classify_emails(emails)
    
    # Sonuçları göster
    classifier.display_results(classified_emails)

if __name__ == "__main__":
    main()
