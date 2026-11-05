const LANG_KEY = "gof_explorer_lang";
const listeners = new Set();

export const SUPPORTED_LANGS = [
  { code: "pt", label: "Português", short: "PT" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" }
];

export function getLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && SUPPORTED_LANGS.some(l => l.code === saved)) {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return "pt";
}

export function setLang(langCode) {
  if (!SUPPORTED_LANGS.some(l => l.code === langCode)) return;
  try {
    localStorage.setItem(LANG_KEY, langCode);
  } catch {
    // ignore storage errors
  }
  document.documentElement.setAttribute("lang", langCode === "pt" ? "pt-BR" : langCode);
  listeners.forEach(fn => fn(langCode));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const uiStrings = {
  pt: {
    brandTitle: "PATTERN EXPLORER",
    brandSubtitle: "APRENDA COMO PADRÕES DE PROJETO FUNCIONAM",
    nowLearning: "ESTUDANDO AGORA",
    overviewLabel: "VISÃO GERAL",
    stepsLabel: "ETAPAS",
    gofLayerLabel: "CAMADA GOF",
    scopeLabel: "ESCOPO",
    scopeClass: "CLASSE",
    scopeObject: "OBJETO",
    learningProgress: "PROGRESSO DE ESTUDO",
    completeLabel: "CONCLUÍDOS",
    searchPlaceholder: "Filtrar 23 padrões (ex: Factory, Observer, Undo)...",
    searchNoResults: "Nenhum padrão ou módulo encontrado para este filtro.",
    clearFilter: "Limpar filtro",
    menuLabel: "Menu",
    themeLight: "Modo Claro",
    themeDark: "Modo Escuro",
    toggleThemeAria: "Alternar entre tema claro e escuro",
    selectLangAria: "Selecionar idioma",
    profileLabel: "Perfil GitHub",
    designedBy: "Desenvolvido por",

    // Sidebar groups
    groupFoundations: "FUNDAMENTOS & ARQUITETURA",
    groupCreational: "1. PADRÕES CRIACIONAIS (5)",
    groupStructural: "2. PADRÕES ESTRUTURAIS (7)",
    groupBehavioral: "3. PADRÕES COMPORTAMENTAIS (11)",
    groupPractice: "PRÁTICA & AVALIAÇÃO",

    // Nav items
    navHome: "Explorador & Catálogo",
    navPrinciples: "Princípios O.O.",
    navRedesign: "8 Causas de Reformulação",
    navLexi: "Estudo de Caso Lexi",
    navMatrix: "Matriz GoF",
    navRelationships: "Grafo de Relações",
    navLabs: "Laboratórios Interativos",
    navQuizzes: "Quizzes de Certificação",
    navReferences: "Referências Bibliográficas",

    // Categories
    catCreational: "CRIACIONAL",
    catStructural: "ESTRUTURAL",
    catBehavioral: "COMPORTAMENTAL",

    // Home Hero (Protocol Explorer style)
    heroTag: "ARQUITETURA DE SOFTWARE INTERATIVA • GANG OF FOUR (1994)",
    heroHeadline: "Veja os Padrões de Projeto funcionarem, mensagem por mensagem.",
    heroDescription: "Lições interativas e animadas sobre todos os 23 Padrões de Projeto do GoF (Criacionais, Estruturais e Comportamentais), com cada invocação polimórfica, delegação em tempo de execução e quadro de memória decodificados byte a byte.",
    heroCtaPrimary: "Iniciar com Abstract Factory",
    heroCtaSecondary: "Explorar Laboratórios",
    heroStatPatterns: "23 Padrões GoF",
    heroStatSteps: "115 Etapas Animadas",
    heroStatLangs: "4 Linguagens de Código",
    heroFilterAll: "Todos (23)",
    heroFilterCreational: "Criacionais (5)",
    heroFilterStructural: "Estruturais (7)",
    heroFilterBehavioral: "Comportamentais (11)",
    openVisualizer: "Inspecionar Padrão",
    stepsCountSuffix: "etapas",
    gofPagePrefix: "Pág. GoF",

    // Visualizer & Inspector
    vizTitle: "SIMULADOR DE TOPOLOGIA & FLUXO DE MENSAGENS",
    vizSubtitle: "Avance etapa por etapa ou pressione Play para observar os objetos interagindo em tempo de execução.",
    btnPlay: "Executar",
    btnPause: "Pausar",
    btnPrevStep: "Etapa Anterior",
    btnNextStep: "Próxima Etapa",
    btnReset: "Reiniciar",
    speedLabel: "Velocidade",
    stepPrefix: "ETAPA",
    activeCallLabel: "CHAMADA EM TRÂNSITO",
    clickNodeHint: "Clique em qualquer etapa ou participante para inspecionar os atributos do objeto em tempo real.",
    inspectorCallStackTitle: "PILHA DE EXECUÇÃO & PARTICIPANTES",
    inspectorObjectTitle: "INSPETOR DE ESTADO DO OBJETO (LIVE INSTANCE STATE)",
    tabReceiver: "Destinatário",
    tabSender: "Emissor",
    tabSnapshot: "Snapshot do Escopo",
    copyJsonBtn: "Copiar Estado (JSON)",
    copiedJsonBtn: "Copiado!",
    stateExplanationTitle: "Mutação de Estado no Passo",

    // Pattern page sections
    markStudied: "Marcar como Concluído",
    markedStudied: "Concluído",
    prevLabel: "Anterior",
    nextLabel: "Próximo",
    intentTitle: "Intenção & Objetivo Arquitetural (GoF)",
    alsoKnownAs: "Também conhecido como",
    tabVisualizer: "1. Simulador & Inspetor de Memória",
    tabArchitecture: "2. Arquitetura, Problema & Solução",
    tabCode: "3. Código Multi-Linguagem",
    tabLabQuiz: "4. Laboratório Prático & Quiz",
    problemTitle: "Problema & Motivação no Mundo Real",
    solutionTitle: "Solução Arquitetural",
    structureTitle: "Estrutura & Participantes em Tempo de Execução",
    participantsSubtitle: "Participantes do Padrão:",
    collaborationsLabel: "Colaborações:",
    applicabilityTitle: "Aplicabilidade (Quando Usar e Quando Evitar)",
    consequencesTitle: "Consequências & Trade-offs",
    prosTitle: "Vantagens & Benefícios",
    consTitle: "Desvantagens & Custos",
    implementationTitle: "Notas de Implementação & Dicas do GoF",
    codeExamplesTitle: "Implementação em 4 Linguagens",
    copyCode: "Copiar Código",
    copiedCode: "Copiado!",
    realWorldTitle: "Usos Conhecidos & Frameworks Modernos",
    relatedPatternsTitle: "Padrões Relacionados & Comparação",
    livePlaygroundTitle: "Laboratório de Prática Interativo (Sandbox)",
    quizSectionTitle: "Verificação de Conhecimento (Quiz)",
    referencesTitle: "Referências Bibliográficas no Livro"
  },
  en: {
    brandTitle: "PATTERN EXPLORER",
    brandSubtitle: "LEARN HOW DESIGN PATTERNS WORK",
    nowLearning: "NOW LEARNING",
    overviewLabel: "OVERVIEW",
    stepsLabel: "STEPS",
    gofLayerLabel: "GOF LAYER",
    scopeLabel: "SCOPE",
    scopeClass: "CLASS",
    scopeObject: "OBJECT",
    learningProgress: "LEARNING PROGRESS",
    completeLabel: "COMPLETE",
    searchPlaceholder: "Filter 23 patterns (e.g. Factory, Observer, Undo)...",
    searchNoResults: "No pattern or module matched your filter.",
    clearFilter: "Clear filter",
    menuLabel: "Menu",
    themeLight: "Light Mode",
    themeDark: "Dark Mode",
    toggleThemeAria: "Toggle between light and dark theme",
    selectLangAria: "Select language",
    profileLabel: "GitHub Profile",
    designedBy: "Engineered by",

    // Sidebar groups
    groupFoundations: "FOUNDATIONS & ARCHITECTURE",
    groupCreational: "1. CREATIONAL PATTERNS (5)",
    groupStructural: "2. STRUCTURAL PATTERNS (7)",
    groupBehavioral: "3. BEHAVIORAL PATTERNS (11)",
    groupPractice: "PRACTICE & EVALUATION",

    // Nav items
    navHome: "Pattern Explorer & Catalog",
    navPrinciples: "O.O. Principles",
    navRedesign: "8 Causes of Redesign",
    navLexi: "Lexi Editor Case Study",
    navMatrix: "GoF Matrix",
    navRelationships: "Pattern Relationships Graph",
    navLabs: "Interactive Sandboxes",
    navQuizzes: "Certification Quizzes",
    navReferences: "Bibliography & References",

    // Categories
    catCreational: "CREATIONAL",
    catStructural: "STRUCTURAL",
    catBehavioral: "BEHAVIORAL",

    // Home Hero
    heroTag: "INTERACTIVE SOFTWARE ARCHITECTURE • GANG OF FOUR (1994)",
    heroHeadline: "Watch Design Patterns work, message by message.",
    heroDescription: "Interactive, animated lessons on all 23 Gang of Four (GoF) Design Patterns (Creational, Structural, and Behavioral), with every polymorphic dispatch, runtime delegation, and object memory frame decoded byte by byte.",
    heroCtaPrimary: "Start with Abstract Factory",
    heroCtaSecondary: "Open Interactive Labs",
    heroStatPatterns: "23 GoF Patterns",
    heroStatSteps: "115 Animated Steps",
    heroStatLangs: "4 Code Languages",
    heroFilterAll: "All (23)",
    heroFilterCreational: "Creational (5)",
    heroFilterStructural: "Structural (7)",
    heroFilterBehavioral: "Behavioral (11)",
    openVisualizer: "Inspect Pattern",
    stepsCountSuffix: "steps",
    gofPagePrefix: "GoF Page",

    // Visualizer & Inspector
    vizTitle: "TOPOLOGY & MESSAGE FLOW VISUALIZER",
    vizSubtitle: "Step through frame by frame or press Play to watch runtime objects collaborate across interfaces.",
    btnPlay: "Play",
    btnPause: "Pause",
    btnPrevStep: "Prev Step",
    btnNextStep: "Next Step",
    btnReset: "Reset",
    speedLabel: "Speed",
    stepPrefix: "STEP",
    activeCallLabel: "IN-FLIGHT DISPATCH",
    clickNodeHint: "Click any step or participant to inspect live object attributes in real time.",
    inspectorCallStackTitle: "RUNTIME CALL STACK & PARTICIPANTS",
    inspectorObjectTitle: "LIVE OBJECT INSTANCE STATE INSPECTOR",
    tabReceiver: "Receiver",
    tabSender: "Sender",
    tabSnapshot: "Scope Snapshot",
    copyJsonBtn: "Copy State (JSON)",
    copiedJsonBtn: "Copied!",
    stateExplanationTitle: "State Mutation in Step",

    // Pattern page sections
    markStudied: "Mark Complete",
    markedStudied: "Completed",
    prevLabel: "Previous",
    nextLabel: "Next",
    intentTitle: "Architectural Intent & Purpose (GoF)",
    alsoKnownAs: "Also known as",
    tabVisualizer: "1. Visualizer & Memory Inspector",
    tabArchitecture: "2. Architecture, Problem & Solution",
    tabCode: "3. Multi-Language Code",
    tabLabQuiz: "4. Interactive Lab & Quiz",
    problemTitle: "Real-World Problem & Motivation",
    solutionTitle: "Architectural Solution",
    structureTitle: "Structure & Runtime Participants",
    participantsSubtitle: "Pattern Participants:",
    collaborationsLabel: "Collaborations:",
    applicabilityTitle: "Applicability (When to Use & When to Avoid)",
    consequencesTitle: "Consequences & Trade-offs",
    prosTitle: "Strengths & Benefits",
    consTitle: "Liabilities & Costs",
    implementationTitle: "Implementation Notes & GoF Guidelines",
    codeExamplesTitle: "Implementation in 4 Languages",
    copyCode: "Copy Code",
    copiedCode: "Copied!",
    realWorldTitle: "Known Uses & Modern Frameworks",
    relatedPatternsTitle: "Related Patterns & Comparisons",
    livePlaygroundTitle: "Interactive Practice Sandbox",
    quizSectionTitle: "Knowledge Verification Quiz",
    referencesTitle: "Bibliographic References"
  },
  es: {
    brandTitle: "PATTERN EXPLORER",
    brandSubtitle: "APRENDE CÓMO FUNCIONAN LOS PATRONES DE DISEÑO",
    nowLearning: "APRENDIENDO AHORA",
    overviewLabel: "RESUMEN",
    stepsLabel: "PASOS",
    gofLayerLabel: "CAPA GOF",
    scopeLabel: "ALCANCE",
    scopeClass: "CLASE",
    scopeObject: "OBJETO",
    learningProgress: "PROGRESO DE APRENDIZAJE",
    completeLabel: "COMPLETADOS",
    searchPlaceholder: "Filtrar 23 patrones (ej: Factory, Observer, Undo)...",
    searchNoResults: "Ningún patrón o módulo coincide con el filtro.",
    clearFilter: "Limpiar filtro",
    menuLabel: "Menú",
    themeLight: "Modo Claro",
    themeDark: "Modo Oscuro",
    toggleThemeAria: "Alternar entre modo claro y oscuro",
    selectLangAria: "Seleccionar idioma",
    profileLabel: "Perfil GitHub",
    designedBy: "Desarrollado por",

    // Sidebar groups
    groupFoundations: "FUNDAMENTOS Y ARQUITECTURA",
    groupCreational: "1. PATRONES CREACIONALES (5)",
    groupStructural: "2. PATRONES ESTRUCTURALES (7)",
    groupBehavioral: "3. PATRONES DE COMPORTAMIENTO (11)",
    groupPractice: "PRÁCTICA Y EVALUACIÓN",

    // Nav items
    navHome: "Explorador y Catálogo",
    navPrinciples: "Principios O.O.",
    navRedesign: "8 Causas de Rediseño",
    navLexi: "Caso de Estudio Lexi",
    navMatrix: "Matriz GoF",
    navRelationships: "Grafo de Relaciones",
    navLabs: "Laboratorios Interactivos",
    navQuizzes: "Quizzes de Certificación",
    navReferences: "Referencias Bibliográficas",

    // Categories
    catCreational: "CREACIONAL",
    catStructural: "ESTRUCTURAL",
    catBehavioral: "COMPORTAMIENTO",

    // Home Hero
    heroTag: "ARQUITECTURA DE SOFTWARE INTERACTIVA • GANG OF FOUR (1994)",
    heroHeadline: "Observa cómo funcionan los Patrones de Diseño, mensaje por mensaje.",
    heroDescription: "Lecciones interactivas y animadas sobre los 23 Patrones de Diseño del GoF (Creacionales, Estructurales y de Comportamiento), con cada llamada polimórfica, delegación en tiempo de ejecución y trama de memoria decodificada byte por byte.",
    heroCtaPrimary: "Comenzar con Abstract Factory",
    heroCtaSecondary: "Abrir Laboratorios",
    heroStatPatterns: "23 Patrones GoF",
    heroStatSteps: "115 Pasos Animados",
    heroStatLangs: "4 Lenguajes de Código",
    heroFilterAll: "Todos (23)",
    heroFilterCreational: "Creacionales (5)",
    heroFilterStructural: "Estructurales (7)",
    heroFilterBehavioral: "Comportamiento (11)",
    openVisualizer: "Inspeccionar Patrón",
    stepsCountSuffix: "pasos",
    gofPagePrefix: "Pág. GoF",

    // Visualizer & Inspector
    vizTitle: "VISUALIZADOR DE TOPOLOGÍA Y FLUJO DE MENSAJES",
    vizSubtitle: "Avanza paso a paso o presiona Reproducir para ver cómo colaboran los objetos en tiempo de ejecución.",
    btnPlay: "Reproducir",
    btnPause: "Pausar",
    btnPrevStep: "Paso Anterior",
    btnNextStep: "Siguiente Paso",
    btnReset: "Reiniciar",
    speedLabel: "Velocidad",
    stepPrefix: "PASO",
    activeCallLabel: "LLAMADA EN TRÁNSITO",
    clickNodeHint: "Haz clic en cualquier paso o participante para inspeccionar los atributos del objeto en vivo.",
    inspectorCallStackTitle: "PILA DE EJECUCIÓN Y PARTICIPANTES",
    inspectorObjectTitle: "INSPECTOR DE ESTADO DEL OBJETO (LIVE INSTANCE STATE)",
    tabReceiver: "Receptor",
    tabSender: "Emisor",
    tabSnapshot: "Snapshot del Ámbito",
    copyJsonBtn: "Copiar Estado (JSON)",
    copiedJsonBtn: "¡Copiado!",
    stateExplanationTitle: "Mutación de Estado en el Paso",

    // Pattern page sections
    markStudied: "Marcar Completado",
    markedStudied: "Completado",
    prevLabel: "Anterior",
    nextLabel: "Siguiente",
    intentTitle: "Intención y Propósito Arquitectónico (GoF)",
    alsoKnownAs: "También conocido como",
    tabVisualizer: "1. Simulador e Inspector de Memoria",
    tabArchitecture: "2. Arquitectura, Problema y Solución",
    tabCode: "3. Código Multi-Lenguaje",
    tabLabQuiz: "4. Laboratorio y Quiz",
    problemTitle: "Problema y Motivación en el Mundo Real",
    solutionTitle: "Solución Arquitectónica",
    structureTitle: "Estructura y Participantes en Tiempo de Ejecución",
    participantsSubtitle: "Participantes del Patrón:",
    collaborationsLabel: "Colaboraciones:",
    applicabilityTitle: "Aplicabilidad (Cuándo Usar y Cuándo Evitar)",
    consequencesTitle: "Consecuencias y Compromisos (Trade-offs)",
    prosTitle: "Ventajas y Beneficios",
    consTitle: "Desventajas y Costos",
    implementationTitle: "Notas de Implementación y Guías del GoF",
    codeExamplesTitle: "Implementación en 4 Lenguajes",
    copyCode: "Copiar Código",
    copiedCode: "¡Copiado!",
    realWorldTitle: "Usos Conocidos y Frameworks Modernos",
    relatedPatternsTitle: "Patrones Relacionados y Comparaciones",
    livePlaygroundTitle: "Laboratorio de Práctica Interactivo",
    quizSectionTitle: "Quiz de Verificación de Conocimiento",
    referencesTitle: "Referencias Bibliográficas"
  }
};

export function t(key) {
  const lang = getLang();
  return (uiStrings[lang] && uiStrings[lang][key]) || uiStrings.pt[key] || key;
}

/**
 * Localized pattern summaries, intents, problems, solutions, and taglines for EN and ES
 * (PT is stored natively in patternsData, and this dictionary provides EN & ES overrides).
 */
export const patternI18n = {
  "abstract-factory": {
    en: {
      localName: "Abstract Factory",
      tagline: "WIDGET FAMILY KIT • OBJECT CREATIONAL",
      intent: "Provide an interface for creating families of related or dependent objects without specifying their concrete classes.",
      problem: "When building a cross-platform UI toolkit (Windows, macOS, Linux), instantiating concrete widgets directly ('new MacButton()', 'new WinCheckbox()') couples client code to specific platforms and risks mixing incompatible widget styles.",
      solution: "Declare an abstract 'GUIFactory' interface with creation methods for each product in the family ('createButton()', 'createCheckbox()'). Concrete factories ('MacFactory', 'WinFactory') implement these methods to produce cohesive widget sets.",
      pros: [
        "Isolates concrete product classes from client code.",
        "Makes exchanging entire product families effortless by swapping the factory instance.",
        "Enforces strict compatibility among products of the same family."
      ],
      cons: [
        "Adding a new product type requires updating the AbstractFactory interface and every concrete subclass.",
        "Increases initial class hierarchy count."
      ]
    },
    es: {
      localName: "Fábrica Abstracta",
      tagline: "KIT DE FAMILIAS DE OBJETOS • CREACIONAL DE OBJETO",
      intent: "Proporcionar una interfaz para crear familias de objetos relacionados o dependientes sin especificar sus clases concretas.",
      problem: "Al construir un toolkit gráfico multiplataforma (Windows, macOS, Linux), instanciar controles concretos directamente acopla el cliente a sistemas operativos específicos y arriesga mezclar estilos incompatibles.",
      solution: "Declarar una interfaz 'GUIFactory' con métodos de creación para cada producto ('createButton()', 'createCheckbox()'). Las fábricas concretas producen familias coherentes de controles.",
      pros: [
        "Aísla las clases concretas del código cliente.",
        "Permite intercambiar familias completas de productos cambiando solo la instancia de la fábrica.",
        "Garantiza la consistencia entre los productos de una misma familia."
      ],
      cons: [
        "Agregar un nuevo tipo de producto exige modificar la interfaz AbstractFactory y todas sus subclases.",
        "Incrementa el número inicial de interfaces y clases."
      ]
    }
  },
  "builder": {
    en: {
      localName: "Builder",
      tagline: "STEP-BY-STEP ASSEMBLY • OBJECT CREATIONAL",
      intent: "Separate the construction of a complex object from its representation so that the same construction process can create different representations.",
      problem: "Constructing complex aggregates (like an SQL query AST, HTTP request, or multi-part document) via a single telescopic constructor with 12 nullable parameters leads to brittle, unreadable client code.",
      solution: "Extract the step-by-step assembly into a 'Builder' interface ('buildHeader()', 'buildBody()', 'buildFooter()'). An optional 'Director' orchestrates the steps in a deterministic order while the concrete builder accumulates state and returns the final product.",
      pros: [
        "Lets you vary a product's internal representation independently of the construction steps.",
        "Isolates complex assembly code from business logic.",
        "Provides fine-grained control over each step of the construction pipeline."
      ],
      cons: [
        "Requires creating a separate ConcreteBuilder for each distinct representation.",
        "Builder state is mutable until the final build() step completes."
      ]
    },
    es: {
      localName: "Constructor (Builder)",
      tagline: "ENSAMBLAJE PASO A PASO • CREACIONAL DE OBJETO",
      intent: "Separar la construcción de un objeto complejo de su representación para que el mismo proceso de construcción pueda crear diferentes representaciones.",
      problem: "Construir objetos complejos mediante un constructor telescópico con decenas de parámetros opcionales produce código frágil y difícil de leer.",
      solution: "Extraer el ensamblaje paso a paso en una interfaz 'Builder' dirigida opcionalmente por un 'Director', devolviendo el producto final una vez validados todos los pasos.",
      pros: [
        "Permite variar la representación interna del producto manteniendo el mismo proceso.",
        "Aísla el código de ensamblaje complejo de la lógica de negocio.",
        "Ofrece control granular paso a paso sobre la construcción."
      ],
      cons: [
        "Requiere definir un ConcreteBuilder para cada representación distinta.",
        "Introduce pasos adicionales antes de obtener la instancia final."
      ]
    }
  },
  "factory-method": {
    en: {
      localName: "Factory Method",
      tagline: "VIRTUAL CONSTRUCTOR • CLASS CREATIONAL",
      intent: "Define an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.",
      problem: "A framework class knows when a new document or connection must be created and how to orchestrate its lifecycle, but cannot anticipate the concrete class needed by each application.",
      solution: "Replace direct 'new ConcreteProduct()' calls inside the creator workflow with a polymorphic factory method 'createProduct()'. Subclasses override this hook to return the appropriate concrete product.",
      pros: [
        "Eliminates binding application-specific classes into core framework code.",
        "Provides natural extension hooks for subclasses.",
        "Connects parallel class hierarchies cleanly."
      ],
      cons: [
        "May require subclassing the Creator just to instantiate a particular ConcreteProduct."
      ]
    },
    es: {
      localName: "Método Fábrica",
      tagline: "CONSTRUCTOR VIRTUAL • CREACIONAL DE CLASE",
      intent: "Definir una interfaz para crear un objeto, pero dejar que las subclases decidan qué clase instanciar.",
      problem: "Un framework sabe cuándo debe crearse un objeto y cómo gestionar su ciclo de vida, pero no conoce de antemano qué clase concreta necesita cada aplicación.",
      solution: "Sustituir las llamadas directas a 'new' dentro del creador por un método virtual 'createProduct()' que las subclases sobrescriben.",
      pros: [
        "Desacopla el núcleo del framework de las clases concretas de la aplicación.",
        "Ofrece puntos de extensión claros para subclases.",
        "Conecta jerarquías de clases paralelas."
      ],
      cons: [
        "Puede obligar a crear subclases del Creator solo para instanciar un producto específico."
      ]
    }
  },
  "prototype": {
    en: {
      localName: "Prototype",
      tagline: "OBJECT CLONING REGISTRY • OBJECT CREATIONAL",
      intent: "Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.",
      problem: "When object initialization involves expensive database queries, parsing, or dynamic runtime state, instantiating from scratch via 'new' is slow and forces coupling to concrete classes.",
      solution: "Equip prototypical objects with a 'clone()' method that copies their internal state (deep or shallow copy) and register pre-configured instances in a Prototype Registry.",
      pros: [
        "Allows adding and removing products at runtime by registering prototype instances.",
        "Avoids expensive re-initialization by cloning pre-built state.",
        "Reduces subclass proliferation compared to Factory Method."
      ],
      cons: [
        "Implementing deep clone() on object graphs with circular references is tricky."
      ]
    },
    es: {
      localName: "Prototipo",
      tagline: "CLONACIÓN DE INSTANCIAS • CREACIONAL DE OBJETO",
      intent: "Especificar los tipos de objetos a crear por medio de una instancia prototípica, y crear nuevos objetos copiando este prototipo.",
      problem: "Cuando inicializar un objeto desde cero es costoso o depende de configuraciones dinámicas en tiempo de ejecución, usar 'new' acopla el código y degrada el rendimiento.",
      solution: "Definir una operación 'clone()' en cada prototipo para duplicar su estado en memoria (copia profunda) desde un registro de prototipos.",
      pros: [
        "Permite registrar nuevos prototipos en tiempo de ejecución.",
        "Evita costos repetitivos de inicialización pesada.",
        "Reduce la necesidad de crear jerarquías paralelas de fábricas."
      ],
      cons: [
        "Implementar clonación profunda con referencias circulares requiere cuidado especial."
      ]
    }
  },
  "singleton": {
    en: {
      localName: "Singleton",
      tagline: "UNIQUE SHARED INSTANCE • OBJECT CREATIONAL",
      intent: "Ensure a class only has one instance, and provide a global point of access to it.",
      problem: "Shared system resources like a hardware spooler, connection pool, or central configuration registry must have strictly one authoritative instance across the process.",
      solution: "Make the class constructor private and expose a static 'getInstance()' accessor that lazily initializes and caches the sole instance with thread-safe synchronization.",
      pros: [
        "Controlled access to the sole instance.",
        "Avoids polluting the global namespace with unprotected variables.",
        "Permits lazy initialization on first use."
      ],
      cons: [
        "Introduces hidden global state that complicates unit testing and mocking.",
        "Requires synchronization care in multi-threaded runtimes."
      ]
    },
    es: {
      localName: "Instancia Única (Singleton)",
      tagline: "INSTANCIA GLOBAL CONTROLADA • CREACIONAL DE OBJETO",
      intent: "Garantizar que una clase solo tenga una instancia y proporcionar un punto de acceso global a ella.",
      problem: "Recursos compartidos como un pool de conexiones o un registro central de configuración deben tener exactamente una instancia autorizada en memoria.",
      solution: "Ocultar el constructor como privado y exponer un método estático 'getInstance()' que crea y almacena en caché la única instancia.",
      pros: [
        "Control estricto sobre el acceso a la instancia única.",
        "Inicialización perezosa (lazy) bajo demanda.",
        "Menor contaminación del espacio de nombres global."
      ],
      cons: [
        "Introduce estado global oculto que dificulta las pruebas unitarias aisladas.",
        "Exige sincronización cuidadosa en entornos multihilo."
      ]
    }
  },
  "adapter": {
    en: {
      localName: "Adapter",
      tagline: "INTERFACE TRANSLATOR • STRUCTURAL",
      intent: "Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn't otherwise because of incompatible interfaces.",
      problem: "Your application expects a modern 'PaymentProcessor' JSON interface, but must integrate a battle-tested legacy billing SDK that only accepts XML/SOAP frames.",
      solution: "Create an 'Adapter' class that implements the target interface expected by the client and wraps the legacy 'Adaptee', translating method calls and data payloads on the fly.",
      pros: [
        "Decouples client code from third-party or legacy API specifics.",
        "Allows reusing existing tested classes without modifying their source code (Open/Closed Principle)."
      ],
      cons: [
        "Adds an extra indirection layer and payload translation overhead."
      ]
    },
    es: {
      localName: "Adaptador (Wrapper)",
      tagline: "TRADUCTOR DE INTERFACES • ESTRUCTURAL",
      intent: "Convertir la interfaz de una clase en otra interfaz que los clientes esperan. Permite que clases con interfaces incompatibles trabajen juntas.",
      problem: "Tu sistema espera una interfaz moderna en JSON, pero necesita integrarse con un servicio legado que solo procesa estructuras XML.",
      solution: "Crear un 'Adapter' que implemente la interfaz objetivo del cliente y envuelva al 'Adaptee', traduciendo llamadas y formatos de datos de forma transparente.",
      pros: [
        "Desacopla al cliente de los detalles de librerías externas o legadas.",
        "Permite reutilizar clases existentes sin modificar su código fuente."
      ],
      cons: [
        "Añade una capa adicional de indirección y conversión de datos."
      ]
    }
  },
  "bridge": {
    en: {
      localName: "Bridge",
      tagline: "ORTHOGONAL DECOUPLING • OBJECT STRUCTURAL",
      intent: "Decouple an abstraction from its implementation so that the two can vary independently.",
      problem: "When a class hierarchy varies along two independent dimensions (e.g., UI Control types vs. OS Rendering APIs), inheritance causes a Cartesian explosion of subclasses (N x M classes).",
      solution: "Split the hierarchy into two orthogonal trees: 'Abstraction' (UI Controls) and 'Implementor' (Rendering Engines), connected by an object composition reference (the Bridge).",
      pros: [
        "Replaces N x M subclass explosion with N + M independent classes.",
        "Allows switching the underlying implementation at runtime.",
        "Hides platform implementation details from client code."
      ],
      cons: [
        "Increases initial design complexity by introducing two separate hierarchies."
      ]
    },
    es: {
      localName: "Puente (Bridge)",
      tagline: "DESACOPLAMIENTO ORTOGONAL • ESTRUCTURAL DE OBJETO",
      intent: "Desacoplar una abstracción de su implementación para que ambas puedan variar independientemente.",
      problem: "Cuando una jerarquía crece en dos dimensiones independientes (ej. Formas vs. Motores de Renderizado), la herencia provoca una explosión combinatoria de N x M subclases.",
      solution: "Dividir la jerarquía en dos árboles separados ('Abstraction' e 'Implementor') unidos mediante composición de objetos.",
      pros: [
        "Reduce N x M subclases a N + M clases independientes.",
        "Permite cambiar la implementación subyacente en tiempo de ejecución."
      ],
      cons: [
        "Incrementa la complejidad inicial del diseño con doble jerarquía."
      ]
    }
  },
  "composite": {
    en: {
      localName: "Composite",
      tagline: "PART-WHOLE TREE HIERARCHY • OBJECT STRUCTURAL",
      intent: "Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.",
      problem: "When modeling recursive structures like file systems (Files & Folders) or UI scene graphs (Glyphs & Rows), forcing clients to write 'if (node instanceof Folder)' branches breaks polymorphism.",
      solution: "Define a unified 'Component' interface shared by both primitive 'Leaf' objects and container 'Composite' objects. Composites delegate operations recursively to their children.",
      pros: [
        "Clients treat primitive leaves and complex subtrees uniformly without type checks.",
        "Makes adding new Leaf or Composite types straightforward."
      ],
      cons: [
        "Can make it harder to restrict a Composite to only hold specific child types via static types alone."
      ]
    },
    es: {
      localName: "Compuesto (Composite)",
      tagline: "JERARQUÍA PARTE-TODO • ESTRUCTURAL DE OBJETO",
      intent: "Componer objetos en estructuras de árbol para representar jerarquías parte-todo. Permite tratar objetos individuales y composiciones de manera uniforme.",
      problem: "Al modelar árboles como archivos y carpetas, obligar al cliente a distinguir entre hojas e contenedores rompe el polimorfismo.",
      solution: "Definir una interfaz 'Component' común para objetos 'Leaf' y contenedores 'Composite' que delegan recursivamente en sus hijos.",
      pros: [
        "Simplifica el cliente al tratar hojas y ramas con la misma interfaz.",
        "Facilita añadir nuevos tipos de componentes al árbol."
      ],
      cons: [
        "Dificulta restringir estáticamente qué tipos de hijos acepta un contenedor."
      ]
    }
  },
  "decorator": {
    en: {
      localName: "Decorator",
      tagline: "TRANSPARENT DYNAMIC WRAPPER • OBJECT STRUCTURAL",
      intent: "Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.",
      problem: "Adding optional features (compression, encryption, buffering, borders) via static inheritance creates an unmanageable explosion of combinations ('EncryptedBufferedCompressedStream').",
      solution: "Wrap the target 'Component' inside one or more 'Decorator' objects that implement the exact same interface, executing added behavior before or after delegating to the wrapped object.",
      pros: [
        "More flexible than static inheritance; responsibilities can be stacked or removed at runtime.",
        "Avoids bloated classes high up in the hierarchy (pay-as-you-go)."
      ],
      cons: [
        "Produces many small look-alike wrapper objects on the heap that can be harder to debug."
      ]
    },
    es: {
      localName: "Decorador (Decorator)",
      tagline: "ENVOLTORIO DINÁMICO TRANSPARENTE • ESTRUCTURAL DE OBJETO",
      intent: "Añadir responsabilidades adicionales a un objeto de forma dinámica, ofreciendo una alternativa flexible a la herencia.",
      problem: "Extender funcionalidades opcionales (cifrado, compresión, caché) mediante herencia genera una explosión combinatoria de subclases.",
      solution: "Envolver el componente original en objetos 'Decorator' que implementan la misma interfaz y añaden comportamiento antes o después de delegar.",
      pros: [
        "Permite apilar y combinar comportamientos dinámicamente en tiempo de ejecución.",
        "Evita clases monolíticas sobrecargadas de opciones."
      ],
      cons: [
        "Genera múltiples objetos envoltorio pequeños en la pila de llamadas."
      ]
    }
  },
  "facade": {
    en: {
      localName: "Facade",
      tagline: "UNIFIED SUBSYSTEM GATEWAY • OBJECT STRUCTURAL",
      intent: "Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.",
      problem: "Direct client interaction with dozens of low-level classes (Lexer, Parser, ASTGenerator, BytecodeEmitter, Linker) tightly couples clients to internal subsystem mechanics.",
      solution: "Introduce a high-level 'Facade' class (e.g. 'Compiler.compile(source)') that orchestrates the internal subsystem classes while still allowing advanced clients direct access if needed.",
      pros: [
        "Shields clients from complex subsystem components and reduces coupling.",
        "Promotes clean layering between architectural tiers."
      ],
      cons: [
        "If not kept focused, a Facade can grow into an all-knowing God Object."
      ]
    },
    es: {
      localName: "Fachada (Facade)",
      tagline: "PUERTA DE ENLACE UNIFICADA • ESTRUCTURAL DE OBJETO",
      intent: "Proporcionar una interfaz unificada y de alto nivel para un conjunto de interfaces de un subsistema complejo.",
      problem: "Cuando el cliente debe coordinar decenas de clases internas de un subsistema, el acoplamiento se dispara y el código se vuelve frágil.",
      solution: "Introducir una clase 'Facade' que exponga métodos simples de alto nivel y coordine internamente los objetos del subsistema.",
      pros: [
        "Desacopla a los clientes de la complejidad interna del subsistema.",
        "Facilita la división de la arquitectura en capas limpias."
      ],
      cons: [
        "Riesgo de convertirse en un objeto todopoderoso (God Object) si acumula lógica impropia."
      ]
    }
  },
  "flyweight": {
    en: {
      localName: "Flyweight",
      tagline: "INTRINSIC MEMORY POOLING • OBJECT STRUCTURAL",
      intent: "Use sharing to support large numbers of fine-grained objects efficiently.",
      problem: "Allocating 500,000 individual character objects in a document editor (each storing font metrics, glyph outlines, and style data) exhausts RAM rapidly.",
      solution: "Split object state into immutable 'Intrinsic State' (shared inside a Flyweight Pool, e.g., glyph 'a' font metrics) and context-dependent 'Extrinsic State' (x/y coordinates passed by the caller at render time).",
      pros: [
        "Dramatically reduces heap memory footprint when millions of similar instances exist."
      ],
      cons: [
        "Trades slight CPU overhead (passing extrinsic context) for massive RAM savings.",
        "Increases code complexity by separating intrinsic and extrinsic state."
      ]
    },
    es: {
      localName: "Peso Mosca (Flyweight)",
      tagline: "COMPARTICIÓN DE ESTADO INTRÍNSECO • ESTRUCTURAL DE OBJETO",
      intent: "Usar el uso compartido para soportar eficientemente grandes cantidades de objetos de grano fino en memoria.",
      problem: "Instanciar cientos de miles de objetos individuales (como caracteres de un documento o partículas) agota la memoria RAM rápidamente.",
      solution: "Separar el 'Estado Intrínseco' inmutable (compartido en un FlyweightFactory Pool) del 'Estado Extrínseco' (coordenadas pasadas como argumento al operar).",
      pros: [
        "Reducción drástica del consumo de memoria RAM en colecciones masivas."
      ],
      cons: [
        "Aumenta la complejidad al separar el estado intrínseco del extrínseco."
      ]
    }
  },
  "proxy": {
    en: {
      localName: "Proxy",
      tagline: "SURROGATE ACCESS CONTROLLER • OBJECT STRUCTURAL",
      intent: "Provide a surrogate or placeholder for another object to control access to it.",
      problem: "Some objects are expensive to instantiate upfront (Virtual Proxy), live on a remote server (Remote Proxy), or require strict permission checks and caching (Protection/Caching Proxy).",
      solution: "Place a 'Proxy' implementing the exact same 'Subject' interface in front of the 'RealSubject'. The Proxy intercepts calls, performs access control, lazy initialization, or caching, and forwards valid requests.",
      pros: [
        "Controls lifecycle, security, and lazy loading transparently without changing client code.",
        "Can serve cached responses even before the heavy RealSubject is allocated."
      ],
      cons: [
        "Introduces latency on the first lazy-initialization call."
      ]
    },
    es: {
      localName: "Procurador (Proxy)",
      tagline: "REPRESENTANTE Y CONTROL DE ACCESO • ESTRUCTURAL DE OBJETO",
      intent: "Proporcionar un sustituto o representante de otro objeto para controlar el acceso a él.",
      problem: "Ciertos objetos son costosos de cargar en memoria (Virtual Proxy), residen en red (Remote Proxy) o requieren validación de permisos y caché (Protection Proxy).",
      solution: "Colocar un 'Proxy' con la misma interfaz que el 'RealSubject' para interceptar llamadas, validar acceso o inicializar bajo demanda.",
      pros: [
        "Gestiona carga perezosa, seguridad y caché sin alterar el cliente.",
        "Optimiza recursos difiriendo la creación de objetos pesados."
      ],
      cons: [
        "Puede añadir latencia puntual al instanciar el objeto real por primera vez."
      ]
    }
  },
  "chain-of-responsibility": {
    en: {
      localName: "Chain of Responsibility",
      tagline: "DECOUPLED HANDLER PIPELINE • OBJECT BEHAVIORAL",
      intent: "Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.",
      problem: "Hardcoding conditional routing for HTTP middleware, expense approvals, or UI event bubbling ('if (auth) ... else if (rateLimit) ...') creates rigid monolithic dispatchers.",
      solution: "Link handler objects into a sequential chain where each 'Handler' decides either to process/halt the request or pass it along via 'next.handle(request)'.",
      pros: [
        "Decouples request senders from concrete handlers.",
        "Pipeline handlers can be reordered, added, or bypassed dynamically at runtime."
      ],
      cons: [
        "No compile-time guarantee that a request will be handled if the chain lacks a fallback."
      ]
    },
    es: {
      localName: "Cadena de Responsabilidad",
      tagline: "TUBERÍA DE MANEJADORES • COMPORTAMIENTO DE OBJETO",
      intent: "Evitar acoplar el emisor de una petición a su receptor dando a más de un objeto la posibilidad de responder a la petición a lo largo de una cadena.",
      problem: "Codificar múltiples bloques condicionales para filtros HTTP o niveles de aprobación produce despachadores monolíticos rígidos.",
      solution: "Encadenar objetos 'Handler' donde cada eslabón procesa la solicitud o la delega al siguiente mediante 'next.handle(request)'.",
      pros: [
        "Desacopla completamente al emisor de los manejadores concretos.",
        "Permite reordenar o insertar eslabones en la cadena dinámicamente."
      ],
      cons: [
        "Requiere un manejador por defecto al final para evitar peticiones sin procesar."
      ]
    }
  },
  "command": {
    en: {
      localName: "Command",
      tagline: "REIFIED ACTION & UNDO STACK • OBJECT BEHAVIORAL",
      intent: "Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.",
      problem: "When UI buttons or shortcuts directly invoke domain methods, you cannot easily implement Undo/Redo history, transaction queues, macro recording, or audit logs.",
      solution: "Reify every action into a 'Command' object encapsulating the receiver reference, arguments, 'execute()', and inverse 'undo()'. An 'Invoker' manages the command history stack.",
      pros: [
        "Decouples the UI invoker from the domain object performing the work.",
        "Makes multi-level Undo/Redo, macros, and deferred job queues straightforward."
      ],
      cons: [
        "Increases the number of small Command classes in large applications."
      ]
    },
    es: {
      localName: "Comando (Command)",
      tagline: "ACCIÓN ENCAPSULADA Y PILA UNDO • COMPORTAMIENTO DE OBJETO",
      intent: "Encapsular una petición como un objeto, permitiendo parametrizar clientes con distintas peticiones, encolarlas y soportar operaciones deshacer (Undo/Redo).",
      problem: "Si los botones de la interfaz llaman directamente a la lógica de negocio, resulta imposible implementar historial Deshacer/Rehacer, macros o colas de tareas.",
      solution: "Convertir cada solicitud en un objeto 'Command' con métodos 'execute()' y 'undo()', gestionados en una pila por el 'Invoker'.",
      pros: [
        "Desacopla quien invoca la acción de quien sabe ejecutarla.",
        "Soporta nativamente pilas Undo/Redo, comandos compuestos (Macros) y auditoría."
      ],
      cons: [
        "Incrementa la cantidad de clases pequeñas por cada operación."
      ]
    }
  },
  "interpreter": {
    en: {
      localName: "Interpreter",
      tagline: "GRAMMAR AST EVALUATOR • CLASS BEHAVIORAL",
      intent: "Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.",
      problem: "When an application repeatedly evaluates domain-specific expressions (search filters, boolean rules, regex, financial formulas), ad-hoc string parsing becomes error-prone.",
      solution: "Represent each grammar rule as a class in an Abstract Syntax Tree ('TerminalExpression' and 'NonterminalExpression'), each implementing 'interpret(context)'.",
      pros: [
        "Easy to change and extend the grammar by adding new Expression classes.",
        "Implementing each grammar rule is clean and modular."
      ],
      cons: [
        "Complex grammars with many rules become hard to maintain without a parser generator."
      ]
    },
    es: {
      localName: "Intérprete (Interpreter)",
      tagline: "EVALUADOR DE GRAMÁTICA AST • COMPORTAMIENTO DE CLASE",
      intent: "Dado un lenguaje, definir una representación de su gramática junto con un intérprete que use dicha representación para evaluar sentencias.",
      problem: "Evaluar expresiones de dominio (reglas booleanas, consultas de búsqueda, fórmulas) mediante cadenas sueltas genera código propenso a errores.",
      solution: "Modelar la gramática como un Árbol de Sintaxis Abstracta (AST) con nodos terminales y no terminales que implementan 'interpret(context)'.",
      pros: [
        "Facilita extender la gramática agregando nuevas clases de expresión."
      ],
      cons: [
        "Gramáticas muy extensas requieren generadores de parsers dedicados."
      ]
    }
  },
  "iterator": {
    en: {
      localName: "Iterator",
      tagline: "UNIFORM CURSOR TRAVERSAL • OBJECT BEHAVIORAL",
      intent: "Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.",
      problem: "Collections store elements in diverse internal structures (Arrays, Linked Lists, Red-Black Trees, Hash Tables). Exposing internal indices couples clients to the data structure.",
      solution: "Extract traversal state into an 'Iterator' object ('first()', 'next()', 'hasNext()', 'currentItem()') returned by the collection's 'createIterator()' factory method.",
      pros: [
        "Supports multiple simultaneous traversals (e.g. BFS vs. DFS) over the same aggregate.",
        "Keeps collection interfaces clean and encapsulates internal storage."
      ],
      cons: [
        "Slight cursor allocation overhead for simple contiguous arrays."
      ]
    },
    es: {
      localName: "Iterador (Iterator)",
      tagline: "RECORRIDO UNIFORME CON CURSOR • COMPORTAMIENTO DE OBJETO",
      intent: "Proporcionar un modo de acceder secuencialmente a los elementos de un objeto agregado sin exponer su representación interna.",
      problem: "Las colecciones usan estructuras muy distintas (arreglos, árboles, grafos). Exponer su estructura interna acopla al cliente.",
      solution: "Extraer la lógica y el cursor de recorrido en un objeto 'Iterator' ('next()', 'hasNext()') independiente de la colección.",
      pros: [
        "Permite múltiples recorridos simultáneos y distintos algoritmos sobre la misma colección.",
        "Preserva el encapsulamiento de la estructura de datos."
      ],
      cons: [
        "Sobrecarga mínima en colecciones simples."
      ]
    }
  },
  "mediator": {
    en: {
      localName: "Mediator",
      tagline: "CENTRAL COORDINATION HUB • OBJECT BEHAVIORAL",
      intent: "Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly.",
      problem: "When 10 UI widgets or microservices communicate directly in a many-to-many mesh (N*(N-1) connections), changing one component breaks all others.",
      solution: "Route all inter-component notifications through a central 'Mediator' hub (like an Air Traffic Control tower), converting an N-to-N mesh into a clean 1-to-N star topology.",
      pros: [
        "Replaces tangled many-to-many dependencies with a single coordination hub.",
        "Makes individual Colleague components reusable in isolation."
      ],
      cons: [
        "The Mediator itself can become complex if it absorbs too much orchestration logic."
      ]
    },
    es: {
      localName: "Mediador (Mediator)",
      tagline: "CONCENTRADOR DE COORDINACIÓN • COMPORTAMIENTO DE OBJETO",
      intent: "Definir un objeto que encapsule cómo interactúa un conjunto de objetos, promoviendo el acoplamiento débil al evitar referencias directas entre sí.",
      problem: "Una malla muchos-a-muchos entre componentes (como controles de un diálogo complejo) vuelve imposible reutilizar o modificar piezas aisladas.",
      solution: "Centralizar la comunicación en un objeto 'Mediator' (topología en estrella) donde los colegas notifican eventos sin conocerse entre sí.",
      pros: [
        "Elimina el acoplamiento cruzado entre múltiples colegas.",
        "Centraliza las reglas de coordinación en un único punto."
      ],
      cons: [
        "El Mediador puede crecer en complejidad si concentra demasiadas reglas."
      ]
    }
  },
  "memento": {
    en: {
      localName: "Memento",
      tagline: "OPAQUE STATE SNAPSHOT • OBJECT BEHAVIORAL",
      intent: "Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.",
      problem: "Implementing state checkpoints or rollback requires saving an object's private fields, but exposing those fields publicly violates encapsulation.",
      solution: "Have the 'Originator' produce an immutable, opaque 'Memento' token containing a snapshot of its private state. A 'Caretaker' holds the stack of Mementos without being able to read or mutate their internals.",
      pros: [
        "Preserves strict encapsulation boundaries while enabling full state rollback.",
        "Simplifies the Originator by delegating snapshot storage to the Caretaker."
      ],
      cons: [
        "Frequent snapshots of large state graphs can consume significant memory."
      ]
    },
    es: {
      localName: "Recuerdo (Memento)",
      tagline: "INSTANTÁNEA OPACA DE ESTADO • COMPORTAMIENTO DE OBJETO",
      intent: "Sin violar el encapsulamiento, capturar y externalizar el estado interno de un objeto para poder restaurarlo posteriormente.",
      problem: "Guardar puntos de restauración de un objeto suele tentar a exponer sus atributos privados, rompiendo el encapsulamiento.",
      solution: "El 'Originator' empaqueta su estado privado en un 'Memento' opaco que el 'Caretaker' custodia en una pila sin poder inspeccionarlo.",
      pros: [
        "Permite restaurar estados previos manteniendo intacto el encapsulamiento."
      ],
      cons: [
        "Puede consumir mucha memoria si el estado capturado en cada paso es grande."
      ]
    }
  },
  "observer": {
    en: {
      localName: "Observer",
      tagline: "REACTIVE PUB/SUB BROADCAST • OBJECT BEHAVIORAL",
      intent: "Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
      problem: "When a data model changes (e.g., live stock price or store state), polling wastes CPU cycles, while hardcoding calls to specific views ('chart.update(); ticker.update()') tightly couples model to UI.",
      solution: "Maintain a list of 'Observer' subscribers inside the 'Subject'. Whenever state mutates, 'notify()' broadcasts the update polymorphically to all registered observers.",
      pros: [
        "Abstract coupling between Subject and Observers; new observers can subscribe at any time.",
        "Supports reactive broadcast communication automatically."
      ],
      cons: [
        "Unregistered observers can cause memory leaks (lapsed listener problem) if not detached."
      ]
    },
    es: {
      localName: "Observador (Observer)",
      tagline: "DIFUSIÓN REACTIVA UNO-A-MUCHOS • COMPORTAMIENTO DE OBJETO",
      intent: "Definir una dependencia uno-a-muchos entre objetos para que, cuando uno cambie de estado, todos sus dependientes sean notificados automáticamente.",
      problem: "Acoplar directamente el modelo de datos a las vistas concretas que lo muestran impide agregar nuevos paneles o reutilizar el modelo.",
      solution: "El 'Subject' gestiona una lista de suscriptores 'Observer' y ejecuta 'notify()' ante cada cambio de estado.",
      pros: [
        "Desacoplamiento total entre el sujeto emisor y los observadores.",
        "Permite suscribir y cancelar observadores dinámicamente en tiempo de ejecución."
      ],
      cons: [
        "Olvidar desuscribir observadores puede provocar fugas de memoria."
      ]
    }
  },
  "state": {
    en: {
      localName: "State",
      tagline: "FINITE STATE POLYMORPHISM • OBJECT BEHAVIORAL",
      intent: "Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.",
      problem: "Objects governed by finite-state machines (like a TCP connection: Closed, Listen, Established) quickly degenerate into massive 'switch(state)' blocks repeated across every method.",
      solution: "Extract each state into a dedicated 'State' class ('TCPClosed', 'TCPListen', 'TCPEstablished'). The 'Context' delegates operations to its current state object, which transitions the context to the next state.",
      pros: [
        "Eliminates sprawling conditional state switches and localizes behavior per state.",
        "Makes state transitions explicit and atomic."
      ],
      cons: [
        "Increases the number of classes when the state machine has many states."
      ]
    },
    es: {
      localName: "Estado (State)",
      tagline: "MÁQUINA DE ESTADOS POLIMÓRFICA • COMPORTAMIENTO DE OBJETO",
      intent: "Permitir que un objeto altere su comportamiento cuando su estado interno cambia. El objeto parecerá cambiar de clase.",
      problem: "Las máquinas de estado implementadas con largos bloques 'switch(estado)' en cada método se vuelven inmanejables al agregar nuevos estados.",
      solution: "Encapsular cada estado en una clase 'State' dedicada (ej. TCPClosed, TCPEstablished) en la cual el 'Context' delega su comportamiento.",
      pros: [
        "Elimina condicionales complejos y agrupa la lógica de cada estado en su propia clase.",
        "Hace que las transiciones de estado sean explícitas y seguras."
      ],
      cons: [
        "Incrementa el número de clases en máquinas con muchos estados."
      ]
    }
  },
  "strategy": {
    en: {
      localName: "Strategy",
      tagline: "INTERCHANGEABLE ALGORITHM POLICY • OBJECT BEHAVIORAL",
      intent: "Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.",
      problem: "Embedding multiple algorithms (e.g., shipping calculators, line-breaking heuristics, sorting strategies) inside a single Context class creates a fragile monolith.",
      solution: "Extract the algorithm family behind a common 'Strategy' interface. The 'Context' holds a reference to the active Strategy and can swap it dynamically at runtime.",
      pros: [
        "Replaces conditional algorithm branches with clean polymorphic delegation.",
        "Allows hot-swapping algorithms at runtime based on user or system context."
      ],
      cons: [
        "Clients must understand how Strategies differ to select the right one."
      ]
    },
    es: {
      localName: "Estrategia (Strategy)",
      tagline: "ALGORITMOS INTERCAMBIABLES • COMPORTAMIENTO DE OBJETO",
      intent: "Definir una familia de algoritmos, encapsular cada uno de ellos y hacerlos intercambiables independientemente de los clientes.",
      problem: "Incrustar múltiples variantes algorítmicas (cálculo de envíos, compresión, validación) con condicionales dentro de una misma clase viola el principio Abierto/Cerrado.",
      solution: "Extraer cada algoritmo en una clase que implemente la interfaz 'Strategy', inyectándola dinámicamente en el 'Context'.",
      pros: [
        "Permite intercambiar algoritmos en caliente en tiempo de ejecución.",
        "Elimina condicionales complejos y facilita pruebas unitarias por algoritmo."
      ],
      cons: [
        "El cliente debe conocer las diferencias entre estrategias para elegir la adecuada."
      ]
    }
  },
  "template-method": {
    en: {
      localName: "Template Method",
      tagline: "INVARIANT SKELETON & HOOKS • CLASS BEHAVIORAL",
      intent: "Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.",
      problem: "Multiple data parsers (CSV, JSON, Parquet) share the exact same 5-step pipeline skeleton (open -> parse -> validate -> transform -> emit) but duplicate the orchestration code.",
      solution: "Implement the invariant pipeline order in a final 'templateMethod()' on the abstract base class, calling abstract primitive operations and optional hooks that subclasses override.",
      pros: [
        "Enforces the Hollywood Principle ('Don't call us, we'll call you') and eliminates pipeline duplication.",
        "Locks down invariant steps while opening controlled extension hooks."
      ],
      cons: [
        "Relies on static inheritance, binding step customization to compile-time subclasses."
      ]
    },
    es: {
      localName: "Método Plantilla (Template Method)",
      tagline: "ESQUELETO INVARIANTE DE ALGORITMO • COMPORTAMIENTO DE CLASE",
      intent: "Definir el esqueleto de un algoritmo en una operación, delegando algunos pasos en las subclases sin cambiar la estructura global.",
      problem: "Cuando varios procesadores comparten el mismo flujo de pasos pero duplican el código de control, cualquier cambio en el orden rompe todas las clases.",
      solution: "Fijar el esqueleto invariante en un 'templateMethod()' de la clase base e invocar pasos abstractos o 'hooks' que las subclases personalizan.",
      pros: [
        "Reutiliza el flujo común e implementa la inversión de control ('No nos llames, nosotros te llamaremos')."
      ],
      cons: [
        "Depende de la herencia de clases, limitando la flexibilidad en tiempo de ejecución."
      ]
    }
  },
  "visitor": {
    en: {
      localName: "Visitor",
      tagline: "DOUBLE-DISPATCH AST OPERATION • OBJECT BEHAVIORAL",
      intent: "Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.",
      problem: "Adding new operations (TypeCheck, PrettyPrint, CodeGen, SecurityAudit) across a stable AST hierarchy pollutes every node class if added directly as methods.",
      solution: "Equip each element node with a single 'accept(visitor)' method that invokes 'visitor.visitConcreteElement(this)' (Double Dispatch), bundling each new operation into its own Visitor class.",
      pros: [
        "Makes adding new operations over a complex object structure effortless without touching node classes.",
        "Gathers related behavior into a single cohesive Visitor."
      ],
      cons: [
        "Adding a brand-new ConcreteElement class requires updating all existing Visitors."
      ]
    },
    es: {
      localName: "Visitante (Visitor)",
      tagline: "DOBLE DESPACHO SOBRE ESTRUCTURAS • COMPORTAMIENTO DE OBJETO",
      intent: "Representar una operación que se ejecuta sobre los elementos de una estructura de objetos sin modificar las clases sobre las que opera.",
      problem: "Agregar nuevas operaciones (exportar a XML, auditar tipos, generar código) sobre una jerarquía de nodos estable obliga a modificar todas las clases del árbol.",
      solution: "Usar 'Double Dispatch': cada nodo implementa 'accept(visitor)' que llama a 'visitor.visitNode(this)', concentrando cada operación nueva en su propio Visitor.",
      pros: [
        "Permite agregar nuevas operaciones sobre el árbol sin tocar las clases de los elementos."
      ],
      cons: [
        "Añadir un nuevo tipo de nodo elemento obliga a actualizar todos los Visitors existentes."
      ]
    }
  }
};
