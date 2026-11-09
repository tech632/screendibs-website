/*
 * English copy for the whole site. `fr.ts` must have exactly the same shape (TypeScript checks it).
 *
 * Copy marked VERBATIM is the company's own wording — don't copyedit it. Its French version
 * in fr.ts is a translation and needs a French-speaking reviewer.
 */

const en = {
  meta: {
    siteDescription:
      "Screendibs Technologies Inc. — Discover literary intellectual property and evaluate properties for film, television, streaming, and gaming adaptation.",
    aboutTitle: "About",
    aboutDescription:
      "Screendibs exists to make the discovery and evaluation of adaptable intellectual property more efficient, logical and actionable for entertainment industry professionals.",
    teamTitle: "Team",
    teamDescription: "The people behind Screendibs.",
    contactTitle: "Contact",
    contactDescription: "Talk to Screendibs.",
  },

  nav: {
    primary: "Primary",
    home: "Screendibs — home",
    company: "Company",
    about: "About",
    team: "Team",
    contact: "Contact",
    /** The switch shows the other language, written in that language. */
    switchTo: "Français",
    switchLabel: "Voir ce site en français",
  },

  footer: {
    label: "Footer",
    terms: "Terms",
    privacy: "Privacy",
    disclaimer: "Disclaimer",
    platform: "Platform",
    place: "Montreal, Canada.",
  },

  contactBlock: {
    emailPlaceholder: "you@company.com",
    emailLabel: "Email address",
    requestAccess: "Request access",
    goToContact: "Go to the contact page →",
  },

  search: {
    chrome: "Search",
    thinking: "Checking the shelf…",
    found: "Found it",
  },

  facts: {
    chrome: "IP facts",
    total: "total",
  },

  scrollDown: "Scroll down",
  hero: "Curated IP rights for Adaptations.",

  home: {
    what: {
      index: "01 — What",
      heading: "We source and surface curated IP rights for Adaptations.",
      /* VERBATIM */
      lede:
        "Screendibs Technologies Inc. is breaking ground in the literary and entertainment industries. Our mission is to streamline the process of finding and securing adaptation rights for books, comics, video games and other valuable IP. Leveraging a database of over 100 million sources, our advanced search function allows users to locate what they desire. Users can inquire about the adaptation rights status and, if needed, obtain the contact information of the rights holder.",
    },
    pillars: [
      {
        tone: "sage",
        title: "AI Search",
        body: "Search beyond simple keywords. Conceptually match your project's logline, styling, or treatment with a vast database of existing works.",
      },
      {
        tone: "coral",
        title: "Clear Rights",
        body: "Instantly check whether matching properties are in the public domain, or locate verified rights holders, agents, and publishers.",
      },
      {
        tone: "peri",
        title: "Generate Reports",
        body: "Generate thorough, AI-compiled due-diligence reports covering adaptation-rights history, chain-of-title, and market analytics.",
      },
    ],
    how: { index: "02 — How", heading: "Our Process." },
    steps: [
      {
        title: "Search",
        body: "Describe your concept or treatment in natural language and our AI engine will identify and match it with curated literary properties.",
      },
      {
        title: "Inform",
        body: "Verify IP adaptation rights status, including public domain and locate contact information for rights holders and representatives.",
      },
      {
        title: "Report",
        body: "Export in-depth investor-ready IP reports detailing the property, the adaptation rights, chain-of-title, and comparable market analytics.",
      },
    ],
    who: {
      index: "03 — Who",
      /* VERBATIM, split around the accent. */
      statementStart: "Screendibs is positioned at the",
      statementAccent: "intersection of technology, literature and Entertainment.",
      team: "Team",
      para1:
        "In 2021, our founder secured a book-to-screen IP adaptation rights deal with a major Hollywood studio. He then decided to reinvent the process, by making this information more accessible with next generation technology. Screendibs is a 21st century company with a team of film, software and legal professionals who seek to solve the persistent disconnect between valuable literary properties and those who are searching for them. We provide the solutions that make quality literary IP discoverable and optioning straightforward.",
      para2:
        "Working from Montreal and France, our multidisciplinary team brings together decades of experience in film development, rights, semantic search technology, and interface design to help customers find and adapt the stories of tomorrow — today.",
      meetTeam: "Meet the team",
      factsHeading: "A few things about IP, while you're here.",
      clientsLabel: "Our customers include",
    },
    /* VERBATIM. The sentence "Our customers include …", one chip per segment —
       read in order, the chips reproduce it word for word. */
    clients: [
      "film and television production companies",
      "independent TV and film producers",
      "streaming Studios",
      "screenwriter",
      "feeder producers",
      "playwrights",
      "gaming Studios",
      "gaming companies",
      "entrepreneurs",
      "and more",
    ],
    why: { index: "04 — Why" },
    /* VERBATIM bodies. The enterprise title is ours — the source has none. */
    pitches: [
      {
        tone: "coral",
        title: "Independent film and TV producers looking for valuable IP?",
        body: "Our platform helps independent producers quickly discover books, articles, comics, video games and more for adaptation — before competitors do.",
      },
      {
        tone: "peri",
        title: "Enterprise development teams",
        body: "We offer enterprise customers a useful research tool for development teams to track and evaluate adaptation— ready IP.",
      },
    ],
    contact: {
      index: "05 — Contact",
      heading: "Request access to the discovery platform.",
      note: "For catalog integrations or custom API requests, use our full contact form.",
    },
    whatSearches: [
      {
        query: "14th-century foundational work of italian literature",
        answer: "Dante Alighieri's La Divina Commedia, c. 1320 — the vernacular's founding epic, long since public domain.",
      },
      {
        query: "oldest surviving printed book",
        answer: "The Diamond Sutra, printed in China in 868 CE — over five centuries before Gutenberg's press.",
      },
      {
        query: "who currently holds the rights to shakespeare's plays",
        answer: "No one. Every Shakespeare play has been public domain for centuries — stage it, print it, remix it.",
      },
      {
        query: "who wrote the first novel",
        answer: "Murasaki Shikibu's The Tale of Genji, c. 1010 — written in Japan, centuries before the word 'novel' existed anywhere else.",
      },
      {
        query: "oldest surviving epic poem in english",
        answer: "Beowulf — composed some time between the 8th and 11th centuries. Author unknown, rights long moot.",
      },
      {
        query: "first major book printed in europe",
        answer: "The Gutenberg Bible, c. 1455 — the first substantial book printed with movable type in the West.",
      },
    ],
    howSearches: [
      {
        query: "when does a book's copyright expire",
        answer: "Most jurisdictions: life of the author plus 70 years. Some run longer — Mexico is 100, Jamaica 95 — so the same title can be public domain in one country and still under rights in another.",
      },
      {
        query: "can two people claim the same public-domain work",
        answer: "Yes — the underlying work is free for anyone, but a specific translation, edition, or adaptation of it can still carry its own separate rights.",
      },
      {
        query: "what makes a work eligible for copyright at all",
        answer: "Originality and fixation — it has to be your own expression, and it has to be set down somewhere, not just an idea in your head.",
      },
      {
        query: "does a translation need its own separate rights",
        answer: "Yes — a translation is its own creative work. Translating a public-domain novel doesn't touch the original, but the translation itself can be claimed.",
      },
      {
        query: "what happens to unpublished manuscripts after death",
        answer: "They're still protected — most jurisdictions run the same life-plus-70 clock whether or not the work was ever published.",
      },
      {
        query: "can you copyright a title or a one-line premise",
        answer: "No — titles, names, and short phrases are generally too short to qualify. It's the expression that's protected, not the idea.",
      },
    ],
    ipFacts: [
      {
        label: "Oldest dispute",
        text: "Legend has it a 6th-century Irish king ruled on a copied psalter with ‘to every cow her calf, to every book its copy’ — the monk had to hand the copy over.",
      },
      {
        label: "First statute",
        text: "Britain's Statute of Anne, 1710, was the first law to grant rights to authors rather than to printers.",
      },
      {
        label: "Most expensive manuscript",
        text: "Bill Gates paid $30.8M for Leonardo da Vinci's Codex Leicester in 1994.",
      },
      {
        label: "Longest wait",
        text: "1928's Steamboat Willie spent 95 years under copyright before Mickey Mouse entered the US public domain on 1 January 2024.",
      },
      {
        label: "Biggest reversal",
        text: "‘Happy Birthday to You’ collected licensing fees for decades — until a 2016 ruling found the copyright claim had never actually held up.",
      },
      {
        label: "Slowest handover",
        text: "Sherlock Holmes is mostly public domain in the US, but ten 1920s stories kept parts of his character under copyright until 2023.",
      },
      {
        label: "Strangest patent",
        text: "US Patent 5,443,036, granted 1995: ‘a method of exercising a cat’ — using a laser pointer.",
      },
      {
        label: "No known death date",
        text: "Anonymous and pseudonymous works run on a different clock — often 70 to 95 years from publication instead of from a death no one recorded.",
      },
      {
        label: "No paperwork needed",
        text: "Since the 1886 Berne Convention, copyright applies the moment a work is fixed — no registration, no symbol, in most of the world.",
      },
      {
        label: "Longest term",
        text: "Mexico grants 100 years after the author's death, among the longest anywhere. The Berne Convention's own floor is just life plus 50.",
      },
      {
        label: "First trademark",
        text: "Bass Brewery's red triangle logo was registered in the UK in 1876 — the first mark ever entered under the world's first trademark law.",
      },
      {
        label: "Longest-running claim",
        text: "J.K. Rowling drafted the first Harry Potter outline in 1990. It took seven years and twelve rejections before Bloomsbury claimed it.",
      },
    ],
  },

  /* All body copy on the About page is verbatim from the company — don't copyedit. */
  about: {
    eyebrow: "About us",
    headingStart:
      "Company mission: Screendibs exists to make the discovery and evaluation of adaptable intellectual property",
    headingAccent: "more efficient, logical and actionable",
    headingEnd: "for entertainment industry professionals.",
    mission: {
      heading: "Streamlining the search for adaptation rights.",
      paras: [
        "Screendibs Technologies Inc. is breaking ground in the literary and entertainment industries.",
        "Our mission is to streamline the process of finding and securing adaptation rights for books, comics, video games and other valuable IP. Leveraging a database of over 100 million sources, our advanced search function allows users to locate what they desire. Users can inquire about the adaptation rights status and, if needed, obtain the contact information of the rights holder.",
      ],
    },
    customers: {
      heading: "Who we serve.",
      paras: [
        "Our customers include film and television production companies, independent TV and film producers, streaming Studios, screenwriter, feeder producers, playwrights, gaming Studios, gaming companies, entrepreneurs and more.",
      ],
    },
    platform: {
      heading: "Independent film and TV producers looking for valuable IP?",
      paras: [
        "Our platform helps independent producers quickly discover books, articles, comics, video games and more for adaptation — before competitors do.",
        "We offer enterprise customers a useful research tool for development teams to track and evaluate adaptation— ready IP.",
      ],
    },
    contactHeading: "Find your next story first.",
    contactNote: "Prefer a conversation?",
  },

  team: {
    eyebrow: "Screendibs",
    heading: "Team",
    stats: [
      { value: "2021", label: "First studio adaptation deal" },
      { value: "3", label: "Disciplines: film, software, law" },
      { value: "2", label: "Bases: Montreal and France" },
    ],
    /* `bio` is third person and short — one entry per paragraph, two at most.
       `quote` is a line from the person's favourite book, set the way a magazine sets a pull
       quote. The founder is deliberately not named (decision of 9 Nov 2026, matching the app). */
    members: [
      {
        name: "Our founder",
        role: "Co-Founder & CEO",
        tone: "coral",
        bio: [
          "Our founder is a film professional with years of experience acquiring intellectual property for film and television. Finding the book of a lifetime on a local library shelf was the easy part: securing the adaptation rights still took almost a year.",
          "At Screendibs, our founder is building a platform that makes great stories easier to find and easier to acquire — helping producers and filmmakers pursue valuable IP faster, more affordably and with less friction.",
        ],
        quote: {
          lines: [
            "All the world’s a stage,",
            "And all the men and women merely players;",
            "They have their exits and their entrances,",
            "And one man in his time plays many parts,",
            "His acts being seven ages.",
          ],
          author: "William Shakespeare",
          work: "As You Like It",
          note: "Act II, Scene VII",
          noteWork: "",
        },
      },
      {
        name: "Jonathan Nuss",
        role: "Co-Founder, Legal and Corporate Affairs",
        tone: "sage",
        bio: [
          "Jonathan Nuss is a corporate and commercial lawyer with over a decade of experience advising businesses and organizations on transactions, financing, governance and regulatory matters. Before establishing his own practice, he practised at Dentons and Heenan Blaikie.",
          "At Screendibs, Jonathan draws on his legal and strategic experience to support the platform’s development and commercial relationships — helping create a more transparent and accessible marketplace connecting creators and producers.",
        ],
        quote: {
          lines: ["If we want things to stay as they are, things will have to change."],
          author: "Giuseppe Tomasi di Lampedusa",
          work: "The Leopard",
          /* With noteWork set, rendered as "(<i>noteWork</i>, note)". */
          note: "1958",
          noteWork: "Il Gattopardo",
        },
      },
      {
        name: "Benjamin Coriat",
        role: "COO",
        tone: "peri",
        bio: [
          "Benjamin Coriat is an AI engineer and quantitative researcher with experience in financial markets at BNP Paribas. His research has been presented at IJCAI and ACM ICAIF.",
          "At Screendibs, Benjamin leads the design and engineering of the platform — the semantic search, rights-clearing tools and due-diligence reports — so that finding the right story feels effortless.",
        ],
        quote: {
          lines: ["Not all those who wander are lost."],
          author: "J.R.R. Tolkien",
          work: "The Fellowship of the Ring",
          note: "(1954)",
          noteWork: "",
        },
      },
    ],
    join: "Want to join them?",
  },

  contact: {
    eyebrow: "Screendibs",
    heading: "Get in touch.",
    lede:
      "Whether you are a producer scouting new material, an agent marketing a rights catalog, or a writer with a story to tell, we'd love to hear from you. Expect a response from our team within 1–2 business days.",
    name: "Name",
    email: "Email",
    organisation: "Organisation",
    message: "Tell us about your catalog or development needs.",
    send: "Send it",
    beta: "Our platform is currently in private beta. Send us a message to request early access.",
    details: { general: "General", press: "Press", careers: "Careers" },
    studio: "Studio",
    studioPlace: "Montreal, Canada",
    visits: "Visits by appointment.",
  },

  legal: {
    navLabel: "Legal documents",
    tabs: {
      terms: "Website terms",
      "platform-terms": "Platform terms",
      privacy: "Privacy",
      cookies: "Cookies",
      disclaimer: "Disclaimer",
    },
    /** Shown above a document that has no version in this language yet. */
    untranslated: "",
  },
};

export type Dict = typeof en;
export default en;
