/**
 * Dados e conteúdos completos sobre o livro clássico GoF:
 * "Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos"
 * (Design Patterns: Elements of Reusable Object-Oriented Software)
 */

export const bookOverview = {
  title: "Padrões de Projeto",
  subtitle: "Soluções Reutilizáveis de Software Orientado a Objetos",
  originalTitle: "Design Patterns: Elements of Reusable Object-Oriented Software",
  publicationYear: 1994,
  editionPt: "Bookman / Artmed (2000 / 2007)",
  authors: [
    {
      name: "Erich Gamma",
      bio: "Pioneiro da computação OO, coautor do JUnit e líder no desenvolvimento do Eclipse e Visual Studio Code na Microsoft.",
      avatar: "EG"
    },
    {
      name: "Richard Helm",
      bio: "Especialista em arquitetura orientada a objetos, consultor sênior no Boston Consulting Group.",
      avatar: "RH"
    },
    {
      name: "Ralph Johnson",
      bio: "Professor emérito na Universidade de Illinois em Urbana-Champaign, pioneiro na comunidade Smalltalk e padrões de software.",
      avatar: "RJ"
    },
    {
      name: "John Vlissides",
      bio: "Pesquisador no IBM T.J. Watson Research Center, pioneiro em toolkits gráficos (Unidraw, Fresco). In memoriam (1961-2005).",
      avatar: "JV"
    }
  ],
  forewordBy: "Grady Booch (Cientista-Chefe da Rational Software Corporation, co-criador da UML)",
  inspiration: "Christopher Alexander (Arquiteto e urbanista, autor de 'A Pattern Language' - 1977)",
  corePrinciples: [
    {
      id: "interface-not-implementation",
      title: "1. Programe para uma interface, não para uma implementação",
      original: "Program to an interface, not an implementation",
      summary: "Nunca declare variáveis ou tipos de retorno baseados em classes concretas quando houver uma abstração ou contrato comum. Isso elimina o acoplamento com classes específicas e permite que os clientes manipulem qualquer objeto que respeite o contrato definido.",
      benefits: [
        "Clientes desconhecem os tipos concretos específicos dos objetos que consom.",
        "Clientes desconhecem as classes que implementam esses objetos, apenas a abstração.",
        "Permite substituição polimórfica dinâmica e injeção de dependências sem quebrar código cliente."
      ],
      badPractice: "ArrayList<Pedido> lista = new ArrayList<>(); // Acoplado à implementação",
      goodPractice: "List<Pedido> lista = new ArrayList<>(); // Programado para a interface"
    },
    {
      id: "composition-over-inheritance",
      title: "2. Prefira a composição de objetos à herança de classes",
      original: "Favor object composition over class inheritance",
      summary: "Embora a herança de classe (reutilização de caixa branca / white-box) seja fácil de declarar em tempo de compilação, ela viola o encapsulamento, expõe detalhes internos da classe ancestral e congela a hierarquia. A composição de objetos (reutilização de caixa preta / black-box) mantém classes pequenas, desacopladas e permite alterar comportamentos dinamicamente em tempo de execução via delegação.",
      benefits: [
        "Encapsulamento preservado: detalhes internos do objeto contido permanecem ocultos.",
        "Flexibilidade em tempo de execução: objetos podem trocar seus componentes delegados dinamicamente.",
        "Previne a explosão combinatória de subclasses (ex: BorderedScrollableThemedWindow)."
      ],
      badPractice: "class RelatorioExcel extends FormatadorExcel { ... } // Herança estática rígida",
      goodPractice: "class Relatorio { private Formatador formatador; ... } // Composição e delegação"
    }
  ],
  causesOfRedesign: [
    {
      number: 1,
      cause: "Criando um objeto pela especificação explícita de uma classe",
      description: "Amarrar chamadas diretas a construtores (new MinhaClasse) fixa a implementação e impede variações futuras.",
      patterns: ["Abstract Factory", "Factory Method", "Prototype"]
    },
    {
      number: 2,
      cause: "Dependência de operações específicas",
      description: "Codificar solicitações de forma rígida impede alterar como ou quando ela é atendida em tempo de execução.",
      patterns: ["Chain of Responsibility", "Command"]
    },
    {
      number: 3,
      cause: "Dependência da plataforma de hardware e software",
      description: "Acoplar código a APIs nativas do sistema operacional (janelas, timers, arquivos) dificulta a portabilidade.",
      patterns: ["Abstract Factory", "Bridge"]
    },
    {
      number: 4,
      cause: "Dependência de representações ou implementações de objetos",
      description: "Expor a clientes como um objeto é armazenado ou representado propaga alterações em cascata ao mudar a estrutura interna.",
      patterns: ["Abstract Factory", "Bridge", "Memento", "Proxy"]
    },
    {
      number: 5,
      cause: "Dependências algorítmicas",
      description: "Algoritmos mudam, são otimizados ou substituídos. Objetos dependentes de algoritmos rígidos quebram quando eles evoluem.",
      patterns: ["Builder", "Iterator", "Strategy", "Template Method", "Visitor"]
    },
    {
      number: 6,
      cause: "Acoplamento forte",
      description: "Classes monolíticas que conhecem muitos outros objetos tornam o sistema rígido, impossível de testar e difícil de estender.",
      patterns: ["Abstract Factory", "Bridge", "Chain of Responsibility", "Command", "Façade", "Mediator", "Observer"]
    },
    {
      number: 7,
      cause: "Estendendo funcionalidade pelo uso indiscriminado de subclasses",
      description: "A herança gera explosão de classes, overhead de inicialização e exige conhecimento profundo da implementação da superclasse.",
      patterns: ["Bridge", "Chain of Responsibility", "Composite", "Decorator", "Observer", "Strategy"]
    },
    {
      number: 8,
      cause: "Incapacidade para alterar classes de modo conveniente",
      description: "Quando você precisa reutilizar uma classe de terceiros cujo código-fonte não pode ser modificado ou cuja interface é incompatível.",
      patterns: ["Adapter", "Decorator", "Visitor"]
    }
  ],
  lexiCaseStudy: {
    title: "O Estudo de Caso Clássico do GoF: O Editor 'Lexi'",
    subtitle: "Como 8 padrões de projeto resolvem os 7 grandes problemas de um editor WYSIWYG",
    description: "No Capítulo 2 do livro, os autores projetam passo a passo o Lexi, um editor de documentos estilo 'What You See Is What You Get'. A beleza do caso de estudo é mostrar que aplicações sofisticadas não dependem de um único padrão, mas da cooperação harmoniosa entre múltiplos padrões.",
    challenges: [
      {
        id: "lexi-structure",
        problem: "1. Estrutura Física do Documento",
        description: "Representar hierarquicamente caracteres, retângulos, linhas, colunas e páginas, tratando elementos simples e agrupamentos complexos de forma uniforme.",
        patternUsed: "Composite",
        gofPage: 50,
        solution: "A classe abstrata 'Glyph' define a interface comum (Draw, Bounds, Intersects, Insert, Remove, Child). 'Character' e 'Rectangle' são folhas primitivas; 'Row', 'Column' e 'Page' são composites recursivos que contêm filhos Glyph."
      },
      {
        id: "lexi-formatting",
        problem: "2. Formatação e Quebra de Linhas",
        description: "Separar os algoritmos de quebra de linhas da estrutura do documento, permitindo alternar entre formatação rápida e formatação tipográfica ótima (estilo TeX).",
        patternUsed: "Strategy",
        gofPage: 54,
        solution: "A classe 'Composition' (contexto) delega o algoritmo de quebra para uma interface 'Compositor' (estratégia). Subclasses como 'SimpleCompositor', 'TeXCompositor' e 'ArrayCompositor' implementam lógicas diferentes sem alterar a classe Glyph."
      },
      {
        id: "lexi-adornment",
        problem: "3. Adornando a Interface (Bordas e Barras de Rolagem)",
        description: "Adicionar bordas e scrollbars à área de edição sem sofrer explosão de subclasses (BorderedComposition, ScrollableBorderedComposition, etc.) e em tempo de execução.",
        patternUsed: "Decorator",
        gofPage: 56,
        solution: "Criação da subclasse 'MonoGlyph' (fecho transparente). Ela encapsula um único Glyph componente e repassa Draw(). 'Border' desenha a borda antes ou depois; 'Scroller' adiciona barras de rolamento e poda a área visual."
      },
      {
        id: "lexi-look-and-feel",
        problem: "4. Múltiplos Estilos de Interação (Look-and-Feel)",
        description: "Permitir que o Lexi rode com estilos gráficos Motif, Presentation Manager (PM) ou Macintosh sem espalhar condicionais 'if OS == Motif' por todo o código.",
        patternUsed: "Abstract Factory",
        gofPage: 60,
        solution: "A fábrica abstrata 'GUIFactory' declara métodos como CreateScrollBar() e CreateButton(). Subclasses 'MotifFactory', 'PMFactory' e 'MacFactory' garantem que todos os widgets criados pertençam à mesma família gráfica coerente."
      },
      {
        id: "lexi-windows",
        problem: "5. Múltiplos Sistemas de Janelas",
        description: "Tornar a abstração de janela do Lexi (ApplicationWindow, DialogWindow, IconWindow) independente do subsistema gráfico subjacente (X-Windows, PM, Mac OS).",
        patternUsed: "Bridge",
        gofPage: 64,
        solution: "Separação em duas hierarquias: 'Window' (abstração lógica vista pelo Lexi) e 'WindowImp' (implementação concreta do SO: XWindowImp, PMWindowImp). 'Window' mantém um ponteiro para 'WindowImp' e delega as operações de desenho primitivo."
      },
      {
        id: "lexi-undo-redo",
        problem: "6. Operações de Usuário e Desfazer/Refazer (Undo/Redo)",
        description: "Parametrizar itens de menu e botões com ações arbitrárias e suportar múltiplos níveis ilimitados de Desfazer e Refazer.",
        patternUsed: "Command",
        gofPage: 70,
        solution: "Encapsular solicitações em objetos 'Command' com operações Execute() e Unexecute(). 'MenuItem' e botões apenas chamam command->Execute(). Uma pilha de histórico mantém comandos passados e futuros com a linha do 'Presente'."
      },
      {
        id: "lexi-traversal",
        problem: "7. Acessando Informações Espalhadas no Documento",
        description: "Percorrer a estrutura do documento para verificações ou renderização sem expor as estruturas de dados internas de cada glifo (vetor, lista ligada, árvore).",
        patternUsed: "Iterator",
        gofPage: 76,
        solution: "A classe abstrata 'Iterator' padroniza operações First(), Next(), IsDone() e CurrentItem(). Subclasses como 'ListIterator' e 'PreorderIterator' navegam recursivamente na árvore de Glyphs com segurança."
      },
      {
        id: "lexi-spelling",
        problem: "8. Análise de Texto (Corretor Ortográfico e Hifenização)",
        description: "Executar análises semânticas (verificação ortográfica, contagem de palavras, separação silábica) sem poluir a interface da classe Glyph com dezenas de novos métodos.",
        patternUsed: "Visitor",
        gofPage: 81,
        solution: "A hierarquia Glyph ganha um único método 'Accept(Visitor&)'. 'Visitor' define métodos como VisitCharacter(), VisitRow(), etc. Usando Despacho Duplo (Double Dispatch), novos analisadores (SpellingCheckingVisitor, HyphenationVisitor) são criados sem alterar nenhuma classe de glifo existente."
      }
    ]
  },
  catalogMatrix: {
    title: "O Espaço dos Padrões de Projeto (Tabela 1.1 do Livro GoF)",
    description: "O GoF classifica os 23 padrões em duas dimensões fundamentais: Propósito (Criacional, Estrutural, Comportamental) e Escopo (Classe - focado em herança estática; Objeto - focado em composição dinâmica).",
    matrix: [
      {
        scope: "Classe (Herança / Tempo de Compilação)",
        creational: ["Factory Method (112)"],
        structural: ["Adapter [de classe] (140)"],
        behavioral: ["Interpreter (231)", "Template Method (301)"]
      },
      {
        scope: "Objeto (Composição / Tempo de Execução)",
        creational: ["Abstract Factory (95)", "Builder (104)", "Prototype (121)", "Singleton (130)"],
        structural: ["Adapter [de objeto] (140)", "Bridge (151)", "Composite (160)", "Decorator (170)", "Façade (179)", "Flyweight (187)", "Proxy (198)"],
        behavioral: [
          "Chain of Responsibility (212)",
          "Command (222)",
          "Iterator (244)",
          "Mediator (257)",
          "Memento (266)",
          "Observer (274)",
          "State (284)",
          "Strategy (292)",
          "Visitor (305)"
        ]
      }
    ]
  },
  patternElements: [
    {
      title: "1. Nome do Padrão (Pattern Name)",
      desc: "Um identificador conciso e significativo que expande o vocabulário de projeto da equipe. Permite que arquitetos comuniquem decisões de alto nível com uma única expressão (ex: 'vamos usar um Observer aqui')."
    },
    {
      title: "2. Problema (Problem & Context)",
      desc: "Descreve quando aplicar o padrão, o contexto arquitetural e os 'code smells' ou sintomas de um projeto inflexível que ele resolve."
    },
    {
      title: "3. Solução (Solution & Structure)",
      desc: "Descreve os elementos que compõem o padrão (classes, objetos, interfaces), seus relacionamentos e colaborações. Não é uma implementação rígida, mas um gabarito flexível."
    },
    {
      title: "4. Consequências (Consequences & Trade-offs)",
      desc: "Os resultados, benefícios e custos da aplicação do padrão. Fundamental para avaliar impactos na memória, tempo de execução, flexibilidade e manutenibilidade."
    }
  ]
};
