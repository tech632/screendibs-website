import type { Dictionary } from "./en";

/*
 * German copy. Same shape as en.ts — TypeScript will flag any missing key.
 * DRAFT, machine-assisted translation (24 Nov 2026); have a native speaker
 * review before launch. Legal documents and the newsletter stay in English.
 * The language menu labels live in ./index.ts (LANGUAGES), not here.
 */

const de: Omit<Dictionary, "lang"> = {
  meta: {
    siteDescription: "Screendibs Technologies Inc. — Literarisches geistiges Eigentum entdecken und Stoffe für Film-, Fernseh-, Streaming- und Gaming-Adaptionen bewerten.",
    aboutTitle: "Über uns",
    aboutDescription: "Screendibs macht die Entdeckung und Bewertung adaptierbaren geistigen Eigentums für die Unterhaltungsbranche effizienter, logischer und umsetzbarer.",
    teamTitle: "Team",
    teamDescription: "Die Menschen hinter Screendibs.",
    contactTitle: "Kontakt",
    contactDescription: "Sprechen Sie mit Screendibs.",
    newsletterTitle: "Newsletter",
    newsletterDescription: "Der Screendibs-Wochenbrief: vier Geschichten über Bücher, Rechte und Verfilmungen, jeden Freitag."
  },
  nav: {
    company: "Unternehmen",
    about: "Über uns",
    team: "Team",
    newsletter: "Newsletter",
    contact: "Kontakt",
    home: "Screendibs — Startseite",
    primary: "Hauptnavigation"
  },
  footer: {
    label: "Fußzeile",
    terms: "Bedingungen",
    privacy: "Datenschutz",
    disclaimer: "Haftungsausschluss",
    platform: "Plattform",
    place: "Montreal, Kanada.",
    social: "Screendibs auf {network}"
  },
  contactBlock: {
    emailLabel: "E-Mail-Adresse",
    button: "Zugang anfragen",
    linkOut: "Zur Kontaktseite →"
  },
  widgets: {
    search: "Suchen",
    thinking: "Wir sehen im Regal nach …",
    found: "Gefunden",
    facts: "IP-Fakten",
    total: "gesamt",
    scrollDown: "Nach unten scrollen",
    reel: {
      play: "Abspielen",
      pause: "Pause",
      soundOn: "Ton an",
      soundOff: "Ton aus"
    }
  },
  hero: {
    title: "Kuratierte IP-Rechte für Adaptionen."
  },
  home: {
    whatIndex: "01 — Was",
    whatTitle: "Wir finden kuratierte IP-Rechte für Adaptionen und machen sie sichtbar.",
    whatLede: "Screendibs Technologies Inc. betritt Neuland in der Literatur- und Unterhaltungsbranche. Unsere Mission ist es, das Finden und Sichern von Adaptionsrechten für Bücher, Comics, Videospiele und anderes wertvolles IP zu vereinfachen. Mit einer Datenbank aus über 100 Millionen Quellen ermöglicht unsere fortschrittliche Suche den Nutzern, genau das zu finden, was sie suchen. Nutzer können den Status der Adaptionsrechte erfragen und bei Bedarf die Kontaktdaten des Rechteinhabers erhalten.",
    pillars: [
      {
        tone: "sage",
        title: "KI-Suche",
        body: "Suchen Sie jenseits einfacher Stichwörter. Gleichen Sie Logline, Stil oder Treatment Ihres Projekts inhaltlich mit einer riesigen Datenbank bestehender Werke ab."
      },
      {
        tone: "coral",
        title: "Klare Rechte",
        body: "Prüfen Sie sofort, ob passende Stoffe gemeinfrei sind, oder finden Sie verifizierte Rechteinhaber, Agenten und Verlage."
      },
      {
        tone: "peri",
        title: "Reports erstellen",
        body: "Erstellen Sie gründliche, KI-gestützte Due-Diligence-Reports zur Geschichte der Adaptionsrechte, zur Rechtekette und zur Marktanalyse."
      }
    ],
    howIndex: "02 — Wie",
    howTitle: "Unser Prozess.",
    steps: [
      {
        title: "Suchen",
        body: "Beschreiben Sie Ihr Konzept oder Treatment in natürlicher Sprache, und unsere KI findet passende kuratierte literarische Stoffe."
      },
      {
        title: "Informieren",
        body: "Prüfen Sie den Status der Adaptionsrechte, einschließlich Gemeinfreiheit, und finden Sie Kontaktdaten von Rechteinhabern und Vertretern."
      },
      {
        title: "Report",
        body: "Exportieren Sie ausführliche, investorentaugliche IP-Reports zum Stoff, zu den Adaptionsrechten, zur Rechtekette und zu vergleichbaren Marktdaten."
      }
    ],
    tourLabel: "Ansehen",
    tourTitle: "Die komplette Tour.",
    tourBody: "Jede große Adaption beginnt mit einem Buch. Suchen, bewerten, Report holen: eine, drei oder fünf Seiten.",
    tourAlt: "Screendibs-Reel: eine Suche nach Frankenstein, sein Adaptions-Score von 94 von 100 und die Reports mit einer, drei und fünf Seiten.",
    whoIndex: "03 — Wer",
    whoStatement: [
      "Screendibs steht an der",
      "Schnittstelle von Technologie, Literatur und Unterhaltung."
    ],
    whoPara: "2021 schloss unser Gründer einen Deal über die Verfilmungsrechte eines Buches mit einem großen Hollywood-Studio ab. Danach beschloss er, den Prozess neu zu erfinden und diese Informationen mit Technologie der nächsten Generation zugänglicher zu machen. Screendibs ist ein Unternehmen des 21. Jahrhunderts mit einem Team aus Film-, Software- und Rechtsprofis, die die anhaltende Kluft zwischen wertvollen literarischen Stoffen und denen, die sie suchen, schließen wollen. Wir liefern die Lösungen, die hochwertiges literarisches IP auffindbar und das Optionieren einfach machen.",
    whoPara2: "Von Montreal und Paris aus vereint unser interdisziplinäres Team jahrzehntelange Erfahrung in Filmentwicklung, Rechten, semantischer Suchtechnologie und Interface-Design, um Kunden zu helfen, die Geschichten von morgen schon heute zu finden und zu adaptieren.",
    meetTeam: "Das Team kennenlernen",
    factsHeading: "Ein paar Fakten über IP, wenn Sie schon hier sind.",
    clientsLabel: "Zu unseren Kunden zählen",
    clients: [
      "Film- und Fernsehproduktionsfirmen",
      "unabhängige Produzenten",
      "Streaming-Studios",
      "Drehbuchautoren",
      "Theaterproduzenten",
      "Dramatiker",
      "Gaming-Studios",
      "Gaming-Unternehmen",
      "Unternehmer",
      "und mehr"
    ],
    whyIndex: "04 — Warum",
    pitches: [
      {
        tone: "coral",
        title: "Unabhängige Produzenten auf der Suche nach wertvollem IP?",
        body: "Unsere Plattform hilft Nutzern, Bücher, Artikel, Comics, Videospiele und mehr schnell für eine Adaption zu entdecken – vor der Konkurrenz."
      },
      {
        tone: "peri",
        title: "Entwicklungsteams in Unternehmen",
        body: "Wir bieten Unternehmenskunden ein nützliches Recherchewerkzeug, mit dem Entwicklungsteams adaptionsreifes IP verfolgen und bewerten können."
      }
    ],
    requestAccess: "Zugang anfragen",
    contactIndex: "05 — Kontakt",
    contactHeading: "Fordern Sie Zugang zur Entdeckungsplattform an.",
    contactNote: "Für Katalogintegrationen oder individuelle API-Anfragen nutzen Sie unser vollständiges Kontaktformular.",
    whatSearches: [
      {
        query: "Grundlegendes Werk der italienischen Literatur aus dem 14. Jahrhundert",
        answer: "Dante Alighieris La Divina Commedia, um 1320 – das Gründungsepos der Volkssprache, seit Langem gemeinfrei."
      },
      {
        query: "ältestes erhaltenes gedrucktes Buch",
        answer: "Das Diamant-Sutra, 868 n. Chr. in China gedruckt – über fünf Jahrhunderte vor Gutenbergs Presse."
      },
      {
        query: "wer besitzt heute die Rechte an Shakespeares Stücken",
        answer: "Niemand. Jedes Shakespeare-Stück ist seit Jahrhunderten gemeinfrei – aufführen, drucken, neu interpretieren."
      },
      {
        query: "wer schrieb den ersten Roman",
        answer: "Murasaki Shikibus Die Geschichte vom Prinzen Genji, um 1010 – in Japan geschrieben, Jahrhunderte bevor es das Wort „Roman“ irgendwo sonst gab."
      },
      {
        query: "ältestes erhaltenes Epos auf Englisch",
        answer: "Beowulf – entstanden irgendwann zwischen dem 8. und 11. Jahrhundert. Autor unbekannt, Rechte längst gegenstandslos."
      },
      {
        query: "erstes bedeutendes in Europa gedrucktes Buch",
        answer: "Die Gutenberg-Bibel, um 1455 – das erste umfangreiche Buch, das im Westen mit beweglichen Lettern gedruckt wurde."
      }
    ],
    howSearches: [
      {
        query: "wann läuft das Urheberrecht an einem Buch ab",
        answer: "In den meisten Rechtsordnungen: Lebenszeit des Autors plus 70 Jahre. Manche gehen weiter – Mexiko 100, Jamaika 95 –, sodass derselbe Titel in einem Land gemeinfrei und in einem anderen noch geschützt sein kann."
      },
      {
        query: "können zwei Personen dasselbe gemeinfreie Werk beanspruchen",
        answer: "Ja – das zugrunde liegende Werk ist für alle frei, aber eine bestimmte Übersetzung, Ausgabe oder Adaption kann eigene Rechte tragen."
      },
      {
        query: "was macht ein Werk überhaupt urheberrechtlich schutzfähig",
        answer: "Originalität und Fixierung – es muss Ihr eigener Ausdruck sein und irgendwo festgehalten werden, nicht nur eine Idee in Ihrem Kopf."
      },
      {
        query: "braucht eine Übersetzung eigene Rechte",
        answer: "Ja – eine Übersetzung ist ein eigenes kreatives Werk. Die Übersetzung eines gemeinfreien Romans berührt das Original nicht, die Übersetzung selbst kann aber geschützt sein."
      },
      {
        query: "was passiert nach dem Tod mit unveröffentlichten Manuskripten",
        answer: "Sie bleiben geschützt – die meisten Rechtsordnungen wenden dieselbe Frist von Lebenszeit plus 70 Jahren an, ob das Werk je veröffentlicht wurde oder nicht."
      },
      {
        query: "kann man einen Titel oder eine Prämisse in einem Satz schützen",
        answer: "Nein – Titel, Namen und kurze Wendungen sind in der Regel zu kurz. Geschützt ist der Ausdruck, nicht die Idee."
      }
    ],
    facts: [
      {
        label: "Ältester Streit",
        text: "Der Legende nach entschied ein irischer König im 6. Jahrhundert über einen abgeschriebenen Psalter mit den Worten „Jeder Kuh ihr Kalb, jedem Buch seine Abschrift“ – der Mönch musste die Abschrift herausgeben."
      },
      {
        label: "Erstes Gesetz",
        text: "Großbritanniens Statute of Anne von 1710 war das erste Gesetz, das Rechte den Autoren statt den Druckern zusprach."
      },
      {
        label: "Teuerstes Manuskript",
        text: "Bill Gates zahlte 1994 30,8 Mio. US-Dollar für Leonardo da Vincis Codex Leicester."
      },
      {
        label: "Längste Wartezeit",
        text: "Steamboat Willie von 1928 war 95 Jahre urheberrechtlich geschützt, bevor Micky Maus am 1. Januar 2024 in den USA gemeinfrei wurde."
      },
      {
        label: "Größte Kehrtwende",
        text: "„Happy Birthday to You“ brachte jahrzehntelang Lizenzgebühren ein – bis ein Urteil von 2016 feststellte, dass der Urheberrechtsanspruch nie wirklich Bestand hatte."
      },
      {
        label: "Langsamste Übergabe",
        text: "Sherlock Holmes ist in den USA größtenteils gemeinfrei, doch zehn Geschichten aus den 1920er-Jahren hielten Teile der Figur bis 2023 unter Schutz."
      },
      {
        label: "Kurioseste Patent",
        text: "US-Patent 5.443.036, erteilt 1995: „Ein Verfahren, eine Katze zu trainieren“ – mit einem Laserpointer."
      },
      {
        label: "Kein bekanntes Todesdatum",
        text: "Anonyme und pseudonyme Werke laufen nach einer anderen Uhr – oft 70 bis 95 Jahre ab Veröffentlichung statt ab einem Tod, den niemand verzeichnet hat."
      },
      {
        label: "Kein Papierkram nötig",
        text: "Seit der Berner Übereinkunft von 1886 gilt das Urheberrecht in den meisten Ländern, sobald ein Werk fixiert ist – ohne Registrierung, ohne Symbol."
      },
      {
        label: "Längste Schutzfrist",
        text: "Mexiko gewährt 100 Jahre nach dem Tod des Autors, eine der längsten Fristen weltweit. Die Untergrenze der Berner Übereinkunft liegt bei Lebenszeit plus 50."
      },
      {
        label: "Erste Marke",
        text: "Das rote Dreieck der Bass-Brauerei wurde 1876 in Großbritannien eingetragen – die erste Marke nach dem weltweit ersten Markengesetz."
      },
      {
        label: "Längster Anlauf",
        text: "J.K. Rowling entwarf 1990 die erste Harry-Potter-Skizze. Es dauerte sieben Jahre und zwölf Absagen, bis Bloomsbury zugriff."
      }
    ]
  },
  about: {
    eyebrow: "Unternehmensmission",
    mission: [
      "Screendibs macht die Entdeckung und Bewertung adaptierbaren geistigen Eigentums",
      "effizienter, logischer und umsetzbarer",
      "für die Unterhaltungsbranche."
    ],
    missionTitle: "Die Suche nach Adaptionsrechten vereinfachen.",
    missionParas: [
      "Screendibs Technologies Inc. betritt Neuland in der Literatur- und Unterhaltungsbranche. Wir machen es einfacher, Adaptionsrechte für Bücher, Comics, Videospiele und anderes wertvolles IP zu finden und zu sichern.",
      "Unsere Suche umfasst eine Datenbank mit über 100 Millionen Quellen. Nutzer finden die gesuchten Werke, prüfen den Status ihrer Adaptionsrechte und erhalten bei Bedarf die Kontaktdaten des Rechteinhabers."
    ],
    customersTitle: "Für wen wir arbeiten.",
    customers: "Zu unseren Kunden zählen Film- und Fernsehproduktionsfirmen, unabhängige Produzenten, Streaming-Studios, Drehbuchautoren, Theaterproduzenten, Dramatiker, Gaming-Studios und -Unternehmen, Unternehmer und mehr.",
    platformTitle: "Unabhängige Produzenten auf der Suche nach wertvollem IP?",
    platformParas: [
      "Unsere Plattform hilft Nutzern, Bücher, Artikel, Comics, Videospiele und mehr schnell für eine Adaption zu entdecken – vor der Konkurrenz.",
      "Für Unternehmenskunden bieten wir ein Recherchewerkzeug, mit dem Entwicklungsteams adaptionsreifes IP verfolgen und bewerten können."
    ],
    ctaHeading: "Finden Sie Ihre nächste Adaption.",
    ctaNote: "Lieber ein Gespräch?"
  },
  team: {
    eyebrow: "Screendibs",
    title: "Sd*-Team",
    stats: [
      {
        value: "2021",
        label: "Erster Adaptionsdeal mit einem Studio"
      },
      {
        value: "3",
        label: "Disziplinen: Film, Software, Recht"
      },
      {
        value: "2",
        label: "Standorte: Montreal und Paris"
      }
    ],
    members: {
      john: {
        role: "Mitgründer & CEO",
        bio: [
          "John Feifer ist ein Filmprofi mit jahrelanger Erfahrung im Erwerb geistigen Eigentums für Film und Fernsehen. Als er das Buch seiner Träume im Regal seiner Stadtbibliothek fand, dauerte es trotzdem fast ein Jahr, die Adaptionsrechte zu sichern.",
          "Bei Screendibs baut John eine Plattform, die großartige Geschichten leichter auffindbar und leichter erwerbbar macht – damit Produzenten und Filmemacher wertvolles IP schneller, günstiger und mit weniger Reibung verfolgen können."
        ],
        quoteNote: "2. Akt, 7. Szene"
      },
      jonathan: {
        role: "Mitgründer, Recht und Unternehmensangelegenheiten",
        bio: [
          "Jonathan Nuss ist Gesellschafts- und Wirtschaftsanwalt mit über zehn Jahren Erfahrung in der Beratung von Unternehmen und Organisationen zu Transaktionen, Finanzierung, Governance und regulatorischen Fragen. Bevor er seine eigene Kanzlei gründete, war er bei Dentons und Heenan Blaikie tätig.",
          "Bei Screendibs bringt Jonathan seine juristische und strategische Erfahrung in die Entwicklung der Plattform und ihre Geschäftsbeziehungen ein – für einen transparenteren und zugänglicheren Marktplatz, der Kreative und Produzenten verbindet."
        ],
        quoteNote: "1958"
      },
      benjamin: {
        role: "COO",
        bio: [
          "Benjamin Coriat ist KI-Ingenieur und quantitativer Forscher mit Erfahrung an den Finanzmärkten bei BNP Paribas. Seine Forschung wurde auf der IJCAI und der ACM ICAIF vorgestellt.",
          "Bei Screendibs leitet Benjamin Design und Entwicklung der Plattform – die semantische Suche, die Werkzeuge zur Rechteklärung und die Due-Diligence-Reports –, damit sich das Finden der richtigen Geschichte mühelos anfühlt."
        ],
        quoteNote: "1954"
      }
    },
    ctaHeading: "Sichern Sie sich Ihre Geschichte."
  },
  contact: {
    eyebrow: "Screendibs",
    title: "Kontakt aufnehmen.",
    lede: "Ob Sie als Produzent neuen Stoff suchen, als Agent einen Rechtekatalog vermarkten oder als Autor eine Geschichte erzählen wollen – wir freuen uns von Ihnen zu hören. Unser Team antwortet innerhalb von 1–2 Werktagen.",
    name: "Name",
    email: "E-Mail",
    org: "Organisation",
    message: "Erzählen Sie uns von Ihrem Katalog oder Ihrem Entwicklungsbedarf.",
    send: "Absenden",
    beta: "Unsere Plattform befindet sich derzeit in einer privaten Beta. Schreiben Sie uns, um frühen Zugang anzufragen.",
    details: {
      general: "Allgemein",
      press: "Presse",
      careers: "Karriere"
    },
    studio: "Studio",
    studioPlace: "Montreal, Kanada",
    visits: "Besuche nach Vereinbarung."
  },
  newsletter: {
    eyebrow: "Sd*-Newsletter",
    title: "Newsletter",
    lede: "Brancheneinblicke und Geschichten jede Woche über Bücher, Rechte und Verfilmungen. Jeden Freitag eine neue Ausgabe.",
    weekOf: "Woche vom",
    latest: "Neueste",
    archiveTitle: "Alle Ausgaben",
    empty: "Die erste Ausgabe ist unterwegs.",
    englishOnly: "Der Newsletter erscheint vorerst nur auf Englisch."
  },
  legal: {
    tabsLabel: "Rechtliche Dokumente",
    tabs: {
      terms: "Website-Bedingungen",
      "platform-terms": "Plattform-Bedingungen",
      privacy: "Datenschutz",
      cookies: "Cookies",
      disclaimer: "Haftungsausschluss"
    },
    englishOnly: "Diese Dokumente sind vorerst nur auf Englisch verfügbar."
  }
};

export default de;
