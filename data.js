// data.js — Base de données Lingala Express
// Chaque entrée : lingala, phonétique, traduction FR, traduction EN, catégorie

const words = [

  // ─── SALUTATIONS ───────────────────────────────────────────────
  { lingala: "Mbote",          phonetic: "m-BO-teh",       fr: "Bonjour / Salut",        en: "Hello / Hi",              category: "salutations" },
  { lingala: "Mbote na yo",    phonetic: "m-BO-teh na yo", fr: "Bonjour (à toi)",        en: "Hello (to you)",          category: "salutations" },
  { lingala: "Sango nini?",    phonetic: "SAN-go NI-ni",   fr: "Quoi de neuf ?",         en: "What's up?",              category: "salutations" },
  { lingala: "Malamu",         phonetic: "ma-LA-mou",      fr: "Bien / Ça va bien",      en: "Good / I'm fine",         category: "salutations" },
  { lingala: "Nakosepela",     phonetic: "na-ko-SEH-peh-la", fr: "Je suis content(e)",   en: "I am happy",              category: "salutations" },
  { lingala: "Na sango te",    phonetic: "na SAN-go teh",  fr: "Rien de spécial",        en: "Nothing special",         category: "salutations" },
  { lingala: "Tokomonana",     phonetic: "to-ko-mo-NA-na", fr: "À bientôt",              en: "See you soon",            category: "salutations" },
  { lingala: "Kende malamu",   phonetic: "KEN-deh ma-LA-mou", fr: "Bonne continuation / Au revoir", en: "Goodbye / Take care", category: "salutations" },
  { lingala: "Butu malamu",    phonetic: "BOU-tou ma-LA-mou", fr: "Bonne nuit",          en: "Good night",              category: "salutations" },
  { lingala: "Boyei bolamu",   phonetic: "bo-YEI bo-LA-mou", fr: "Bienvenue",            en: "Welcome",                 category: "salutations" },

  // ─── POLITESSE ─────────────────────────────────────────────────
  { lingala: "Matondo",        phonetic: "ma-TON-do",      fr: "Merci",                  en: "Thank you",               category: "politesse" },
  { lingala: "Matondo mingi",  phonetic: "ma-TON-do MIN-gui", fr: "Merci beaucoup",     en: "Thank you very much",     category: "politesse" },
  { lingala: "Ndingisa",       phonetic: "ndin-GI-sa",     fr: "Pardon / Excuse-moi",   en: "Excuse me / Sorry",       category: "politesse" },
  { lingala: "Bolimbisi ngai", phonetic: "bo-lim-BI-si ngai", fr: "Pardonne-moi",       en: "Forgive me",              category: "politesse" },
  { lingala: "Awa",            phonetic: "A-wa",           fr: "Oui",                    en: "Yes",                     category: "politesse" },
  { lingala: "Te",             phonetic: "teh",            fr: "Non",                    en: "No",                      category: "politesse" },
  { lingala: "Nakoki te",      phonetic: "na-KO-ki teh",   fr: "Je ne peux pas",        en: "I can't",                 category: "politesse" },
  { lingala: "Nalingi",        phonetic: "na-LIN-gui",     fr: "Je veux / J'aime",      en: "I want / I like",         category: "politesse" },
  { lingala: "Nalingi te",     phonetic: "na-LIN-gui teh", fr: "Je ne veux pas",        en: "I don't want",            category: "politesse" },

  // ─── MARCHÉ ────────────────────────────────────────────────────
  { lingala: "Ntalo ya nini?", phonetic: "n-TA-lo ya NI-ni", fr: "C'est combien ?",     en: "How much is it?",         category: "marche" },
  { lingala: "Penza",          phonetic: "PEN-za",         fr: "Argent",                 en: "Money",                   category: "marche" },
  { lingala: "Libenga",        phonetic: "li-BEN-ga",      fr: "Gratuit / Pour rien",   en: "Free / For nothing",      category: "marche" },
  { lingala: "Pamba",          phonetic: "PAM-ba",         fr: "Trop cher !",            en: "Too expensive!",          category: "marche" },
  { lingala: "Kota",           phonetic: "KO-ta",          fr: "Entrer",                 en: "Enter / Come in",         category: "marche" },
  { lingala: "Pesá ngai",      phonetic: "PEH-sa ngai",    fr: "Donne-moi",             en: "Give me",                 category: "marche" },
  { lingala: "Bilanga",        phonetic: "bi-LAN-ga",      fr: "Légumes",               en: "Vegetables",              category: "marche" },
  { lingala: "Mbisi",          phonetic: "m-BI-si",        fr: "Poisson",               en: "Fish",                    category: "marche" },
  { lingala: "Nyama",          phonetic: "NYA-ma",         fr: "Viande",                en: "Meat",                    category: "marche" },
  { lingala: "Makemba",        phonetic: "ma-KEM-ba",      fr: "Banane plantain",       en: "Plantain banana",         category: "marche" },
  { lingala: "Loso",           phonetic: "LO-so",          fr: "Riz",                   en: "Rice",                    category: "marche" },

  // ─── TRANSPORT ─────────────────────────────────────────────────
  { lingala: "Taxi",           phonetic: "TAK-si",         fr: "Taxi",                  en: "Taxi",                    category: "transport" },
  { lingala: "Tembe",          phonetic: "TEM-beh",        fr: "Moto-taxi",             en: "Motorcycle taxi",         category: "transport" },
  { lingala: "Wapi?",          phonetic: "WA-pi",          fr: "Où ?",                  en: "Where?",                  category: "transport" },
  { lingala: "Ná ngai",        phonetic: "na ngai",        fr: "Avec moi",              en: "With me",                 category: "transport" },
  { lingala: "Kende!",         phonetic: "KEN-deh",        fr: "Va ! / Allons-y !",    en: "Go! / Let's go!",         category: "transport" },
  { lingala: "Telema!",        phonetic: "teh-LEH-ma",     fr: "Arrête ! / Stop !",    en: "Stop!",                   category: "transport" },
  { lingala: "Suka",           phonetic: "SOU-ka",         fr: "Fin / Terminus",        en: "End / Last stop",         category: "transport" },
  { lingala: "Pembeni",        phonetic: "pem-BEH-ni",     fr: "À côté / Près de",     en: "Next to / Near",          category: "transport" },
  { lingala: "Mosika",         phonetic: "mo-SI-ka",       fr: "Loin",                  en: "Far",                     category: "transport" },

  // ─── URGENCES ──────────────────────────────────────────────────
  { lingala: "Sungá ngai!",    phonetic: "SOUN-ga ngai",   fr: "Aide-moi !",            en: "Help me!",                category: "urgences" },
  { lingala: "Mobulu!",        phonetic: "mo-BOU-lou",     fr: "Au voleur !",           en: "Thief!",                  category: "urgences" },
  { lingala: "Moto azali kobela", phonetic: "MO-to a-ZA-li ko-BEH-la", fr: "Quelqu'un est malade", en: "Someone is sick", category: "urgences" },
  { lingala: "Bospi",          phonetic: "BOS-pi",         fr: "Hôpital",               en: "Hospital",                category: "urgences" },
  { lingala: "Mondoki",        phonetic: "mon-DO-ki",      fr: "Policier",              en: "Police officer",          category: "urgences" },
  { lingala: "Moto!",          phonetic: "MO-to",          fr: "Feu ! / Incendie !",   en: "Fire!",                   category: "urgences" },
  { lingala: "Nabuaki",        phonetic: "na-bou-A-ki",    fr: "Je suis perdu(e)",     en: "I am lost",               category: "urgences" },
  { lingala: "Nabeli te",      phonetic: "na-BEH-li teh",  fr: "Je ne me sens pas bien", en: "I don't feel well",    category: "urgences" },

  // ─── CHIFFRES ──────────────────────────────────────────────────
  { lingala: "Moko",           phonetic: "MO-ko",          fr: "Un (1)",                en: "One (1)",                 category: "chiffres" },
  { lingala: "Míbalé",         phonetic: "mi-BA-leh",      fr: "Deux (2)",              en: "Two (2)",                 category: "chiffres" },
  { lingala: "Mísambo",        phonetic: "mi-SAM-bo",      fr: "Trois (3)",             en: "Three (3)",               category: "chiffres" },
  { lingala: "Mínei",          phonetic: "mi-NEI",         fr: "Quatre (4)",            en: "Four (4)",                category: "chiffres" },
  { lingala: "Mítáno",         phonetic: "mi-TA-no",       fr: "Cinq (5)",              en: "Five (5)",                category: "chiffres" },
  { lingala: "Motóba",         phonetic: "mo-TO-ba",       fr: "Six (6)",               en: "Six (6)",                 category: "chiffres" },
  { lingala: "Nsambo",         phonetic: "n-SAM-bo",       fr: "Sept (7)",              en: "Seven (7)",               category: "chiffres" },
  { lingala: "Mwambe",         phonetic: "MWAM-beh",       fr: "Huit (8)",              en: "Eight (8)",               category: "chiffres" },
  { lingala: "Libwa",          phonetic: "LIB-wa",         fr: "Neuf (9)",              en: "Nine (9)",                category: "chiffres" },
  { lingala: "Zomi",           phonetic: "ZO-mi",          fr: "Dix (10)",              en: "Ten (10)",                category: "chiffres" },
  { lingala: "Zomi na moko",   phonetic: "ZO-mi na MO-ko", fr: "Onze (11)",             en: "Eleven (11)",             category: "chiffres" },
  { lingala: "Ntuku míbalé",   phonetic: "n-TOU-kou mi-BA-leh", fr: "Vingt (20)",       en: "Twenty (20)",             category: "chiffres" },
  { lingala: "Ntuku mítáno",   phonetic: "n-TOU-kou mi-TA-no", fr: "Cinquante (50)",    en: "Fifty (50)",              category: "chiffres" },
  { lingala: "Monkama",        phonetic: "mon-KA-ma",      fr: "Cent (100)",            en: "One hundred (100)",       category: "chiffres" },

];
