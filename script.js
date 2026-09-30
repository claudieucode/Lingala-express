// script.js — Lingala Express
// Logique : bascule FR/EN, filtrage par catégorie, recherche, rendu des cartes

// ─── ÉTAT DE L'APPLICATION ─────────────────────────────────────────────────
let currentLang = 'fr';        // 'fr' ou 'en'
let currentCategory = 'all';   // catégorie sélectionnée
let currentSearch = '';        // texte de recherche

// Labels traduits pour l'interface (FR / EN)
const ui = {
  fr: {
    tagline:       "Apprenez le lingala essentiel à Kinshasa",
    searchPlaceholder: "Chercher un mot en lingala ou en français...",
    langLabel:     "🇬🇧 English",
    noResults:     "Aucun mot trouvé. Essayez une autre recherche.",
    footer:        "Lingala Express · Kinshasa, RDC · Apprenez, parlez, vivez 🌍",
    all:           "Tout",
    categories: {
      salutations: "👋 Salutations",
      politesse:   "🤝 Politesse",
      marche:      "🛒 Marché",
      transport:   "🚕 Transport",
      urgences:    "🚨 Urgences",
      chiffres:    "🔢 Chiffres",
    },
    results: (n) => `${n} mot${n > 1 ? 's' : ''} trouvé${n > 1 ? 's' : ''}`,
  },
  en: {
    tagline:       "Learn essential Lingala in Kinshasa",
    searchPlaceholder: "Search a word in Lingala or English...",
    langLabel:     "🇫🇷 Français",
    noResults:     "No words found. Try a different search.",
    footer:        "Lingala Express · Kinshasa, DRC · Learn, speak, live 🌍",
    all:           "All",
    categories: {
      salutations: "👋 Greetings",
      politesse:   "🤝 Courtesy",
      marche:      "🛒 Market",
      transport:   "🚕 Transport",
      urgences:    "🚨 Emergencies",
      chiffres:    "🔢 Numbers",
    },
    results: (n) => `${n} word${n > 1 ? 's' : ''} found`,
  }
};

// ─── BASCULE DE LANGUE ──────────────────────────────────────────────────────
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  applyUILanguage();
  renderCards();
}

// Met à jour tous les textes de l'interface selon la langue
function applyUILanguage() {
  const t = ui[currentLang];

  document.getElementById('tagline').textContent        = t.tagline;
  document.getElementById('langLabel').textContent      = t.langLabel;
  document.getElementById('searchInput').placeholder    = t.searchPlaceholder;
  document.getElementById('noResultsText').textContent  = t.noResults;
  document.getElementById('footerText').textContent     = t.footer;

  // Met à jour les labels des boutons de catégorie
  document.querySelectorAll('.cat-btn').forEach(btn => {
    const cat = btn.dataset.cat;
    btn.textContent = cat === 'all' ? t.all : t.categories[cat] || btn.textContent;
  });
}

// ─── SÉLECTION DE CATÉGORIE ─────────────────────────────────────────────────
function selectCategory(btn) {
  // Retire la classe active de tous les boutons
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentCategory = btn.dataset.cat;
  renderCards();
}

// ─── FILTRAGE PAR RECHERCHE ─────────────────────────────────────────────────
function filterCards() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase().trim();
  renderCards();
}

// ─── RENDU DES CARTES ───────────────────────────────────────────────────────
function renderCards() {
  const t = ui[currentLang];
  const grid = document.getElementById('cardsGrid');
  const noResults = document.getElementById('noResults');
  const counter = document.getElementById('resultsCount');

  // Filtre les mots selon catégorie et recherche
  const filtered = words.filter(word => {
    const matchCat = currentCategory === 'all' || word.category === currentCategory;

    const translation = currentLang === 'fr' ? word.fr : word.en;
    const matchSearch =
      currentSearch === '' ||
      word.lingala.toLowerCase().includes(currentSearch) ||
      translation.toLowerCase().includes(currentSearch) ||
      word.phonetic.toLowerCase().includes(currentSearch);

    return matchCat && matchSearch;
  });

  // Met à jour le compteur
  counter.textContent = t.results(filtered.length);

  // Affiche "aucun résultat" si vide
  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'flex';
    return;
  }

  noResults.style.display = 'none';

  // Génère les cartes HTML
  grid.innerHTML = filtered.map(word => {
    const translation = currentLang === 'fr' ? word.fr : word.en;
    const categoryLabel = t.categories[word.category] || word.category;

    return `
      <div class="card">
        <div class="card-lingala">${word.lingala}</div>
        <div class="card-phonetic">${word.phonetic}</div>
        <div class="card-divider"></div>
        <div class="card-translation">${translation}</div>
        <span class="card-category-badge">${categoryLabel}</span>
      </div>
    `;
  }).join('');
}

// ─── INITIALISATION ─────────────────────────────────────────────────────────
// Lance l'app au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  applyUILanguage();
  renderCards();
});
