// Translations
const translations = {
    tr: {
        // Categories
        'İŞ': 'İş', 'FATURA': 'Fatura', 'SOSYAL': 'Sosyal',
        'PROMOSYON': 'Promosyon', 'SPAM': 'Spam', 'KİŞİSEL': 'Kişisel', 'DİĞER': 'Diğer',
        // Priority
        priority1: 'Kritik', priority2: 'Yüksek', priority3: 'Normal', priority4: 'Düşük', priority5: 'Minimal',
        // UI
        title: 'Luva',
        sync: 'Senkronize Et',
        settings: 'Ayarlar',
        account: 'Hesap',
        category: 'Kategori',
        priority: 'Öncelik',
        all: 'Tümü',
        allLevels: 'Tüm Seviyeler',
        loading: 'Yükleniyor...',
        syncing: 'Senkronize ediliyor...',
        processing: 'İşleniyor...',
        completed: 'Tamamlandı',
        newEmails: 'yeni mail',
        error: 'Hata',
        connectionError: 'Bağlantı hatası',
        noEmails: 'Gösterilecek mail yok',
        // Settings
        configuration: 'Konfigürasyon',
        aiProvider: 'AI Sağlayıcı',
        model: 'Model',
        apiKey: 'API Anahtarı',
        apiKeyPlaceholder: 'sk-... veya API anahtarınız',
        syncTime: 'Otomatik Senkronizasyon Saati',
        lastSync: 'Son senkronizasyon',
        apply: 'Uygula',
        close: 'Kapat',
        // Account
        accountManagement: 'Hesap Yönetimi',
        connected: 'Bağlı',
        notConnected: 'Bağlı değil',
        configured: 'Yapılandırıldı',
        setupRequired: 'Kurulum Gerekli',
        emailsCached: 'mail önbellekte',
        gmailAccount: 'Gmail Hesabı',
        connectGmail: 'Gmail\'e Bağlan',
        setupFirst: 'Önce Kurulum Yap',
        logout: 'Çıkış Yap',
        dataManagement: 'Veri Yönetimi',
        clearData: 'Tüm Verileri Sil',
        clearDataHint: 'Cache, ayarlar ve oturum bilgileri silinir.',
        setupWizard: 'Kurulum Sihirbazı',
        // Setup
        step1Title: 'Google Cloud Projesi Oluştur',
        step2Title: 'Gmail API\'yi Etkinleştir',
        step3Title: 'OAuth Consent Screen Ayarla',
        step4Title: 'OAuth Credentials Oluştur',
        step5Title: 'AI API Anahtarı Al',
        clientId: 'Client ID',
        clientSecret: 'Client Secret',
        saveOAuth: 'OAuth Kaydet',
        // Messages
        logoutConfirm: 'Çıkış yapmak istediğinize emin misiniz?',
        logoutSuccess: 'Çıkış yapıldı',
        clearConfirm: 'Tüm veriler silinecek. Devam?',
        clearSuccess: 'Tüm veriler silindi',
        oauthSaved: 'OAuth kaydedildi! Şimdi Gmail\'e bağlanabilirsiniz.',
        oauthRequired: 'Client ID ve Secret gerekli',
        connectingGmail: 'Gmail\'e bağlanılıyor...',
        // Backend progress messages
        progressGmailConnecting: 'Gmail\'e bağlanılıyor...',
        progressGmailConnected: '✓ Gmail bağlantısı başarılı',
        progressFetching: 'Mailler çekiliyor',
        progressFetched: 'mail çekildi',
        progressClassifying: 'AI ile sınıflandırılıyor...',
        progressClassified: '✓ Mailler sınıflandırıldı',
        // Setup content
        step1Content: '<ol><li><a href="https://console.cloud.google.com/projectcreate" target="_blank">Google Cloud Console</a>\'a git</li><li>Yeni proje oluştur (örn: "Luva")</li><li>Projeyi seç</li></ol>',
        step2Content: '<ol><li><a href="https://console.cloud.google.com/apis/library/gmail.googleapis.com" target="_blank">Gmail API</a> sayfasına git</li><li>"Enable" tıkla</li></ol>',
        step3Content: '<ol><li><a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank">OAuth Consent Screen</a>\'e git</li><li>"External" seç, "Create" tıkla</li><li>App name ve email bilgilerini gir</li><li>"Save and Continue" ile devam et</li><li>Test users\'a Gmail adresini ekle</li></ol>',
        step4Instructions: '<ol><li><a href="https://console.cloud.google.com/apis/credentials" target="_blank">Credentials</a>\'a git</li><li>"Create Credentials" > "OAuth client ID"</li><li><strong style="color:var(--accent-secondary);">Application type: "Desktop app"</strong> seç</li><li>"Create" tıkla, ID ve Secret\'ı kopyala</li></ol><div style="background:rgba(255,200,0,0.1);border:1px solid rgba(255,200,0,0.3);border-radius:8px;padding:12px;margin:16px 0;font-size:0.85rem;"><strong>Önemli:</strong> Mutlaka "Desktop app" seçin!</div>',
        step5Content: '<p>AI sınıflandırma için bir API anahtarı gerekli:</p><ul><li><a href="https://aistudio.google.com/apikey" target="_blank">Google Gemini</a> (Ücretsiz)</li><li><a href="https://platform.openai.com/api-keys" target="_blank">OpenAI</a></li><li><a href="https://openrouter.ai/keys" target="_blank">OpenRouter</a></li></ul><p style="margin-top:12px;">Ayarlar\'dan girebilirsiniz.</p>'
    },
    en: {
        // Categories
        'İŞ': 'Work', 'FATURA': 'Invoice', 'SOSYAL': 'Social',
        'PROMOSYON': 'Promotion', 'SPAM': 'Spam', 'KİŞİSEL': 'Personal', 'DİĞER': 'Other',
        // Priority
        priority1: 'Critical', priority2: 'High', priority3: 'Normal', priority4: 'Low', priority5: 'Minimal',
        // UI
        title: 'Luva',
        sync: 'Sync',
        settings: 'Settings',
        account: 'Account',
        category: 'Category',
        priority: 'Priority',
        all: 'All',
        allLevels: 'All Levels',
        loading: 'Loading...',
        syncing: 'Syncing...',
        processing: 'Processing...',
        completed: 'Completed',
        newEmails: 'new emails',
        error: 'Error',
        connectionError: 'Connection error',
        noEmails: 'No emails to display',
        // Settings
        configuration: 'Configuration',
        aiProvider: 'AI Provider',
        model: 'Model',
        apiKey: 'API Key',
        apiKeyPlaceholder: 'sk-... or your API key',
        syncTime: 'Auto Sync Time',
        lastSync: 'Last sync',
        apply: 'Apply',
        close: 'Close',
        // Account
        accountManagement: 'Account Management',
        connected: 'Connected',
        notConnected: 'Not connected',
        configured: 'Configured',
        setupRequired: 'Setup Required',
        emailsCached: 'emails cached',
        gmailAccount: 'Gmail Account',
        connectGmail: 'Connect Gmail',
        setupFirst: 'Setup First',
        logout: 'Logout',
        dataManagement: 'Data Management',
        clearData: 'Clear All Data',
        clearDataHint: 'Cache, settings and session will be deleted.',
        setupWizard: 'Setup Wizard',
        // Setup
        step1Title: 'Create Google Cloud Project',
        step2Title: 'Enable Gmail API',
        step3Title: 'Configure OAuth Consent Screen',
        step4Title: 'Create OAuth Credentials',
        step5Title: 'Get AI API Key',
        clientId: 'Client ID',
        clientSecret: 'Client Secret',
        saveOAuth: 'Save OAuth',
        // Messages
        logoutConfirm: 'Are you sure you want to logout?',
        logoutSuccess: 'Logged out',
        clearConfirm: 'All data will be deleted. Continue?',
        clearSuccess: 'All data cleared',
        oauthSaved: 'OAuth saved! You can now connect to Gmail.',
        oauthRequired: 'Client ID and Secret required',
        connectingGmail: 'Connecting to Gmail...',
        // Backend progress messages
        progressGmailConnecting: 'Connecting to Gmail...',
        progressGmailConnected: '✓ Gmail connected',
        progressFetching: 'Fetching emails',
        progressFetched: 'emails fetched',
        progressClassifying: 'Classifying with AI...',
        progressClassified: '✓ Emails classified',
        // Setup content
        step1Content: '<ol><li>Go to <a href="https://console.cloud.google.com/projectcreate" target="_blank">Google Cloud Console</a></li><li>Create a new project (e.g., "Luva")</li><li>Select the project</li></ol>',
        step2Content: '<ol><li>Go to <a href="https://console.cloud.google.com/apis/library/gmail.googleapis.com" target="_blank">Gmail API</a></li><li>Click "Enable"</li></ol>',
        step3Content: '<ol><li>Go to <a href="https://console.cloud.google.com/apis/credentials/consent" target="_blank">OAuth Consent Screen</a></li><li>Select "External", click "Create"</li><li>Enter app name and email</li><li>Click "Save and Continue"</li><li>Add your Gmail to Test users</li></ol>',
        step4Instructions: '<ol><li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank">Credentials</a></li><li>"Create Credentials" > "OAuth client ID"</li><li><strong style="color:var(--accent-secondary);">Application type: "Desktop app"</strong></li><li>Click "Create", copy ID and Secret</li></ol><div style="background:rgba(255,200,0,0.1);border:1px solid rgba(255,200,0,0.3);border-radius:8px;padding:12px;margin:16px 0;font-size:0.85rem;"><strong>Important:</strong> Must select "Desktop app"!</div>',
        step5Content: '<p>An AI API key is required for classification:</p><ul><li><a href="https://aistudio.google.com/apikey" target="_blank">Google Gemini</a> (Free)</li><li><a href="https://platform.openai.com/api-keys" target="_blank">OpenAI</a></li><li><a href="https://openrouter.ai/keys" target="_blank">OpenRouter</a></li></ul><p style="margin-top:12px;">Enter it in Settings.</p>'
    }
};

let currentLang = localStorage.getItem('lang') || 'tr';

function t(key) {
    return translations[currentLang][key] || key;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateUILanguage();
    
    // Update status bar if it shows loading/syncing
    const status = document.getElementById('status');
    if (status) {
        const text = status.textContent;
        if (text === 'Loading...' || text === 'Yükleniyor...') {
            status.textContent = t('loading');
        } else if (text === 'Syncing...' || text === 'Senkronize ediliyor...') {
            status.textContent = t('syncing');
        }
    }
}

// Translate backend messages to current language
function translateBackendMessage(msg) {
    if (currentLang === 'tr') return msg; // Backend already sends Turkish
    
    // Map Turkish backend messages to English
    const messageMap = {
        "Gmail'e bağlanılıyor...": t('progressGmailConnecting'),
        "✓ Gmail bağlantısı başarılı": t('progressGmailConnected'),
        "AI ile sınıflandırılıyor...": t('progressClassifying'),
        "✓ Mailler sınıflandırıldı": t('progressClassified')
    };
    
    // Direct match
    if (messageMap[msg]) return messageMap[msg];
    
    // Pattern matches for dynamic messages
    if (msg.includes('Mailler çekiliyor')) {
        const dateMatch = msg.match(/\(([^)]+)\)/);
        const dateInfo = dateMatch ? ` (after ${dateMatch[1].replace(' sonrası', '')})` : '';
        return `${t('progressFetching')}${dateInfo}...`;
    }
    
    if (msg.includes('mail çekildi')) {
        const numMatch = msg.match(/(\d+)/);
        const num = numMatch ? numMatch[1] : '0';
        const dateMatch = msg.match(/\(([^)]+)\)/);
        const dateInfo = dateMatch ? ` (after ${dateMatch[1].replace(' sonrası', '')})` : '';
        return `✓ ${num} ${t('progressFetched')}${dateInfo}`;
    }
    
    return msg;
}

function updateUILanguage() {
    // Update static elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = t(key);
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
    
    // Update language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    
    // Update filter dropdowns
    updateFilterDropdowns();
    
    // Update setup wizard content
    updateSetupContent();
    
    // Re-render emails with new language
    if (allEmails.length > 0) {
        applyFilters();
    }
}

function updateFilterDropdowns() {
    const catSelect = document.getElementById('filterCategory');
    const prioSelect = document.getElementById('filterPriority');
    
    if (catSelect) {
        const catValue = catSelect.value || 'all';
        catSelect.innerHTML = `
            <option value="all">${t('all')}</option>
            <option value="İŞ">💼 ${t('İŞ')}</option>
            <option value="FATURA">💰 ${t('FATURA')}</option>
            <option value="KİŞİSEL">👤 ${t('KİŞİSEL')}</option>
            <option value="SOSYAL">👥 ${t('SOSYAL')}</option>
            <option value="PROMOSYON">🏷️ ${t('PROMOSYON')}</option>
            <option value="SPAM">🚫 ${t('SPAM')}</option>
            <option value="DİĞER">📧 ${t('DİĞER')}</option>
        `;
        catSelect.value = catValue;
    }
    
    if (prioSelect) {
        const prioValue = prioSelect.value || 'all';
        prioSelect.innerHTML = `
            <option value="all">${t('allLevels')}</option>
            <option value="1">🔴 ${t('priority1')}</option>
            <option value="2">🟠 ${t('priority2')}</option>
            <option value="3">🟡 ${t('priority3')}</option>
            <option value="4">🟢 ${t('priority4')}</option>
            <option value="5">⚪ ${t('priority5')}</option>
        `;
        prioSelect.value = prioValue;
    }
}

function updateSetupContent() {
    const step1 = document.getElementById('step1Content');
    const step2 = document.getElementById('step2Content');
    const step3 = document.getElementById('step3Content');
    const step4 = document.getElementById('step4Instructions');
    const step5 = document.getElementById('step5Content');
    
    if (step1) step1.innerHTML = t('step1Content');
    if (step2) step2.innerHTML = t('step2Content');
    if (step3) step3.innerHTML = t('step3Content');
    if (step4) step4.innerHTML = t('step4Instructions');
    if (step5) step5.innerHTML = t('step5Content');
}

const categoryIcons = {
    'İŞ': '💼', 'FATURA': '💰', 'SOSYAL': '👥',
    'PROMOSYON': '🏷️', 'SPAM': '🚫', 'KİŞİSEL': '👤', 'DİĞER': '📧'
};

function getPriorityLabel(p) {
    return t('priority' + p) || p;
}

const categoryOrder = ['İŞ', 'FATURA', 'KİŞİSEL', 'SOSYAL', 'DİĞER', 'PROMOSYON', 'SPAM'];

let allEmails = [];

async function fetchEmails() {
    const status = document.getElementById('status');
    status.textContent = t('syncing');
    
    try {
        const resp = await fetch('/api/emails');
        const data = await resp.json();
        
        if (data.error) {
            status.textContent = t('error') + ': ' + data.error;
            status.style.color = '#FF5C00';
            return;
        }
        
        allEmails = data.emails || [];
        applyFilters();
        
        const locale = currentLang === 'en' ? 'en-US' : 'tr-TR';
        const lastFetch = data.last_fetch ? new Date(data.last_fetch).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) : '--:--';
        const activeText = currentLang === 'en' ? 'Active' : 'Aktif';
        const emailsText = currentLang === 'en' ? 'Emails' : 'Mail';
        status.textContent = `${activeText} • ${data.count} ${emailsText} • ${t('lastSync')}: ${lastFetch}`;
    } catch (err) {
        status.textContent = t('connectionError') + ': ' + err.message;
    }
}

async function refreshEmails() {
    const btn = document.querySelector('.btn-primary');
    const originalContent = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = t('processing');
    
    const status = document.getElementById('status');
    
    try {
        const eventSource = new EventSource('/api/emails/refresh-stream');
        
        eventSource.addEventListener('progress', (e) => {
            try {
                const data = JSON.parse(e.data);
                status.textContent = translateBackendMessage(data.message);
            } catch (err) {
                console.log('Progress parse error:', err);
            }
        });
        
        eventSource.addEventListener('complete', (e) => {
            eventSource.close();
            try {
                const data = JSON.parse(e.data);
                allEmails = data.emails || [];
                applyFilters();
                
                if (data.message) {
                    status.textContent = translateBackendMessage(data.message);
                } else {
                    status.textContent = `✓ ${t('completed')} • ${data.new_count || 0} ${t('newEmails')}`;
                }
            } catch (err) {
                status.textContent = t('completed');
            }
            btn.disabled = false;
            btn.innerHTML = originalContent;
        });
        
        eventSource.addEventListener('error', (e) => {
            eventSource.close();
            try {
                if (e.data) {
                    const data = JSON.parse(e.data);
                    
                    // Setup required - open setup wizard
                    if (data.message === 'setup_required') {
                        status.textContent = t('setupRequired');
                        openSetupWizard();
                    }
                    // AI key required - open settings
                    else if (data.message === 'ai_key_required') {
                        status.textContent = currentLang === 'en' ? 'AI API key required' : 'AI API anahtarı gerekli';
                        openSettings();
                    }
                    else {
                        status.textContent = '✗ ' + t('error') + ': ' + data.message;
                    }
                }
            } catch (err) {
                status.textContent = t('connectionError');
            }
            btn.disabled = false;
            btn.innerHTML = originalContent;
        });
        
        eventSource.onerror = () => {
            eventSource.close();
            status.textContent = t('connectionError');
            btn.disabled = false;
            btn.innerHTML = originalContent;
        };
        
    } catch (err) {
        status.textContent = t('error') + ': ' + err.message;
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }
}

function applyFilters() {
    const catFilter = document.getElementById('filterCategory').value;
    const prioFilter = document.getElementById('filterPriority').value;
    
    let filtered = allEmails;
    
    if (catFilter !== 'all') {
        filtered = filtered.filter(e => e.category === catFilter);
    }
    if (prioFilter !== 'all') {
        filtered = filtered.filter(e => e.priority === parseInt(prioFilter));
    }
    
    renderEmails(filtered);
}

function renderEmails(emails) {
    const container = document.getElementById('emails');
    container.innerHTML = '';
    
    if (emails.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:100px; color:var(--text-muted); border:1px dashed var(--border); border-radius:20px;">
                ${t('noEmails')}
            </div>
        `;
        return;
    }
    
    const grouped = {};
    emails.forEach(e => {
        if (!grouped[e.category]) grouped[e.category] = [];
        grouped[e.category].push(e);
    });
    
    categoryOrder.forEach(cat => {
        if (!grouped[cat]) return;
        
        const section = document.createElement('div');
        section.className = 'category-section';
        
        section.innerHTML = `
            <div class="category-title">
                <span>${categoryIcons[cat] || '📧'}</span>
                <span>${t(cat)}</span>
                <span class="count">${grouped[cat].length}</span>
            </div>
            <div class="email-grid"></div>
        `;
        
        const grid = section.querySelector('.email-grid');
        
        grouped[cat]
            .sort((a, b) => a.priority - b.priority)
            .forEach(email => grid.appendChild(createEmailCard(email)));
        
        container.appendChild(section);
    });
}

function createEmailCard(email) {
    const card = document.createElement('a');
    card.className = `email-item prio-${email.priority}`;
    card.href = email.gmail_url || `https://mail.google.com/mail/u/0/#inbox/${email.id}`;
    card.target = '_blank';
    
    card.innerHTML = `
        <div class="email-top">
            <div class="email-sender">${escapeHtml(email.sender)}</div>
            <div class="email-priority-tag">${getPriorityLabel(email.priority)}</div>
        </div>
        <div class="email-subject">${escapeHtml(email.subject)}</div>
        ${email.summary ? `<div class="email-summary">${escapeHtml(email.summary)}</div>` : ''}
    `;
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Settings
let providers = {};

async function openSettings() {
    document.getElementById('settingsModal').style.display = 'grid';
    try {
        // Provider listesini al
        const provResp = await fetch('/api/providers');
        providers = await provResp.json();
        
        // Mevcut ayarları al
        const resp = await fetch('/api/settings');
        const settings = await resp.json();
        
        // Provider dropdown'ı doldur
        const providerSelect = document.getElementById('aiProvider');
        providerSelect.innerHTML = '';
        for (const [key, val] of Object.entries(providers)) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = val.name;
            providerSelect.appendChild(opt);
        }
        
        // Mevcut değerleri set et
        providerSelect.value = settings.ai_provider || 'gemini';
        onProviderChange(settings.ai_model);
        document.getElementById('aiApiKey').value = settings.ai_api_key || '';
        document.getElementById('fetchHour').value = settings.fetch_hour || 10;
        document.getElementById('fetchMinute').value = settings.fetch_minute || 0;
        
        const lastFetchText = settings.last_fetch 
            ? new Date(settings.last_fetch).toLocaleString(currentLang === 'en' ? 'en-US' : 'tr-TR') 
            : (currentLang === 'en' ? 'Not yet' : 'Henüz yok');
        document.getElementById('lastFetchInfo').textContent = `${t('lastSync')}: ${lastFetchText}`;
        
        updateApiKeyHint();
    } catch (e) {
        console.error('Settings yüklenemedi:', e);
    }
}

function onProviderChange(selectedModel) {
    const provider = document.getElementById('aiProvider').value;
    const modelSelect = document.getElementById('aiModel');
    const providerData = providers[provider];
    
    if (!providerData) return;
    
    modelSelect.innerHTML = '';
    providerData.models.forEach(model => {
        const opt = document.createElement('option');
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
    });
    
    modelSelect.value = selectedModel || providerData.default;
    updateApiKeyHint();
}

function updateApiKeyHint() {
    const provider = document.getElementById('aiProvider').value;
    const hints = {
        'gemini': 'aistudio.google.com/apikey adresinden alabilirsiniz',
        'openai': 'platform.openai.com/api-keys adresinden alabilirsiniz',
        'openrouter': 'openrouter.ai/keys adresinden alabilirsiniz'
    };
    document.getElementById('apiKeyHint').textContent = hints[provider] || '';
}

function toggleApiKeyVisibility() {
    const input = document.getElementById('aiApiKey');
    const icon = document.getElementById('eyeIcon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
    } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
    }
}

function closeSettings() {
    document.getElementById('settingsModal').style.display = 'none';
}

async function saveSettings() {
    const settings = {
        ai_provider: document.getElementById('aiProvider').value,
        ai_model: document.getElementById('aiModel').value,
        ai_api_key: document.getElementById('aiApiKey').value,
        fetch_hour: parseInt(document.getElementById('fetchHour').value),
        fetch_minute: parseInt(document.getElementById('fetchMinute').value)
    };
    
    try {
        await fetch('/api/settings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(settings)
        });
        closeSettings();
        fetchEmails(); 
    } catch (e) {
        alert(t('error'));
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Set default filter values first
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterPriority').value = 'all';
    
    updateUILanguage();
    checkSetupStatus();
    fetchEmails();
});

// Account Management
async function openAccountModal() {
    document.getElementById('accountModal').style.display = 'grid';
    await loadAccountInfo();
}

function closeAccountModal() {
    document.getElementById('accountModal').style.display = 'none';
}

async function loadAccountInfo() {
    try {
        const resp = await fetch('/api/account');
        const data = await resp.json();
        
        const emailEl = document.getElementById('accountEmail');
        const badgeEl = document.getElementById('accountBadge');
        const connectBtn = document.getElementById('connectBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const countEl = document.getElementById('emailsCount');
        
        if (data.logged_in) {
            emailEl.textContent = data.email || 'Gmail';
            badgeEl.textContent = t('connected');
            badgeEl.className = 'badge badge-success';
            connectBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-flex';
        } else {
            emailEl.textContent = t('notConnected');
            badgeEl.textContent = data.oauth_configured ? t('configured') : t('setupRequired');
            badgeEl.className = 'badge badge-warning';
            connectBtn.style.display = 'inline-flex';
            connectBtn.textContent = data.oauth_configured ? t('connectGmail') : t('setupFirst');
            logoutBtn.style.display = 'none';
        }
        
        countEl.textContent = `${data.emails_count || 0} ${t('emailsCached')}`;
    } catch (e) {
        console.error('Account info yüklenemedi:', e);
    }
}

async function connectGmail() {
    const status = document.getElementById('status');
    status.textContent = t('connectingGmail');
    closeAccountModal();
    
    // Refresh tetikleyerek OAuth akışını başlat
    refreshEmails();
}

async function logout() {
    if (!confirm(t('logoutConfirm'))) return;
    
    try {
        const resp = await fetch('/api/account/logout', { method: 'POST' });
        const data = await resp.json();
        
        if (data.success) {
            alert(t('logoutSuccess'));
            location.reload();
        } else {
            alert(t('error') + ': ' + data.error);
        }
    } catch (e) {
        alert(t('connectionError'));
    }
}

async function clearAllData() {
    if (!confirm(t('clearConfirm'))) return;
    
    try {
        const resp = await fetch('/api/account/clear-data', { method: 'POST' });
        const data = await resp.json();
        
        if (data.success) {
            alert(t('clearSuccess'));
            location.reload();
        } else {
            alert(t('error') + ': ' + data.error);
        }
    } catch (e) {
        alert(t('connectionError'));
    }
}

// Setup Wizard
function openSetupWizard() {
    closeAccountModal();
    document.getElementById('setupModal').style.display = 'grid';
}

function closeSetupWizard() {
    document.getElementById('setupModal').style.display = 'none';
}

async function saveOAuthConfig() {
    const clientId = document.getElementById('setupClientId').value.trim();
    const clientSecret = document.getElementById('setupClientSecret').value.trim();
    
    if (!clientId || !clientSecret) {
        alert(t('oauthRequired'));
        return;
    }
    
    try {
        const resp = await fetch('/api/account/setup-oauth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ client_id: clientId, client_secret: clientSecret })
        });
        const data = await resp.json();
        
        if (data.success) {
            closeSetupWizard();
            // OAuth kaydedildi, şimdi AI API key için Settings aç
            openSettings();
        } else {
            alert(t('error') + ': ' + data.error);
        }
    } catch (e) {
        alert(t('connectionError'));
    }
}

async function checkSetupStatus() {
    try {
        const resp = await fetch('/api/account');
        const data = await resp.json();
        
        // OAuth yapılandırılmamışsa setup wizard'ı göster
        if (!data.oauth_configured) {
            setTimeout(() => {
                openSetupWizard();
            }, 500);
        }
    } catch (e) {}
}
