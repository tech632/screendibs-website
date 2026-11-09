import type { Dict } from "./en";

/*
 * French copy. Same shape as en.ts.
 *
 * DRAFT TRANSLATION, machine-assisted (9 Nov 2026). Needs a French-speaking reviewer before
 * launch, especially the passages marked VERBATIM in en.ts (the company's own wording).
 * Glossary shared with the app: Taste Profile = « profil de goûts », Scout Report = « rapport
 * Scout », rights holder = « titulaire des droits », public domain = « domaine public ».
 */

const fr: Dict = {
  meta: {
    siteDescription:
      "Screendibs Technologies Inc. — Découvrez des propriétés intellectuelles littéraires et évaluez-les en vue d’une adaptation au cinéma, à la télévision, en diffusion en continu et en jeu vidéo.",
    aboutTitle: "À propos",
    aboutDescription:
      "Screendibs existe pour rendre la découverte et l’évaluation de propriétés intellectuelles adaptables plus efficaces, plus logiques et plus concrètes pour les professionnels de l’industrie du divertissement.",
    teamTitle: "Équipe",
    teamDescription: "Les personnes derrière Screendibs.",
    contactTitle: "Contact",
    contactDescription: "Parlez à Screendibs.",
  },

  nav: {
    primary: "Principale",
    home: "Screendibs — accueil",
    company: "Entreprise",
    about: "À propos",
    team: "Équipe",
    contact: "Contact",
    switchTo: "English",
    switchLabel: "View this site in English",
  },

  footer: {
    label: "Pied de page",
    terms: "Conditions",
    privacy: "Confidentialité",
    disclaimer: "Avis de non-responsabilité",
    platform: "Plateforme",
    place: "Montréal, Canada.",
  },

  contactBlock: {
    emailPlaceholder: "vous@entreprise.com",
    emailLabel: "Adresse courriel",
    requestAccess: "Demander l’accès",
    goToContact: "Aller à la page de contact →",
  },

  search: {
    chrome: "Recherche",
    thinking: "On fouille les rayons…",
    found: "Trouvé",
  },

  facts: {
    chrome: "Faits sur la PI",
    total: "au total",
  },

  scrollDown: "Faites défiler vers le bas",
  hero: "Des droits de PI choisis pour l’adaptation.",

  home: {
    what: {
      index: "01 — Quoi",
      heading: "Nous repérons et proposons des droits de PI choisis pour l’adaptation.",
      lede:
        "Screendibs Technologies Inc. innove dans les industries du livre et du divertissement. Notre mission : simplifier la recherche et l’acquisition des droits d’adaptation de livres, de bandes dessinées, de jeux vidéo et d’autres propriétés intellectuelles de valeur. Grâce à une base de données de plus de 100 millions de sources, notre moteur de recherche avancé permet de trouver exactement ce que l’on cherche. On peut ensuite s’informer sur l’état des droits d’adaptation et, au besoin, obtenir les coordonnées du titulaire des droits.",
    },
    pillars: [
      {
        tone: "sage",
        title: "Recherche par IA",
        body: "Allez au-delà des simples mots-clés. Comparez la logline, le style ou le traitement de votre projet à une vaste base d’œuvres existantes.",
      },
      {
        tone: "coral",
        title: "Droits clairs",
        body: "Vérifiez instantanément si une œuvre est dans le domaine public, ou trouvez les titulaires de droits, agents et éditeurs vérifiés.",
      },
      {
        tone: "peri",
        title: "Rapports",
        body: "Générez des rapports de vérification diligente complets, compilés par IA : historique des droits d’adaptation, chaîne de titres et analyse de marché.",
      },
    ],
    how: { index: "02 — Comment", heading: "Notre démarche." },
    steps: [
      {
        title: "Chercher",
        body: "Décrivez votre concept ou votre traitement en langage courant : notre moteur d’IA le rapproche de propriétés littéraires choisies.",
      },
      {
        title: "S’informer",
        body: "Vérifiez l’état des droits d’adaptation, y compris le domaine public, et trouvez les coordonnées des titulaires de droits et de leurs représentants.",
      },
      {
        title: "Rapporter",
        body: "Exportez des rapports de PI détaillés, prêts pour les investisseurs : l’œuvre, les droits d’adaptation, la chaîne de titres et les comparables du marché.",
      },
    ],
    who: {
      index: "03 — Qui",
      statementStart: "Screendibs se situe à la",
      statementAccent: "croisée de la technologie, de la littérature et du divertissement.",
      team: "Équipe",
      para1:
        "En 2021, notre fondateur a conclu une entente de droits d’adaptation d’un livre à l’écran avec un grand studio hollywoodien. Il a alors décidé de réinventer le processus en rendant cette information plus accessible grâce à une technologie de nouvelle génération. Screendibs est une entreprise du XXIe siècle, avec une équipe de professionnels du cinéma, du logiciel et du droit qui veulent combler le fossé persistant entre les propriétés littéraires de valeur et ceux qui les cherchent. Nous offrons les solutions qui rendent la PI littéraire de qualité facile à découvrir et l’option sur les droits, simple à obtenir.",
      para2:
        "Depuis Montréal et la France, notre équipe multidisciplinaire réunit des décennies d’expérience en développement de films, en droits, en technologie de recherche sémantique et en conception d’interfaces pour aider ses clients à trouver et à adapter, dès aujourd’hui, les histoires de demain.",
      meetTeam: "Rencontrer l’équipe",
      factsHeading: "Quelques faits sur la PI, pendant que vous êtes ici.",
      clientsLabel: "Nos clients comprennent",
    },
    clients: [
      "des sociétés de production de cinéma et de télévision",
      "des producteurs indépendants de cinéma et de télévision",
      "des studios de diffusion en continu",
      "des scénaristes",
      "des producteurs en amont",
      "des dramaturges",
      "des studios de jeux vidéo",
      "des entreprises de jeux vidéo",
      "des entrepreneurs",
      "et plus encore",
    ],
    why: { index: "04 — Pourquoi" },
    pitches: [
      {
        tone: "coral",
        title: "Producteurs indépendants de cinéma et de télé à la recherche de PI de valeur ?",
        body: "Notre plateforme aide les producteurs indépendants à découvrir rapidement des livres, des articles, des bandes dessinées, des jeux vidéo et plus encore à adapter — avant leurs concurrents.",
      },
      {
        tone: "peri",
        title: "Équipes de développement en entreprise",
        body: "Nous offrons aux entreprises un outil de recherche utile pour que leurs équipes de développement suivent et évaluent la PI prête à être adaptée.",
      },
    ],
    contact: {
      index: "05 — Contact",
      heading: "Demandez l’accès à la plateforme de découverte.",
      note: "Pour une intégration de catalogue ou une demande d’API sur mesure, utilisez notre formulaire de contact complet.",
    },
    whatSearches: [
      {
        query: "œuvre fondatrice de la littérature italienne du XIVe siècle",
        answer: "La Divina Commedia de Dante Alighieri, vers 1320 — l’épopée fondatrice de la langue vulgaire, depuis longtemps dans le domaine public.",
      },
      {
        query: "plus ancien livre imprimé conservé",
        answer: "Le Sûtra du Diamant, imprimé en Chine en 868 — plus de cinq siècles avant la presse de Gutenberg.",
      },
      {
        query: "qui détient les droits des pièces de shakespeare",
        answer: "Personne. Toutes les pièces de Shakespeare sont dans le domaine public depuis des siècles — montez-les, imprimez-les, réinventez-les.",
      },
      {
        query: "qui a écrit le premier roman",
        answer: "Le Dit du Genji de Murasaki Shikibu, vers 1010 — écrit au Japon, des siècles avant que le mot « roman » n’existe ailleurs.",
      },
      {
        query: "plus ancien poème épique conservé en anglais",
        answer: "Beowulf — composé entre le VIIIe et le XIe siècle. Auteur inconnu, question des droits réglée depuis longtemps.",
      },
      {
        query: "premier grand livre imprimé en europe",
        answer: "La Bible de Gutenberg, vers 1455 — le premier livre d’importance imprimé en caractères mobiles en Occident.",
      },
    ],
    howSearches: [
      {
        query: "quand le droit d’auteur d’un livre expire-t-il",
        answer: "Dans la plupart des pays : 70 ans après la mort de l’auteur. Certains vont plus loin — 100 ans au Mexique, 95 en Jamaïque —, si bien qu’un même titre peut être libre dans un pays et encore protégé dans un autre.",
      },
      {
        query: "deux personnes peuvent-elles revendiquer la même œuvre du domaine public",
        answer: "Oui — l’œuvre elle-même est libre pour tous, mais une traduction, une édition ou une adaptation précise peut avoir ses propres droits.",
      },
      {
        query: "qu’est-ce qui rend une œuvre protégeable",
        answer: "L’originalité et la fixation — il faut que ce soit votre propre expression, et qu’elle soit fixée quelque part, pas seulement une idée en tête.",
      },
      {
        query: "une traduction a-t-elle ses propres droits",
        answer: "Oui — une traduction est une œuvre à part entière. Traduire un roman du domaine public ne change rien à l’original, mais la traduction elle-même peut être protégée.",
      },
      {
        query: "que deviennent les manuscrits inédits après la mort de l’auteur",
        answer: "Ils restent protégés — la plupart des pays appliquent la même durée de 70 ans après la mort, que l’œuvre ait été publiée ou non.",
      },
      {
        query: "peut-on protéger un titre ou une prémisse d’une ligne",
        answer: "Non — les titres, les noms et les courtes expressions sont en général trop brefs. C’est l’expression qui est protégée, pas l’idée.",
      },
    ],
    ipFacts: [
      {
        label: "Plus ancien litige",
        text: "Selon la légende, un roi irlandais du VIe siècle trancha l’affaire d’un psautier copié par « à chaque vache son veau, à chaque livre sa copie » — le moine dut rendre la copie.",
      },
      {
        label: "Première loi",
        text: "Le Statut d’Anne, adopté en Grande-Bretagne en 1710, fut la première loi à accorder des droits aux auteurs plutôt qu’aux imprimeurs.",
      },
      {
        label: "Manuscrit le plus cher",
        text: "Bill Gates a payé 30,8 M$ US pour le Codex Leicester de Léonard de Vinci en 1994.",
      },
      {
        label: "Plus longue attente",
        text: "Steamboat Willie (1928) est resté 95 ans sous droit d’auteur avant que Mickey Mouse n’entre dans le domaine public américain le 1er janvier 2024.",
      },
      {
        label: "Plus grand revirement",
        text: "« Happy Birthday to You » a rapporté des redevances pendant des décennies — jusqu’à ce qu’un jugement de 2016 conclue que la revendication de droit d’auteur n’avait jamais tenu.",
      },
      {
        label: "Passation la plus lente",
        text: "Sherlock Holmes est presque entièrement dans le domaine public aux États-Unis, mais dix nouvelles des années 1920 ont gardé une partie du personnage sous droit d’auteur jusqu’en 2023.",
      },
      {
        label: "Brevet le plus étrange",
        text: "Brevet américain 5 443 036, accordé en 1995 : « une méthode pour faire faire de l’exercice à un chat » — avec un pointeur laser.",
      },
      {
        label: "Date de décès inconnue",
        text: "Les œuvres anonymes et pseudonymes suivent une autre horloge — souvent 70 à 95 ans après la publication, plutôt qu’après un décès que personne n’a consigné.",
      },
      {
        label: "Aucune formalité",
        text: "Depuis la Convention de Berne de 1886, dans la plupart des pays, le droit d’auteur s’applique dès qu’une œuvre est fixée — sans enregistrement ni symbole.",
      },
      {
        label: "Durée la plus longue",
        text: "Le Mexique protège les œuvres 100 ans après la mort de l’auteur, l’une des durées les plus longues au monde. Le minimum de la Convention de Berne n’est que de 50 ans.",
      },
      {
        label: "Première marque",
        text: "Le triangle rouge de la brasserie Bass a été enregistré au Royaume-Uni en 1876 — la première marque inscrite en vertu de la première loi sur les marques au monde.",
      },
      {
        label: "Plus longue quête",
        text: "J.K. Rowling a esquissé le premier Harry Potter en 1990. Il a fallu sept ans et douze refus avant que Bloomsbury ne l’accepte.",
      },
    ],
  },

  about: {
    eyebrow: "À propos",
    headingStart:
      "Notre mission : Screendibs existe pour rendre la découverte et l’évaluation de propriétés intellectuelles adaptables",
    headingAccent: "plus efficaces, plus logiques et plus concrètes",
    headingEnd: "pour les professionnels de l’industrie du divertissement.",
    mission: {
      heading: "Simplifier la recherche de droits d’adaptation.",
      paras: [
        "Screendibs Technologies Inc. innove dans les industries du livre et du divertissement.",
        "Notre mission : simplifier la recherche et l’acquisition des droits d’adaptation de livres, de bandes dessinées, de jeux vidéo et d’autres propriétés intellectuelles de valeur. Grâce à une base de données de plus de 100 millions de sources, notre moteur de recherche avancé permet de trouver exactement ce que l’on cherche. On peut ensuite s’informer sur l’état des droits d’adaptation et, au besoin, obtenir les coordonnées du titulaire des droits.",
      ],
    },
    customers: {
      heading: "Nos clients.",
      paras: [
        "Nos clients comprennent des sociétés de production de cinéma et de télévision, des producteurs indépendants de cinéma et de télévision, des studios de diffusion en continu, des scénaristes, des producteurs en amont, des dramaturges, des studios et des entreprises de jeux vidéo, des entrepreneurs et plus encore.",
      ],
    },
    platform: {
      heading: "Producteurs indépendants de cinéma et de télé à la recherche de PI de valeur ?",
      paras: [
        "Notre plateforme aide les producteurs indépendants à découvrir rapidement des livres, des articles, des bandes dessinées, des jeux vidéo et plus encore à adapter — avant leurs concurrents.",
        "Nous offrons aux entreprises un outil de recherche utile pour que leurs équipes de développement suivent et évaluent la PI prête à être adaptée.",
      ],
    },
    contactHeading: "Trouvez votre prochaine histoire en premier.",
    contactNote: "Vous préférez en discuter ?",
  },

  team: {
    eyebrow: "Screendibs",
    heading: "Équipe",
    stats: [
      { value: "2021", label: "Première entente d’adaptation avec un studio" },
      { value: "3", label: "Disciplines : cinéma, logiciel, droit" },
      { value: "2", label: "Bureaux : Montréal et France" },
    ],
    members: [
      {
        name: "Notre fondateur",
        role: "Cofondateur et chef de la direction",
        tone: "coral",
        bio: [
          "Notre fondateur est un professionnel du cinéma qui acquiert depuis des années des propriétés intellectuelles pour le cinéma et la télévision. Trouver le livre de sa vie sur le rayon d’une bibliothèque de quartier a été la partie facile : obtenir les droits d’adaptation a tout de même pris près d’un an.",
          "Chez Screendibs, notre fondateur bâtit une plateforme qui rend les grandes histoires plus faciles à trouver et à acquérir — pour aider producteurs et cinéastes à obtenir de la PI de valeur plus vite, à moindre coût et avec moins de friction.",
        ],
        quote: {
          lines: [
            "Le monde entier est un théâtre,",
            "Et hommes et femmes n’en sont que les acteurs ;",
            "Ils ont leurs sorties et leurs entrées,",
            "Et chacun, dans sa vie, joue bien des rôles,",
            "Son drame ayant sept âges.",
          ],
          author: "William Shakespeare",
          work: "Comme il vous plaira",
          note: "acte II, scène VII",
          noteWork: "",
        },
      },
      {
        name: "Jonathan Nuss",
        role: "Cofondateur, Affaires juridiques et corporatives",
        tone: "sage",
        bio: [
          "Jonathan Nuss est avocat en droit des affaires et en droit commercial. Depuis plus de dix ans, il conseille entreprises et organismes en matière de transactions, de financement, de gouvernance et de réglementation. Avant de fonder son propre cabinet, il a exercé chez Dentons et Heenan Blaikie.",
          "Chez Screendibs, Jonathan met son expérience juridique et stratégique au service du développement de la plateforme et de ses relations d’affaires — pour bâtir un marché plus transparent et plus accessible entre créateurs et producteurs.",
        ],
        quote: {
          lines: ["Si nous voulons que tout reste tel que c’est, il faut que tout change."],
          author: "Giuseppe Tomasi di Lampedusa",
          work: "Le Guépard",
          note: "1958",
          noteWork: "Il Gattopardo",
        },
      },
      {
        name: "Benjamin Coriat",
        role: "Chef de l’exploitation",
        tone: "peri",
        bio: [
          "Benjamin Coriat est ingénieur en IA et chercheur quantitatif, avec une expérience des marchés financiers chez BNP Paribas. Ses travaux ont été présentés à IJCAI et à ACM ICAIF.",
          "Chez Screendibs, Benjamin dirige la conception et le développement de la plateforme — la recherche sémantique, les outils de vérification des droits et les rapports de vérification diligente — pour que trouver la bonne histoire devienne un jeu d’enfant.",
        ],
        quote: {
          lines: ["Tous ceux qui errent ne sont pas perdus."],
          author: "J.R.R. Tolkien",
          work: "La Communauté de l’Anneau",
          note: "(1954)",
          noteWork: "",
        },
      },
    ],
    join: "Envie de vous joindre à eux ?",
  },

  contact: {
    eyebrow: "Screendibs",
    heading: "Écrivez-nous.",
    lede:
      "Que vous soyez producteur à la recherche de nouveau matériel, agent qui représente un catalogue de droits ou auteur avec une histoire à raconter, nous serons ravis de vous lire. Notre équipe vous répond en 1 à 2 jours ouvrables.",
    name: "Nom",
    email: "Courriel",
    organisation: "Organisation",
    message: "Parlez-nous de votre catalogue ou de vos besoins en développement.",
    send: "Envoyer",
    beta: "Notre plateforme est en bêta privée. Écrivez-nous pour demander un accès anticipé.",
    details: { general: "Général", press: "Presse", careers: "Carrières" },
    studio: "Studio",
    studioPlace: "Montréal, Canada",
    visits: "Visites sur rendez-vous.",
  },

  legal: {
    navLabel: "Documents juridiques",
    tabs: {
      terms: "Conditions du site",
      "platform-terms": "Conditions de la plateforme",
      privacy: "Confidentialité",
      cookies: "Témoins",
      disclaimer: "Avis de non-responsabilité",
    },
    untranslated:
      "La version française de ce document est en cours de préparation. En attendant, voici la version anglaise.",
  },
};

export default fr;
