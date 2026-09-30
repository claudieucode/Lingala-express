// script.js — Lingala Express v2
// Logique principale : tabs, phrasebook, mot du jour, traducteur MyMemory

// ─── ÉTAT GLOBAL ────────────────────────────────────────────────────────────
let currentLang     = 'fr';   // 'fr' ou 'en'
let currentCategory = 'all';
let currentSearch   = '';
let translateHistory = [];

// ─── TEXTES UI (FR / EN) ────────────────────────────────────────────────────
const ui = {
  fr: {
    langBtn:          '🇬🇧 English',
    tab_wod:          '📅 Mot du Jour',
    tab_phrase:       '📖 Phrasebook',
    tab_trad:         '⚡ Traducteur Live',
    searchPlaceholder:'Chercher un mot en lingala ou en français...',
    catAll:           'Tout',
    tradTitle:        '⚡ Traducteur en direct → Lingala',
    tradLangLabel:    'Traduire depuis :',
    translateBtn:     'Traduire',
    loadingText:      'Interrogation de MyMemory API...',
    resultLabel:      'Traduction en lingala',
    historyTitle:     'Traductions récentes',
    inputPlaceholder: 'Entrez un mot ou une phrase...',
    noResults:        'Aucun mot trouvé. Essayez une autre recherche.',
    resultsWord:      'mot(s)',
    wodLabel:         '✨ Mot du Jour',
    confidence:       'Confiance :',
    footerText:       'Lingala Express · Kinshasa, RDC · Apprenez, parlez, vivez 🌍',
    errorNoInput:     'Veuillez entrer un mot ou une phrase.',
    errorAPI:         'Erreur API. Vérifiez votre connexion et réessayez.',
    errorNoResult:    'Aucune traduction trouvée pour ce mot.',
  },
  en: {
    langBtn:          '🇫🇷 Français',
    tab_wod:          '📅 Word of the Day',
    tab_phrase:       '📖 Phrasebook',
    tab_trad:         '⚡ Live Translator',
    searchPlaceholder:'Search a word in Lingala or English...',
    catAll:           'All',
    tradTitle:        '⚡ Live Translator → Lingala',
    tradLangLabel:    'Translate from:',
    translateBtn:     'Translate',
    loadingText:      'Querying MyMemory API...',
    resultLabel:      'Translation in Lingala',
    historyTitle:     'Recent translations',
    inputPlaceholder: 'Enter a word or phrase...',
    noResults:        'No words found. Try another search.',
    resultsWord:      'word(s)',
    wodLabel:         '✨ Word of the Day',
    confidence:       'Confidence:',
    footerText:       'Lingala Express · Kinshasa, DRC · Learn, speak, live 🌍',
    errorNoInput:     'Please enter a word or phrase.',
    errorAPI:         'API error. Check your connection and try again.',
    errorNoResult:    'No translation found for this word.',
  }
};

// ─── CATÉGORIES ──────────────────────────────────────────────────────────────
const catLabels = {
  fr: {
    salutations: '👋 Salutations',
    politesse:   '🤝 Politesse',
    marche:      '🛒 Marché',
    transport:   '🚕 Transport',
    urgences:    '🚨 Urgences',
    chiffres:    '🔢 Chiffres',
  },
  en: {
    salutations: '👋 Greetings',
    politesse:   '🤝 Courtesy',
    marche:      '🛒 Market',
    transport:   '🚕 Transport',
    urgences:    '🚨 Emergencies',
    chiffres:    '🔢 Numbers',
  }
};

// ─── LANGUE ──────────────────────────────────────────────────────────────────
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  applyUILanguage();
  renderCards();
  renderWOD();
}

function applyUILanguage() {
  const t = ui[currentLang];

  document.getElementById('langLabel').textContent           = t.langBtn;
  document.getElementById('tab-wod').textContent             = t.tab_wod;
  document.getElementById('tab-phrase').textContent          = t.tab_phrase;
  document.getElementById('tab-trad').textContent            = t.tab_trad;
  document.getElementById('tradTitle').textContent           = t.tradTitle;
  document.getElementById('tradLangLabel').textContent       = t.tradLangLabel;
  document.getElementById('translateBtnText').textContent    = t.translateBtn;
  document.getElementById('loadingText').textContent         = t.loadingText;
  document.getElementById('resultLabel').textContent         = t.resultLabel;
  document.getElementById('footerText').textContent          = t.footerText;

  const historyTitle = document.getElementById('historyTitle');
  if (historyTitle) historyTitle.textContent = t.historyTitle;

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  const transInput = document.getElementById('translateInput');
  if (transInput) transInput.placeholder = t.inputPlaceholder;

  const noResultsText = document.getElementById('noResultsText');
  if (noResultsText) noResultsText.textContent = t.noResults;

  // Bouton "Tout"
  const catAllBtn = document.querySelector('.cat-btn[data-cat="all"]');
  if (catAllBtn) catAllBtn.textContent = t.catAll;

  // Boutons catégories
  Object.keys(catLabels[currentLang]).forEach(cat => {
    const btn = document.querySelector(`.cat-btn[data-cat="${cat}"]`);
    if (btn) btn.textContent = catLabels[currentLang][cat];
  });

  // Options select langue
  updateSourceLangOptions();
}

function updateSourceLangOptions() {
  const select = document.getElementById('sourceLang');
  if (!select) return;
  const val = select.value;
  select.innerHTML = currentLang === 'fr'
    ? '<option value="fr">Français</option><option value="en">English</option>'
    : '<option value="fr">French</option><option value="en">English</option>';
  select.value = val;
}

// ─── ONGLETS ──────────────────────────────────────────────────────────────────
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('content-' + tabId).classList.add('active');
  btn.classList.add('active');
}

// ─── MOT DU JOUR ─────────────────────────────────────────────────────────────
function renderWOD() {
  const dayIndex = Math.floor(Date.now() / 86400000) % words.length;
  const w = words[dayIndex];
  const t = ui[currentLang];
  const catName    = catLabels[currentLang][w.category] || w.category;
  const translation = currentLang === 'fr' ? w.fr : w.en;

  document.getElementById('wodCard').innerHTML = `
    <div class="wod-label">${t.wodLabel}</div>
    <div class="wod-lingala">${w.lingala}</div>
    <div class="wod-phonetic">[ ${w.phonetic} ]</div>
    <div class="wod-divider"></div>
    <div class="wod-translation">${translation}</div>
    <div class="wod-category">${catName}</div>
  `;
}

// ─── PHRASEBOOK ───────────────────────────────────────────────────────────────
function selectCategory(btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.dataset.cat;
  filterCards();
}

function filterCards() {
  const input = document.getElementById('searchInput');
  currentSearch = input ? input.value.trim().toLowerCase() : '';
  renderCards();
}

function renderCards() {
  const t = ui[currentLang];
  const grid = document.getElementById('cardsGrid');
  const noResults = document.getElementById('noResults');
  const resultsCount = document.getElementById('resultsCount');
  if (!grid) return;

  // Filtrer
  const filtered = words.filter(w => {
    const matchCat = currentCategory === 'all' || w.category === currentCategory;
    if (!matchCat) return false;
    if (!currentSearch) return true;
    return (
      w.lingala.toLowerCase().includes(currentSearch) ||
      w.fr.toLowerCase().includes(currentSearch) ||
      w.en.toLowerCase().includes(currentSearch) ||
      w.phonetic.toLowerCase().includes(currentSearch)
    );
  });

  resultsCount.textContent = `${filtered.length} ${t.resultsWord}`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'flex';
    document.getElementById('noResultsText').textContent = t.noResults;
    return;
  }

  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(w => {
    const catName    = catLabels[currentLang][w.category] || w.category;
    const translation = currentLang === 'fr' ? w.fr : w.en;
    return `
      <div class="card">
        <div class="card-lingala">${w.lingala}</div>
        <div class="card-phonetic">[ ${w.phonetic} ]</div>
        <div class="card-divider"></div>
        <div class="card-translation">${translation}</div>
        <div class="card-badge">${catName}</div>
      </div>
    `;
  }).join('');
}

// ─── TRADUCTEUR ───────────────────────────────────────────────────────────────
async function translate() {
  const t = ui[currentLang];
  const input = document.getElementById('translateInput').value.trim();

  if (!input) {
    showTranslationError(t.errorNoInput);
    return;
  }

  const sourceLang = document.getElementById('sourceLang').value;
  const langPair   = `${sourceLang}|ln`;

  setTranslating(true);
  hideResult();

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=${encodeURIComponent(langPair)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');

    const data = await response.json();
    if (data.responseStatus !== 200) throw new Error('API: ' + data.responseDetails);

    const translated = data.responseData.translatedText;
    const matchScore = parseFloat(data.responseData.match) || 0;

    if (!translated || translated.toLowerCase() === input.toLowerCase()) {
      showTranslationError(t.errorNoResult);
    } else {
      showTranslationSuccess(input, translated, matchScore);
      addToHistory(input, translated, sourceLang);
    }

  } catch (err) {
    console.error('Translation error:', err);
    showTranslationError(t.errorAPI);
  } finally {
    setTranslating(false);
  }
}

function setTranslating(active) {
  const spinner = document.getElementById('spinnerWrap');
  const btn     = document.getElementById('translateBtn');
  const input   = document.getElementById('translateInput');
  spinner.style.display = active ? 'flex' : 'none';
  btn.disabled   = active;
  input.disabled = active;
}

function hideResult() {
  const result = document.getElementById('translationResult');
  result.style.display = 'none';
  document.getElementById('resultBox').className = 'result-box';
}

function showTranslationSuccess(original, translated, score) {
  const t = ui[currentLang];
  const pct   = Math.round(score * 100);
  const color = pct >= 70 ? 'var(--green-dark)' : pct >= 40 ? '#b45309' : 'var(--red)';

  document.getElementById('resultBox').className = 'result-box success';
  document.getElementById('resultContent').innerHTML =
    `<div class="result-lingala">${translated}</div>`;
  document.getElementById('resultMeta').innerHTML =
    `${t.confidence} <strong style="color:${color}">${pct}%</strong>`;
  document.getElementById('translationResult').style.display = 'block';
}

function showTranslationError(message) {
  document.getElementById('resultBox').className = 'result-box error';
  document.getElementById('resultContent').innerHTML =
    `<div class="result-error-text">${message}</div>`;
  document.getElementById('resultMeta').innerHTML = '';
  document.getElementById('translationResult').style.display = 'block';
  setTranslating(false);
}

// ─── HISTORIQUE ───────────────────────────────────────────────────────────────
function addToHistory(original, translated, sourceLang) {
  translateHistory.unshift({
    source: original,
    result: translated,
    time:   new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  if (translateHistory.length > 5) translateHistory.pop();
  renderHistory();
}

function renderHistory() {
  const section = document.getElementById('historySection');
  const list    = document.getElementById('historyList');
  if (!translateHistory.length) { section.style.display = 'none'; return; }

  section.style.display = 'block';
  list.innerHTML = translateHistory.map(e => `
    <div class="history-item">
      <span class="history-source">${e.source}</span>
      <span class="history-arrow">→</span>
      <span class="history-lingala">${e.result}</span>
    </div>
  `).join('');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
applyUILanguage();
renderWOD();
renderCards();
