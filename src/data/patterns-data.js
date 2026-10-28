/**
 * Base de Dados Completa dos 23 Padrões de Projeto do Gang of Four (GoF)
 * Complementado com referências modernas, exemplos em múltiplas linguagens (TS, Java, Python, C++)
 * e laboratórios interativos.
 */

export const patternsData = [
  // ==========================================
  // PADRÕES DE CRIAÇÃO (5)
  // ==========================================
  {
    id: "abstract-factory",
    name: "Abstract Factory",
    ptName: "Fábrica Abstrata",
    originalName: "Abstract Factory",
    category: "criacional",
    scope: "objeto",
    gofPage: 95,
    aliases: ["Kit"],
    intent: "Fornecer uma interface para criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.",
    hasPlayground: true,
    playgroundId: "factory-lab",
    problemAndMotivation: `Imagine que você está criando um simulador de móveis ou um toolkit de interface gráfica de usuário (GUI) que precisa suportar múltiplos sistemas operacionais (Windows, macOS, Linux) ou estilos de decoração (Moderno, Vitoriano, Art Déco).
Se o seu código cliente instanciar diretamente 'new ModernChair()' e 'new VictorianTable()', os estilos ficarão misturados e inconsistentes. Pior ainda: espalhar 'if (os == "Mac") new MacButton() else new WinButton()' por centenas de classes torna a aplicação rígida e impossível de manter.`,
    solution: `O padrão Abstract Factory define uma interface ('GUIFactory' ou 'FurnitureFactory') contendo métodos de fabricação para cada produto da família ('createChair()', 'createCoffeeTable()', 'createSofa()').
Em seguida, criamos fábricas concretas para cada variação de estilo ('ModernFurnitureFactory', 'VictorianFurnitureFactory'). O cliente recebe apenas a interface abstrata da fábrica e instancia os produtos por meio dela, garantindo que todos os produtos criados pertençam à mesma família harmônica.`,
    structure: {
      participants: [
        { name: "AbstractFactory", role: "Declara uma interface para operações que criam objetos-produto abstratos (ex: GUIFactory)." },
        { name: "ConcreteFactory", role: "Implementa as operações para criar instâncias de produtos concretos de uma família (ex: WinFactory, MacFactory)." },
        { name: "AbstractProduct", role: "Declara uma interface para um tipo de produto (ex: Button, Checkbox)." },
        { name: "ConcreteProduct", role: "Define um produto concreto a ser produzido pela respectiva fábrica concreta (ex: WinButton, MacButton)." },
        { name: "Client", role: "Usa apenas as interfaces declaradas por AbstractFactory e AbstractProduct." }
      ],
      collaborations: "Normalmente uma única instância de ConcreteFactory é criada em tempo de execução (frequentemente um Singleton). O Client delega a criação dos produtos para essa fábrica."
    },
    applicability: [
      "Quando o sistema deve ser independente de como seus produtos são criados, compostos ou representados.",
      "Quando o sistema deve ser configurado com uma família de múltiplos produtos que precisam ser usados em conjunto.",
      "Quando você quer fornecer uma biblioteca de classes de produtos revelando apenas suas interfaces, mantendo as implementações protegidas.",
      "CUIDADO / QUANDO NÃO USAR: Se a família de produtos precisa adicionar constantemente novos tipos de produtos (ex: adicionar 'createLamp()'), pois isso força a alterar a interface AbstractFactory e todas as fábricas concretas."
    ],
    consequences: {
      pros: [
        "Isola as classes concretas do código cliente.",
        "Facilita a troca completa de famílias de produtos com uma única alteração de instância de fábrica.",
        "Promove a consistência e harmonia absoluta entre os produtos da mesma família."
      ],
      cons: [
        "Dificuldade extrema para suportar novos tipos de produtos: exige estender a interface da fábrica e atualizar todas as subclasses existentes.",
        "Aumenta a complexidade e número de classes abstratas no projeto inicial."
      ]
    },
    implementationNotes: [
      "Fábricas como Singletons: Geralmente uma aplicação precisa de apenas uma instância da fábrica concreta por família.",
      "Criação dos produtos: A fábrica concreta pode utilizar o padrão Factory Method para cada produto ou protótipos (Prototype).",
      "Definindo fábricas extensíveis: Para mitigar a rigidez na adição de novos produtos, pode-se usar uma operação genérica 'make(productId)' com passagem de parâmetros."
    ],
    codeExamples: {
      typescript: `// Interfaces de Produto
interface Button {
  render(): string;
  onClick(): void;
}

interface Checkbox {
  render(): string;
  toggle(): void;
}

// Fábrica Abstrata
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Família Windows
class WindowsButton implements Button {
  render = () => "[Botão Windows 11 Estilo Fluent]";
  onClick = () => console.log("Clique Windows!");
}
class WindowsCheckbox implements Checkbox {
  render = () => "[Checkbox Windows]";
  toggle = () => console.log("Marcado Windows");
}
class WindowsFactory implements GUIFactory {
  createButton(): Button { return new WindowsButton(); }
  createCheckbox(): Checkbox { return new WindowsCheckbox(); }
}

// Família macOS
class MacButton implements Button {
  render = () => "[Botão macOS Estilo Aqua]";
  onClick = () => console.log("Clique macOS!");
}
class MacCheckbox implements Checkbox {
  render = () => "[Checkbox macOS]";
  toggle = () => console.log("Marcado macOS");
}
class MacFactory implements GUIFactory {
  createButton(): Button { return new MacButton(); }
  createCheckbox(): Checkbox { return new MacCheckbox(); }
}

// Código Cliente (100% desacoplado de OS)
function renderApplication(factory: GUIFactory) {
  const btn = factory.createButton();
  const chk = factory.createCheckbox();
  console.log(btn.render(), chk.render());
}`,
      java: `public interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

public class Application {
    private Button button;
    private Checkbox checkbox;

    public Application(GUIFactory factory) {
        this.button = factory.createButton();
        this.checkbox = factory.createCheckbox();
    }

    public void paint() {
        button.paint();
        checkbox.paint();
    }
}`,
      python: `from abc import ABC, abstractmethod

class GUIFactory(ABC):
    @abstractmethod
    def create_button(self): pass
    @abstractmethod
    def create_checkbox(self): pass

class MacFactory(GUIFactory):
    def create_button(self): return "Apple Mac Button"
    def create_checkbox(self): return "Apple Mac Checkbox"

class WinFactory(GUIFactory):
    def create_button(self): return "Windows Fluent Button"
    def create_checkbox(self): return "Windows Fluent Checkbox"`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 100)
class MazeFactory {
public:
    MazeFactory();
    virtual Maze* MakeMaze() const { return new Maze; }
    virtual Wall* MakeWall() const { return new Wall; }
    virtual Room* MakeRoom(int n) const { return new Room(n); }
    virtual Door* MakeDoor(Room* r1, Room* r2) const { return new Door(r1, r2); }
};`
    },
    realWorldUses: [
      "Spring Framework: 'BeanFactory' e 'ApplicationContext' como fábricas de componentes e serviços gerenciados.",
      "Java Swing / AWT: Pluggable Look and Feel ('UIManager' e 'ComponentUI').",
      "Drivers JDBC: 'Connection' atua como fábrica abstrata de 'Statement', 'PreparedStatement' e 'CallableStatement'.",
      "React UI Kits: Provedores de tema ('ThemeProvider') que fornecem variações estilizadas completas."
    ],
    relatedPatterns: [
      "Factory Method: Frequentemente os métodos de criação de uma Abstract Factory são implementados como Factory Methods.",
      "Prototype: Uma fábrica concreta pode clonar protótipos em vez de usar herança.",
      "Singleton: Uma fábrica concreta é comumente implementada como um Singleton."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 95-104",
      "Refactoring Guru - Abstract Factory Pattern (Alexander Shvets)",
      "Effective Java (Joshua Bloch) - Item 1: Static Factory Methods & Providers"
    ]
  },

  {
    id: "builder",
    name: "Builder",
    ptName: "Construtor",
    originalName: "Builder",
    category: "criacional",
    scope: "objeto",
    gofPage: 104,
    aliases: [],
    intent: "Separar a construção de um objeto complexo da sua representação de modo que o mesmo processo de construção possa criar diferentes representações.",
    hasPlayground: true,
    playgroundId: "builder-lab",
    problemAndMotivation: `Imagine construir um objeto 'Carro' ou 'Relatório' ou 'QuerySQL' que possui dezenas de campos opcionais (motor, teto solar, GPS, ar-condicionado, estofamento, freios ABS).
Uma abordagem ingênua leva ao temido 'Telescoping Constructor Smell' (construtores com 10 parâmetros, a maioria nulos: 'new Car(4, true, null, null, "v8", false, ...)') ou a métodos setters desordenados que deixam o objeto em um estado temporário inconsistente.`,
    solution: `O padrão Builder extrai o algoritmo de construção para classes separadas chamadas Builders.
Um objeto 'Director' comanda a sequência passo a passo de construção ('buildBody()', 'buildEngine()', 'buildInterior()'), enquanto implementações concretas de Builder decidem a representação gerada (ex: 'SportsCarBuilder', 'SUVBuilder', ou leitores RTF convertendo para 'HTMLConverter' vs 'PDFConverter').`,
    structure: {
      participants: [
        { name: "Builder", role: "Especifica uma interface abstrata para a criação das partes de um objeto Product." },
        { name: "ConcreteBuilder", role: "Constrói e monta as partes do produto implementando a interface Builder. Mantém o produto resultante." },
        { name: "Director", role: "Constrói um objeto usando a interface Builder passo a passo." },
        { name: "Product", role: "O objeto complexo resultante em construção." }
      ],
      collaborations: "O cliente cria o Director e o configura com o ConcreteBuilder desejado. O Director notifica o Builder passo a passo. No final, o cliente obtém o resultado do construtor."
    },
    applicability: [
      "Quando o algoritmo de criação de um objeto complexo deve ser independente das partes que o compõem e de como são montadas.",
      "Quando o processo de construção deve permitir diferentes representações para o objeto construído.",
      "Para eliminar construtores telescópicos e garantir objetos imutáveis complexos com validação no passo final (.build())."
    ],
    consequences: {
      pros: [
        "Permite variar a representação interna de um produto facilmente.",
        "Isola o código de construção da representação.",
        "Oferece controle fino e gradual sobre o processo de construção (passo a passo)."
      ],
      cons: [
        "Aumenta a complexidade global do código criando múltiplas novas classes para cada tipo de produto.",
        "Exige que o cliente compreenda o papel do Director e dos Builders."
      ]
    },
    implementationNotes: [
      "Interface de montagem gradual: Métodos comumente retornam o próprio Builder ('return this') para permitir Method Chaining (Fluent Interface).",
      "Produtos não precisam de superclasse comum: Ao contrário do Abstract Factory, os produtos de Builders diferentes podem ser inteiramente dispares (ex: string HTML vs documento binário PDF)."
    ],
    codeExamples: {
      typescript: `class Pizza {
  public dough: string = "";
  public sauce: string = "";
  public toppings: string[] = [];

  describe(): string {
    return \`Pizza com massa \${this.dough}, molho \${this.sauce} e coberturas: \${this.toppings.join(", ")}\`;
  }
}

// Builder com Fluent Interface
class PizzaBuilder {
  private pizza = new Pizza();

  setDough(dough: string): this {
    this.pizza.dough = dough;
    return this;
  }
  setSauce(sauce: string): this {
    this.pizza.sauce = sauce;
    return this;
  }
  addTopping(topping: string): this {
    this.pizza.toppings.push(topping);
    return this;
  }
  build(): Pizza {
    if (!this.pizza.dough) throw new Error("Massa é obrigatória!");
    return this.pizza;
  }
}

// Uso fluente:
const minhaPizza = new PizzaBuilder()
  .setDough("fina e crocante")
  .setSauce("tomate pelado rústico")
  .addTopping("mussarela de búfala")
  .addTopping("manjericão fresco")
  .build();`,
      java: `// Exemplo clássico Joshua Bloch (Effective Java)
public class Usuario {
    private final String nome;
    private final String email;
    private final int idade;

    private Usuario(Builder b) {
        this.nome = b.nome;
        this.email = b.email;
        this.idade = b.idade;
    }

    public static class Builder {
        private String nome;
        private String email;
        private int idade;

        public Builder nome(String n) { this.nome = n; return this; }
        public Builder email(String e) { this.email = e; return this; }
        public Builder idade(int i) { this.idade = i; return this; }
        public Usuario build() { return new Usuario(this); }
    }
}`,
      python: `class QueryBuilder:
    def __init__(self):
        self._table = ""
        self._fields = []
        self._conditions = []

    def select(self, *fields):
        self._fields.extend(fields)
        return self

    def from_table(self, table):
        self._table = table
        return self

    def where(self, condition):
        self._conditions.append(condition)
        return self

    def build(self):
        fields = ", ".join(self._fields) if self._fields else "*"
        query = f"SELECT {fields} FROM {self._table}"
        if self._conditions:
            query += f" WHERE {' AND '.join(self._conditions)}"
        return query`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 108)
class MazeBuilder {
public:
    virtual void BuildMaze() { }
    virtual void BuildRoom(int room) { }
    virtual void BuildDoor(int roomFrom, int roomTo) { }
    virtual Maze* GetMaze() { return 0; }
protected:
    MazeBuilder();
};`
    },
    realWorldUses: [
      "Java StringBuilder / Stream.Builder: Construção incremental eficiente de dados.",
      "Lombok @Builder: Geração automática de builders em código Java.",
      "Query Builders em ORMs: Knex.js, TypeORM, Hibernate Criteria, Django QuerySet.",
      "HTTP Clients: Java HttpClient.newBuilder(), Axios request builder."
    ],
    relatedPatterns: [
      "Abstract Factory: Ambos criam objetos complexos, mas Builder foca na construção passo a passo, enquanto Abstract Factory foca em famílias imediatas.",
      "Composite: É muito frequente que o Builder seja utilizado para construir hierarquias Composite."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 104-112",
      "Effective Java (Joshua Bloch) - Item 2: Consider a builder when faced with many constructor parameters"
    ]
  },

  {
    id: "factory-method",
    name: "Factory Method",
    ptName: "Método Fábrica",
    originalName: "Factory Method",
    category: "criacional",
    scope: "classe",
    gofPage: 112,
    aliases: ["Virtual Constructor (Construtor Virtual)"],
    intent: "Definir uma interface para criar um objeto, mas deixar as subclasses decidirem que classe instanciar. O Factory Method permite adiar a instanciação para subclasses.",
    hasPlayground: true,
    playgroundId: "factory-lab",
    problemAndMotivation: `Frameworks frequentemente precisam gerenciar relacionamentos entre objetos abstratos. Por exemplo, um framework de documentos desktop possui classes 'Application' e 'Document'.
A classe 'Application' sabe QUANDO criar um novo documento (ex: menu Arquivo > Novo), mas não tem ideia de QUAL subclasse concreta instanciar (DrawingDocument? TextDocument? SpreadsheetDocument?).`,
    solution: `A superclasse declara um método abstrato 'createDocument()'. Subclasses específicas ('DrawingApplication') redefinem esse método retornando instâncias de sua classe concreta correspondente ('DrawingDocument').
Dessa forma, a lógica genérica de ciclo de vida permanece na superclasse, enquanto a decisão de qual classe concreta instanciar é postergada para as subclasses.`,
    structure: {
      participants: [
        { name: "Product", role: "Define a interface dos objetos que o método fábrica produz." },
        { name: "ConcreteProduct", role: "Implementa a interface do Product." },
        { name: "Creator", role: "Declara o factory method que retorna um objeto Product. Pode fornecer uma implementação padrão." },
        { name: "ConcreteCreator", role: "Redefine o factory method para retornar uma instância de ConcreteProduct." }
      ],
      collaborations: "O Creator depende das subclasses para definir o factory method, mantendo o código core limpo de acoplamento direto."
    },
    applicability: [
      "Quando uma classe não pode antecipar previamente a classe exata dos objetos que ela precisa criar.",
      "Quando uma classe quer que suas subclasses especifiquem os objetos criados.",
      "Para conectar hierarquias de classes paralelas (ex: Figuras gráficas e seus Manipuladores interativos)."
    ],
    consequences: {
      pros: [
        "Elimina a amarração de classes específicas ao código do framework ou lógica central.",
        "Fornece ganchos (hooks) elegantes para que subclasses forneçam versões especializadas de objetos.",
        "Aderente ao Princípio Aberto/Fechado (OCP)."
      ],
      cons: [
        "Pode forçar a criação de subclasses no cliente apenas para instanciar um produto específico."
      ]
    },
    implementationNotes: [
      "Criadores Abstratos vs Concretos: O Creator pode ser abstrato (obrigando subclasses a implementar) ou concreto (com produto padrão).",
      "Métodos Fábrica Parametrizados: Pode receber um ID para criar variações ('create(tipo)')."
    ],
    codeExamples: {
      typescript: `// Produto
interface Transport {
  deliver(): string;
}

class Truck implements Transport {
  deliver = () => "[Caminhão] Entrega terrestre em caixa por caminhão";
}

class Ship implements Transport {
  deliver = () => "[Navio] Entrega marítima em contêiner por navio";
}

// Creator com Factory Method
abstract class Logistics {
  // O Factory Method abstrato:
  abstract createTransport(): Transport;

  // Lógica de negócio reutilizável que usa o produto:
  planDelivery(): string {
    const transport = this.createTransport();
    return \`Logística planejada: \${transport.deliver()}\`;
  }
}

class RoadLogistics extends Logistics {
  createTransport(): Transport { return new Truck(); }
}

class SeaLogistics extends Logistics {
  createTransport(): Transport { return new Ship(); }
}`,
      java: `public abstract class Dialog {
    public void renderWindow() {
        Button okButton = createButton();
        okButton.render();
    }
    // Factory method
    public abstract Button createButton();
}

public class WindowsDialog extends Dialog {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
}`,
      python: `from abc import ABC, abstractmethod

class Notifier(ABC):
    @abstractmethod
    def create_message(self): pass

    def send(self, recipient):
        msg = self.create_message()
        return f"Enviando '{msg}' para {recipient}"

class EmailNotifier(Notifier):
    def create_message(self): return "Email HTML formatado"

class SMSNotifier(Notifier):
    def create_message(self): return "SMS de 160 caracteres"`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 113)
class Application {
public:
    virtual Document* CreateDocument() = 0;
    void NewDocument() {
        Document* doc = CreateDocument();
        docs.Add(doc);
        doc->Open();
    }
};`
    },
    realWorldUses: [
      "Java Collection Framework: `iterator()` é um factory method em `Iterable` implementado por `ArrayList`, `HashSet`, etc.",
      "Spring Framework: `FactoryBean` em injeção de dependências.",
      "Document Object Model (DOM): `document.createElement('div')`.",
      "Logging: `LoggerFactory.getLogger(Class)` em SLF4J / Log4j."
    ],
    relatedPatterns: [
      "Abstract Factory: É frequentemente implementado utilizando um conjunto de Factory Methods.",
      "Template Method: Factory Methods são frequentemente invocados dentro de Template Methods."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 112-121",
      "Refactoring Guru - Factory Method Pattern"
    ]
  },

  {
    id: "prototype",
    name: "Prototype",
    ptName: "Protótipo",
    originalName: "Prototype",
    category: "criacional",
    scope: "objeto",
    gofPage: 121,
    aliases: [],
    intent: "Especificar os tipos de objetos a serem criados usando uma instância-protótipo e criar novos objetos pela cópia desse protótipo.",
    hasPlayground: false,
    problemAndMotivation: `Imagine um editor de partituras musicais com notas de semínima, colcheia, claves e acordes complexos. Criar uma subclasse de ferramenta ('SeminimaTool', 'ColcheiaTool') para cada elemento gráfico causa explosão inútil de subclasses.
Além disso, se a criação de um objeto for muito custosa (requer consultas pesadas de banco, rede ou cálculos geométricos intrincados), recriar do zero é ineficiente.`,
    solution: `Em vez de criar instâncias via construtores, mantemos instâncias de referência (protótipos) que implementam uma interface 'clone()'.
Quando um novo objeto é necessário, clonamos o protótipo e ajustamos apenas os parâmetros necessários, evitando a duplicação de subclasses e economizando processamento.`,
    structure: {
      participants: [
        { name: "Prototype", role: "Declara uma interface para clonar a si próprio (ex: método clone())." },
        { name: "ConcretePrototype", role: "Implementa a operação de clonagem (shallow copy ou deep copy)." },
        { name: "Client", role: "Cria um novo objeto solicitando a um protótipo que clone a si próprio." }
      ],
      collaborations: "O cliente solicita ao protótipo a clonagem. O protótipo devolve uma nova instância independente de si mesmo."
    },
    applicability: [
      "Quando as classes a instanciar forem especificadas em tempo de execução (ex: carga dinâmica de plugins).",
      "Para evitar hierarquias paralelas de fábricas e produtos.",
      "Quando instâncias de uma classe puderem ter apenas algumas combinações fixas de estado: clona-se o protótipo correspondente."
    ],
    consequences: {
      pros: [
        "Permite adicionar e remover produtos dinamicamente em tempo de execução.",
        "Permite especificar novos objetos variando valores ou estrutura (composição complexa).",
        "Reduz a necessidade de subclassificação."
      ],
      cons: [
        "A operação de cópia em profundidade (Deep Copy) com referências circulares e ponteiros complexos é difícil e propensa a bugs."
      ]
    },
    implementationNotes: [
      "Shallow Copy vs Deep Copy: Cópia rasa duplica apenas ponteiros/referências primitivas; cópia profunda duplica toda a árvore de objetos agregados.",
      "Gerenciador de Protótipos (Prototype Registry): Uma memória associativa (dicionário/Map) com chaves e instâncias prototípicas cadastradas."
    ],
    codeExamples: {
      typescript: `interface Prototype<T> {
  clone(): T;
}

class GraphicElement implements Prototype<GraphicElement> {
  constructor(
    public type: string,
    public color: string,
    public metadata: { author: string; tags: string[] }
  ) {}

  clone(): GraphicElement {
    // Deep copy de metadados
    return new GraphicElement(
      this.type,
      this.color,
      { author: this.metadata.author, tags: [...this.metadata.tags] }
    );
  }
}

// Uso com Registro de Protótipos:
const registry = new Map<string, GraphicElement>();
registry.set("retanguloAzul", new GraphicElement("Retângulo", "#0066cc", { author: "Admin", tags: ["ui", "box"] }));

const novoRetangulo = registry.get("retanguloAzul")!.clone();
novoRetangulo.color = "#00aaff";`,
      java: `public class DocumentRegistry {
    private Map<String, DocumentTemplate> cache = new HashMap<>();

    public DocumentTemplate getClone(String key) {
        return cache.get(key).clone();
    }
}`,
      python: `import copy

class CharacterSheet:
    def __init__(self, name, health, spells):
        self.name = name
        self.health = health
        self.spells = spells

    def clone(self):
        return copy.deepcopy(self)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 128)
Wall* BombedWall::Clone() const {
    return new BombedWall(*this);
}`
    },
    realWorldUses: [
      "JavaScript: Linguagem inteira baseada em Protótipos ('Object.create', '__proto__').",
      "Git: Criar branches ou commits é conceitualmente clonar um estado prototípico prévio.",
      "Jogos Digitais: Spawning de centenas de monstros ou projéteis a partir de instâncias protótipo.",
      "Java `Cloneable` e `Object.clone()`."
    ],
    relatedPatterns: [
      "Abstract Factory: Podem competir ou trabalhar juntos; uma fábrica pode armazenar um conjunto de protótipos.",
      "Composite e Decorator: Projetos que utilizam esses padrões intensamente se beneficiam do Prototype."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 121-130",
      "MDN Web Docs - Inheritance and the prototype chain"
    ]
  },

  {
    id: "singleton",
    name: "Singleton",
    ptName: "Instância Única",
    originalName: "Singleton",
    category: "criacional",
    scope: "objeto",
    gofPage: 130,
    aliases: ["Solitaire (Solitário)"],
    intent: "Garantir que uma classe tenha somente uma instância e fornecer um ponto global de acesso para a mesma.",
    hasPlayground: false,
    problemAndMotivation: `Alguns recursos do sistema exigem estritamente uma única instância: o spooler de impressão da empresa, o gerenciador de conexões de banco de dados, o cache global de aplicação ou o sistema de arquivos.
Variáveis globais não garantem unicidade, poluem o namespace e não impedem que outros programadores instanciem múltiplos objetos.`,
    solution: `Tornar o construtor privado e manter uma variável estática interna da própria classe contendo sua única instância.
Um método estático global ('getInstance()') fornece acesso controlado a essa instância, inicializando-a sob demanda (Lazy Initialization) na primeira solicitação.`,
    structure: {
      participants: [
        { name: "Singleton", role: "Define a operação estática Instance() que permite aos clientes acessarem sua instância única. Responsável por criar e proteger sua própria instância." }
      ],
      collaborations: "Os clientes acessam o objeto exclusivamente via Singleton.getInstance()."
    },
    applicability: [
      "Quando deve haver exatamente uma instância de uma classe, acessível por um ponto bem conhecido para todos os clientes.",
      "Quando essa instância precisa ser extensível por subclasses sem modificar o código do cliente.",
      "CUIDADO / TRADE-OFF: O Singleton é frequentemente considerado um 'Anti-Padrão' se mal utilizado, pois introduz estado global oculto e dificulta testes unitários (acoplamento temporal e concorrência)."
    ],
    consequences: {
      pros: [
        "Acesso rigorosamente controlado à instância única.",
        "Reduz a poluição do espaço de nomes em comparação com variáveis globais soltas.",
        "Permite inicialização tardia (Lazy Loading) economizando memória até o momento de uso."
      ],
      cons: [
        "Dificulta testes automatizados (testes unitários isolados requerem mock de estado global).",
        "Pode mascarar problemas de design (acoplamento estreito entre módulos).",
        "Em ambientes multithread, exige sincronização cuidadosa (Double-Checked Locking)."
      ]
    },
    implementationNotes: [
      "Construtor Protegido/Privado: Impede uso de 'new Singleton()'.",
      "Multithreading em Java/C++: Uso de 'synchronized' ou Double-Checked Locking para evitar criar duas instâncias em corridas de thread.",
      "Enum Singleton em Java: Segundo Joshua Bloch, uma enumeração com um único valor é a forma mais segura e à prova de reflexão de criar um Singleton em Java."
    ],
    codeExamples: {
      typescript: `class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connectionId: string;

  // Construtor PRIVADO
  private constructor() {
    this.connectionId = "DB-" + Math.floor(Math.random() * 10000);
    console.log("Conectado ao BD com ID:", this.connectionId);
  }

  // Ponto global de acesso
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): string {
    return \`Executando '\${sql}' via \${this.connectionId}\`;
  }
}

// Teste de Unicidade:
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true (exatamente a mesma instância!)`,
      java: `// Forma recomendada por Joshua Bloch (Effective Java - Item 3)
public enum ConfigurationManager {
    INSTANCE;
    
    private Properties props = new Properties();
    
    public String getProperty(String key) {
        return props.getProperty(key);
    }
}`,
      python: `class AppConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AppConfig, cls).__new__(cls)
            cls._instance.theme = "light"
        return cls._instance`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 132)
class Singleton {
public:
    static Singleton* Instance();
protected:
    Singleton();
private:
    static Singleton* _instance;
};`
    },
    realWorldUses: [
      "Gerenciador de Janelas / Window Manager do SO.",
      "Redux Store / Pinia: Armazenamento único centralizado de estado na aplicação.",
      "Node.js `require()` / ES Modules: Módulos no Node são cacheados e funcionam naturalmente como singletons.",
      "Java `Runtime.getRuntime()` e `Desktop.getDesktop()`."
    ],
    relatedPatterns: [
      "Abstract Factory, Builder e Prototype: Podem ser implementados como Singletons.",
      "Facade: Frequentemente um único objeto Facade é necessário no subsistema."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 130-136",
      "Effective Java (Joshua Bloch) - Item 3: Enforce the singleton property with a private constructor or an enum type"
    ]
  },

  // ==========================================
  // PADRÕES ESTRUTURAIS (7)
  // ==========================================
  {
    id: "adapter",
    name: "Adapter",
    ptName: "Adaptador",
    originalName: "Adapter",
    category: "estrutural",
    scope: "classe ou objeto",
    gofPage: 140,
    aliases: ["Wrapper (Envoltório)"],
    intent: "Converter a interface de uma classe em outra interface esperada pelos clientes. O Adapter permite que certas classes trabalhem em conjunto, pois de outra forma seria impossível por causa de suas interfaces incompatíveis.",
    hasPlayground: true,
    playgroundId: "adapter-lab",
    problemAndMotivation: `Você tem uma aplicação moderna de comércio eletrônico que trabalha com dados no formato JSON e consome uma interface padrão 'ProcessadorPagamento { pagar(valorReais) }'.
Você precisa integrar um serviço bancário antigo ou biblioteca de terceiros que só aceita XML, espera valores em centavos ('processPayment(cents, currencyCode)') e usa métodos com nomenclaturas totalmente diferentes. Você não tem acesso para reescrever o código do banco.`,
    solution: `Cria-se uma classe 'Adaptador' que implementa a interface esperada pelo cliente ('ProcessadorPagamento') e encapsula uma referência para o objeto incompatível ('Adaptee').
Quando o cliente chama 'pagar(100)', o adaptador traduz a chamada para 'legacyService.processPayment(10000, "BRL")', fazendo a conversão necessária de tipos e formatos nos bastidores de forma totalmente transparente.`,
    structure: {
      participants: [
        { name: "Target", role: "Define a interface específica do domínio que o Client consome." },
        { name: "Client", role: "Colabora com objetos compatíveis com a interface Target." },
        { name: "Adaptee", role: "Define uma interface existente e incompatível que precisa ser adaptada." },
        { name: "Adapter", role: "Adapta a interface do Adaptee à interface do Target." }
      ],
      collaborations: "O Client chama operações no Adapter. O Adapter chama os métodos correspondentes no Adaptee."
    },
    applicability: [
      "Quando você quiser usar uma classe existente cuja interface não corresponde à interface esperada pelo seu sistema.",
      "Quando quiser criar uma classe reutilizável que coopere com classes não relacionadas ou não previstas.",
      "Para integrar bibliotecas legadas ou componentes de terceiros sem modificar seu código-fonte."
    ],
    consequences: {
      pros: [
        "Princípio da Responsabilidade Única (SRP): Separa a conversão de interface da lógica central de negócio.",
        "Princípio Aberto/Fechado (OCP): Introduz novos adaptadores sem quebrar o código cliente existente.",
        "Reutilização de código legado de alto valor sem reescrita cara."
      ],
      cons: [
        "Aumenta o número de classes e níveis de indireção no sistema."
      ]
    },
    implementationNotes: [
      "Adaptador de Classe vs Adaptador de Objeto: O de classe usa herança múltipla (C++); o de objeto usa composição (recomendado e compatível com Java/TS/Python).",
      "Adaptadores de dois sentidos (Two-Way Adapters): Quando dois clientes diferentes precisam enxergar o mesmo objeto por interfaces distintas."
    ],
    codeExamples: {
      typescript: `// Interface esperada pelo sistema (Target)
interface ModernPaymentProcessor {
  pay(amountInBrl: number): string;
}

// Serviço legado ou de terceiro (Adaptee)
class LegacyBankService {
  executeWireTransfer(cents: number, currency: string): string {
    return \`[LegacyBank] Processado \${cents} centavos em moeda \${currency}\`;
  }
}

// O Adaptador
class BankServiceAdapter implements ModernPaymentProcessor {
  constructor(private legacyBank: LegacyBankService) {}

  pay(amountInBrl: number): string {
    const cents = Math.round(amountInBrl * 100);
    // Adapta formato e parâmetros:
    return this.legacyBank.executeWireTransfer(cents, "BRL");
  }
}

// Cliente consome a interface sem saber do sistema antigo:
const client = (processor: ModernPaymentProcessor) => processor.pay(150.50);
console.log(client(new BankServiceAdapter(new LegacyBankService())));`,
      java: `public class RoundHole {
    private double radius;
    public boolean fits(RoundPeg peg) {
        return this.radius >= peg.getRadius();
    }
}

public class SquarePegAdapter extends RoundPeg {
    private SquarePeg squarePeg;
    public SquarePegAdapter(SquarePeg peg) { this.squarePeg = peg; }
    @Override
    public double getRadius() {
        return Math.sqrt(Math.pow((squarePeg.getWidth() / 2), 2) * 2);
    }
}`,
      python: `class TargetInterface:
    def request(self) -> str: return "Padrão Target"

class LegacyService:
    def specific_request(self) -> str: return ".ovitisopmi odiviteR"

class Adapter(TargetInterface):
    def __init__(self, service: LegacyService):
        self.service = service
    def request(self) -> str:
        return self.service.specific_request()[::-1]`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 148)
class TextShape : public Shape {
public:
    TextShape(TextView* t) : _text(t) {}
    virtual void BoundingBox(Point& bl, Point& tr) const {
        Coord b, l, w, h;
        _text->GetOrigin(b, l);
        _text->GetExtent(w, h);
        bl = Point(b, l);
        tr = Point(b + h, l + w);
    }
private:
    TextView* _text;
};`
    },
    realWorldUses: [
      "Java `Arrays.asList()`: Adapta um array nativo para a interface `List`.",
      "Streams em Java: `InputStreamReader` adapta `InputStream` (bytes) para `Reader` (caracteres).",
      "Microservices / Integração de APIs: Adaptadores de gateway de pagamento (Stripe vs PayPal vs Pix).",
      "Drivers de Banco de Dados: O driver JDBC adapta o protocolo nativo de rede do Postgres/MySQL para a API padrão do Java."
    ],
    relatedPatterns: [
      "Bridge: O Bridge é planejado antes do sistema existir para separar abstração e implementação; o Adapter adapta coisas após elas já existirem.",
      "Decorator: O Decorator não muda a interface do objeto, apenas adiciona comportamento; o Adapter altera a interface para torná-la compatível.",
      "Proxy: O Proxy fornece a mesma interface do objeto real; o Adapter fornece uma interface diferente."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 140-150",
      "Refactoring Guru - Adapter Pattern"
    ]
  },

  {
    id: "bridge",
    name: "Bridge",
    ptName: "Ponte",
    originalName: "Bridge",
    category: "estrutural",
    scope: "objeto",
    gofPage: 151,
    aliases: ["Handle/Body"],
    intent: "Desacoplar uma abstração da sua implementação, de modo que as duas possam variar independentemente.",
    hasPlayground: false,
    problemAndMotivation: `Imagine que você tem classes de formas geométricas ('Circulo', 'Quadrado') e deseja renderizá-las em múltiplos motores gráficos ('RasterRenderer', 'VectorRenderer').
Se usar herança, você terá que criar: 'CirculoRaster', 'CirculoVector', 'QuadradoRaster', 'QuadradoVector'. Se adicionar 'Triangulo', serão mais 2 classes. Se adicionar um motor '3DRenderer', terá uma explosão combinatória exponencial de subclasses!`,
    solution: `O Bridge separa o sistema em duas dimensões ortogonais: a **Abstração** (Formas) e o **Implementor** (Renderer).
A classe 'Forma' contém uma referência para a interface 'Renderer'. 'Circulo' apenas delega as operações de desenho para seu renderer em tempo de execução. Agora é possível adicionar novas formas ou novos renderizadores de forma totalmente independente sem explosão de classes!`,
    structure: {
      participants: [
        { name: "Abstraction", role: "Define a interface de alto nível da abstração e mantém uma referência para um Implementor (ex: Window, Shape)." },
        { name: "RefinedAbstraction", role: "Estende a interface da abstração com operações mais ricas (ex: IconWindow, Circle)." },
        { name: "Implementor", role: "Define a interface para classes de implementação concretas (ex: WindowImp, Renderer)." },
        { name: "ConcreteImplementor", role: "Implementa primitivas da interface Implementor para plataformas específicas (ex: XWindowImp, PMWindowImp)." }
      ],
      collaborations: "A Abstraction repassa as solicitações dos clientes para o seu objeto Implementor."
    },
    applicability: [
      "Quando você quer evitar um vínculo permanente entre uma abstração e sua implementação.",
      "Quando tanto as abstrações como as implementações devem ser estendidas por subclasses de forma independente.",
      "Quando mudanças na implementação de uma abstração não devem quebrar o código dos clientes.",
      "Para evitar a proliferação explosiva de subclasses ('generalizações aninhadas')."
    ],
    consequences: {
      pros: [
        "Desacopla interface de implementação em tempo de compilação e execução.",
        "Extensibilidade independente em duas direções.",
        "Oculta detalhes de baixo nível e implementações de plataforma dos clientes."
      ],
      cons: [
        "Aumenta a complexidade ao dividir uma classe coesa em hierarquias separadas."
      ]
    },
    implementationNotes: [
      "Criação do Implementor: A Abstraction pode receber o Implementor no construtor ou criá-lo via Abstract Factory.",
      "O GoF utilizou o Bridge no editor Lexi para separar 'Window' de 'WindowImp' (XWindowImp e PMWindowImp)."
    ],
    codeExamples: {
      typescript: `// Implementor (Motor de Renderização)
interface Renderer {
  renderCircle(radius: number): string;
}

class VectorRenderer implements Renderer {
  renderCircle = (r: number) => \`<circle r="\${r}" stroke="black" /> (Vetor SVG)\`;
}

class RasterRenderer implements Renderer {
  renderCircle = (r: number) => \`[Pixels de raio \${r}] (Bitmap Canvas)\`;
}

// Abstraction (Hierarquia de Formas)
abstract class Shape {
  constructor(protected renderer: Renderer) {}
  abstract draw(): string;
  abstract resize(factor: number): void;
}

// Refined Abstraction
class Circle extends Shape {
  constructor(renderer: Renderer, private radius: number) {
    super(renderer);
  }
  draw(): string {
    return this.renderer.renderCircle(this.radius);
  }
  resize(factor: number): void {
    this.radius *= factor;
  }
}

// Combinação livre sem novas subclasses:
const c1 = new Circle(new VectorRenderer(), 15);
const c2 = new Circle(new RasterRenderer(), 15);`,
      java: `public interface Device {
    void turnOn();
    void turnOff();
    void setChannel(int channel);
}

public class RemoteControl {
    protected Device device;
    public RemoteControl(Device d) { this.device = d; }
    public void togglePower() { /* delega para device */ }
}

public class AdvancedRemoteControl extends RemoteControl {
    public AdvancedRemoteControl(Device d) { super(d); }
    public void mute() { device.setChannel(0); }
}`,
      python: `class MessageSender(ABC):
    @abstractmethod
    def send_message(self, text): pass

class EmailSender(MessageSender):
    def send_message(self, text): return f"Email: {text}"

class SMSSender(MessageSender):
    def send_message(self, text): return f"SMS: {text}"

class Notification:
    def __init__(self, sender: MessageSender):
        self.sender = sender
    def notify(self, alert):
        return self.sender.send_message(alert)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 156)
class Window {
public:
    virtual void DrawContents();
    virtual void DrawRect(const Point&, const Point&);
protected:
    WindowImp* GetWindowImp();
private:
    WindowImp* _imp;
};`
    },
    realWorldUses: [
      "Drivers de Banco de Dados e ORMs: Abstração de persistência separada da implementação do driver SQL.",
      "Frontends Modernos: React Native (Abstração JS de componentes em ponte com componentes nativos iOS/Android).",
      "Sistemas de Janelas Multiplataforma (Java AWT Peers: `Button` e `ButtonPeer`)."
    ],
    relatedPatterns: [
      "Abstract Factory: Frequentemente usado para criar e configurar uma Bridge específica.",
      "Adapter: O Adapter faz coisas incompatíveis funcionarem após existirem; o Bridge é concebido desde o design para variar independentemente."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 151-160",
      "Refactoring Guru - Bridge Pattern"
    ]
  },

  {
    id: "composite",
    name: "Composite",
    ptName: "Composição (Objeto Composto)",
    originalName: "Composite",
    category: "estrutural",
    scope: "objeto",
    gofPage: 160,
    aliases: [],
    intent: "Compor objetos em estruturas de árvore para representarem hierarquias partes-todo. Composite permite aos clientes tratarem de maneira uniforme objetos individuais e composições de objetos.",
    hasPlayground: true,
    playgroundId: "composite-lab",
    problemAndMotivation: `Em aplicações com estruturas hierárquicas (sistemas de arquivos com pastas e arquivos, interfaces gráficas com containers e botões, ou documentos de texto com páginas, parágrafos e caracteres), o código cliente frequentemente precisa verificar:
'if (item instanceof Pasta) calcularPasta(item) else calcularArquivo(item)'.
Essa verificação de tipos espalhada por dezenas de locais quebra o encapsulamento e complica a manutenção.`,
    solution: `Define-se uma interface comum 'Component' com métodos como 'render()' ou 'getSize()'.
Tanto as folhas ('Leaf' - ex: Arquivo) quanto os nós compostos ('Composite' - ex: Pasta) implementam a mesma interface. Quando o cliente chama 'getSize()' na raiz, o Composite itera recursivamente sobre seus filhos, somando os resultados sem que o cliente precise saber se está interagindo com uma folha ou uma árvore inteira.`,
    structure: {
      participants: [
        { name: "Component", role: "Declara a interface comum para todos os objetos na composição (ex: Glyph, FileSystemNode)." },
        { name: "Leaf", role: "Representa objetos-folha sem filhos (ex: Character, File)." },
        { name: "Composite", role: "Define comportamento para componentes com filhos, armazenando-os e repassando chamadas recursivamente (ex: Row, Folder)." },
        { name: "Client", role: "Manipula os objetos na composição exclusivamente através da interface Component." }
      ],
      collaborations: "O Client usa a interface Component. Se o receptor for uma Folha, atende diretamente. Se for um Composto, delega para os filhos."
    },
    applicability: [
      "Quando você quiser representar hierarquias partes-todo de objetos.",
      "Quando quiser que os clientes sejam capazes de ignorar a diferença entre composições de objetos e objetos individuais, tratando todos uniformemente."
    ],
    consequences: {
      pros: [
        "Simplifica o código do cliente: elimina condicionais 'if' e 'switch' baseados em tipos.",
        "Facilita adicionar novos tipos de componentes sem quebrar árvores existentes.",
        "Permite composição recursiva infinita."
      ],
      cons: [
        "Pode tornar o design excessivamente genérico: fica difícil restringir que tipos específicos de filhos podem ser adicionados a um composite em tempo de compilação."
      ]
    },
    implementationNotes: [
      "Segurança vs Transparência: Declarar métodos 'add()' e 'remove()' em Component dá transparência máxima (mas pode falhar em Leaf). Declarar apenas em Composite dá segurança de tipos em tempo de compilação, mas perde a uniformidade.",
      "Referências aos pais: Manter um ponteiro para o 'parent' simplifica navegação para cima na árvore e remoção."
    ],
    codeExamples: {
      typescript: `// Component
interface FileSystemItem {
  name: string;
  getSize(): number;
  render(indent?: string): string;
}

// Leaf (Folha)
class FileItem implements FileSystemItem {
  constructor(public name: string, private sizeInKb: number) {}
  getSize = (): number => this.sizeInKb;
  render = (indent = ""): string => \`\${indent}[Arquivo] \${this.name} (\${this.sizeInKb} KB)\`;
}

// Composite (Nó Composto)
class FolderItem implements FileSystemItem {
  private children: FileSystemItem[] = [];
  constructor(public name: string) {}

  add(item: FileSystemItem): void { this.children.push(item); }
  remove(item: FileSystemItem): void {
    this.children = this.children.filter(c => c !== item);
  }

  getSize(): number {
    // Soma recursiva uniforme:
    return this.children.reduce((total, child) => total + child.getSize(), 0);
  }

  render(indent = ""): string {
    const lines = [\`\${indent}[Pasta] \${this.name}/ [Total: \${this.getSize()} KB]\`];
    for (const child of this.children) {
      lines.push(child.render(indent + "  "));
    }
    return lines.join("\\n");
  }
}

// Uso uniforme:
const root = new FolderItem("meu-projeto");
root.add(new FileItem("package.json", 2));
const src = new FolderItem("src");
src.add(new FileItem("index.ts", 15));
src.add(new FileItem("style.css", 8));
root.add(src);
console.log(root.render());`,
      java: `public interface Graphic {
    void draw();
}

public class CompoundGraphic implements Graphic {
    private List<Graphic> children = new ArrayList<>();
    public void add(Graphic g) { children.add(g); }
    public void draw() {
        for (Graphic g : children) g.draw();
    }
}`,
      python: `class Component(ABC):
    @abstractmethod
    def get_price(self) -> float: pass

class Product(Component):
    def __init__(self, name, price):
        self.price = price
    def get_price(self) -> float: return self.price

class Box(Component):
    def __init__(self):
        self.children = []
    def add(self, item: Component): self.children.append(item)
    def get_price(self) -> float:
        return sum(item.get_price() for item in self.children)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 168)
Currency CompositeEquipment::NetPrice() {
    Iterator<Equipment*>* i = CreateIterator();
    Currency total = 0;
    for (i->First(); !i->IsDone(); i->Next()) {
        total += i->CurrentItem()->NetPrice();
    }
    delete i;
    return total;
}`
    },
    realWorldUses: [
      "DOM HTML: Nós `Element` contêm outros elementos e nós de texto (`TextNode`).",
      "React Virtual DOM / Component Trees: Árvore de componentes onde um container abriga componentes e tags nativas uniformemente.",
      "Sistemas de Arquivos de SOs (Pastas e Arquivos).",
      "Compiladores: AST (Árvore de Sintaxe Abstrata com expressões e operadores compostos)."
    ],
    relatedPatterns: [
      "Decorator: Ambos utilizam composição recursiva, mas o Composite foca em agregação partes-todo e representação, enquanto o Decorator foca em adicionar responsabilidades sem subclasses.",
      "Iterator: Usado comumente para percorrer nós de um Composite.",
      "Visitor: Permite aplicar novas operações sobre uma árvore Composite sem alterar suas classes."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 160-170",
      "Refactoring Guru - Composite Pattern"
    ]
  },

  {
    id: "decorator",
    name: "Decorator",
    ptName: "Decorador",
    originalName: "Decorator",
    category: "estrutural",
    scope: "objeto",
    gofPage: 170,
    aliases: ["Wrapper (Envoltório)"],
    intent: "Dinamicamente, agregar responsabilidades adicionais a um objeto. Os Decorators fornecem uma alternativa flexível ao uso de subclasses para extensão de funcionalidades.",
    hasPlayground: true,
    playgroundId: "decorator-lab",
    problemAndMotivation: `Você tem uma cafeteria ou uma janela gráfica ('TextView').
Se quiser permitir que os clientes personalizem seu café com adicionais (Leite, Chantilly, Caramelo, Canela, Calda Extra) usando herança estática, você terá que criar 'CafeComLeite', 'CafeComLeiteEChantilly', 'CafeComChantillyECaramelo'... resultando em uma explosão absurda de dezenas de subclasses.`,
    solution: `Cria-se uma classe abstrata 'Decorator' que implementa a mesma interface do componente base e contém uma referência para ele.
Decoradores concretos envolvem o objeto base e repassam os métodos, agregando comportamentos ou cálculos antes ou depois. É possível empilhar decoradores infinitamente em tempo de execução:
'new ChantillyDecorator(new LeiteDecorator(new CafeSimples()))'.`,
    structure: {
      participants: [
        { name: "Component", role: "Define a interface para objetos que podem ter responsabilidades adicionadas dinamicamente." },
        { name: "ConcreteComponent", role: "Define o objeto base ao qual responsabilidades adicionais podem ser atribuídas." },
        { name: "Decorator", role: "Mantém uma referência para um Component e segue rigorosamente a sua interface." },
        { name: "ConcreteDecorator", role: "Acrescenta responsabilidades, estados ou efeitos ao componente encapsulado." }
      ],
      collaborations: "O Decorator repassa solicitações para o seu objeto Component, executando ações adicionais antes ou depois."
    },
    applicability: [
      "Para acrescentar responsabilidades a objetos individuais de forma dinâmica e transparente, sem afetar outros objetos da mesma classe.",
      "Para responsabilidades que podem ser adicionadas e removidas em tempo de execução.",
      "Quando a extensão por subclasses for impraticável ou levar à explosão de classes."
    ],
    consequences: {
      pros: [
        "Muito mais flexível que a herança estática: responsabilidades são combinadas em tempo de execução.",
        "Evita classes sobrecarregadas de recursos no topo da hierarquia.",
        "Permite combinar múltiplas responsabilidades na ordem desejada."
      ],
      cons: [
        "Um objeto decorado não possui a mesma identidade que o objeto base ('decorated !== original').",
        "Pode resultar em sistemas com uma grande profusão de pequenos objetos parecidos, dificultando a depuração."
      ]
    },
    implementationNotes: [
      "Conformidade de Interface: O decorator deve ter a mesma interface do objeto decorado.",
      "Manter a classe Component leve: A classe abstrata base deve apenas definir métodos e evitar dados/estados pesados."
    ],
    codeExamples: {
      typescript: `interface Beverage {
  cost(): number;
  description(): string;
}

// ConcreteComponent
class Espresso implements Beverage {
  cost = () => 5.0;
  description = () => "Café Espresso Puro";
}

// Decorator Base
abstract class BeverageDecorator implements Beverage {
  constructor(protected beverage: Beverage) {}
  abstract cost(): number;
  abstract description(): string;
}

// Decoradores Concretos
class MilkDecorator extends BeverageDecorator {
  cost = () => this.beverage.cost() + 2.0;
  description = () => \`\${this.beverage.description()} + Leite Vaporizado\`;
}

class WhippedCreamDecorator extends BeverageDecorator {
  cost = () => this.beverage.cost() + 3.0;
  description = () => \`\${this.beverage.description()} + Chantilly Cremoso\`;
}

// Composição Dinâmica:
let meuCafe: Beverage = new Espresso();
meuCafe = new MilkDecorator(meuCafe);
meuCafe = new WhippedCreamDecorator(meuCafe);
console.log(\`\${meuCafe.description()} = R$ \${meuCafe.cost().toFixed(2)}\`);`,
      java: `// Exemplo canônico do Java I/O (InputStream Decorators)
InputStream in = new BufferedInputStream(
                    new GZIPInputStream(
                        new FileInputStream("dados.bin.gz")));`,
      python: `class Coffee:
    def get_cost(self): return 5.0
    def get_desc(self): return "Café simples"

class WithMilk:
    def __init__(self, coffee): self._coffee = coffee
    def get_cost(self): return self._coffee.get_cost() + 2.0
    def get_desc(self): return f"{self._coffee.get_desc()} com Leite"`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 176)
class BorderDecorator : public Decorator {
public:
    BorderDecorator(VisualComponent* c, int w) : Decorator(c), _width(w) {}
    virtual void Draw() {
        Decorator::Draw();
        DrawBorder(_width);
    }
private:
    int _width;
};`
    },
    realWorldUses: [
      "Java I/O: Toda a biblioteca `java.io` é o exemplo clássico (`BufferedReader(new FileReader(...))`).",
      "Middlewares Web (Express / Koa / Redux): Funções que interceptam e decoram requests/responses.",
      "Python Decorators (@property, @functools.wraps): Açúcar sintático para o padrão Decorator.",
      "TypeScript Decorators (@Injectable, @Controller em NestJS e Angular)."
    ],
    relatedPatterns: [
      "Adapter: O Adapter altera a interface para compatibilidade; o Decorator mantém a mesma interface e adiciona responsabilidade.",
      "Composite: Um Decorator pode ser visto como um Composite com apenas um filho (nó singular).",
      "Strategy: Decorator muda a 'casca' externa do objeto; Strategy muda o 'miolo' interno (o algoritmo)."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 170-179",
      "Refactoring Guru - Decorator Pattern"
    ]
  },

  {
    id: "facade",
    name: "Facade",
    ptName: "Fachada",
    originalName: "Façade",
    category: "estrutural",
    scope: "objeto",
    gofPage: 179,
    aliases: [],
    intent: "Fornecer uma interface unificada para um conjunto de interfaces em um subsistema. Façade define uma interface de nível mais alto que torna o subsistema mais fácil de usar.",
    hasPlayground: false,
    problemAndMotivation: `Um subsistema complexo (como um compilador, um home theater ou um sistema de conversão de vídeo) possui dezenas de classes interdependentes: 'CodeGenerator', 'BytecodeStream', 'Parser', 'Lexer', 'Optimizer', 'SymbolTable'.
A maioria dos clientes não precisa interagir diretamente com esses componentes granulares; eles só querem converter o código fonte com um simples 'compile("arquivo.cpp")'. Obrigar o cliente a instanciar 8 objetos gera dependências circulares e acoplamento desnecessário.`,
    solution: `Cria-se uma classe de fachada ('Compiler' ou 'HomeTheaterFacade') que oferece métodos simples de alto nível.
Essa fachada orquestra os objetos internos do subsistema na ordem correta, servindo como ponto único de entrada e isolando o cliente da complexidade interna.`,
    structure: {
      participants: [
        { name: "Façade", role: "Conhece as classes do subsistema responsáveis pelo atendimento e delega as solicitações dos clientes (ex: Compiler, HomeTheaterFacade)." },
        { name: "Classes do Subsistema", role: "Implementam a funcionalidade real. Não mantêm referências para a Façade e não sabem de sua existência." }
      ],
      collaborations: "Os clientes enviam comandos para a Façade. A Façade traduz as requisições em chamadas coordenadas para os componentes internos."
    },
    applicability: [
      "Quando você quiser fornecer uma interface simples e amigável para um subsistema complexo.",
      "Quando houver muitas dependências entre clientes e as classes de implementação do subsistema.",
      "Para estruturar subsistemas em camadas claras (Layered Architecture)."
    ],
    consequences: {
      pros: [
        "Isola os clientes da complexidade interna do subsistema.",
        "Promove acoplamento fraco entre o subsistema e os clientes.",
        "Não impede clientes avançados de acessarem classes internas do subsistema se estritamente necessário."
      ],
      cons: [
        "Uma fachada mal projetada pode se tornar um 'God Object' centralizando muitas responsabilidades."
      ]
    },
    implementationNotes: [
      "Subsistemas Públicos vs Privados: É boa prática expor apenas a Facade e proteger o restante em pacotes/módulos internos.",
      "Fachada como Singleton: Na maioria dos casos, apenas uma instância da fachada é suficiente no sistema."
    ],
    codeExamples: {
      typescript: `// Classes complexas do subsistema multimídia
class TV {
  on = () => "[TV] Ligada";
  setChannel = (c: number) => \`[TV] Canal sintonizado em \${c}\`;
  off = () => "[TV] Desligada";
}

class SoundSystem {
  on = () => "[Som] Ativado";
  setVolume = (v: number) => \`[Som] Volume ajustado para \${v}%\`;
  off = () => "[Som] Desligado";
}

class StreamingService {
  login = () => "[Streaming] Sessão iniciada";
  playMovie = (title: string) => \`[Streaming] Reproduzindo: '\${title}'\`;
}

// A Fachada (Facade)
class HomeCinemaFacade {
  constructor(
    private tv = new TV(),
    private sound = new SoundSystem(),
    private stream = new StreamingService()
  ) {}

  watchMovie(title: string): string[] {
    return [
      "Preparando sessão de cinema...",
      this.tv.on(),
      this.sound.on(),
      this.sound.setVolume(75),
      this.stream.login(),
      this.stream.playMovie(title)
    ];
  }
}`,
      java: `public class VideoConversionFacade {
    public File convertVideo(String fileName, String format) {
        VideoFile file = new VideoFile(fileName);
        Codec sourceCodec = CodecFactory.extract(file);
        BitrateReader.read(file, sourceCodec);
        AudioMixer.fix(file);
        return new File("resultado." + format);
    }
}`,
      python: `class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.ram = Memory()
        self.disk = HardDrive()

    def start(self):
        self.cpu.freeze()
        self.ram.load(0x00, self.disk.read_boot_sector())
        self.cpu.execute()`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 185)
void Compiler::Compile(istream& input, BytecodeStream& output) {
    Scanner scanner(input);
    ProgramNodeBuilder builder;
    Parser parser;
    parser.Parse(scanner, builder);
    RISCCodeGenerator generator(output);
    ProgramNode* parseTree = builder.GetRootNode();
    parseTree->Traverse(generator);
}`
    },
    realWorldUses: [
      "JQuery: `$.ajax()` é uma fachada sobre o complexo `XMLHttpRequest` nativo do navegador.",
      "Spring Boot: `@SpringBootApplication` e 'Starters' que configuram dezenas de bibliotecas de infraestrutura com uma única anotação.",
      "Bibliotecas de SDK (AWS SDK, Firebase): Métodos de alto nível que encapsulam requisições HTTP, autenticação e retry."
    ],
    relatedPatterns: [
      "Mediator: Facade abstrai um subsistema para clientes externos de forma unidirecional; Mediator abstrai a comunicação multilateral entre objetos internos (colegas).",
      "Singleton: Fachadas são frequentemente implementadas como Singletons.",
      "Adapter: Facade define uma nova interface para um subsistema inteiro; Adapter adapta uma interface existente."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 179-187",
      "Refactoring Guru - Facade Pattern"
    ]
  },

  {
    id: "flyweight",
    name: "Flyweight",
    ptName: "Peso-Mosca",
    originalName: "Flyweight",
    category: "estrutural",
    scope: "objeto",
    gofPage: 187,
    aliases: [],
    intent: "Usar compartilhamento para suportar eficientemente grandes quantidades de objetos de granularidade fina.",
    hasPlayground: false,
    problemAndMotivation: `Imagine um jogo com uma floresta com 1.000.000 de árvores, ou um editor de texto onde cada letra ('a', 'b', 'c') é representada por um objeto próprio.
Se cada objeto armazenar seu sprite 3D de 50KB, coordenadas X/Y e cor, a aplicação exigirá gigabytes de RAM e causará OutOfMemory no computador do usuário.`,
    solution: `O padrão Flyweight divide o estado dos objetos em duas categorias:
1. **Estado Intrínseco**: Dados imutáveis e compartilháveis, que independem do contexto (ex: o caractere 'A', a malha 3D e textura da árvore). Esse estado fica guardado no objeto Flyweight compartilhado em cache.
2. **Estado Extrínseco**: Dados variáveis e contextuais (ex: posição X/Y da árvore na tela, índice da linha no editor). Esse estado é calculado ou mantido externamente pelo cliente e passado como parâmetro quando necessário.`,
    structure: {
      participants: [
        { name: "Flyweight", role: "Declara uma interface pela qual flyweights recebem e atuam sobre estados extrínsecos." },
        { name: "ConcreteFlyweight", role: "Implementa a interface e armazena os estados intrínsecos compartilháveis (ex: Character, TreeType)." },
        { name: "FlyweightFactory", role: "Cria e gerencia o pool de flyweights, garantindo o compartilhamento correto das instâncias existentes." },
        { name: "Client", role: "Armazena ou calcula os estados extrínsecos e mantém referências aos flyweights." }
      ],
      collaborations: "O cliente obtém os flyweights da FlyweightFactory e passa o estado extrínseco quando invoca suas operações."
    },
    applicability: [
      "Quando uma aplicação utiliza um número massivo de objetos.",
      "Quando os custos de memória são críticos devido ao grande volume de instâncias.",
      "Quando a maior parte do estado dos objetos puder ser extraída como estado extrínseco contextual."
    ],
    consequences: {
      pros: [
        "Economia gigantesca de memória RAM ao compartilhar estados comuns.",
        "Permite modelar conceitos refinados e orientados a objetos em níveis granulares sem estourar o hardware."
      ],
      cons: [
        "Aumenta o tempo de processamento de CPU para transferir e computar o estado extrínseco em cada operação.",
        "Código mais complexo para separar e gerenciar os dois tipos de estados."
      ]
    },
    implementationNotes: [
      "Fábrica com Pool/Cache: A FlyweightFactory mantém um dicionário (HashMap) para reutilizar instâncias já criadas.",
      "Imutabilidade: Objetos Flyweight devem ser rigorosamente imutáveis para evitar efeitos colaterais entre clientes."
    ],
    codeExamples: {
      typescript: `// Estado Intrínseco (Compartilhado e Imutável)
class TreeType {
  constructor(
    public readonly name: string,
    public readonly color: string,
    public readonly texture: string
  ) {}

  draw(x: number, y: number): string {
    return \`Árvore '\${this.name}' desenhada em (\${x}, \${y}) com textura \${this.texture}\`;
  }
}

// Fábrica Flyweight (Pool de Tipos)
class TreeFactory {
  private static treeTypes: Map<string, TreeType> = new Map();

  static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = \`\${name}_\${color}_\${texture}\`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key)!;
  }

  static totalTiposCriados(): number {
    return this.treeTypes.size;
  }
}

// Cliente com Estado Extrínseco (Posição X, Y)
class Tree {
  constructor(
    private x: number,
    private y: number,
    private type: TreeType // Referência compartilhada
  ) {}

  render(): string { return this.type.draw(this.x, this.y); }
}

// 1 milhão de árvores compartilhando apenas 2 instâncias de TreeType:
const t1 = TreeFactory.getTreeType("Carvalho", "Verde Escuro", "oak.png");
const t2 = TreeFactory.getTreeType("Carvalho", "Verde Escuro", "oak.png");
console.log(t1 === t2); // true!`,
      java: `// Java String Pool é um Flyweight nativo
String s1 = "DesignPatterns";
String s2 = "DesignPatterns";
System.out.println(s1 == s2); // true (mesma instância da String Pool)`,
      python: `class Glyphs:
    _chars = {}
    def __new__(cls, char):
        if char not in cls._chars:
            cls._chars[char] = super().__new__(cls)
            cls._chars[char].char = char
        return cls._chars[char]`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 191)
Character* GlyphFactory::CreateCharacter(char c) {
    if (!_character[c]) {
        _character[c] = new Character(c);
    }
    return _character[c];
}`
    },
    realWorldUses: [
      "JVM String Pool e `Integer.valueOf(int)` (caching de -128 a 127).",
      "Engines de Jogos (Unity / Unreal): GPU Instancing para renderizar milhões de folhas e projéteis.",
      "Navegadores Web: Representação de caracteres e estilos CSS compartilhados pelo motor de renderização."
    ],
    relatedPatterns: [
      "Composite: Flyweights são comumente nós folha em uma árvore Composite.",
      "State e Strategy: Objetos de estado e estratégia sem estado interno são frequentemente implementados como flyweights."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 187-198",
      "Refactoring Guru - Flyweight Pattern"
    ]
  },

  {
    id: "proxy",
    name: "Proxy",
    ptName: "Procurador (Substituto)",
    originalName: "Proxy",
    category: "estrutural",
    scope: "objeto",
    gofPage: 198,
    aliases: ["Surrogate"],
    intent: "Fornecer um substituto (surrogate) ou marcador da localização de outro objeto para controlar o acesso a esse objeto.",
    hasPlayground: false,
    problemAndMotivation: `Carregar objetos pesados (como uma imagem de alta resolução de 50MB em um documento ou uma conexão remota via rede) no momento da inicialização deixa o aplicativo lento e consome recursos desnecessários.
Além disso, você pode precisar controlar permissões de acesso (autenticação), fazer cache de chamadas repetidas ou logar operações sem modificar a classe de serviço original.`,
    solution: `O padrão Proxy cria um objeto intermediário que implementa a mesma interface do objeto de serviço real ('RealSubject').
O cliente interage com o Proxy pensando ser o objeto real. O proxy intercepta a chamada e pode: adiar a criação do objeto real até que ele seja realmente usado (Virtual Proxy), verificar credenciais (Protection Proxy), fazer cache de resultados (Caching Proxy) ou empacotar chamadas de rede (Remote Proxy).`,
    structure: {
      participants: [
        { name: "Subject", role: "Define uma interface comum para RealSubject e Proxy, permitindo substituição polimórfica." },
        { name: "RealSubject", role: "Define o objeto real de negócio que o proxy representa." },
        { name: "Proxy", role: "Mantém uma referência ao RealSubject e controla o acesso a ele." },
        { name: "Client", role: "Usa o serviço através da interface Subject." }
      ],
      collaborations: "O Proxy intercepta as mensagens do cliente, executa checagens ou lazy loading e repassa para o RealSubject."
    },
    applicability: [
      "Virtual Proxy: Inicialização sob demanda (Lazy Loading) de objetos com custo alto de memória ou processamento.",
      "Protection Proxy: Controle de acesso baseado em papéis (RBAC / permissões de usuário).",
      "Remote Proxy: Comunicação de rede e RPC (Remote Procedure Call) onde o objeto reside em outro servidor.",
      "Caching / Logging Proxy: Cache de respostas caras de consultas ou gravação de auditoria."
    ],
    consequences: {
      pros: [
        "Permite gerenciar o ciclo de vida e carregamento do objeto real sem que o cliente saiba.",
        "Princípio Aberto/Fechado (OCP): Introduz novas regras de segurança ou cache sem alterar a classe de serviço real.",
        "Funciona mesmo se o serviço real não estiver pronto ou indisponível temporariamente."
      ],
      cons: [
        "Aumenta a latência das chamadas com camadas adicionais de indireção.",
        "Pode complicar o código com duplicação de interfaces."
      ]
    },
    implementationNotes: [
      "Copy-on-Write: Técnica onde uma cópia cara é evitada e o objeto só é duplicado se for realmente alterado.",
      "Smart Pointers (C++): Gerenciamento automático de referências de memória."
    ],
    codeExamples: {
      typescript: `interface VideoDownloader {
  getVideo(url: string): string;
}

class RealVideoDownloader implements VideoDownloader {
  getVideo(url: string): string {
    console.log(\`[Rede] Baixando 500MB de \${url}...\`);
    return \`Conteúdo de vídeo de \${url}\`;
  }
}

// Caching & Virtual Proxy
class CachedVideoProxy implements VideoDownloader {
  private realDownloader: RealVideoDownloader | null = null;
  private cache: Map<string, string> = new Map();

  getVideo(url: string): string {
    if (!this.cache.has(url)) {
      if (!this.realDownloader) {
        this.realDownloader = new RealVideoDownloader(); // Lazy loading
      }
      const data = this.realDownloader.getVideo(url);
      this.cache.set(url, data);
    } else {
      console.log(\`[Cache] Retornando vídeo instantaneamente de \${url}\`);
    }
    return this.cache.get(url)!;
  }
}`,
      java: `// Dynamic Proxy nativo do Java
PaymentService proxy = (PaymentService) Proxy.newProxyInstance(
    PaymentService.class.getClassLoader(),
    new Class<?>[]{PaymentService.class},
    new LoggingInvocationHandler(new RealPaymentService())
);`,
      python: `class SensitiveData:
    def read(self): return "Segredo Confidencial"

class ProtectionProxy:
    def __init__(self, role, service):
        self.role = role
        self.service = service

    def read(self):
        if self.role != "admin":
            raise PermissionError("Acesso negado!")
        return self.service.read()`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 200)
class ImageProxy : public Graphic {
public:
    ImageProxy(const char* imageFile);
    virtual void Draw(const Point& at) {
        if (_image == 0) {
            _image = LoadImage(_fileName);
        }
        _image->Draw(at);
    }
private:
    Image* _image;
    char* _fileName;
};`
    },
    realWorldUses: [
      "Spring Framework AOP: Transações `@Transactional` e segurança `@PreAuthorize` usam Dynamic Proxies CGLIB/JDK.",
      "Hibernate / JPA: Lazy Loading de relacionamentos `@OneToMany` cria proxies para carregar dados do banco só no `.get()`.",
      "JavaScript ES6 `Proxy`: Interceptação nativa de propriedades, validações e reatividade (usado pelo Vue 3).",
      "Nginx / Cloudflare: Reverse Proxies na arquitetura web."
    ],
    relatedPatterns: [
      "Adapter: O Adapter fornece uma interface diferente; o Proxy fornece a mesma interface.",
      "Decorator: O Decorator adiciona responsabilidade; o Proxy controla o acesso ao objeto real."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 198-207",
      "Refactoring Guru - Proxy Pattern"
    ]
  },

  // ==========================================
  // PADRÕES COMPORTAMENTAIS (11)
  // ==========================================
  {
    id: "chain-of-responsibility",
    name: "Chain of Responsibility",
    ptName: "Cadeia de Responsabilidade",
    originalName: "Chain of Responsibility",
    category: "comportamental",
    scope: "objeto",
    gofPage: 212,
    aliases: [],
    intent: "Evitar o acoplamento do remetente de uma solicitação ao seu receptor, ao dar a mais de um objeto a oportunidade de tratar a solicitação. Encadear os objetos receptores, passando a solicitação ao longo da cadeia até que um objeto a trate.",
    hasPlayground: true,
    playgroundId: "chain-lab",
    problemAndMotivation: `Considere um sistema de aprovação de despesas corporativas ou um sistema de helpdesk sensível ao contexto.
Se o botão de ajuda acoplar diretamente 'ApplicationHelp', ele não conseguirá exibir dicas contextuais específicas do 'Dialog' ou do 'Button'. Além disso, codificar regras como 'if valor < 100 aprovaLider else if valor < 1000 aprovaGerente else if...' em um único método cria uma classe monstruosa difícil de alterar.`,
    solution: `Cada manipulador de solicitação ('Handler') implementa uma interface comum e mantém uma referência para o próximo elo na cadeia ('successor').
Ao receber a solicitação, se puder tratá-la, ele a resolve; caso contrário, repassa a solicitação incondicionalmente para o próximo sucessor. O remetente original só precisa disparar a mensagem no primeiro elo da cadeia.`,
    structure: {
      participants: [
        { name: "Handler", role: "Define uma interface para tratar solicitações e (opcionalmente) gerencia o link com o sucessor." },
        { name: "ConcreteHandler", role: "Trata as solicitações pelas quais é responsável. Repassa para o sucessor caso contrário." },
        { name: "Client", role: "Inicia a solicitação para o primeiro objeto ConcreteHandler da cadeia." }
      ],
      collaborations: "A solicitação viaja ao longo da cadeia até que um ConcreteHandler a assuma ou ela atinja o fim da cadeia."
    },
    applicability: [
      "Quando mais de um objeto puder tratar uma solicitação e o tratador exato não for conhecido a priori.",
      "Quando você quiser emitir uma solicitação para um dentre vários objetos sem especificar o receptor explicitamente.",
      "Quando o conjunto de objetos tratadores precisar ser configurado dinamicamente em tempo de execução."
    ],
    consequences: {
      pros: [
        "Acoplamento reduzido: nem o remetente nem os intermediários precisam conhecer a topologia completa da cadeia.",
        "Flexibilidade na atribuição de responsabilidades: fácil adicionar, remover ou reordenar elos.",
        "Princípio da Responsabilidade Única (SRP): cada classe cuida apenas de sua condição de tratamento."
      ],
      cons: [
        "A recepção não é garantida: se nenhum tratador da cadeia assumir a requisição, ela pode cair no final sem resposta."
      ]
    },
    implementationNotes: [
      "Aproveitar estruturas existentes: Se os objetos já estão organizados em árvore (Composite), a referência aos pais pode servir naturalmente como a cadeia de sucessores.",
      "Representação de solicitações: Pode ser via método explícito ('handleHelp()') ou objeto genérico de requisição ('Request')."
    ],
    codeExamples: {
      typescript: `abstract class Approver {
  protected next: Approver | null = null;

  setNext(next: Approver): Approver {
    this.next = next;
    return next; // Permite encadeamento fluente
  }

  abstract processRequest(amount: number): string;
}

class TeamLead extends Approver {
  processRequest(amount: number): string {
    if (amount <= 500) {
      return \`[Aprovado] Líder de Equipe: R$ \${amount}\`;
    }
    return this.next ? this.next.processRequest(amount) : "[Rejeitado] Sem autoridade";
  }
}

class Manager extends Approver {
  processRequest(amount: number): string {
    if (amount <= 5000) {
      return \`[Aprovado] Gerente: R$ \${amount}\`;
    }
    return this.next ? this.next.processRequest(amount) : "[Rejeitado] Sem autoridade";
  }
}

class Director extends Approver {
  processRequest(amount: number): string {
    if (amount <= 50000) {
      return \`[Aprovado] Diretoria Executiva: R$ \${amount}\`;
    }
    return this.next ? this.next.processRequest(amount) : "[Rejeitado] Valor acima do teto corporativo";
  }
}

// Configuração da Cadeia:
const lead = new TeamLead();
lead.setNext(new Manager()).setNext(new Director());

console.log(lead.processRequest(300));   // Líder
console.log(lead.processRequest(3500));  // Gerente
console.log(lead.processRequest(25000)); // Diretoria`,
      java: `// Middleware pipeline pattern
public abstract class Middleware {
    private Middleware next;
    public Middleware linkWith(Middleware next) { this.next = next; return next; }
    public abstract boolean check(String email, String password);
    protected boolean checkNext(String email, String password) {
        if (next == null) return true;
        return next.check(email, password);
    }
}`,
      python: `class SupportHandler(ABC):
    def __init__(self, successor=None):
        self._successor = successor
    @abstractmethod
    def handle(self, issue_level):
        if self._successor:
            return self._successor.handle(issue_level)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 216)
class HelpHandler {
public:
    HelpHandler(HelpHandler* s = 0) : _successor(s) {}
    virtual void HandleHelp() {
        if (_successor) _successor->HandleHelp();
    }
private:
    HelpHandler* _successor;
};`
    },
    realWorldUses: [
      "Express.js / NestJS / ASP.NET Core: Pipeline de middlewares (`next()`).",
      "Servlet Filters no Java EE (`FilterChain.doFilter()`).",
      "Event Bubbling no DOM do navegador: Um clique no botão sobe pelo pai até o `window`.",
      "Logging em frameworks (Logger hierárquico com níveis DEBUG -> INFO -> WARN -> ERROR)."
    ],
    relatedPatterns: [
      "Composite: Muito comum usar a estrutura pai de um Composite como o encadeamento do Chain of Responsibility.",
      "Command: As solicitações enviadas ao longo da cadeia podem ser empacotadas como objetos Command."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 212-221",
      "Refactoring Guru - Chain of Responsibility Pattern"
    ]
  },

  {
    id: "command",
    name: "Command",
    ptName: "Comando",
    originalName: "Command",
    category: "comportamental",
    scope: "objeto",
    gofPage: 222,
    aliases: ["Action (Ação)", "Transaction (Transação)"],
    intent: "Encapsular uma solicitação como um objeto, desta forma permitindo que você parametrize clientes com diferentes solicitações, enfileire ou registre (log) solicitações e suporte operações que podem ser desfeitas.",
    hasPlayground: true,
    playgroundId: "command-lab",
    problemAndMotivation: `Imagine construir a barra de ferramentas e menus de uma aplicação. Um botão 'Salvar', um atalho 'Ctrl+S' e um item de menu 'Arquivo > Salvar' precisam invocar exatamente a mesma operação no documento.
Se acoplarmos cada botão a uma rotina de salvamento específica via herança, teremos uma explosão de subclasses de botões. Além disso, como implementar operações de Desfazer e Refazer (Undo/Redo) sem manter um histórico explícito de ações executadas?`,
    solution: `O padrão Command transforma a solicitação em um objeto autônomo com uma interface simples: 'execute()' e 'unexecute()'.
O botão ou menu (Invoker) apenas armazena uma referência para a interface 'Command' e chama 'execute()'. Uma lista de histórico mantém os comandos executados, permitindo navegar no tempo (Undo/Redo) e agrupar múltiplos comandos em 'MacroCommands'.`,
    structure: {
      participants: [
        { name: "Command", role: "Declara uma interface para a execução de uma operação (ex: execute, unexecute)." },
        { name: "ConcreteCommand", role: "Define a vinculação entre um Receiver e uma ação, implementando execute()." },
        { name: "Invoker", role: "Solicita ao Command a execução da solicitação (ex: MenuItem, Button)." },
        { name: "Receiver", role: "Sabe como realizar o trabalho real (ex: Document, Canvas)." },
        { name: "Client", role: "Cria o ConcreteCommand e o configura no Invoker." }
      ],
      collaborations: "O Client instancia o Command e associa ao Receiver. O Invoker chama command.execute(). O ConcreteCommand chama métodos no Receiver."
    },
    applicability: [
      "Quando você quiser parametrizar objetos por uma ação a ser executada (substituição orientada a objetos para callbacks).",
      "Para enfileirar solicitações, agendar execuções em segundo plano ou executar em filas de mensageria.",
      "Para suportar operações reversíveis de Desfazer (Undo) e Refazer (Redo).",
      "Para manter logs de transações que possam ser reexecutados após falhas do sistema."
    ],
    consequences: {
      pros: [
        "Desacopla totalmente a classe que invoca a operação daquela que sabe como executá-la.",
        "Comandos são objetos de primeira classe: podem ser armazenados, transmitidos e manipulados como qualquer dado.",
        "Facilidade para criar MacroCommands (combinação sequencial de comandos via Composite)."
      ],
      cons: [
        "Pode aumentar o número de pequenas classes para representar cada ação."
      ]
    },
    implementationNotes: [
      "Histórico com Linha do Presente: No livro GoF (pág. 74), os autores ilustram o histórico com uma linha que divide o Passado do Futuro.",
      "Uso com Memento: Quando restaurar o estado original for complexo, o Command pode armazenar um Memento para o Undo."
    ],
    codeExamples: {
      typescript: `// Receiver (O editor de texto real)
class TextEditor {
  public content: string = "";
}

// Interface Command
interface Command {
  execute(): void;
  undo(): void;
}

// ConcreteCommand: Inserir Texto
class InsertTextCommand implements Command {
  constructor(private editor: TextEditor, private textToInsert: string) {}

  execute(): void {
    this.editor.content += this.textToInsert;
  }
  undo(): void {
    this.editor.content = this.editor.content.slice(0, -this.textToInsert.length);
  }
}

// Invoker com Pilha de Histórico Undo/Redo
class EditorHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(cmd: Command): void {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = []; // Limpa o futuro ao executar nova ação
  }

  undo(): void {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
    }
  }

  redo(): void {
    const cmd = this.redoStack.pop();
    if (cmd) {
      cmd.execute();
      this.undoStack.push(cmd);
    }
  }
}`,
      java: `// MacroCommand (Composite de Commands)
public class MacroCommand implements Command {
    private List<Command> commands = new ArrayList<>();
    public void add(Command c) { commands.add(c); }
    public void execute() {
        for (Command c : commands) c.execute();
    }
    public void undo() {
        for (int i = commands.size() - 1; i >= 0; i--) {
            commands.get(i).undo();
        }
    }
}`,
      python: `class Light:
    def turn_on(self): print("Luz acesa")
    def turn_off(self): print("Luz apagada")

class SwitchCommand(ABC):
    @abstractmethod
    def execute(self): pass

class TurnOnCommand(SwitchCommand):
    def __init__(self, light: Light): self.light = light
    def execute(self): self.light.turn_on()`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 228)
class OpenCommand : public Command {
public:
    OpenCommand(Application* a) : _application(a) {}
    virtual void Execute() {
        const char* name = AskUser();
        if (name != 0) {
            Document* doc = new Document(name);
            _application->Add(doc);
            doc->Open();
        }
    }
};`
    },
    realWorldUses: [
      "Redux / CQRS: 'Actions' no Redux são instâncias do padrão Command que descrevem eventos e mutações.",
      "Sistemas de Transações Bancárias e Filas de Mensagens (RabbitMQ, SQS, Kafka).",
      "Editores Gráficos (Photoshop, Figma, VS Code): Pilha de histórico de Undo/Redo e atalhos de teclado configuráveis."
    ],
    relatedPatterns: [
      "Composite: Permite criar MacroCommands compostos por múltiplos subcomandos.",
      "Memento: Mantém o estado necessário para que um Command execute seu Undo sem violar o encapsulamento.",
      "Prototype: Comandos que precisam ser clonados antes de entrarem no histórico."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 222-231",
      "Refactoring Guru - Command Pattern"
    ]
  },

  {
    id: "interpreter",
    name: "Interpreter",
    ptName: "Interpretador",
    originalName: "Interpreter",
    category: "comportamental",
    scope: "classe",
    gofPage: 231,
    aliases: [],
    intent: "Dada uma linguagem, definir uma representação para a sua gramática juntamente com um interpretador que usa a representação para interpretar sentenças dessa linguagem.",
    hasPlayground: false,
    problemAndMotivation: `Se um tipo específico de problema ocorre com frequência suficiente, pode valer a pena expressar instâncias do problema como sentenças de uma linguagem simples (DSL - Domain Specific Language).
Exemplos incluem filtros de busca, fórmulas matemáticas, validações de regras de negócio ou expressões regulares simples.`,
    solution: `O padrão Interpreter define uma classe para cada regra gramatical da linguagem (Símbolos Terminais e Não-Terminais) organizada em uma árvore de sintaxe abstrata (AST).
Cada nó implementa o método 'interpret(context)', avaliando recursivamente suas subexpressões em relação a um contexto compartilhado.`,
    structure: {
      participants: [
        { name: "AbstractExpression", role: "Declara a operação abstrata interpret(context) comum a todos os nós da árvore." },
        { name: "TerminalExpression", role: "Implementa interpret() para os símbolos terminais da gramática (ex: constantes, variáveis)." },
        { name: "NonterminalExpression", role: "Implementa interpret() para regras compostas (ex: Operador AND, OR, SOMA)." },
        { name: "Context", role: "Contém informação global e variáveis de ambiente para a interpretação." }
      ],
      collaborations: "O cliente constrói a AST e chama interpret() na raiz passando o contexto."
    },
    applicability: [
      "Quando houver uma gramática simples e sentenças puderem ser representadas como árvores de sintaxe abstrata.",
      "Quando a eficiência não for o requisito mais crítico (para gramáticas complexas, geradores como ANTLR, Lex/Yacc são superiores)."
    ],
    consequences: {
      pros: [
        "Fácil de alterar e estender a gramática através de herança de classes.",
        "Implementação modular de regras gramaticais independentes."
      ],
      cons: [
        "Gramáticas complexas geram árvores gigantescas e se tornam incontroláveis para manter puramente com classes OO manuais."
      ]
    },
    implementationNotes: [
      "Combinação com Composite: A AST é uma implementação direta do padrão Composite.",
      "Uso com Flyweight: Símbolos terminais repetidos (como variáveis) podem ser compartilhados via Flyweight."
    ],
    codeExamples: {
      typescript: `interface Expression {
  interpret(context: Record<string, number>): number;
}

// Símbolo Terminal (Número)
class NumberExpression implements Expression {
  constructor(private value: number) {}
  interpret(): number { return this.value; }
}

// Símbolo Terminal (Variável)
class VariableExpression implements Expression {
  constructor(private name: string) {}
  interpret(context: Record<string, number>): number {
    if (!(this.name in context)) throw new Error(\`Variável '\${this.name}' indefinida\`);
    return context[this.name];
  }
}

// Símbolo Não-Terminal (Soma)
class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Record<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// Avaliação: (x + 10) + y com x=5, y=20
const ast = new AddExpression(
  new AddExpression(new VariableExpression("x"), new NumberExpression(10)),
  new VariableExpression("y")
);

const context = { x: 5, y: 20 };
console.log("Resultado AST:", ast.interpret(context)); // 35`,
      java: `public interface Expression {
    boolean interpret(String context);
}

public class TerminalExpression implements Expression {
    private String data;
    public TerminalExpression(String data) { this.data = data; }
    public boolean interpret(String context) { return context.contains(data); }
}`,
      python: `class Expression(ABC):
    @abstractmethod
    def interpret(self, context): pass

class AndExpression(Expression):
    def __init__(self, expr1, expr2):
        self.expr1 = expr1
        self.expr2 = expr2
    def interpret(self, context):
        return self.expr1.interpret(context) and self.expr2.interpret(context)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 240)
class AndExp : public BooleanExp {
public:
    AndExp(BooleanExp* op1, BooleanExp* op2);
    virtual bool Evaluate(Context& aContext) {
        return _operand1->Evaluate(aContext) && _operand2->Evaluate(aContext);
    }
private:
    BooleanExp* _operand1;
    BooleanExp* _operand2;
};`
    },
    realWorldUses: [
      "Engines de Expressões Regulares (Regex).",
      "Calculadoras de Fórmulas no Excel e planilhas.",
      "SQL e Query Parsers simples em memória.",
      "Formatadores de Data e Templates de Strings (ex: mustache/handlebars tokens)."
    ],
    relatedPatterns: [
      "Composite: A árvore sintática abstrata é uma instância do Composite.",
      "Flyweight: Compartilha símbolos terminais na AST.",
      "Visitor: Permite aplicar novas operações (como type checking ou code generation) sobre a AST sem alterar suas classes."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 231-243",
      "Refactoring Guru - Interpreter Pattern"
    ]
  },

  {
    id: "iterator",
    name: "Iterator",
    ptName: "Iterador",
    originalName: "Iterator",
    category: "comportamental",
    scope: "objeto",
    gofPage: 244,
    aliases: ["Cursor"],
    intent: "Fornecer um meio de acessar, sequencialmente, os elementos de um objeto agregado sem expor a sua representação subjacente.",
    hasPlayground: false,
    problemAndMotivation: `Coleções podem armazenar dados de formas completamente diferentes: lista ligada, vetor estático, árvore balanceada, hash table ou grafo.
Se o código cliente depender dos nós internos da lista ou de ponteiros específicos para navegar pelos itens, mudar a estrutura de dados interna quebrará todo o sistema. Além disso, ter múltiplos percursos simultâneos na mesma coleção causará conflito se o índice for mantido dentro da própria coleção.`,
    solution: `O padrão Iterator retira a responsabilidade de percurso e navegação da coleção e a isola em um objeto independente ('Iterator').
A interface padroniza métodos como 'first()', 'next()', 'isDone()' e 'currentItem()'. Dessa forma, o cliente pode iterar sobre qualquer coleção sem conhecer seus detalhes internos e é possível manter múltiplos iteradores independentes na mesma estrutura.`,
    structure: {
      participants: [
        { name: "Iterator", role: "Define uma interface para acessar e percorrer elementos (first, next, isDone, currentItem)." },
        { name: "ConcreteIterator", role: "Implementa a interface e armazena a posição corrente no percurso." },
        { name: "Aggregate", role: "Define uma interface para criar um objeto Iterator (ex: createIterator())." },
        { name: "ConcreteAggregate", role: "Implementa a criação do iterador retornando uma instância do ConcreteIterator apropriado." }
      ],
      collaborations: "O ConcreteIterator mantém o controle do elemento corrente e sabe como computar o próximo elemento."
    },
    applicability: [
      "Para acessar conteúdos de um agregado sem expor sua representação interna (encapsulamento total).",
      "Para suportar múltiplos percursos simultâneos sobre a mesma estrutura.",
      "Para fornecer uma interface uniforme de percurso em coleções distintas (iteração polimórfica)."
    ],
    consequences: {
      pros: [
        "Simplifica a interface do agregado retirando operações redundantes de percurso.",
        "Facilita adicionar novos algoritmos de percurso (ex: em profundidade vs em largura) sem tocar na coleção.",
        "Permite múltiplos percursos ativos e independentes ao mesmo tempo."
      ],
      cons: [
        "Pode ser excessivo se a aplicação só utiliza arrays simples nativos e percursos diretos."
      ]
    },
    implementationNotes: [
      "Iterador Externo vs Interno: O externo é controlado pelo cliente ('while (it.hasNext())'); o interno recebe uma função/lambda e aplica a todos os elementos (ex: '.forEach()').",
      "Robustez: Iteradores robustos garantem que inserções e remoções na coleção durante a iteração não causem erros de ponteiro."
    ],
    codeExamples: {
      typescript: `// Implementação do Protocolo Symbol.iterator do ES6/TypeScript
class TaskList {
  private tasks: string[] = [];

  addTask(task: string): void { this.tasks.push(task); }

  // Iterador nativo customizado:
  [Symbol.iterator](): Iterator<string> {
    let index = 0;
    const items = this.tasks;
    return {
      next(): IteratorResult<string> {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { value: null, done: true };
      }
    };
  }
}

// Uso elegante com 'for...of':
const minhaLista = new TaskList();
minhaLista.addTask("Estudar GoF");
minhaLista.addTask("Criar laboratórios práticos");

for (const task of minhaLista) {
  console.log("Tarefa:", task);
}`,
      java: `// Iterator clássico do Java
List<String> items = Arrays.asList("Alpha", "Beta", "Gamma");
Iterator<String> it = items.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}`,
      python: `class ReverseIterator:
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self): return self

    def __next__(self):
        if self.index == 0: raise StopIteration
        self.index -= 1
        return self.data[self.index]`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 245)
template <class Item>
class ListIterator : public Iterator<Item> {
public:
    ListIterator(const List<Item>* aList);
    virtual void First() { _current = 0; }
    virtual void Next() { _current++; }
    virtual bool IsDone() const { return _current >= _list->Count(); }
    virtual Item CurrentItem() const;
private:
    const List<Item>* _list;
    long _current;
};`
    },
    realWorldUses: [
      "JavaScript / TypeScript: Protocolo Iterável (`Symbol.iterator`, geradores `function*`, `for...of`).",
      "Java Collections Framework: Interface `Iterator<E>` e loop `for-each`.",
      "Python: Métodos especiais `__iter__()` e `__next__()`.",
      "C# LINQ e `IEnumerable` / `IEnumerator`."
    ],
    relatedPatterns: [
      "Composite: Iterators são frequentemente usados para percorrer hierarquias compostas recursivas.",
      "Factory Method: As coleções usam Factory Methods para criar seus respectivos iteradores.",
      "Memento: Pode ser usado para capturar e restaurar o estado de uma iteração."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 244-257",
      "Refactoring Guru - Iterator Pattern"
    ]
  },

  {
    id: "mediator",
    name: "Mediator",
    ptName: "Mediador",
    originalName: "Mediator",
    category: "comportamental",
    scope: "objeto",
    gofPage: 257,
    aliases: [],
    intent: "Definir um objeto que encapsula a forma como um conjunto de objetos interage. O Mediator promove o acoplamento fraco ao evitar que os objetos se refiram uns aos outros explicitamente e permite variar suas interações independentemente.",
    hasPlayground: false,
    problemAndMotivation: `Em uma caixa de diálogo ou torre de controle de aeroporto, muitos componentes precisam interagir: quando a caixa de seleção muda, um campo de texto é desabilitado, um botão é validado e outro botão muda de cor.
Se cada componente (botão, lista, input) mantiver referências diretas para todos os outros componentes, teremos uma teia caótica de interdependências muitos-para-muitos (M:N), tornando impossível reutilizar qualquer widget isoladamente.`,
    solution: `Cria-se um objeto 'Mediator' (ex: 'FontDialogDirector') que atua como hub central de comunicação.
Todos os componentes (chamados 'Colegas' / 'Colleagues') conhecem apenas o Mediador. Quando um botão é clicado, ele avisa apenas o Mediador ('notify(this, "click")'). O Mediador sabe o que fazer e orquestra os demais colegas, transformando interações muitos-para-muitos em relações um-para-muitos (1:N).`,
    structure: {
      participants: [
        { name: "Mediator", role: "Define uma interface para comunicação com objetos Colleague (ex: DialogDirector)." },
        { name: "ConcreteMediator", role: "Implementa o comportamento cooperativo coordenando os colegas (ex: FontDialogDirector)." },
        { name: "Colleague", role: "Classes que se comunicam exclusivamente através do mediador, sem referências diretas entre si." }
      ],
      collaborations: "Colegas notificam o Mediador sobre eventos. O Mediador coordena as ações e comanda os colegas apropriados."
    },
    applicability: [
      "Quando um conjunto de objetos se comunica de maneiras bem-definidas, porém complexas e com acoplamento denso.",
      "Quando a reutilização de um componente for difícil porque ele depende de muitos outros objetos.",
      "Quando um comportamento distribuído entre várias classes precisar ser customizado sem exigir subclasses de cada componente."
    ],
    consequences: {
      pros: [
        "Desacopla os colegas: cada componente pode ser reutilizado de forma totalmente independente.",
        "Simplifica o protocolo dos objetos substituindo interações muitos-para-muitos por um-para-muitos.",
        "Centraliza a lógica de interação em um único lugar facilitando a manutenção de regras complexas."
      ],
      cons: [
        "O Mediador pode se tornar um 'God Object' monolítico e complexo se centralizar regras excessivas."
      ]
    },
    implementationNotes: [
      "Comunicação Colega-Mediador: Pode ser feita via padrão Observer (os colegas disparam notificações e o Mediador escuta) ou via método explícito passando 'this'.",
      "Omissão da classe abstrata: Se houver apenas um tipo de diálogo, a classe abstrata Mediator pode ser dispensada."
    ],
    codeExamples: {
      typescript: `interface Mediator {
  notify(sender: object, event: string): void;
}

// Mediador Concreto
class AuthenticationDialog implements Mediator {
  public usernameInput!: InputField;
  public passwordInput!: InputField;
  public submitButton!: Button;

  notify(sender: object, event: string): void {
    if (event === "change") {
      const isReady = this.usernameInput.value.length > 3 && this.passwordInput.value.length >= 6;
      this.submitButton.setEnabled(isReady);
    }
    if (event === "click" && sender === this.submitButton) {
      console.log(\`[Autenticação] Enviando dados de \${this.usernameInput.value}\`);
    }
  }
}

// Componentes Colegas (Não se conhecem!)
class InputField {
  public value = "";
  constructor(private mediator: Mediator) {}
  setValue(v: string) {
    this.value = v;
    this.mediator.notify(this, "change");
  }
}

class Button {
  public enabled = false;
  constructor(private mediator: Mediator) {}
  setEnabled(e: boolean) { this.enabled = e; }
  click() { if (this.enabled) this.mediator.notify(this, "click"); }
}`,
      java: `public interface AirTrafficControl {
    void registerFlight(Flight f);
    void requestLanding(Flight f);
}

public class AirportControlTower implements AirTrafficControl {
    private List<Flight> flights = new ArrayList<>();
    public void requestLanding(Flight f) {
        // Verifica pista livre e autoriza apenas um avião
    }
}`,
      python: `class ChatRoomMediator:
    def show_message(self, user, message):
        print(f"[{user.name}]: {message}")

class User:
    def __init__(self, name, mediator):
        self.name = name
        self.mediator = mediator
    def send(self, msg): self.mediator.show_message(self, msg)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 264)
void FontDialogDirector::WidgetChanged(Widget* theChangedWidget) {
    if (theChangedWidget == _fontList) {
        _fontName->SetText(_fontList->GetSelection());
    } else if (theChangedWidget == _ok) {
        // Aplica fonte e fecha diálogo
    }
}`
    },
    realWorldUses: [
      "Torres de Controle de Tráfego Aéreo (o exemplo clássico do mundo real).",
      "Padrão MediatR no ecossistema .NET / C# para mensageria interna e Clean Architecture.",
      "Sistemas de Chat e Message Brokers (RabbitMQ atua como mediador entre filas e produtores).",
      "Formulários Reativos complexos em SPAs (coordenador de campos dependentes)."
    ],
    relatedPatterns: [
      "Facade: A Facade atua de forma unidirecional facilitando o uso de um subsistema; o Mediator facilita a comunicação bidirecional e multilateral entre colegas.",
      "Observer: Frequentemente o Mediator é implementado como um Observer que escuta eventos dos seus colegas."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 257-266",
      "Refactoring Guru - Mediator Pattern"
    ]
  },

  {
    id: "memento",
    name: "Memento",
    ptName: "Lembrança (Snapshot)",
    originalName: "Memento",
    category: "comportamental",
    scope: "objeto",
    gofPage: 266,
    aliases: ["Token"],
    intent: "Sem violar o encapsulamento, capturar e externalizar um estado interno de um objeto, de maneira que o mesmo possa posteriormente ser restaurado para este estado.",
    hasPlayground: false,
    problemAndMotivation: `Muitas aplicações precisam criar 'checkpoints' de estado: para permitir desfazer erros do usuário (Undo), salvar o progresso de um jogo ou reverter transações em caso de falha.
Se permitirmos que outras classes acessem os atributos privados do objeto para salvá-los, quebramos o encapsulamento do objeto. Por outro lado, se o próprio objeto gerenciar todo o histórico de versões anteriores, ele ficará sobrecarregado de responsabilidades de armazenamento.`,
    solution: `O padrão Memento cria um objeto opaco chamado 'Memento' que armazena um snapshot do estado interno do Originador.
O objeto 'Caretaker' (ex: o gerenciador de histórico ou sistema de Undo) guarda a referência do Memento, mas NUNCA pode ler ou modificar seu conteúdo interno. Apenas o próprio 'Originador' tem privilégio de inspecionar o Memento para restaurar seu estado.`,
    structure: {
      participants: [
        { name: "Memento", role: "Armazena o estado interno do Originator. Protege o conteúdo contra acesso de outros objetos (interface estreita para o Caretaker, ampla para o Originator)." },
        { name: "Originator", role: "Cria o memento contendo um snapshot do seu estado atual e usa o memento para se restaurar." },
        { name: "Caretaker", role: "Responsável pela custódia dos mementos (armazenar e devolver), sem inspecionar seu conteúdo." }
      ],
      collaborations: "O Caretaker solicita um memento do Originator, guarda-o na pilha e, quando necessário reverter, passa o memento de volta ao Originator."
    },
    applicability: [
      "Quando um snapshot do estado interno de um objeto precisar ser salvo para restauração posterior.",
      "Quando uma interface direta para obter o estado violaria o encapsulamento e exporia detalhes de implementação."
    ],
    consequences: {
      pros: [
        "Preserva rigorosamente o encapsulamento sem expor variáveis privadas.",
        "Simplifica a classe Originator delegando a custódia do histórico para o Caretaker."
      ],
      cons: [
        "Pode consumir grandes quantidades de memória RAM se o Originador copiar estados pesados com alta frequência."
      ]
    },
    implementationNotes: [
      "Interface Estreita vs Ampla: Em C++, o Originator é declarado como 'friend' do Memento, tornando seus dados privados inacessíveis para o Caretaker.",
      "Armazenamento de Mudanças Incrementais: Para economizar memória, o Memento pode registrar apenas o delta (diferença) entre estados."
    ],
    codeExamples: {
      typescript: `// O Memento (Opaco para o exterior)
interface Memento {
  getDate(): string;
}

class EditorMemento implements Memento {
  constructor(
    private readonly state: string,
    private readonly date = new Date().toISOString()
  ) {}

  // Apenas quem tem acesso (ou métodos internos) lê o estado
  getState(): string { return this.state; }
  getDate(): string { return this.date; }
}

// Originador
class CodeEditor {
  private code: string = "";

  type(words: string) { this.code += words; }
  getCode(): string { return this.code; }

  save(): Memento {
    return new EditorMemento(this.code);
  }

  restore(memento: Memento) {
    if (memento instanceof EditorMemento) {
      this.code = memento.getState();
    }
  }
}

// Caretaker (Custodiante do Histórico)
class HistoryKeeper {
  private mementos: Memento[] = [];

  push(m: Memento) { this.mementos.push(m); }
  pop(): Memento | undefined { return this.mementos.pop(); }
}`,
      java: `public class GameSaveManager {
    private Deque<GameMemento> history = new ArrayDeque<>();
    public void save(Game game) { history.push(game.createSave()); }
    public void undo(Game game) { if (!history.isEmpty()) game.restore(history.pop()); }
}`,
      python: `class CanvasState:
    def __init__(self, elements): self._elements = list(elements)

class Canvas:
    def __init__(self): self.elements = []
    def save(self): return CanvasState(self.elements)
    def restore(self, memento): self.elements = list(memento._elements)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 270)
class Memento {
public:
    virtual ~Memento();
private:
    friend class Originator;
    Memento();
    void SetState(State*);
    State* GetState();
    State* _state;
};`
    },
    realWorldUses: [
      "Mecanismo de 'Save Game' em jogos digitais.",
      "Rollback de Transações de Banco de Dados (`SAVEPOINT`).",
      "Git Stash / Checkpoints de VCS.",
      "Histórico de Navegação do Navegador (`window.history.pushState()`)."
    ],
    relatedPatterns: [
      "Command: Comandos podem usar Mementos para armazenar o estado necessário para operações de Undo.",
      "Iterator: Mementos podem ser usados para capturar o estado da iteração."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 266-274",
      "Refactoring Guru - Memento Pattern"
    ]
  },

  {
    id: "observer",
    name: "Observer",
    ptName: "Observador",
    originalName: "Observer",
    category: "comportamental",
    scope: "objeto",
    gofPage: 274,
    aliases: ["Dependents", "Publish-Subscribe (Publicador-Assinante)"],
    intent: "Definir uma dependência um-para-muitos entre objetos, de maneira que, quando um objeto muda de estado, todos os seus dependentes são automaticamente notificados e atualizados.",
    hasPlayground: true,
    playgroundId: "observer-lab",
    problemAndMotivation: `Pense em um dashboard financeiro ou numa planilha: quando o valor de uma ação ou célula muda, múltiplos componentes visuais precisam atualizar imediatamente (um gráfico de barras, um velocímetro, um log de histórico e um alerta por email).
Se o objeto de dados precisar conhecer cada tela e chamar métodos específicos em cada uma, haverá um acoplamento fortíssimo entre a camada de dados e a interface gráfica.`,
    solution: `O padrão Observer estabelece o modelo Publicador/Assinante. O objeto com os dados é o 'Subject' (Assunto). Os componentes interessados implementam a interface 'Observer' contendo o método 'update()'.
O Subject mantém apenas uma lista de observadores genéricos. Quando seu estado muda, ele dispara 'notify()', iterando sobre a lista e chamando 'update()' em cada observador sem saber quem ou o que eles são.`,
    structure: {
      participants: [
        { name: "Subject", role: "Conhece seus observadores e fornece interface para adicionar (attach) e remover (detach) observadores." },
        { name: "Observer", role: "Define uma interface de atualização para objetos que devem ser notificados sobre mudanças." },
        { name: "ConcreteSubject", role: "Armazena o estado real de interesse e notifica os observadores quando ele muda." },
        { name: "ConcreteObserver", role: "Mantém uma referência ao ConcreteSubject e implementa update() para sincronizar seu estado." }
      ],
      collaborations: "O ConcreteSubject notifica seus observadores. Os observadores consultam o Subject para obter os novos dados."
    },
    applicability: [
      "Quando uma abstração tiver dois aspectos, um dependente do outro, e você quiser encapsulá-los separadamente.",
      "Quando a mudança em um objeto exigir mudanças em outros objetos, e você não souber a priori quantos objetos precisam mudar.",
      "Quando um objeto precisar notificar outros sem fazer suposições sobre quem são esses objetos (acoplamento fraco)."
    ],
    consequences: {
      pros: [
        "Acoplamento abstrato e mínimo entre Subject e Observer.",
        "Suporte a broadcast automático: a notificação é distribuída sem exigir que o remetente conheça os receptores.",
        "Adicionar novos observadores em tempo de execução sem alterar o código do publicador."
      ],
      cons: [
        "Atualizações inesperadas e cascatas de recálculo: uma mudança simples pode disparar uma cadeia cara de notificações se não houver cuidado.",
        "Risco de vazamento de memória (Lapsed Listener Problem) se observadores esquecerem de se desinscrever."
      ]
    },
    implementationNotes: [
      "Modelo Push vs Pull: No modelo Push, o Subject envia os detalhes da mudança nos parâmetros de update(); no modelo Pull, o Subject só avisa que mudou e o Observer busca o que precisa.",
      "ChangeManager: Para relações complexas de dependências em grafos (DAG), usa-se um mediador que consolida notificações evitando atualizações redundantes."
    ],
    codeExamples: {
      typescript: `// Interface Observer
interface StockObserver {
  update(symbol: string, price: number): void;
}

// Subject (Publicador)
class StockMarket {
  private observers: StockObserver[] = [];
  private prices: Map<string, number> = new Map();

  subscribe(observer: StockObserver): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: StockObserver): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  setPrice(symbol: string, price: number): void {
    this.prices.set(symbol, price);
    this.notify(symbol, price);
  }

  private notify(symbol: string, price: number): void {
    for (const observer of this.observers) {
      observer.update(symbol, price);
    }
  }
}

// Observadores Concretos
class StockDisplay implements StockObserver {
  update(symbol: string, price: number): void {
    console.log(\`[Painel Visual] Cotação atualizada: \${symbol} = R$ \${price.toFixed(2)}\`);
  }
}

class PriceAlertBot implements StockObserver {
  update(symbol: string, price: number): void {
    if (price > 100) {
      console.log(\`[Alerta Bot] \${symbol} ultrapassou R$ 100! Valor: R$ \${price.toFixed(2)}\`);
    }
  }
}`,
      java: `// Exemplo com PropertyChangeListener moderno
public class NewsAgency {
    private PropertyChangeSupport support = new PropertyChangeSupport(this);
    public void addObserver(PropertyChangeListener l) { support.addPropertyChangeListener(l); }
    public void setNews(String news) { support.firePropertyChange("news", null, news); }
}`,
      python: `class Subject:
    def __init__(self): self._observers = []
    def attach(self, obs): self._observers.append(obs)
    def notify(self, data):
        for obs in self._observers: obs.update(data)`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 276)
void Subject::Notify() {
    ListIterator<Observer*> i(_observers);
    for (i.First(); !i.IsDone(); i.Next()) {
        i.CurrentItem()->Update(this);
    }
}`
    },
    realWorldUses: [
      "DOM Event Listeners: `button.addEventListener('click', handler)` é um Observer puro.",
      "RxJS e Programação Reativa: `Observable`, `Subject`, `Observer`.",
      "Vue Reactivity & MobX: Rastreamento automático de dependências com get/set e Proxy.",
      "Message Brokers: Canais de Publish/Subscribe no Redis e Apache Kafka."
    ],
    relatedPatterns: [
      "Mediator: Observer distribui a comunicação desacoplada; Mediator centraliza o controle.",
      "Singleton: O gerenciador de eventos ou ChangeManager costuma ser um Singleton."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 274-284",
      "Refactoring Guru - Observer Pattern"
    ]
  },

  {
    id: "state",
    name: "State",
    ptName: "Estado",
    originalName: "State",
    category: "comportamental",
    scope: "objeto",
    gofPage: 284,
    aliases: ["Objects for States"],
    intent: "Permite a um objeto alterar seu comportamento quando o seu estado interno muda. O objeto parecerá ter mudado de classe.",
    hasPlayground: true,
    playgroundId: "state-lab",
    problemAndMotivation: `Pense em um reprodutor de mídia (Tocando, Pausado, Parado) ou numa conexão TCP (Listening, Established, Closed).
Em cada estado, o botão 'Play' ou o método 'open()' deve ter um comportamento totalmente diferente.
Uma abordagem tradicional gera métodos gigantescos cheios de condicionais:
'if (estado == TOCANDO) pausar() else if (estado == PAUSADO) retomar() else if...'.
Adicionar um novo estado vira um pesadelo de modificar dezenas de switches em várias classes.`,
    solution: `O padrão State encapsula cada estado em uma classe separada herdando de uma interface 'State'.
O objeto de contexto ('TCPConnection' ou 'MediaPlayer') mantém uma referência para o objeto do estado corrente e simplesmente delega as ações para ele. Quando ocorre uma transição, o contexto substitui a instância do estado corrente por outra, alterando o comportamento do objeto sem nenhum 'if/else' monolítico.`,
    structure: {
      participants: [
        { name: "Context", role: "Define a interface de interesse dos clientes e mantém uma referência para a subclasse ConcreteState corrente." },
        { name: "State", role: "Define uma interface para encapsular o comportamento associado a um determinado estado." },
        { name: "ConcreteState", role: "Subclasses que implementam o comportamento associado a cada estado específico e orquestram transições." }
      ],
      collaborations: "O Context delega requisições para o ConcreteState atual. O ConcreteState pode mudar o estado do Context chamando context.setState()."
    },
    applicability: [
      "Quando o comportamento de um objeto depender do seu estado e ele precisar mudar de comportamento dinamicamente em tempo de execução.",
      "Para substituir estruturas condicionais gigantes ('switch-case' ou 'if-else') baseadas em enumerações de estado.",
      "Para tornar transições de máquinas de estados explícitas, atômicas e estruturadas em classes dedicadas."
    ],
    consequences: {
      pros: [
        "Confina comportamentos específicos de estados em classes separadas, eliminando condicionais espalhadas.",
        "Torna as transições de estado atômicas e explícitas.",
        "Facilita adicionar novos estados sem quebrar os estados existentes (Open/Closed Principle)."
      ],
      cons: [
        "Aumenta o número de classes no projeto se a máquina de estados tiver apenas 2 ou 3 estados simples."
      ]
    },
    implementationNotes: [
      "Quem define as transições? Podem ser definidas no Context ou (mais flexível) nas próprias subclasses de State.",
      "Compartilhamento de estados: Se os objetos de estado não tiverem variáveis de instância próprias, podem ser implementados como Flyweights compartilhados."
    ],
    codeExamples: {
      typescript: `interface AudioPlayerState {
  play(player: AudioPlayer): string;
  pause(player: AudioPlayer): string;
  stop(player: AudioPlayer): string;
}

class AudioPlayer {
  private state: AudioPlayerState = new StoppedState();

  setState(state: AudioPlayerState): void {
    this.state = state;
  }

  play = (): string => this.state.play(this);
  pause = (): string => this.state.pause(this);
  stop = (): string => this.state.stop(this);
}

class StoppedState implements AudioPlayerState {
  play(player: AudioPlayer): string {
    player.setState(new PlayingState());
    return "Iniciando reprodução da música...";
  }
  pause(): string { return "Não é possível pausar: reprodutor parado."; }
  stop(): string { return "Já está parado."; }
}

class PlayingState implements AudioPlayerState {
  play(): string { return "Já está tocando!"; }
  pause(player: AudioPlayer): string {
    player.setState(new PausedState());
    return "Música pausada.";
  }
  stop(player: AudioPlayer): string {
    player.setState(new StoppedState());
    return "Reprodução interrompida.";
  }
}

class PausedState implements AudioPlayerState {
  play(player: AudioPlayer): string {
    player.setState(new PlayingState());
    return "Retomando música de onde parou...";
  }
  pause(): string { return "Já está em pausa."; }
  stop(player: AudioPlayer): string {
    player.setState(new StoppedState());
    return "Parando do estado de pausa.";
  }
}`,
      java: `public class TCPConnection {
    private TCPState state;
    public void setState(TCPState s) { this.state = s; }
    public void activeOpen() { state.activeOpen(this); }
    public void close() { state.close(this); }
}`,
      python: `class State(ABC):
    @abstractmethod
    def handle_request(self, context): pass

class ConcreteStateA(State):
    def handle_request(self, context):
        print("Estado A atendendo e mudando para B")
        context.state = ConcreteStateB()`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 289)
void TCPConnection::ActiveOpen() {
    _state->ActiveOpen(this);
}
void TCPClosed::ActiveOpen(TCPConnection* t) {
    // envia SYN, recebe SYN, ACK, etc.
    ChangeState(t, TCPEstablished::Instance());
}`
    },
    realWorldUses: [
      "Protocolos de Rede: Máquinas de estado TCP, WebSockets, Bluetooth.",
      "Workflows de Pedidos: 'Carrinho' -> 'Aguardando Pagamento' -> 'Pago' -> 'Enviado' -> 'Entregue'.",
      "Bibliotecas de State Machine (XState em TypeScript/JavaScript, Spring State Machine em Java)."
    ],
    relatedPatterns: [
      "Flyweight: Objetos State sem atributos locais podem ser compartilhados como flyweights.",
      "Singleton: Frequentemente cada subclasse ConcreteState é implementada como um Singleton.",
      "Strategy: Possuem estruturas de classe quase idênticas, mas o State varia conforme o estado interno do objeto, enquanto o Strategy varia a pedido do cliente."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 284-292",
      "Refactoring Guru - State Pattern"
    ]
  },

  {
    id: "strategy",
    name: "Strategy",
    ptName: "Estratégia",
    originalName: "Strategy",
    category: "comportamental",
    scope: "objeto",
    gofPage: 292,
    aliases: ["Policy (Política)"],
    intent: "Definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis. O Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam.",
    hasPlayground: true,
    playgroundId: "strategy-lab",
    problemAndMotivation: `Considere uma aplicação de e-commerce que calcula frete de entrega. Existem múltiplos algoritmos: Sedex, PAC, Transportadora Privada, Frete Grátis e Retirada na Loja.
Se você colocar todos esses cálculos em um método com 'switch (tipoFrete)', a classe de Checkout ficará inflada, difícil de testar e qualquer novo método de entrega forçará a alteração da classe central.`,
    solution: `O padrão Strategy define uma interface comum 'ShippingStrategy'.
Cada algoritmo de cálculo vira uma classe concreta ('SedexStrategy', 'PacStrategy'). A classe 'Order' (Contexto) recebe uma estratégia e simplesmente a executa. O cliente pode trocar a estratégia dinamicamente em tempo de execução sem afetar o resto do sistema.`,
    structure: {
      participants: [
        { name: "Strategy", role: "Define uma interface comum para todos os algoritmos suportados (ex: ShippingStrategy, Compositor)." },
        { name: "ConcreteStrategy", role: "Implementa o algoritmo concreto usando a interface de Strategy (ex: SedexStrategy, TeXCompositor)." },
        { name: "Context", role: "Mantém uma referência para um objeto Strategy e é configurado com uma ConcreteStrategy." }
      ],
      collaborations: "O Context repassa solicitações para a Strategy, passando dados necessários ou uma referência a si próprio."
    },
    applicability: [
      "Quando muitas classes relacionadas diferem somente no seu comportamento ou algoritmo.",
      "Quando você precisa de diferentes variantes de um algoritmo (ex: velocidade vs consumo de memória).",
      "Para eliminar múltiplos blocos condicionais ('if-else' ou 'switch') que escolhem comportamentos.",
      "Para ocultar detalhes e estruturas de dados complexas específicas de um algoritmo do código cliente."
    ],
    consequences: {
      pros: [
        "Famílias de algoritmos reutilizáveis e intercambiáveis de forma limpa.",
        "Excelente alternativa à herança de classes para variar comportamentos.",
        "Elimina condicionais de controle de fluxo de negócio.",
        "Aderente ao Open/Closed Principle."
      ],
      cons: [
        "Os clientes precisam conhecer as diferenças entre as estratégias para escolher a mais adequada.",
        "Aumenta o número de objetos em memória."
      ]
    },
    implementationNotes: [
      "Passagem de dados: O Context pode passar dados via parâmetros nos métodos da Strategy ou passar a si próprio ('this').",
      "Estratégia Opcional: O Context pode definir um algoritmo padrão caso o cliente não especifique uma estratégia."
    ],
    codeExamples: {
      typescript: `// Interface Strategy
interface ShippingStrategy {
  calculate(weightInKg: number, distanceInKm: number): number;
  getName(): string;
}

// Estratégias Concretas
class SedexStrategy implements ShippingStrategy {
  calculate = (w: number, d: number) => 25.0 + (w * 2.5) + (d * 0.1);
  getName = () => "Sedex Expresso (1 a 2 dias úteis)";
}

class PacStrategy implements ShippingStrategy {
  calculate = (w: number, d: number) => 12.0 + (w * 1.2) + (d * 0.05);
  getName = () => "PAC Econômico (5 a 8 dias úteis)";
}

class FreeShippingStrategy implements ShippingStrategy {
  calculate = () => 0.0;
  getName = () => "Frete Grátis Promocional";
}

// Contexto
class ShoppingCart {
  constructor(private shippingStrategy: ShippingStrategy) {}

  setShippingStrategy(strategy: ShippingStrategy): void {
    this.shippingStrategy = strategy;
  }

  calculateTotalShipping(weight: number, distance: number): string {
    const cost = this.shippingStrategy.calculate(weight, distance);
    return \`Método: \${this.shippingStrategy.getName()} -> R$ \${cost.toFixed(2)}\`;
  }
}`,
      java: `// Uso idiomático com Expressões Lambda no Java 8+
public class Sorter {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Gamma", "Helm", "Johnson", "Vlissides");
        // Comparator é uma Strategy pura!
        names.sort((a, b) -> a.length() - b.length());
    }
}`,
      python: `class PaymentContext:
    def __init__(self, strategy):
        self.strategy = strategy
    def execute_payment(self, amount):
        return self.strategy.pay(amount)

class PixPayment:
    def pay(self, amount): return f"Pagamento de R\${amount} via Pix instantâneo"

class CreditCardPayment:
    def pay(self, amount): return f"Pagamento de R\${amount} em 12x no cartão"`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 298)
class Compositor {
public:
    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    ) = 0;
};`
    },
    realWorldUses: [
      "Java `Comparator<T>` e Python `key=lambda`: Estratégias de ordenação.",
      "Passport.js / Spring Security: Estratégias de autenticação (JWT, OAuth, Local).",
      "Processamento de Pagamentos (Pix, Cartão, Boleto, PayPal).",
      "Algoritmos de Compressão (Zip, Gzip, Tar)."
    ],
    relatedPatterns: [
      "State: Quase idêntico em diagrama estrutural, mas no Strategy os algoritmos são totalmente independentes e escolhidos pelo cliente; no State o contexto troca de estado baseado no ciclo de vida interno.",
      "Template Method: Template Method varia partes de um algoritmo via herança; Strategy varia o algoritmo inteiro via composição.",
      "Flyweight: Objetos Strategy podem ser compartilhados como flyweights."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 292-301",
      "Refactoring Guru - Strategy Pattern"
    ]
  },

  {
    id: "template-method",
    name: "Template Method",
    ptName: "Método Modelo (Gabarito)",
    originalName: "Template Method",
    category: "comportamental",
    scope: "classe",
    gofPage: 301,
    aliases: [],
    intent: "Definir o esqueleto de um algoritmo em uma operação, postergando a definição de alguns passos para subclasses. O Template Method permite que as subclasses redefinam certos passos de um algoritmo sem mudar sua estrutura.",
    hasPlayground: false,
    problemAndMotivation: `Imagine construir um pipeline de mineração de dados ou um gerador de relatórios:
Todos os relatórios seguem passos fixos: (1) abrir conexão, (2) extrair dados brutos, (3) processar regras de negócio, (4) formatar saída, (5) fechar conexão.
Se você copiar e colar esses 5 passos em cada classe de relatório, qualquer mudança na infraestrutura (ex: como fechar a conexão com segurança) exigirá alterar dezenas de classes repetidas.`,
    solution: `A superclasse define o método principal ('buildReport()') com o fluxo sequencial invariante do algoritmo.
As etapas que variam são declaradas como métodos abstratos ou métodos gancho ('hook()'). As subclasses apenas implementam ou redefinem as etapas específicas, sem poder alterar a ordem ou fluxo estabelecido pela superclasse (Princípio de Hollywood: 'Não nos chame, nós chamaremos você').`,
    structure: {
      participants: [
        { name: "AbstractClass", role: "Define operações primitivas abstratas e implementa o método-template que define o esqueleto do algoritmo." },
        { name: "ConcreteClass", role: "Implementa as operações primitivas para executar os passos específicos do algoritmo." }
      ],
      collaborations: "A ConcreteClass depende da AbstractClass para implementar os passos invariantes do algoritmo."
    },
    applicability: [
      "Para implementar as partes invariantes de um algoritmo uma única vez e deixar para as subclasses a implementação do comportamento que varia.",
      "Para fatorar comportamento comum entre subclasses e evitar duplicação de código ('refatorar para generalizar').",
      "Para controlar extensões de subclasses usando operações 'gancho' (hooks) em pontos estritamente determinados."
    ],
    consequences: {
      pros: [
        "Reutilização fundamental de código em bibliotecas e frameworks.",
        "Inversão de Controle (IoC): a classe-mãe dita o fluxo e chama as operações das subclasses.",
        "Fácil manutenção dos passos fixos em um único local."
      ],
      cons: [
        "Pode ser rígido se os clientes precisarem alterar a ordem dos passos do algoritmo.",
        "Violação fácil da intenção se a subclasse esquecer de chamar super métodos caso não sejam abstratos."
      ]
    },
    implementationNotes: [
      "Controle de Acesso: Operações primitivas abstratas devem ser protegidas (protected) para que apenas o método-template as invoque.",
      "Hooks vs Métodos Abstratos: Métodos abstratos DEVEM ser implementados; hooks possuem implementação vazia por padrão e PODEM ser sobrescritos opcionalmente."
    ],
    codeExamples: {
      typescript: `abstract class DataMiner {
  // O Template Method (Esqueleto Invariante)
  public mine(path: string): string[] {
    const rawData = this.openFile(path);
    const parsedData = this.parseData(rawData);
    const analysis = this.analyzeData(parsedData);
    this.sendReport(analysis);
    this.hookAfterExecution(); // Gancho opcional
    return analysis;
  }

  // Passos comuns implementados:
  private openFile(path: string): string {
    return \`Conteúdo bruto do arquivo em '\${path}'\`;
  }

  private sendReport(analysis: string[]): void {
    console.log("Relatório enviado por e-mail com sucesso.");
  }

  // Passos abstratos que subclasses DEVEM implementar:
  protected abstract parseData(raw: string): string[];
  protected abstract analyzeData(parsed: string[]): string[];

  // Hook opcional (implementação vazia por padrão)
  protected hookAfterExecution(): void {}
}

class PDFDataMiner extends DataMiner {
  protected parseData(raw: string): string[] {
    return ["Texto PDF extraído", "Tabela PDF decodificada"];
  }
  protected analyzeData(parsed: string[]): string[] {
    return parsed.map(item => \`[Análise PDF]: \${item}\`);
  }
}`,
      java: `// Exemplo no Spring Framework (JdbcTemplate / AbstractController)
public abstract class Game {
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();

    // Template Method final
    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
}`,
      python: `class BuildProcess(ABC):
    def build(self):
        self.compile()
        self.test()
        self.deploy()

    @abstractmethod
    def compile(self): pass
    @abstractmethod
    def test(self): pass
    def deploy(self): print("Deploy padrão no servidor")`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 305)
void View::Display() {
    SetFocus();
    DoDisplay(); // Hook redefinido pelas subclasses
    ResetFocus();
}`
    },
    realWorldUses: [
      "Ciclos de Vida em Frameworks Web: Componentes React (`componentDidMount`), Vue lifecycle hooks, Angular `ngOnInit`.",
      "Spring Framework: `JdbcTemplate`, `TransactionTemplate`.",
      "Test Frameworks: JUnit / PyTest (`setUp()`, `runTest()`, `tearDown()`)."
    ],
    relatedPatterns: [
      "Factory Method: Frequentemente chamado dentro de um Template Method para instanciar objetos.",
      "Strategy: Template Method usa herança para variar partes de um algoritmo; Strategy usa delegação para variar o algoritmo inteiro."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 301-305",
      "Refactoring Guru - Template Method Pattern"
    ]
  },

  {
    id: "visitor",
    name: "Visitor",
    ptName: "Visitante",
    originalName: "Visitor",
    category: "comportamental",
    scope: "objeto",
    gofPage: 305,
    aliases: [],
    intent: "Representar uma operação a ser executada sobre os elementos da estrutura de um objeto. O Visitor permite que você defina uma nova operação sem mudar as classes dos elementos sobre os quais opera.",
    hasPlayground: false,
    problemAndMotivation: `Imagine um compilador com nós de uma árvore de sintaxe ('VariableNode', 'AssignmentNode', 'IfNode') ou uma estrutura de equipamentos industriais.
Se você precisar adicionar operações como: (1) exportar para XML, (2) calcular custo financeiro, (3) gerar bytecode, (4) validação de regras de negócio...
A abordagem ingênua adicionaria métodos em todas as dezenas de classes de nós toda semana! Isso polui as classes, mistura regras de negócio distintas e quebra o Princípio Aberto/Fechado.`,
    solution: `O padrão Visitor empacota todas as operações relacionadas em uma classe visitante ('ExportXMLVisitor', 'CostCalculationVisitor').
Cada classe de elemento define um método estável 'accept(Visitor v) { v.visit(this); }'.
Usando a técnica de **Despacho Duplo (Double Dispatch)**, o método exato executado depende dinamicamente tanto do tipo do elemento quanto do tipo do visitante. Novos visitantes podem ser criados sem alterar nenhuma classe de elemento existente!`,
    structure: {
      participants: [
        { name: "Visitor", role: "Declara uma operação Visit para cada classe ConcreteElement na estrutura do objeto." },
        { name: "ConcreteVisitor", role: "Implementa cada operação declarada por Visitor, acumulando estados e resultados." },
        { name: "Element", role: "Define uma operação accept(Visitor) que aceita o visitante." },
        { name: "ConcreteElement", role: "Implementa accept(Visitor) chamando v.visitConcreteElement(this)." },
        { name: "ObjectStructure", role: "Estrutura (Composite ou Lista) que pode enumerar seus elementos e aceitar um visitante." }
      ],
      collaborations: "O cliente percorre a estrutura passando o Visitor. Cada elemento chama de volta o método visit correspondente à sua classe no visitante."
    },
    applicability: [
      "Quando uma estrutura de objetos contiver muitas classes com interfaces distintas e você precisar executar operações que dependem de suas classes concretas.",
      "Quando muitas operações não relacionadas precisarem ser executadas sobre a estrutura, e você quiser evitar a 'poluição' das classes de elementos.",
      "Quando as classes que definem a estrutura de objetos forem muito estáveis, mas novas operações forem adicionadas frequentemente."
    ],
    consequences: {
      pros: [
        "Facilita adicionar novas operações: basta criar um novo ConcreteVisitor sem mexer nas classes dos elementos.",
        "Reúne operações relacionadas e separa comportamentos não relacionados em classes coesas.",
        "Pode visitar elementos de hierarquias de classes não relacionadas."
      ],
      cons: [
        "Dificuldade extrema para adicionar novas classes de Elementos: cada novo elemento exige alterar a interface Visitor e todos os visitantes existentes.",
        "Pode comprometer o encapsulamento forçando os elementos a exporem estados internos para o visitante."
      ]
    },
    implementationNotes: [
      "Double Dispatch (Despacho Duplo): O mecanismo onde a chamada depende de 2 tipos em tempo de execução: o tipo do Element e o tipo do Visitor.",
      "Percurso da Estrutura: Pode ser feito pelo próprio Visitor, por um Iterator ou pela estrutura de objetos (Composite)."
    ],
    codeExamples: {
      typescript: `// Elementos
interface DocumentElement {
  accept(visitor: DocumentVisitor): string;
}

class TextParagraph implements DocumentElement {
  constructor(public text: string) {}
  accept(visitor: DocumentVisitor): string {
    return visitor.visitParagraph(this); // Double Dispatch
  }
}

class ImageElement implements DocumentElement {
  constructor(public src: string, public alt: string) {}
  accept(visitor: DocumentVisitor): string {
    return visitor.visitImage(this); // Double Dispatch
  }
}

// Interface Visitor
interface DocumentVisitor {
  visitParagraph(p: TextParagraph): string;
  visitImage(img: ImageElement): string;
}

// Visitante 1: Exportador HTML
class HtmlExportVisitor implements DocumentVisitor {
  visitParagraph = (p: TextParagraph) => \`<p>\${p.text}</p>\`;
  visitImage = (img: ImageElement) => \`<img src="\${img.src}" alt="\${img.alt}" />\`;
}

// Visitante 2: Exportador Markdown
class MarkdownExportVisitor implements DocumentVisitor {
  visitParagraph = (p: TextParagraph) => \`\${p.text}\\n\\n\`;
  visitImage = (img: ImageElement) => \`![\${img.alt}](\${img.src})\`;
}

// Uso:
const doc: DocumentElement[] = [
  new TextParagraph("Introdução aos Design Patterns GoF"),
  new ImageElement("diagrama.png", "Diagrama UML")
];

const htmlExporter = new HtmlExportVisitor();
console.log(doc.map(el => el.accept(htmlExporter)).join("\\n"));`,
      java: `public interface Visitor {
    void visit(Dot d);
    void visit(Circle c);
    void visit(Rectangle r);
}

public class XMLExportVisitor implements Visitor {
    public void visit(Dot d) { /* exporta dot XML */ }
    public void visit(Circle c) { /* exporta circle XML */ }
    public void visit(Rectangle r) { /* exporta rect XML */ }
}`,
      python: `class ItemVisitor(ABC):
    @abstractmethod
    def visit_book(self, book): pass
    @abstractmethod
    def visit_fruit(self, fruit): pass

class ShoppingCartVisitor(ItemVisitor):
    def visit_book(self, book): return book.price * 0.9 # Desconto livro
    def visit_fruit(self, fruit): return fruit.weight * fruit.price_per_kg`,
      gofOriginal: `// C++ do Livro Original GoF (pág. 314)
void Chassis::Accept(EquipmentVisitor& visitor) {
    for (ListIterator<Equipment*> i(_parts); !i.IsDone(); i.Next()) {
        i.CurrentItem()->Accept(visitor);
    }
    visitor.VisitChassis(this);
}`
    },
    realWorldUses: [
      "Compiladores (TypeScript Compiler API, Babel AST, LLVM): Visitantes que transformam sintaxe, otimizam código ou checam tipos.",
      "Análise Estática de Código (ESLint, SonarQube): Percorrem a AST do código verificando code smells.",
      "Formatadores de Documentos (Prettier, pandoc)."
    ],
    relatedPatterns: [
      "Composite: Visitantes são frequentemente usados para aplicar operações complexas sobre estruturas Composite.",
      "Interpreter: Visitor pode ser usado para interpretar árvores de sintaxe sem poluir as classes de nós."
    ],
    references: [
      "GoF - Padrões de Projeto (Ed. Bookman), pág. 305-317",
      "Refactoring Guru - Visitor Pattern"
    ]
  }
];
