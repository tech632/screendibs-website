import type { Dictionary } from "./en";

/*
 * French copy. Same shape as en.ts — TypeScript will flag any missing key.
 * Translated from the English on 1 Nov 2026; have a native speaker review
 * before launch. Team pull quotes stay in their original language (team page).
 */

const fr: Dictionary = {
  meta: {
    siteDescription:
      "Screendibs Technologies Inc. — Découvrez la propriété intellectuelle littéraire et évaluez des œuvres pour l’adaptation au cinéma, à la télévision, en streaming et en jeu vidéo.",
    aboutTitle: "À propos",
    aboutDescription:
      "Screendibs rend la découverte et l’évaluation de la propriété intellectuelle adaptable plus efficaces, logiques et concrètes pour l’industrie du divertissement.",
    teamTitle: "Équipe",
    teamDescription: "L’équipe derrière Screendibs.",
    newsletterTitle: "Infolettre",
    newsletterDescription:
      "L’hebdo Screendibs : quatre sujets sur les livres, les droits et les adaptations à l’écran, chaque vendredi.",
    contactTitle: "Contact",
    contactDescription: "Échangez avec Screendibs.",
  },

  nav: {
    company: "Entreprise",
    about: "À propos",
    team: "Équipe",
    newsletter: "Infolettre",
    contact: "Contact",
    home: "Screendibs — accueil",
    primary: "Navigation principale",
  },

  lang: {
    switchTo: "Switch to English",
    otherCode: "EN",
  },

  footer: {
    label: "Pied de page",
    terms: "Conditions",
    privacy: "Confidentialité",
    disclaimer: "Avertissement",
    platform: "Plateforme",
    place: "Montréal, Canada.",
  },

  contactBlock: {
    emailLabel: "Adresse e-mail",
    button: "Demander un accès",
    linkOut: "Aller à la page contact →",
  },

  widgets: {
    search: "Recherche",
    thinking: "On fouille les rayons…",
    found: "Trouvé",
    facts: "Faits sur la PI",
    total: "au total",
    scrollDown: "Faire défiler",
  },

  hero: {
    title: "Des droits de PI sélectionnés pour l’adaptation.",
  },

  home: {
    whatIndex: "01 — Quoi",
    whatTitle: "Nous identifions et mettons en avant des droits de PI sélectionnés pour l’adaptation.",
    whatLede:
      "Screendibs Technologies Inc. innove dans les industries du livre et du divertissement. Notre mission est de simplifier la recherche et l’acquisition des droits d’adaptation de livres, bandes dessinées, jeux vidéo et autres propriétés intellectuelles de valeur. Grâce à une base de données de plus de 100 millions de sources, notre moteur de recherche avancé permet aux utilisateurs de trouver ce qu’ils cherchent. Ils peuvent se renseigner sur le statut des droits d’adaptation et, si besoin, obtenir les coordonnées de l’ayant droit.",
    pillars: [
      {
        tone: "sage",
        title: "Recherche IA",
        body: "Allez au-delà des simples mots-clés. Rapprochez la logline, le style ou le traitement de votre projet d’une vaste base d’œuvres existantes.",
      },
      {
        tone: "coral",
        title: "Droits clarifiés",
        body: "Vérifiez instantanément si les œuvres trouvées sont dans le domaine public, ou identifiez les ayants droit, agents et éditeurs vérifiés.",
      },
      {
        tone: "peri",
        title: "Rapports",
        body: "Générez des rapports de due diligence complets, compilés par IA : historique des droits d’adaptation, chaîne des droits et analyses de marché.",
      },
    ],
    howIndex: "02 — Comment",
    howTitle: "Notre démarche.",
    steps: [
      {
        title: "Rechercher",
        body: "Décrivez votre concept ou votre traitement en langage naturel : notre moteur IA l’associe à des œuvres littéraires sélectionnées.",
      },
      {
        title: "S’informer",
        body: "Vérifiez le statut des droits d’adaptation, y compris le domaine public, et trouvez les coordonnées des ayants droit et de leurs représentants.",
      },
      {
        title: "Rapporter",
        body: "Exportez des rapports de PI détaillés, prêts pour les investisseurs : l’œuvre, les droits d’adaptation, la chaîne des droits et des comparables de marché.",
      },
    ],
    whoIndex: "03 — Qui",
    whoStatement: ["Screendibs se situe à la", "croisée de la technologie, de la littérature et du divertissement."],
    whoPara:
      "En 2021, notre fondateur a conclu un accord de droits d’adaptation d’un livre à l’écran avec un grand studio hollywoodien. Il a alors décidé de réinventer le processus, en rendant cette information plus accessible grâce à une technologie de nouvelle génération. Screendibs est une entreprise du XXIe siècle, avec une équipe de professionnels du cinéma, du logiciel et du droit qui veulent combler le fossé persistant entre les œuvres littéraires de valeur et ceux qui les recherchent. Nous proposons les solutions qui rendent la PI littéraire de qualité facile à découvrir et l’option sur les droits simple à obtenir.",
    whoPara2:
      "Depuis Montréal et Paris, notre équipe pluridisciplinaire réunit des décennies d’expérience en développement de films, en droits, en recherche sémantique et en design d’interface pour aider nos clients à trouver et adapter, dès aujourd’hui, les histoires de demain.",
    meetTeam: "Découvrir l’équipe",
    factsHeading: "Quelques faits sur la PI, pendant que vous êtes là.",
    clientsLabel: "Parmi nos clients",
    clients: [
      "sociétés de production cinéma et télévision",
      "producteurs indépendants",
      "studios de streaming",
      "scénaristes",
      "producteurs de théâtre",
      "dramaturges",
      "studios de jeux vidéo",
      "éditeurs de jeux vidéo",
      "entrepreneurs",
      "et bien d’autres",
    ],
    whyIndex: "04 — Pourquoi",
    pitches: [
      {
        tone: "coral",
        title: "Producteur indépendant à la recherche de PI de valeur ?",
        body: "Notre plateforme aide les utilisateurs à découvrir rapidement livres, articles, bandes dessinées, jeux vidéo et plus encore à adapter — avant leurs concurrents.",
      },
      {
        tone: "peri",
        title: "Équipes de développement en entreprise",
        body: "Nous offrons aux entreprises un outil de recherche pour que leurs équipes de développement suivent et évaluent la PI prête à être adaptée.",
      },
    ],
    requestAccess: "Demander un accès",
    contactIndex: "05 — Contact",
    contactHeading: "Demandez l’accès à la plateforme de découverte.",
    contactNote: "Pour une intégration de catalogue ou une demande d’API sur mesure, utilisez notre formulaire de contact complet.",
    whatSearches: [
      {
        query: "œuvre fondatrice de la littérature italienne du XIVe siècle",
        answer: "La Divina Commedia de Dante Alighieri, vers 1320 — l’épopée fondatrice de la langue vernaculaire, dans le domaine public depuis longtemps.",
      },
      {
        query: "plus ancien livre imprimé conservé",
        answer: "Le Sûtra du Diamant, imprimé en Chine en 868 — plus de cinq siècles avant la presse de Gutenberg.",
      },
      {
        query: "qui détient les droits des pièces de shakespeare",
        answer: "Personne. Toutes les pièces de Shakespeare sont dans le domaine public depuis des siècles — jouez-les, publiez-les, réinventez-les.",
      },
      {
        query: "qui a écrit le premier roman",
        answer: "Le Dit du Genji de Murasaki Shikibu, vers 1010 — écrit au Japon, des siècles avant que le mot « roman » n’existe ailleurs.",
      },
      {
        query: "plus ancien poème épique en anglais",
        answer: "Beowulf — composé entre le VIIIe et le XIe siècle. Auteur inconnu, question des droits réglée depuis longtemps.",
      },
      {
        query: "premier grand livre imprimé en europe",
        answer: "La Bible de Gutenberg, vers 1455 — le premier ouvrage d’envergure imprimé en caractères mobiles en Occident.",
      },
    ],
    howSearches: [
      {
        query: "quand expire le droit d’auteur d’un livre",
        answer: "Dans la plupart des pays : la vie de l’auteur plus 70 ans. Certains vont plus loin — 100 ans au Mexique, 95 en Jamaïque — si bien qu’un même titre peut être libre dans un pays et protégé dans un autre.",
      },
      {
        query: "deux personnes peuvent-elles revendiquer la même œuvre du domaine public",
        answer: "Oui — l’œuvre d’origine est libre pour tous, mais une traduction, une édition ou une adaptation précise peut avoir ses propres droits.",
      },
      {
        query: "qu’est-ce qui rend une œuvre protégeable",
        answer: "L’originalité et la fixation — il faut une expression personnelle, consignée quelque part, pas seulement une idée en tête.",
      },
      {
        query: "une traduction a-t-elle ses propres droits",
        answer: "Oui — une traduction est une œuvre à part entière. Traduire un roman du domaine public ne touche pas l’original, mais la traduction elle-même peut être protégée.",
      },
      {
        query: "que deviennent les manuscrits inédits après la mort",
        answer: "Ils restent protégés — la plupart des pays appliquent la même règle de la vie plus 70 ans, que l’œuvre ait été publiée ou non.",
      },
      {
        query: "peut-on protéger un titre ou un pitch d’une ligne",
        answer: "Non — titres, noms et formules courtes sont en général trop brefs pour être protégés. C’est l’expression qui est protégée, pas l’idée.",
      },
    ],
    facts: [
      {
        label: "Plus ancien litige",
        text: "Selon la légende, un roi irlandais du VIe siècle trancha l’affaire d’un psautier copié par « à chaque vache son veau, à chaque livre sa copie » — le moine dut rendre la copie.",
      },
      {
        label: "Première loi",
        text: "Le Statut d’Anne britannique, en 1710, fut la première loi à accorder des droits aux auteurs plutôt qu’aux imprimeurs.",
      },
      {
        label: "Manuscrit le plus cher",
        text: "Bill Gates a payé 30,8 millions de dollars pour le Codex Leicester de Léonard de Vinci en 1994.",
      },
      {
        label: "Plus longue attente",
        text: "Steamboat Willie (1928) est resté 95 ans sous droits avant que Mickey n’entre dans le domaine public américain le 1er janvier 2024.",
      },
      {
        label: "Plus grand revirement",
        text: "« Happy Birthday to You » a rapporté des droits pendant des décennies — jusqu’à ce qu’un jugement de 2016 conclue que la revendication n’avait jamais tenu.",
      },
      {
        label: "Passation la plus lente",
        text: "Sherlock Holmes est en grande partie dans le domaine public aux États-Unis, mais dix nouvelles des années 1920 ont gardé des traits du personnage sous droits jusqu’en 2023.",
      },
      {
        label: "Brevet le plus étrange",
        text: "Brevet américain 5 443 036, accordé en 1995 : « une méthode pour faire faire de l’exercice à un chat » — avec un pointeur laser.",
      },
      {
        label: "Date de décès inconnue",
        text: "Les œuvres anonymes et pseudonymes suivent une autre horloge — souvent 70 à 95 ans après publication, plutôt qu’après un décès que personne n’a consigné.",
      },
      {
        label: "Aucune formalité",
        text: "Depuis la Convention de Berne de 1886, le droit d’auteur s’applique dès que l’œuvre est fixée — sans enregistrement ni symbole, dans la plupart des pays.",
      },
      {
        label: "Durée la plus longue",
        text: "Le Mexique accorde 100 ans après la mort de l’auteur, l’une des durées les plus longues au monde. Le minimum de la Convention de Berne n’est que de 50 ans.",
      },
      {
        label: "Première marque",
        text: "Le triangle rouge de la brasserie Bass a été déposé au Royaume-Uni en 1876 — la toute première marque enregistrée sous la première loi sur les marques au monde.",
      },
      {
        label: "Revendication la plus longue",
        text: "J.K. Rowling a esquissé le premier Harry Potter en 1990. Il a fallu sept ans et douze refus avant que Bloomsbury ne le publie.",
      },
    ],
  },

  about: {
    eyebrow: "Notre mission",
    mission: [
      "Screendibs rend la découverte et l’évaluation de la propriété intellectuelle adaptable",
      "plus efficaces, logiques et concrètes",
      "pour l’industrie du divertissement.",
    ],
    missionTitle: "Simplifier la recherche de droits d’adaptation.",
    missionParas: [
      "Screendibs Technologies Inc. innove dans les industries du livre et du divertissement. Nous simplifions la recherche et l’acquisition des droits d’adaptation de livres, bandes dessinées, jeux vidéo et autres propriétés intellectuelles de valeur.",
      "Notre recherche couvre une base de plus de 100 millions de sources. Les utilisateurs trouvent les œuvres qu’ils cherchent, vérifient le statut de leurs droits d’adaptation et, si besoin, obtiennent les coordonnées de l’ayant droit.",
    ],
    customersTitle: "Nos clients.",
    customers:
      "Parmi nos clients : des sociétés de production cinéma et télévision, des producteurs indépendants, des studios de streaming, des scénaristes, des producteurs de théâtre, des dramaturges, des studios et éditeurs de jeux vidéo, des entrepreneurs et bien d’autres.",
    platformTitle: "Producteur indépendant à la recherche de PI de valeur ?",
    platformParas: [
      "Notre plateforme aide les utilisateurs à découvrir rapidement livres, articles, bandes dessinées, jeux vidéo et plus encore à adapter — avant leurs concurrents.",
      "Aux entreprises, nous proposons un outil de recherche qui permet à leurs équipes de développement de suivre et d’évaluer la PI prête à être adaptée.",
    ],
    ctaHeading: "Trouvez votre prochaine adaptation.",
    ctaNote: "Vous préférez en parler ?",
  },

  team: {
    eyebrow: "Screendibs",
    title: "L’équipe Sd*",
    stats: [
      { value: "2021", label: "Premier accord d’adaptation avec un studio" },
      { value: "3", label: "Disciplines : cinéma, logiciel, droit" },
      { value: "2", label: "Bases : Montréal et Paris" },
    ],
    members: {
      john: {
        role: "Cofondateur et PDG",
        bio: [
          "John Feifer est un professionnel du cinéma qui acquiert depuis des années de la propriété intellectuelle pour le cinéma et la télévision. Lorsqu’il a trouvé le livre de ses rêves sur une étagère de sa bibliothèque municipale, il lui a encore fallu près d’un an pour obtenir les droits d’adaptation.",
          "Chez Screendibs, John construit une plateforme qui rend les grandes histoires plus faciles à trouver et à acquérir — pour aider producteurs et cinéastes à obtenir de la PI de valeur plus vite, à moindre coût et avec moins de friction.",
        ],
        quoteNote: "Acte II, scène VII",
      },
      jonathan: {
        role: "Cofondateur, Affaires juridiques et corporatives",
        bio: [
          "Jonathan Nuss est avocat en droit des affaires et droit commercial, avec plus de dix ans d’expérience à conseiller entreprises et organisations en matière de transactions, de financement, de gouvernance et de réglementation. Avant de fonder son propre cabinet, il a exercé chez Dentons et Heenan Blaikie.",
          "Chez Screendibs, Jonathan met son expérience juridique et stratégique au service du développement de la plateforme et de ses relations commerciales — pour bâtir un marché plus transparent et accessible entre créateurs et producteurs.",
        ],
        quoteNote: "1958",
      },
      benjamin: {
        role: "Directeur des opérations",
        bio: [
          "Benjamin Coriat est ingénieur en IA et chercheur quantitatif, avec une expérience des marchés financiers chez BNP Paribas. Ses travaux ont été présentés à IJCAI et à l’ACM ICAIF.",
          "Chez Screendibs, Benjamin dirige la conception et l’ingénierie de la plateforme — la recherche sémantique, les outils de vérification des droits et les rapports de due diligence — pour que trouver la bonne histoire devienne un jeu d’enfant.",
        ],
        quoteNote: "1954",
      },
    },
    ctaHeading: "Call dibs on it.",
  },

  contact: {
    eyebrow: "Screendibs",
    title: "Contactez-nous.",
    lede: "Que vous soyez producteur à la recherche de nouvelles œuvres, agent qui propose un catalogue de droits ou auteur avec une histoire à raconter, nous serons ravis d’échanger avec vous. Notre équipe vous répond sous 1 à 2 jours ouvrables.",
    name: "Nom",
    email: "E-mail",
    org: "Organisation",
    message: "Parlez-nous de votre catalogue ou de vos besoins en développement.",
    send: "Envoyer",
    beta: "Notre plateforme est actuellement en bêta privée. Envoyez-nous un message pour demander un accès anticipé.",
    details: { general: "Général", press: "Presse", careers: "Carrières" },
    studio: "Studio",
    studioPlace: "Montréal, Canada",
    visits: "Visites sur rendez-vous.",
  },

  newsletter: {
    eyebrow: "Infolettre Sd*",
    title: "Infolettre",
    lede: "Quatre sujets par semaine sur les livres, les droits et les adaptations à l’écran. Un nouveau numéro chaque vendredi.",
    weekOf: "Semaine du",
    latest: "Dernier numéro",
    archiveTitle: "Tous les numéros",
    empty: "Le premier numéro arrive bientôt.",
    englishOnly: "L’infolettre est pour l’instant publiée en anglais uniquement.",
  },

  legal: {
    tabsLabel: "Documents juridiques",
    tabs: {
      terms: "Conditions du site",
      "platform-terms": "Conditions de la plateforme",
      privacy: "Confidentialité",
      cookies: "Cookies",
      disclaimer: "Avertissement",
    },
    englishOnly: "Ces documents sont pour l’instant disponibles en anglais uniquement.",
  },
};

export default fr;
