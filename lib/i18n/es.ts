import type { Dictionary } from "./en";

/*
 * Spanish copy. Same shape as en.ts — TypeScript will flag any missing key.
 * DRAFT, machine-assisted translation (24 Nov 2026); have a native speaker
 * review before launch. Legal documents and the newsletter stay in English.
 * The language menu labels live in ./index.ts (LANGUAGES), not here.
 */

const es: Omit<Dictionary, "lang"> = {
  meta: {
    siteDescription: "Screendibs Technologies Inc. — Descubre propiedad intelectual literaria y evalúa obras para su adaptación al cine, la televisión, el streaming y los videojuegos.",
    aboutTitle: "Quiénes somos",
    aboutDescription: "Screendibs hace que descubrir y evaluar propiedad intelectual adaptable sea más eficiente, lógico y accionable para la industria del entretenimiento.",
    teamTitle: "Equipo",
    teamDescription: "Las personas detrás de Screendibs.",
    contactTitle: "Contacto",
    contactDescription: "Habla con Screendibs.",
    newsletterTitle: "Boletín",
    newsletterDescription: "El semanal de Screendibs: cuatro historias sobre libros, derechos y adaptaciones audiovisuales, cada viernes."
  },
  nav: {
    company: "Empresa",
    about: "Quiénes somos",
    team: "Equipo",
    newsletter: "Boletín",
    contact: "Contacto",
    home: "Screendibs — inicio",
    primary: "Principal"
  },
  footer: {
    label: "Pie de página",
    terms: "Condiciones",
    privacy: "Privacidad",
    disclaimer: "Aviso legal",
    platform: "Plataforma",
    place: "Montreal, Canadá.",
    social: "Screendibs en {network}"
  },
  contactBlock: {
    emailLabel: "Correo electrónico",
    button: "Solicitar acceso",
    linkOut: "Ir a la página de contacto →"
  },
  widgets: {
    search: "Buscar",
    thinking: "Revisando la estantería…",
    found: "Encontrado",
    facts: "Datos sobre PI",
    total: "total",
    scrollDown: "Desplázate hacia abajo",
    reel: {
      play: "Reproducir",
      pause: "Pausa",
      soundOn: "Activar sonido",
      soundOff: "Silenciar"
    }
  },
  hero: {
    title: "Derechos de PI seleccionados para adaptaciones."
  },
  home: {
    whatIndex: "01 — Qué",
    whatTitle: "Buscamos y sacamos a la luz derechos de PI seleccionados para adaptaciones.",
    whatLede: "Screendibs Technologies Inc. está abriendo camino en las industrias literaria y del entretenimiento. Nuestra misión es agilizar el proceso de encontrar y asegurar los derechos de adaptación de libros, cómics, videojuegos y otra PI valiosa. Gracias a una base de datos de más de 100 millones de fuentes, nuestra búsqueda avanzada permite a los usuarios localizar lo que desean. Los usuarios pueden consultar el estado de los derechos de adaptación y, si es necesario, obtener los datos de contacto del titular de los derechos.",
    pillars: [
      {
        tone: "sage",
        title: "Búsqueda con IA",
        body: "Busca más allá de las simples palabras clave. Relaciona conceptualmente la logline, el estilo o el tratamiento de tu proyecto con una amplia base de datos de obras existentes."
      },
      {
        tone: "coral",
        title: "Derechos claros",
        body: "Comprueba al instante si las obras coincidentes son de dominio público, o localiza titulares de derechos, agentes y editoriales verificados."
      },
      {
        tone: "peri",
        title: "Genera informes",
        body: "Genera informes exhaustivos de diligencia debida elaborados por IA, con el historial de derechos de adaptación, la cadena de titularidad y el análisis de mercado."
      }
    ],
    howIndex: "02 — Cómo",
    howTitle: "Nuestro proceso.",
    steps: [
      {
        title: "Buscar",
        body: "Describe tu concepto o tratamiento en lenguaje natural y nuestro motor de IA lo identificará y lo relacionará con propiedades literarias seleccionadas."
      },
      {
        title: "Informar",
        body: "Verifica el estado de los derechos de adaptación de la PI, incluido el dominio público, y localiza los datos de contacto de titulares de derechos y representantes."
      },
      {
        title: "Informe",
        body: "Exporta informes de PI detallados y listos para inversores sobre la obra, los derechos de adaptación, la cadena de titularidad y análisis de mercado comparables."
      }
    ],
    tourLabel: "Ver",
    tourTitle: "El recorrido completo.",
    tourBody: "Toda gran adaptación empieza con un libro. Búscalo, puntúalo y obtén el informe: una, tres o cinco páginas.",
    tourAlt: "Reel de Screendibs: una búsqueda de Frankenstein, su puntuación de adaptabilidad de 94 sobre 100 y los informes de una, tres y cinco páginas.",
    whoIndex: "03 — Quién",
    whoStatement: [
      "Screendibs se sitúa en la",
      "intersección entre la tecnología, la literatura y el entretenimiento."
    ],
    whoPara: "En 2021, nuestro fundador cerró un acuerdo de derechos de adaptación de un libro a la pantalla con un gran estudio de Hollywood. Entonces decidió reinventar el proceso, haciendo esta información más accesible con tecnología de nueva generación. Screendibs es una empresa del siglo XXI con un equipo de profesionales del cine, el software y el derecho que buscan resolver la persistente desconexión entre las propiedades literarias valiosas y quienes las buscan. Ofrecemos las soluciones que hacen que la PI literaria de calidad sea fácil de descubrir y de opcionar.",
    whoPara2: "Desde Montreal y París, nuestro equipo multidisciplinar reúne décadas de experiencia en desarrollo cinematográfico, derechos, tecnología de búsqueda semántica y diseño de interfaces para ayudar a los clientes a encontrar y adaptar las historias del mañana, hoy.",
    meetTeam: "Conoce al equipo",
    factsHeading: "Algunas cosas sobre la PI, ya que estás aquí.",
    clientsLabel: "Entre nuestros clientes hay",
    clients: [
      "productoras de cine y televisión",
      "productores independientes",
      "estudios de streaming",
      "guionistas",
      "productores teatrales",
      "dramaturgos",
      "estudios de videojuegos",
      "empresas de videojuegos",
      "emprendedores",
      "y más"
    ],
    whyIndex: "04 — Por qué",
    pitches: [
      {
        tone: "coral",
        title: "¿Productor independiente en busca de PI valiosa?",
        body: "Nuestra plataforma ayuda a los usuarios a descubrir rápidamente libros, artículos, cómics, videojuegos y más para adaptar, antes que su competencia."
      },
      {
        tone: "peri",
        title: "Equipos de desarrollo de empresas",
        body: "Ofrecemos a los clientes empresariales una herramienta de investigación útil para que sus equipos de desarrollo sigan y evalúen PI lista para adaptar."
      }
    ],
    requestAccess: "Solicitar acceso",
    contactIndex: "05 — Contacto",
    contactHeading: "Solicita acceso a la plataforma de descubrimiento.",
    contactNote: "Para integraciones de catálogo o solicitudes de API a medida, usa nuestro formulario de contacto completo.",
    whatSearches: [
      {
        query: "obra fundacional de la literatura italiana del siglo XIV",
        answer: "La Divina Comedia de Dante Alighieri, h. 1320: la epopeya fundacional de la lengua vulgar, de dominio público desde hace mucho."
      },
      {
        query: "libro impreso más antiguo que se conserva",
        answer: "El Sutra del Diamante, impreso en China en el 868 d. C., más de cinco siglos antes de la imprenta de Gutenberg."
      },
      {
        query: "quién tiene hoy los derechos de las obras de Shakespeare",
        answer: "Nadie. Todas las obras de Shakespeare son de dominio público desde hace siglos: represéntalas, imprímelas, reinvéntalas."
      },
      {
        query: "quién escribió la primera novela",
        answer: "La historia de Genji de Murasaki Shikibu, h. 1010: escrita en Japón, siglos antes de que la palabra «novela» existiera en ningún otro lugar."
      },
      {
        query: "poema épico más antiguo que se conserva en inglés",
        answer: "Beowulf, compuesto entre los siglos VIII y XI. Autor desconocido, derechos sin objeto desde hace mucho."
      },
      {
        query: "primer gran libro impreso en Europa",
        answer: "La Biblia de Gutenberg, h. 1455: el primer libro importante impreso con tipos móviles en Occidente."
      }
    ],
    howSearches: [
      {
        query: "cuándo vence el copyright de un libro",
        answer: "En la mayoría de las jurisdicciones: la vida del autor más 70 años. Algunas van más allá (México 100, Jamaica 95), así que un mismo título puede ser de dominio público en un país y seguir protegido en otro."
      },
      {
        query: "pueden dos personas reclamar la misma obra de dominio público",
        answer: "Sí: la obra original es libre para todos, pero una traducción, edición o adaptación concreta puede tener sus propios derechos."
      },
      {
        query: "qué hace que una obra pueda protegerse por copyright",
        answer: "La originalidad y la fijación: tiene que ser tu propia expresión y tiene que estar plasmada en algún sitio, no ser solo una idea en tu cabeza."
      },
      {
        query: "necesita una traducción sus propios derechos",
        answer: "Sí: una traducción es una obra creativa en sí misma. Traducir una novela de dominio público no afecta al original, pero la traducción puede reclamarse."
      },
      {
        query: "qué pasa con los manuscritos inéditos tras la muerte del autor",
        answer: "Siguen protegidos: la mayoría de las jurisdicciones aplican el mismo plazo de vida más 70 años, se haya publicado o no la obra."
      },
      {
        query: "se puede proteger un título o una premisa de una línea",
        answer: "No: los títulos, los nombres y las frases cortas suelen ser demasiado breves. Lo que se protege es la expresión, no la idea."
      }
    ],
    facts: [
      {
        label: "La disputa más antigua",
        text: "Cuenta la leyenda que un rey irlandés del siglo VI resolvió el caso de un salterio copiado con «a cada vaca su ternero, a cada libro su copia»: el monje tuvo que entregar la copia."
      },
      {
        label: "La primera ley",
        text: "El Estatuto de la Reina Ana, de 1710 en Gran Bretaña, fue la primera ley que concedió derechos a los autores y no a los impresores."
      },
      {
        label: "El manuscrito más caro",
        text: "Bill Gates pagó 30,8 millones de dólares por el Códice Leicester de Leonardo da Vinci en 1994."
      },
      {
        label: "La espera más larga",
        text: "Steamboat Willie, de 1928, pasó 95 años protegido por copyright antes de que Mickey Mouse entrara en el dominio público de EE. UU. el 1 de enero de 2024."
      },
      {
        label: "El mayor vuelco",
        text: "«Happy Birthday to You» cobró derechos de licencia durante décadas, hasta que un fallo de 2016 concluyó que la reclamación de copyright nunca había sido válida."
      },
      {
        label: "El traspaso más lento",
        text: "Sherlock Holmes es en gran parte de dominio público en EE. UU., pero diez relatos de los años veinte mantuvieron partes del personaje protegidas hasta 2023."
      },
      {
        label: "La patente más extraña",
        text: "Patente estadounidense 5.443.036, concedida en 1995: «un método para ejercitar a un gato», con un puntero láser."
      },
      {
        label: "Sin fecha de muerte conocida",
        text: "Las obras anónimas y seudónimas siguen otro reloj: a menudo de 70 a 95 años desde su publicación, en lugar de desde una muerte que nadie registró."
      },
      {
        label: "Sin papeleo",
        text: "Desde el Convenio de Berna de 1886, el copyright se aplica en cuanto la obra queda fijada: sin registro ni símbolo, en la mayor parte del mundo."
      },
      {
        label: "El plazo más largo",
        text: "México concede 100 años tras la muerte del autor, uno de los plazos más largos del mundo. El mínimo del Convenio de Berna es la vida más 50."
      },
      {
        label: "La primera marca",
        text: "El triángulo rojo de la cervecera Bass se registró en el Reino Unido en 1876: la primera marca inscrita bajo la primera ley de marcas del mundo."
      },
      {
        label: "La apuesta más larga",
        text: "J.K. Rowling escribió el primer esbozo de Harry Potter en 1990. Hicieron falta siete años y doce rechazos antes de que Bloomsbury lo publicara."
      }
    ]
  },
  about: {
    eyebrow: "Misión de la empresa",
    mission: [
      "Screendibs hace que descubrir y evaluar propiedad intelectual adaptable sea",
      "más eficiente, lógico y accionable",
      "para la industria del entretenimiento."
    ],
    missionTitle: "Agilizar la búsqueda de derechos de adaptación.",
    missionParas: [
      "Screendibs Technologies Inc. está abriendo camino en las industrias literaria y del entretenimiento. Facilitamos encontrar y asegurar los derechos de adaptación de libros, cómics, videojuegos y otra PI valiosa.",
      "Nuestra búsqueda abarca una base de datos de más de 100 millones de fuentes. Los usuarios encuentran las obras que buscan, comprueban el estado de sus derechos de adaptación y, cuando hace falta, obtienen los datos de contacto del titular de los derechos."
    ],
    customersTitle: "A quién servimos.",
    customers: "Entre nuestros clientes hay productoras de cine y televisión, productores independientes, estudios de streaming, guionistas, productores teatrales, dramaturgos, estudios y empresas de videojuegos, emprendedores y más.",
    platformTitle: "¿Productor independiente en busca de PI valiosa?",
    platformParas: [
      "Nuestra plataforma ayuda a los usuarios a descubrir rápidamente libros, artículos, cómics, videojuegos y más para adaptar, antes que su competencia.",
      "Para clientes empresariales, ofrecemos una herramienta de investigación con la que los equipos de desarrollo pueden seguir y evaluar PI lista para adaptar."
    ],
    ctaHeading: "Encuentra tu próxima adaptación.",
    ctaNote: "¿Prefieres hablarlo?"
  },
  team: {
    eyebrow: "Screendibs",
    title: "Equipo Sd*",
    stats: [
      {
        value: "2021",
        label: "Primer acuerdo de adaptación con un estudio"
      },
      {
        value: "3",
        label: "Disciplinas: cine, software, derecho"
      },
      {
        value: "2",
        label: "Sedes: Montreal y París"
      }
    ],
    members: {
      john: {
        role: "Cofundador y CEO",
        bio: [
          "John Feifer es un profesional del cine con años de experiencia en la adquisición de propiedad intelectual para cine y televisión. Cuando encontró el libro de sus sueños en la estantería de su biblioteca local, asegurar los derechos de adaptación le llevó aun así casi un año.",
          "En Screendibs, John está creando una plataforma que hace que las grandes historias sean más fáciles de encontrar y de adquirir, para que productores y cineastas persigan PI valiosa más rápido, a menor coste y con menos fricción."
        ],
        quoteNote: "Acto II, escena VII"
      },
      jonathan: {
        role: "Cofundador, Asuntos Jurídicos y Corporativos",
        bio: [
          "Jonathan Nuss es abogado mercantil y corporativo con más de una década de experiencia asesorando a empresas y organizaciones en transacciones, financiación, gobernanza y cuestiones regulatorias. Antes de fundar su propio despacho, ejerció en Dentons y Heenan Blaikie.",
          "En Screendibs, Jonathan aporta su experiencia jurídica y estratégica al desarrollo de la plataforma y a sus relaciones comerciales, para crear un mercado más transparente y accesible que conecte a creadores y productores."
        ],
        quoteNote: "1958"
      },
      benjamin: {
        role: "COO",
        bio: [
          "Benjamin Coriat es ingeniero de IA e investigador cuantitativo con experiencia en mercados financieros en BNP Paribas. Su investigación se ha presentado en IJCAI y ACM ICAIF.",
          "En Screendibs, Benjamin dirige el diseño y la ingeniería de la plataforma (la búsqueda semántica, las herramientas de verificación de derechos y los informes de diligencia debida) para que encontrar la historia adecuada no cueste ningún esfuerzo."
        ],
        quoteNote: "1954"
      }
    },
    ctaHeading: "Pide tu dibs."
  },
  contact: {
    eyebrow: "Screendibs",
    title: "Ponte en contacto.",
    lede: "Tanto si eres un productor en busca de nuevo material, un agente que comercializa un catálogo de derechos o un escritor con una historia que contar, nos encantará saber de ti. Nuestro equipo responde en 1–2 días hábiles.",
    name: "Nombre",
    email: "Correo electrónico",
    org: "Organización",
    message: "Cuéntanos sobre tu catálogo o tus necesidades de desarrollo.",
    send: "Enviar",
    beta: "Nuestra plataforma está en beta privada. Envíanos un mensaje para solicitar acceso anticipado.",
    details: {
      general: "General",
      press: "Prensa",
      careers: "Empleo"
    },
    studio: "Estudio",
    studioPlace: "Montreal, Canadá",
    visits: "Visitas con cita previa."
  },
  newsletter: {
    eyebrow: "Boletín Sd*",
    title: "Boletín",
    lede: "Análisis del sector e historias cada semana sobre libros, derechos y adaptaciones audiovisuales. Un número nuevo cada viernes.",
    weekOf: "Semana del",
    latest: "Más reciente",
    archiveTitle: "Todos los números",
    empty: "El primer número está en camino.",
    englishOnly: "Por ahora el boletín solo se publica en inglés."
  },
  legal: {
    tabsLabel: "Documentos legales",
    tabs: {
      terms: "Condiciones del sitio web",
      "platform-terms": "Condiciones de la plataforma",
      privacy: "Privacidad",
      cookies: "Cookies",
      disclaimer: "Aviso legal"
    },
    englishOnly: "Por ahora estos documentos solo están disponibles en inglés."
  }
};

export default es;
