/**
 * Banco de Exercícios de Fixação, Cenários Fictícios de Arquitetura e Exercícios Práticos GoF.
 * Organizado por níveis de dificuldade (fácil, médio, difícil) e categorias.
 */

export const quizzesData = [
  // ==========================================
  // PRINCÍPIOS & FUNDAMENTOS (FÁCIL, MÉDIO, DIFÍCIL)
  // ==========================================
  {
    id: "q-principles-1",
    patternId: "book-overview",
    category: "principios",
    difficulty: "facil",
    question: "Quais são os dois princípios fundamentais de projeto orientado a objetos defendidos pelo Gang of Four (GoF) no Capítulo 1?",
    options: [
      { text: "Herde sempre para reutilizar código; e crie classes com nomes em inglês.", isCorrect: false },
      { text: "Programe para uma interface, não para uma implementação; e prefira a composição de objetos à herança de classes.", isCorrect: true },
      { text: "Toda classe deve ser um Singleton; e evite o uso de polimorfismo dinâmico.", isCorrect: false },
      { text: "Centralize o controle em um único objeto principal; e reutilize estruturas por caixa branca.", isCorrect: false }
    ],
    explanation: "O GoF estabelece no Capítulo 1 duas regras centrais: (1) 'Programe para uma interface, não para uma implementação' e (2) 'Prefira a composição de objetos à herança de classes', promovendo reutilização caixa-preta e baixo acoplamento."
  },
  {
    id: "q-principles-2",
    patternId: "book-overview",
    category: "principios",
    difficulty: "medio",
    question: "Qual é a diferença entre reutilização por 'Caixa Branca' (White-box) e reutilização por 'Caixa Preta' (Black-box) segundo o GoF?",
    options: [
      { text: "Caixa branca usa testes unitários; caixa preta usa apenas testes de integração.", isCorrect: false },
      { text: "Caixa branca baseia-se em herança de classe (detalhes internos da superclasse ficam visíveis às subclasses); caixa preta baseia-se em composição de objetos (interação apenas por interfaces bem definidas).", isCorrect: true },
      { text: "Caixa branca é exclusiva de linguagens funcionais; caixa preta é exclusiva de C++.", isCorrect: false },
      { text: "Caixa branca oculta o código-fonte em bibliotecas binárias; caixa preta expõe todos os atributos como públicos.", isCorrect: false }
    ],
    explanation: "Na herança (caixa branca), a subclasse conhece detalhes de implementação da superclasse, o que frequentemente quebra o encapsulamento. Na composição (caixa preta), os objetos conhecem apenas a interface pública uns dos outros (pág. 31-32)."
  },
  {
    id: "q-lexi-1",
    patternId: "book-overview",
    category: "principios",
    difficulty: "medio",
    question: "No estudo de caso do editor Lexi (Capítulo 2), qual padrão foi utilizado para representar a estrutura física hierárquica do documento (caracteres, linhas, colunas e páginas) de forma uniforme?",
    options: [
      { text: "Flyweight", isCorrect: false },
      { text: "Composite", isCorrect: true },
      { text: "Builder", isCorrect: false },
      { text: "Abstract Factory", isCorrect: false }
    ],
    explanation: "O padrão Composite foi utilizado na hierarquia 'Glyph' para tratar caracteres primitivos e agrupamentos complexos (linhas, colunas, páginas) com a mesma interface uniforme (pág. 50-53)."
  },
  {
    id: "q-principles-3",
    patternId: "book-overview",
    category: "principios",
    difficulty: "dificil",
    question: "Na matriz de classificação GoF (Escopo vs. Propósito), o que distingue os padrões com Escopo de Classe dos padrões com Escopo de Objeto?",
    options: [
      { text: "Padrões de classe lidam com relacionamentos estáticos definidos por herança em tempo de compilação; padrões de objeto lidam com relacionamentos dinâmicos de composição que podem mudar em tempo de execução.", isCorrect: true },
      { text: "Padrões de classe não permitem o uso de interfaces; padrões de objeto proíbem o uso de polimorfismo.", isCorrect: false },
      { text: "Padrões de classe só existem na categoria Criacional; padrões de objeto só existem na categoria Comportamental.", isCorrect: false },
      { text: "Padrões de classe alocam memória na pilha (Stack); padrões de objeto alocam memória exclusivamente no disco.", isCorrect: false }
    ],
    explanation: "Apenas 4 dos 23 padrões têm escopo de Classe (Factory Method, Adapter de Classe, Interpreter e Template Method), pois dependem diretamente de herança estática definida em tempo de compilação (pág. 26)."
  },

  // ==========================================
  // PADRÕES CRIACIONAIS (5 PADRÕES)
  // ==========================================
  {
    id: "q-abstract-factory-1",
    patternId: "abstract-factory",
    category: "criacional",
    difficulty: "facil",
    question: "Qual é a principal intenção do padrão Abstract Factory segundo o GoF?",
    options: [
      { text: "Permitir a criação de um objeto complexo passo a passo por meio de um Director.", isCorrect: false },
      { text: "Fornecer uma interface para criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.", isCorrect: true },
      { text: "Garantir que apenas uma única instância da classe exista em todo o processo.", isCorrect: false },
      { text: "Converter a interface incompatível de um componente de terceiros em uma esperada pelo cliente.", isCorrect: false }
    ],
    explanation: "A definição clássica do GoF (pág. 95) é fornecer uma interface para criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas."
  },
  {
    id: "q-abstract-factory-2",
    patternId: "abstract-factory",
    category: "criacional",
    difficulty: "dificil",
    question: "Qual é a principal desvantagem arquitetural ao utilizar o padrão Abstract Factory clássico?",
    options: [
      { text: "Impossibilidade de trocar a família de produtos em tempo de execução.", isCorrect: false },
      { text: "Adicionar um novo tipo de produto à família exige alterar a interface AbstractFactory e todas as suas subclasses ConcreteFactory.", isCorrect: true },
      { text: "O cliente fica fortemente acoplado às classes concretas de cada produto instanciado.", isCorrect: false },
      { text: "Ele impede que as fábricas concretas sejam implementadas como Singletons.", isCorrect: false }
    ],
    explanation: "Trocar de família (ex: criar uma nova ConcreteFactory) é fácil, mas introduzir um novo produto (ex: 'createSlider()') quebra a assinatura da interface base e obriga a atualização de todas as fábricas concretas existentes (pág. 98)."
  },
  {
    id: "q-builder-1",
    patternId: "builder",
    category: "criacional",
    difficulty: "facil",
    question: "Em que situação o padrão Builder é mais indicado do que o Abstract Factory?",
    options: [
      { text: "Quando queremos criar famílias imediatas de produtos com interfaces compatíveis de uma só vez.", isCorrect: false },
      { text: "Quando a construção de um objeto envolve múltiplos passos graduais e o mesmo processo deve permitir diferentes representações internas.", isCorrect: true },
      { text: "Quando o objeto precisa ser clonado a partir de uma instância prototípica em memória.", isCorrect: false },
      { text: "Quando precisamos que duas interfaces incompatíveis conversem entre si.", isCorrect: false }
    ],
    explanation: "O Builder foca na construção gradual passo a passo sob o comando de um Director (ou interface fluente), retornando o produto final como última etapa, enquanto o Abstract Factory entrega os objetos da família imediatamente (pág. 104-107)."
  },
  {
    id: "q-builder-2",
    patternId: "builder",
    category: "criacional",
    difficulty: "medio",
    question: "No padrão Builder do GoF, por que a classe abstrata 'Builder' geralmente não declara um método abstrato 'getResult()' para retornar o produto construído?",
    options: [
      { text: "Porque os produtos gerados por diferentes ConcreteBuilders podem ter representações tão distintas que não compartilham uma classe base ou interface comum.", isCorrect: true },
      { text: "Porque o produto final é sempre retornado pelo método construct() do Director como uma string JSON.", isCorrect: false },
      { text: "Porque o padrão Builder proíbe que o cliente tenha acesso ao produto construído.", isCorrect: false },
      { text: "Porque apenas métodos estáticos podem retornar instâncias em padrões criacionais.", isCorrect: false }
    ],
    explanation: "No GoF (pág. 108), um RTFReader (Director) pode usar um TextConverter para gerar um texto ASCII, um widget visual ou uma árvore de documentos. Como esses produtos não têm interface comum, o cliente busca o resultado no ConcreteBuilder específico."
  },
  {
    id: "q-factory-method-1",
    patternId: "factory-method",
    category: "criacional",
    difficulty: "facil",
    question: "Qual o escopo do padrão Factory Method na matriz de classificação do GoF?",
    options: [
      { text: "Escopo de Objeto, pois trabalha exclusivamente com delegação dinâmica sem herança.", isCorrect: false },
      { text: "Escopo de Classe, pois utiliza herança para permitir que subclasses decidam qual classe concreta instanciar.", isCorrect: true },
      { text: "Escopo Global, pois funciona como uma função utilitária estática.", isCorrect: false },
      { text: "Escopo de Componente, pois conecta pacotes inteiros de terceiros.", isCorrect: false }
    ],
    explanation: "Na Tabela 1.1 do livro (pág. 26), o Factory Method é o único padrão criacional com escopo de Classe, pois baseia-se na sobrescrita de um método de fábrica (também chamado de Construtor Virtual) por subclasses."
  },
  {
    id: "q-prototype-1",
    patternId: "prototype",
    category: "criacional",
    difficulty: "facil",
    question: "Qual é o mecanismo central utilizado pelo padrão Prototype para criar novos objetos?",
    options: [
      { text: "Instanciação direta via operador 'new' dentro de um bloco switch/case.", isCorrect: false },
      { text: "Clonagem de uma instância prototípica pré-existente por meio de uma operação 'clone()'.", isCorrect: true },
      { text: "Reflexão de metadados em banco de dados relacional.", isCorrect: false },
      { text: "Herança múltipla entre a fábrica e o produto.", isCorrect: false }
    ],
    explanation: "O Prototype especifica os tipos de objetos a criar usando uma instância-protótipo e cria novos objetos copiando (clonando) esse protótipo em tempo de execução (pág. 119)."
  },
  {
    id: "q-prototype-2",
    patternId: "prototype",
    category: "criacional",
    difficulty: "dificil",
    question: "Qual é o principal cuidado técnico que cada subclasse concreta deve ter ao implementar a operação 'clone()' no padrão Prototype?",
    options: [
      { text: "Garantir que o método clone() seja privado para que o cliente não possa chamá-lo.", isCorrect: false },
      { text: "Decidir corretamente entre cópia superficial (Shallow Copy) e cópia profunda (Deep Copy), especialmente quando o objeto contém referências para estruturas internas mutáveis ou referências circulares.", isCorrect: true },
      { text: "Converter todos os atributos primitivos em variáveis globais estáticas.", isCorrect: false },
      { text: "Apagar a instância original da memória imediatamente após a clonagem.", isCorrect: false }
    ],
    explanation: "Se um protótipo compartilha ponteiros ou listas mutáveis em uma cópia superficial (shallow copy), mutações no clone afetarão o protótipo original. Implementar cópia profunda (deep copy) é o ponto mais delicado do padrão (pág. 123)."
  },
  {
    id: "q-singleton-1",
    patternId: "singleton",
    category: "criacional",
    difficulty: "facil",
    question: "Qual problema o padrão Singleton resolve diretamente?",
    options: [
      { text: "Dividir uma classe grande em várias interfaces menores.", isCorrect: false },
      { text: "Garantir que uma classe tenha apenas uma instância e fornecer um ponto global de acesso a ela.", isCorrect: true },
      { text: "Criar cópias profundas de objetos gráficos em um editor.", isCorrect: false },
      { text: "Encaminhar requisições ao longo de uma cadeia de objetos.", isCorrect: false }
    ],
    explanation: "O Singleton garante o controle estrito sobre quantas instâncias existem (normalmente uma) e centraliza o ponto de acesso a essa instância (pág. 127)."
  },
  {
    id: "q-singleton-2",
    patternId: "singleton",
    category: "criacional",
    difficulty: "medio",
    question: "Por que o padrão Singleton é frequentemente criticado na engenharia de software moderna quando utilizado sem critério?",
    options: [
      { text: "Porque ele não funciona em linguagens orientadas a objetos modernas.", isCorrect: false },
      { text: "Porque introduz estado global oculto, acopla clientes a uma classe concreta e dificulta o isolamento em testes unitários automatizados.", isCorrect: true },
      { text: "Porque consome mais memória RAM do que instanciar centenas de objetos repetidos.", isCorrect: false },
      { text: "Porque exige o uso obrigatório de herança múltipla.", isCorrect: false }
    ],
    explanation: "O Singleton oculta dependências reais na assinatura dos métodos, compartilha estado mutável entre testes unitários e requer sincronização cuidadosa em ambientes multi-thread."
  },

  // ==========================================
  // PADRÕES ESTRUTURAIS (7 PADRÕES)
  // ==========================================
  {
    id: "q-adapter-1",
    patternId: "adapter",
    category: "estrutural",
    difficulty: "facil",
    question: "Qual é o propósito principal do padrão Adapter (também conhecido como Wrapper)?",
    options: [
      { text: "Converter a interface de uma classe em outra interface esperada pelos clientes, permitindo que classes com interfaces incompatíveis trabalhem juntas.", isCorrect: true },
      { text: "Adicionar responsabilidades visuais como bordas e barras de rolagem de forma recursiva.", isCorrect: false },
      { text: "Controlar permissões de acesso a um objeto sensível.", isCorrect: false },
      { text: "Notificar automaticamente vários objetos quando um estado muda.", isCorrect: false }
    ],
    explanation: "O Adapter atua como um tradutor intermediário entre a interface 'Target' que o cliente conhece e a interface 'Adaptee' de um componente legado ou biblioteca externa (pág. 139)."
  },
  {
    id: "q-adapter-2",
    patternId: "adapter",
    category: "estrutural",
    difficulty: "medio",
    question: "Qual a vantagem do Object Adapter (composição) sobre o Class Adapter (herança múltipla)?",
    options: [
      { text: "O Object Adapter permite que um único Adapter funcione com o Adaptee e com todas as subclasses desse Adaptee simultaneamente.", isCorrect: true },
      { text: "O Object Adapter não precisa escrever nenhum código de repasse (delegação).", isCorrect: false },
      { text: "O Object Adapter consegue sobrescrever métodos privados do Adaptee sem usar composição.", isCorrect: false },
      { text: "O Object Adapter executa sem alocar nenhuma instância na memória.", isCorrect: false }
    ],
    explanation: "Por usar composição de objetos, o Object Adapter aceita qualquer subclasse do Adaptee polimorficamente, enquanto o Class Adapter fica preso a uma classe Adaptee fixa em tempo de compilação (pág. 142)."
  },
  {
    id: "q-bridge-1",
    patternId: "bridge",
    category: "estrutural",
    difficulty: "medio",
    question: "Qual a diferença essencial entre o Adapter e o Bridge?",
    options: [
      { text: "O Adapter é sempre de classe e o Bridge é sempre funcional.", isCorrect: false },
      { text: "O Adapter faz interfaces incompatíveis existentes trabalharem juntas (pós-design); o Bridge é projetado antecipadamente para desacoplar uma abstração de sua implementação, permitindo que ambas evoluam independentemente.", isCorrect: true },
      { text: "O Adapter adiciona novas responsabilidades dinâmicas; o Bridge remove métodos de classes.", isCorrect: false },
      { text: "Não há diferença: ambos têm exatamente o mesmo objetivo e estrutura.", isCorrect: false }
    ],
    explanation: "Conforme a discussão GoF (pág. 208): 'O padrão Adapter faz as coisas funcionarem após elas terem sido projetadas; o Bridge as faz funcionarem antes que existam', evitando a explosão cartesiana de subclasses."
  },
  {
    id: "q-composite-1",
    patternId: "composite",
    category: "estrutural",
    difficulty: "facil",
    question: "Quando o padrão Composite deve ser aplicado?",
    options: [
      { text: "Quando você quer representar hierarquias parte-todo de objetos e permitir que clientes tratem objetos individuais (Folhas) e composições de objetos de maneira uniforme.", isCorrect: true },
      { text: "Quando você precisa garantir que apenas um único nó raiz possa ser instanciado sem filhos.", isCorrect: false },
      { text: "Quando uma classe possui muitos parâmetros opcionais no construtor.", isCorrect: false },
      { text: "Quando você deseja salvar um snapshot privado do estado de um objeto.", isCorrect: false }
    ],
    explanation: "O Composite compõe objetos em estruturas de árvore para representar hierarquias parte-todo, unificando folhas (Leaf) e contêineres (Composite) sob a interface Component (pág. 163)."
  },
  {
    id: "q-composite-2",
    patternId: "composite",
    category: "estrutural",
    difficulty: "dificil",
    question: "No padrão Composite, qual é o dilema clássico de design entre 'Transparência' e 'Segurança de Tipos' ao definir onde declarar os métodos de gerenciamento de filhos (add, remove)?",
    options: [
      { text: "Declarar add/remove na interface base Component oferece Transparência (cliente trata Leaf e Composite identicamente), mas reduz a Segurança (cliente pode tentar chamar add() em uma Folha).", isCorrect: true },
      { text: "Declarar add/remove apenas na classe Leaf aumenta a performance, mas impede a recursão.", isCorrect: false },
      { text: "Transparência significa tornar todos os atributos públicos; Segurança significa usar criptografia nos nós.", isCorrect: false },
      { text: "O GoF proíbe declarar add/remove na classe Component em qualquer linguagem.", isCorrect: false }
    ],
    explanation: "O GoF analisa esse trade-off nas páginas 166-167: colocar add()/remove() em Component dá transparência total ao cliente, mas exige tratar chamadas inválidas em Leaf (ex: lançando exceção ou no-op)."
  },
  {
    id: "q-decorator-1",
    patternId: "decorator",
    category: "estrutural",
    difficulty: "medio",
    question: "Como o Decorator consegue adicionar responsabilidades a um objeto individual de forma transparente e recursiva?",
    options: [
      { text: "Ele herda estaticamente de todas as classes filhas possíveis do sistema.", isCorrect: false },
      { text: "Ele implementa a mesma interface do Component que envolve (composição) e repassa as chamadas ao objeto decorado, executando comportamentos adicionais antes ou depois.", isCorrect: true },
      { text: "Ele converte o componente em um Singleton estático compartilhado.", isCorrect: false },
      { text: "Ele altera o código-fonte da classe original em tempo de compilação.", isCorrect: false }
    ],
    explanation: "O Decorator tem conformidade de interface com o Component e mantém uma referência para uma instância de Component, permitindo empilhar múltiplos decoradores dinamicamente (pág. 175)."
  },
  {
    id: "q-facade-1",
    patternId: "facade",
    category: "estrutural",
    difficulty: "facil",
    question: "Qual o principal benefício do padrão Facade (Fachada)?",
    options: [
      { text: "Bloquear e proibir que clientes avançados acessem diretamente as classes internas do subsistema.", isCorrect: false },
      { text: "Fornecer uma interface unificada e simplificada de alto nível para um conjunto de interfaces em um subsistema complexo, reduzindo o acoplamento.", isCorrect: true },
      { text: "Economizar memória RAM compartilhando estados intrínsecos entre milhões de partículas.", isCorrect: false },
      { text: "Permitir múltiplos percursos simultâneos em uma árvore binária.", isCorrect: false }
    ],
    explanation: "A Facade oferece uma visão de alto nível mais simples para a maioria dos clientes, sem encapsular ou esconder completamente as classes do subsistema para quem precisa de customização fina (pág. 185)."
  },
  {
    id: "q-flyweight-1",
    patternId: "flyweight",
    category: "estrutural",
    difficulty: "dificil",
    question: "No padrão Flyweight, o que diferencia o Estado Intrínseco do Estado Extrínseco?",
    options: [
      { text: "O estado intrínseco é armazenado no banco de dados e o extrínseco em arquivos temporários.", isCorrect: false },
      { text: "O estado intrínseco é independente do contexto, imutável e compartilhado dentro do objeto Flyweight; o estado extrínseco varia com o contexto e é armazenado ou calculado pelo cliente e passado por parâmetro.", isCorrect: true },
      { text: "O estado intrínseco é descartado após cada chamada e o extrínseco fica fixo no Singleton.", isCorrect: false },
      { text: "Ambos são idênticos e clonados via Prototype a cada frame.", isCorrect: false }
    ],
    explanation: "Para que um Flyweight (ex: o glifo da letra 'a') possa ser compartilhado em milhares de posições, tudo que depende do local (coordenadas X, Y, estilo do trecho) deve ser extrínseco (pág. 196)."
  },
  {
    id: "q-proxy-1",
    patternId: "proxy",
    category: "estrutural",
    difficulty: "facil",
    question: "Qual variação do padrão Proxy é responsável por adiar a criação e o carregamento de um objeto pesado até o momento em que ele é realmente necessário?",
    options: [
      { text: "Remote Proxy", isCorrect: false },
      { text: "Protection Proxy", isCorrect: false },
      { text: "Virtual Proxy", isCorrect: true },
      { text: "Firewall Proxy", isCorrect: false }
    ],
    explanation: "O Virtual Proxy atua como substituto leve e executa a inicialização sob demanda (Lazy Loading) de objetos caros, como imagens de alta resolução em um documento (pág. 208)."
  },

  // ==========================================
  // PADRÕES COMPORTAMENTAIS (11 PADRÕES)
  // ==========================================
  {
    id: "q-chain-1",
    patternId: "chain-of-responsibility",
    category: "comportamental",
    difficulty: "facil",
    question: "Qual é a ideia central do padrão Chain of Responsibility?",
    options: [
      { text: "Evitar o acoplamento do remetente de uma requisição ao seu receptor, dando a mais de um objeto a oportunidade de tratar a requisição ao longo de uma cadeia de sucessores.", isCorrect: true },
      { text: "Garantir que todos os objetos da lista executem obrigatoriamente a requisição em paralelo.", isCorrect: false },
      { text: "Converter uma requisição em uma tabela de banco de dados.", isCorrect: false },
      { text: "Notificar observadores sobre cliques de mouse exclusivamente.", isCorrect: false }
    ],
    explanation: "No Chain of Responsibility, cada Handler decide se processa a requisição ou se a repassa para o próximo Handler (`successor`) na corrente (pág. 223)."
  },
  {
    id: "q-command-1",
    patternId: "command",
    category: "comportamental",
    difficulty: "medio",
    question: "Como o padrão Command suporta operações de múltiplos níveis de Desfazer (Undo) e Refazer (Redo)?",
    options: [
      { text: "Recriando todas as telas da aplicação a cada clique do usuário.", isCorrect: false },
      { text: "Encapsulando a requisição como um objeto que armazena o estado necessário para reverter a ação e mantendo os comandos executados em uma lista de histórico para invocar unexecute().", isCorrect: true },
      { text: "Usando herança múltipla entre o botão (Invoker) e o documento (Receiver).", isCorrect: false },
      { text: "Delegando o controle de histórico para o padrão Abstract Factory.", isCorrect: false }
    ],
    explanation: "Como cada ação é um objeto Command com métodos execute() e unexecute(), uma lista de histórico (History List) permite voltar e avançar no tempo facilmente (pág. 238)."
  },
  {
    id: "q-interpreter-1",
    patternId: "interpreter",
    category: "comportamental",
    difficulty: "dificil",
    question: "Para qual cenário o padrão Interpreter é indicado e quando ele NÃO deve ser utilizado?",
    options: [
      { text: "Indicado quando a gramática da linguagem é simples e a eficiência não é crítica; deve ser evitado quando a gramática é complexa (muitas regras), caso em que geradores de parser ou o padrão Visitor são mais adequados.", isCorrect: true },
      { text: "Indicado para compilar sistemas operacionais inteiros em C++; nunca deve ser usado com árvores sintáticas.", isCorrect: false },
      { text: "Indicado apenas para substituir bancos de dados SQL; deve ser evitado em expressões booleanas.", isCorrect: false },
      { text: "Indicado exclusivamente quando não existe uma Árvore Sintática Abstrata (AST).", isCorrect: false }
    ],
    explanation: "O GoF alerta na página 247 que gramáticas complexas geram hierarquias enormes de classes TerminalExpression e NonterminalExpression difíceis de manter."
  },
  {
    id: "q-iterator-1",
    patternId: "iterator",
    category: "comportamental",
    difficulty: "facil",
    question: "Qual é o objetivo principal do padrão Iterator?",
    options: [
      { text: "Fornecer um meio de acessar sequencialmente os elementos de um objeto agregado (coleção) sem expor sua representação interna subjacente.", isCorrect: true },
      { text: "Ordenar automaticamente qualquer coleção em ordem alfabética.", isCorrect: false },
      { text: "Impedir que mais de um loop percorra a mesma coleção ao mesmo tempo.", isCorrect: false },
      { text: "Clonar todos os itens de uma lista antes de exibi-los.", isCorrect: false }
    ],
    explanation: "O Iterator extrai a responsabilidade de travessia de dentro da coleção (Aggregate) para um objeto iterador dedicado, permitindo múltiplos percursos simultâneos (pág. 257)."
  },
  {
    id: "q-mediator-1",
    patternId: "mediator",
    category: "comportamental",
    difficulty: "medio",
    question: "Como o padrão Mediator reduz o acoplamento entre diversos objetos (Colleagues) que interagem intensamente, como widgets em uma caixa de diálogo?",
    options: [
      { text: "Fazendo todos os objetos herdarem de uma única superclasse estática.", isCorrect: false },
      { text: "Substituindo uma malha de conexões muitos-para-muitos (N:N) por uma topologia estrela (1:N), na qual os Colleagues comunicam-se apenas com o objeto Mediator.", isCorrect: true },
      { text: "Proibindo que qualquer widget emita eventos de mudança de estado.", isCorrect: false },
      { text: "Salvando o estado dos widgets em disco a cada interação.", isCorrect: false }
    ],
    explanation: "O Mediator centraliza o protocolo de coordenação e controle: os Colleagues não se referenciam diretamente, reportando eventos apenas ao Mediator (pág. 273). O risco associado é o Mediator crescer demais e virar um 'God Object'."
  },
  {
    id: "q-memento-1",
    patternId: "memento",
    category: "comportamental",
    difficulty: "medio",
    question: "Como o padrão Memento permite salvar e restaurar o estado de um objeto (Originator) sem violar o seu encapsulamento?",
    options: [
      { text: "Tornando todos os atributos privados do Originator públicos para que o Caretaker os copie.", isCorrect: false },
      { text: "Definindo duas interfaces para o Memento: uma interface ampla (Wide) exclusiva para o Originator ler/gravar seu estado, e uma interface estreita (Narrow/Opaca) para o Caretaker apenas guardar o objeto sem inspecioná-lo.", isCorrect: true },
      { text: "Usando variáveis globais compartilhadas entre todas as classes do pacote.", isCorrect: false },
      { text: "Delegando a cópia dos campos privados para um Adapter externo.", isCorrect: false }
    ],
    explanation: "O Caretaker (zelador do histórico) segura o Memento como uma 'caixa-preta' opaca e o devolve ao Originator quando um rollback é solicitado, preservando o encapsulamento (pág. 285)."
  },
  {
    id: "q-observer-1",
    patternId: "observer",
    category: "comportamental",
    difficulty: "medio",
    question: "No padrão Observer, qual a diferença entre o modelo 'Push' e o modelo 'Pull' de notificação?",
    options: [
      { text: "No modelo Push o cliente puxa os dados do banco; no Pull o banco empurra.", isCorrect: false },
      { text: "No Push o Subject envia informações detalhadas da mudança como argumentos de update(); no Pull o Subject envia apenas uma notificação mínima e o Observer consulta o Subject para buscar o que precisa.", isCorrect: true },
      { text: "Push só funciona de forma síncrona e Pull só funciona via rede.", isCorrect: false },
      { text: "No Push há apenas um observador; no Pull há infinitos observadores.", isCorrect: false }
    ],
    explanation: "No modelo Push o Subject assume que sabe o que os Observers precisam; no modelo Pull os Observers buscam apenas os atributos relevantes do Subject após receberem o sinal (pág. 298)."
  },
  {
    id: "q-state-1",
    patternId: "state",
    category: "comportamental",
    difficulty: "facil",
    question: "Qual é o efeito direto de aplicar o padrão State em uma classe que depende de máquinas de estados?",
    options: [
      { text: "Reunir todos os estados em um único método gigante com dezenas de blocos switch/case.", isCorrect: false },
      { text: "Localizar o comportamento específico de cada estado em sua própria classe State e permitir que o objeto Context mude seu comportamento quando seu estado interno muda, parecendo ter mudado de classe.", isCorrect: true },
      { text: "Impedir que o objeto mude de estado após ser instanciado.", isCorrect: false },
      { text: "Clonar o objeto Context a cada requisição recebida.", isCorrect: false }
    ],
    explanation: "O padrão State elimina condicionais monolíticas (`if (state == ACTIVE) ... else if (state == CLOSED)`) distribuindo a lógica em subclasses polimórficas de State (pág. 305)."
  },
  {
    id: "q-strategy-vs-state",
    patternId: "strategy",
    category: "comportamental",
    difficulty: "dificil",
    question: "Embora os diagramas de classes de Strategy e State sejam muito semelhantes, qual é a diferença conceitual e de dinâmica entre eles?",
    options: [
      { text: "O Strategy só aceita algoritmos estáticos; o State altera o código-fonte em tempo de compilação.", isCorrect: false },
      { text: "No Strategy os algoritmos são independentes entre si e geralmente escolhidos/injetados pelo cliente para realizar uma tarefa; no State os estados conhecem as regras de transição do ciclo de vida do Context e transitam de um estado a outro automaticamente.", isCorrect: true },
      { text: "O State é um padrão criacional e o Strategy é estrutural.", isCorrect: false },
      { text: "No Strategy as classes concretas não implementam nenhuma interface comum.", isCorrect: false }
    ],
    explanation: "No Strategy, uma estratégia raramente conhece outra estratégia; o cliente configura qual algoritmo usar. No State, as próprias classes ConcreteState (ou o Context) governam as transições de estado ao longo do ciclo de vida."
  },
  {
    id: "q-template-method-1",
    patternId: "template-method",
    category: "comportamental",
    difficulty: "medio",
    question: "Como o padrão Template Method promove o 'Princípio de Hollywood' ('Não nos chame, nós chamaremos você')?",
    options: [
      { text: "A superclasse define o esqueleto fixo de um algoritmo em um método principal e invoca operações primitivas abstratas ou hooks implementados pelas subclasses nos momentos exatos.", isCorrect: true },
      { text: "As subclasses apagam o algoritmo da superclasse e reescrevem o fluxo inteiro do zero.", isCorrect: false },
      { text: "O cliente chama diretamente cada passo privado da subclasse em qualquer ordem.", isCorrect: false },
      { text: "O algoritmo é executado em um servidor remoto via chamadas RPC.", isCorrect: false }
    ],
    explanation: "O Template Method inverte o controle: em vez de as subclasses controlarem o fluxo e chamarem utilitários da classe pai, a classe pai controla a sequência invariante do algoritmo e chama os ganchos das subclasses (pág. 325)."
  },
  {
    id: "q-visitor-1",
    patternId: "visitor",
    category: "comportamental",
    difficulty: "dificil",
    question: "Qual técnica o padrão Visitor utiliza para garantir que a operação executada dependa tanto do tipo concreto do Visitor quanto do tipo concreto do Element visitado, e qual é sua principal limitação?",
    options: [
      { text: "Utiliza Despacho Duplo (Double Dispatch via element.accept(visitor) -> visitor.visitConcreteElement(this)); sua limitação é que adicionar novas classes ConcreteElement exige alterar a interface Visitor e todos os Visitors existentes.", isCorrect: true },
      { text: "Utiliza Reflexão Dinâmica sem interfaces; sua limitação é que não permite adicionar novas operações sobre a estrutura.", isCorrect: false },
      { text: "Utiliza Herança Múltipla em tempo de compilação; sua limitação é funcionar apenas em listas vazias.", isCorrect: false },
      { text: "Utiliza Lazy Loading; sua limitação é destruir a árvore de objetos após a primeira visita.", isCorrect: false }
    ],
    explanation: "O Visitor facilita muito adicionar novas operações (novos Visitors) sobre uma hierarquia de classes estável, mas torna custoso adicionar novas classes de Elementos na hierarquia (pág. 331-335)."
  }
];

/**
 * Cenários Fictícios de Arquitetura
 * O usuário analisa um problema realista de engenharia de software e indica qual padrão (ou combinação) é o mais ideal.
 */
export const scenariosData = [
  {
    id: "sc-1",
    title: "Motor de Cálculo de Frete em E-commerce",
    patternId: "strategy",
    category: "comportamental",
    difficulty: "facil",
    context: "Você está mantendo o módulo de checkout de uma loja virtual. A classe 'OrderCheckout' possui um método 'calculateShipping()' com 180 linhas contendo diversos blocos 'if / else if' para calcular o frete via Correios (PAC/SEDEX), Transportadora Privada, Entrega Expressa por Drone e Retirada na Loja. A cada mês a empresa fecha parceria com uma nova transportadora, obrigando a equipe a editar a classe 'OrderCheckout' e quebrando testes existentes.",
    requirements: [
      "Extrair cada regra de cálculo de frete para sua própria classe isolada.",
      "Permitir que o cliente (ou tela de checkout) troque a modalidade de entrega em tempo de execução.",
      "Eliminar as condicionais de seleção de algoritmo de dentro da classe OrderCheckout."
    ],
    question: "Qual padrão de projeto é o mais ideal para resolver este cenário?",
    options: [
      { text: "Singleton, para garantir que exista apenas uma transportadora ativa no servidor.", isCorrect: false },
      { text: "Strategy, encapsulando cada algoritmo de cálculo de frete atrás de uma interface comum 'ShippingStrategy' injetada no Checkout.", isCorrect: true },
      { text: "Observer, para notificar todas as transportadoras simultaneamente a cada cálculo.", isCorrect: false },
      { text: "Flyweight, para compartilhar o valor do frete entre diferentes pedidos.", isCorrect: false }
    ],
    explanation: "O padrão Strategy é a escolha ideal quando temos uma família de algoritmos intercambiáveis (regras de cálculo de frete) e queremos desacoplar o contexto ('OrderCheckout') da implementação concreta de cada regra, respeitando o Princípio Aberto-Fechado (OCP)."
  },
  {
    id: "sc-2",
    title: "Integração de SDK de Pagamento Legado em XML",
    patternId: "adapter",
    category: "estrutural",
    difficulty: "facil",
    context: "Sua plataforma financeira moderna processa pagamentos usando a interface 'PaymentGateway' com o método 'authorize(amount: number, currency: string): Promise<Receipt>'. A diretoria adquiriu um banco parceiro cujo sistema legado só fornece uma biblioteca fechada ('LegacyXmlBankLib') com o método 'sendSoapTransaction(xmlPayload: string): string'. Você não tem permissão para alterar o código da biblioteca legada nem deseja poluir seus serviços de negócio com conversões XML.",
    requirements: [
      "Manter o código de negócio do seu sistema utilizando exclusivamente a interface 'PaymentGateway'.",
      "Reutilizar a classe 'LegacyXmlBankLib' sem modificar seu código-fonte.",
      "Traduzir os parâmetros modernos para XML e converter a resposta em 'Receipt' de forma transparente."
    ],
    question: "Qual padrão de projeto resolve diretamente essa incompatibilidade de interfaces?",
    options: [
      { text: "Adapter (Wrapper), criando uma classe 'LegacyBankAdapter' que implementa 'PaymentGateway' e delega a chamada convertida para 'LegacyXmlBankLib'.", isCorrect: true },
      { text: "Bridge, recriando do zero tanto a biblioteca legada quanto o sistema moderno.", isCorrect: false },
      { text: "Builder, construindo o banco legado passo a passo.", isCorrect: false },
      { text: "Memento, salvando o estado do XML antes de enviar.", isCorrect: false }
    ],
    explanation: "O padrão Adapter é aplicado exatamente quando precisamos fazer com que uma classe existente com interface incompatível ('LegacyXmlBankLib') funcione com o contrato esperado pelo cliente ('PaymentGateway') sem alterar o código legado."
  },
  {
    id: "sc-3",
    title: "Monitoramento em Tempo Real de Estação Meteorológica",
    patternId: "observer",
    category: "comportamental",
    difficulty: "facil",
    context: "Um dispositivo IoT de monitoramento climático ('WeatherStation') coleta leituras de temperatura, umidade e pressão atmosférica a cada 5 segundos. Atualmente, sempre que os sensores atualizam, a estação chama diretamente métodos fixos em três painéis: 'CurrentConditionsDisplay', 'StatisticsDisplay' e 'ForecastDisplay'. Agora a equipe precisa permitir que novos painéis, alertas por SMS e registradores de log possam se inscrever ou cancelar inscrição dinamicamente em tempo de execução, sem que a classe 'WeatherStation' conheça as classes concretas desses consumidores.",
    requirements: [
      "Desacoplar a fonte de dados ('WeatherStation') dos múltiplos consumidores visuais e de alerta.",
      "Permitir anexar (attach) e desanexar (detach) consumidores dinamicamente em tempo de execução.",
      "Notificar automaticamente todos os interessados registrados sempre que uma nova leitura ocorrer."
    ],
    question: "Qual padrão de projeto é o mais indicado para este cenário?",
    options: [
      { text: "Chain of Responsibility, passando a temperatura apenas para o primeiro painel que aceitar.", isCorrect: false },
      { text: "Observer, definindo 'WeatherStation' como Subject e os painéis/alertas como implementações da interface 'Observer'.", isCorrect: true },
      { text: "Factory Method, instanciando um novo sensor a cada segundo.", isCorrect: false },
      { text: "Facade, escondendo os sensores atrás de uma única tela fixa.", isCorrect: false }
    ],
    explanation: "O padrão Observer define uma dependência um-para-muitos entre objetos para que, quando o Subject ('WeatherStation') mudar de estado, todos os seus dependentes (Observers) sejam notificados e atualizados automaticamente sem acoplamento concreto."
  },
  {
    id: "sc-4",
    title: "Gerador de Relatórios Corporativos (PDF, CSV e HTML)",
    patternId: "template-method",
    category: "comportamental",
    difficulty: "facil",
    context: "No módulo de contabilidade de um ERP, a geração de relatórios segue sempre a mesma sequência invariante de 5 etapas: (1) buscar dados brutos no banco, (2) validar integridade fiscal, (3) formatar cabeçalho, (4) serializar linhas de conteúdo e (5) assinar e exportar o arquivo. As etapas 1, 2 e 5 são idênticas para todos os formatos, mas as etapas 3 e 4 variam completamente caso o relatório seja PDF, CSV ou HTML. Hoje esse fluxo está duplicado em três classes separadas.",
    requirements: [
      "Eliminar a duplicação das etapas comuns (busca, validação e assinatura).",
      "Garantir que a ordem das 5 etapas do algoritmo nunca seja alterada por engano.",
      "Permitir que cada formato (PDF, CSV, HTML) implemente apenas as etapas de formatação de cabeçalho e serialização de linhas."
    ],
    question: "Qual padrão de projeto resolve este problema da forma mais direta e enxuta?",
    options: [
      { text: "Template Method, definindo o método esqueleto 'generateReport()' na classe base abstrata e delegando 'formatHeader()' e 'serializeRows()' como métodos abstratos para as subclasses.", isCorrect: true },
      { text: "Prototype, clonando o relatório PDF e renomeando a extensão para .csv.", isCorrect: false },
      { text: "Proxy, bloqueando a geração de relatórios grandes.", isCorrect: false },
      { text: "Mediator, fazendo o PDF conversar diretamente com o CSV.", isCorrect: false }
    ],
    explanation: "O Template Method define o esqueleto de um algoritmo em uma operação na superclasse, postergando a definição de alguns passos variáveis para as subclasses sem permitir que elas alterem a estrutura fixa do fluxo."
  },
  {
    id: "sc-5",
    title: "Pipeline Modular de Streams de Dados (Compressão, Criptografia e Base64)",
    patternId: "decorator",
    category: "estrutural",
    difficulty: "medio",
    context: "Você está desenvolvendo um serviço de backup em nuvem que grava dados através da interface 'DataStream' (com métodos 'write(data)' e 'read()'). Alguns clientes precisam apenas gravar em arquivo puro ('FileDataStream'); outros exigem compressão Gzip; outros exigem criptografia AES-256; e clientes bancários exigem Compressão + Criptografia + Codificação Base64 + Log de Auditoria combinados em qualquer ordem. Criar subclasses para cada combinação ('CompressedEncryptedBase64FileStream') gerou dezenas de classes rígidas.",
    requirements: [
      "Permitir combinar comportamentos (compressão, criptografia, base64, auditoria) dinamicamente em qualquer ordem.",
      "Evitar a explosão combinatória de subclasses.",
      "Manter total conformidade com a interface 'DataStream' para que o código cliente não saiba quantas camadas envolvem o stream."
    ],
    question: "Qual padrão de projeto é ideal para empilhar responsabilidades dinamicamente sobre um objeto?",
    options: [
      { text: "Decorator, criando envoltórios ('CompressionDecorator', 'EncryptionDecorator') que implementam 'DataStream' e envolvem outro 'DataStream' recursivamente.", isCorrect: true },
      { text: "Composite, transformando o arquivo em uma árvore de diretórios.", isCorrect: false },
      { text: "Singleton, mantendo uma única configuração global de criptografia.", isCorrect: false },
      { text: "State, mudando o estado do arquivo para fechado após a escrita.", isCorrect: false }
    ],
    explanation: "O padrão Decorator permite anexar responsabilidades adicionais a um objeto dinamicamente em camadas (como bonecas russas), oferecendo uma alternativa flexível à herança para estender funcionalidades."
  },
  {
    id: "sc-6",
    title: "Ciclo de Vida de Pedido com Regras Estritas por Etapa",
    patternId: "state",
    category: "comportamental",
    difficulty: "medio",
    context: "Em um sistema de logística, um objeto 'PurchaseOrder' passa pelos estados: 'Draft' (Rascunho), 'PendingPayment' (Aguardando Pagamento), 'Paid' (Pago), 'Shipped' (Enviado), 'Delivered' (Entregue) e 'Cancelled' (Cancelado). O comportamento dos métodos 'addItem()', 'pay()', 'cancel()' e 'ship()' muda drasticamente dependendo do estado atual (ex: não é permitido cancelar um pedido já enviado, nem adicionar itens após o pagamento). A classe 'PurchaseOrder' está com dezenas de flags booleanas ('isPaid', 'isShipped', 'isCancelled') e blocos condicionais em todos os métodos.",
    requirements: [
      "Remover os blocos condicionais baseados em flags de estado de dentro de 'PurchaseOrder'.",
      "Isolar as regras e transições permitidas de cada etapa em sua própria classe dedicada.",
      "Fazer o pedido mudar de comportamento automaticamente ao transitar de uma etapa para outra."
    ],
    question: "Qual padrão de projeto modela diretamente máquinas de estado orientadas a objetos?",
    options: [
      { text: "State, encapsulando cada etapa em uma classe que implementa 'OrderState' e delegando as operações de 'PurchaseOrder' ao objeto de estado ativo.", isCorrect: true },
      { text: "Builder, construindo o pedido em etapas fixas sem possibilidade de cancelamento.", isCorrect: false },
      { text: "Flyweight, compartilhando o mesmo pedido entre todos os clientes.", isCorrect: false },
      { text: "Iterator, percorrendo os itens do carrinho.", isCorrect: false }
    ],
    explanation: "O padrão State distribui o comportamento específico de cada estado em classes próprias ('PaidState', 'ShippedState') e gerencia as transições de forma segura, eliminando flags booleanas contraditórias e condicionais espalhadas."
  },
  {
    id: "sc-7",
    title: "Renderização de Floresta com 500.000 Árvores em Engine 2D/3D",
    patternId: "flyweight",
    category: "estrutural",
    difficulty: "medio",
    context: "Você está desenvolvendo um jogo de estratégia em tempo real. Ao renderizar um mapa com 500.000 árvores, o consumo de memória RAM ultrapassa 8 GB e o jogo trava. Inspecionando a memória, você descobre que cada instância da classe 'Tree' carrega sua própria cópia da malha poligonal (mesh) e texturas de 16 KB da espécie (Carvalho, Pinheiro, Ipê), embora existam apenas 4 espécies de árvores em todo o jogo. O que realmente muda de uma árvore para outra são apenas as coordenadas (x, y) e a escala.",
    requirements: [
      "Reduzir drasticamente o consumo de memória RAM compartilhando os dados pesados das 4 espécies.",
      "Separar os dados imutáveis da espécie (malha e textura) dos dados variáveis de contexto (coordenadas x, y e escala).",
      "Gerenciar um pool/cache das espécies já carregadas."
    ],
    question: "Qual padrão de projeto foi criado especificamente para viabilizar o suporte a grandes quantidades de objetos finos por compartilhamento?",
    options: [
      { text: "Flyweight, extraindo a malha e textura como Estado Intrínseco compartilhado em objetos 'TreeType' gerenciados por uma 'TreeFactory', e passando (x, y, scale) como Estado Extrínseco.", isCorrect: true },
      { text: "Proxy, criando 500.000 proxies vazios sem nunca desenhar as árvores.", isCorrect: false },
      { text: "Facade, criando um método 'drawForest()' que ignora as texturas.", isCorrect: false },
      { text: "Command, transformando cada árvore em uma ação desfeita.", isCorrect: false }
    ],
    explanation: "O padrão Flyweight separa o estado intrínseco (compartilhável: malha 3D, textura, cor da folhagem) do estado extrínseco (único por instância: coordenadas X e Y), reduzindo 500.000 cópias pesadas para apenas 4 instâncias 'TreeType' compartilhadas."
  },
  {
    id: "sc-8",
    title: "Kit Multi-Tema de Componentes de Interface (Acessibilidade, Dark e High-Contrast)",
    patternId: "abstract-factory",
    category: "criacional",
    difficulty: "medio",
    context: "Sua equipe desenvolve um Design System hospitalar composto por 'Modal', 'Button', 'DataTable' e 'AlertBanner'. O sistema precisa operar em três famílias visuais completas e rigorosas: 'StandardDayTheme', 'SurgicalDarkTheme' (para salas cirúrgicas com baixa luz) e 'HighContrastAccessibleTheme'. Um erro grave relatado em produção foi que algumas telas instanciaram um 'SurgicalDarkButton' dentro de um 'StandardDayModal', gerando contraste ilegível. Os elementos de famílias diferentes nunca devem ser misturados.",
    requirements: [
      "Garantir por construção que todos os widgets criados em uma sessão pertençam à mesma família visual.",
      "Permitir trocar a família inteira de componentes trocando apenas um objeto configurador na inicialização.",
      "Desacoplar o código das telas dos nomes das classes concretas de cada widget."
    ],
    question: "Qual padrão de projeto garante a criação consistente de famílias de produtos relacionados?",
    options: [
      { text: "Abstract Factory, definindo a interface 'UIThemeFactory' com métodos para criar Modal, Button, DataTable e AlertBanner coerentes para cada tema.", isCorrect: true },
      { text: "Factory Method isolado em cada tela, deixando o desenvolvedor escolher qual botão instanciar.", isCorrect: false },
      { text: "Interpreter, interpretando folhas de estilo CSS em tempo real.", isCorrect: false },
      { text: "Mediator, mediando a conversa entre o botão e a tabela.", isCorrect: false }
    ],
    explanation: "O Abstract Factory garante a consistência entre produtos de uma mesma família ('SurgicalDarkFactory' só instancia componentes da família SurgicalDark), impedindo combinações incompatíveis."
  },
  {
    id: "sc-9",
    title: "Editor Gráfico Vetorial com Desfazer/Refazer e Snapshots de Estado",
    patternId: "command",
    category: "combinado",
    difficulty: "dificil",
    context: "Você está projetando a arquitetura de um editor de diagramas semelhante ao Figma. O usuário pode mover figuras, alterar cores, agrupar nós e aplicar filtros complexos. O sistema exige: (1) uma barra de ferramentas e atalhos de teclado que disparem ações sem acoplar a UI à lógica do canvas; (2) um histórico de Undo/Redo de até 100 passos; e (3) como certas operações de filtros matriciais não possuem cálculo inverso exato, é necessário capturar um snapshot privado dos atributos internos da figura antes da operação, sem expor os campos privados da figura para o gerenciador de histórico.",
    requirements: [
      "Transformar cada ação do usuário em um objeto enfileirável e registrável no histórico.",
      "Capturar e restaurar o estado interno privado das figuras antes das operações não-invertíveis sem violar o encapsulamento.",
      "Permitir desfazer (undo) e refazer (redo) comandos em sequência."
    ],
    question: "Qual combinação de padrões do GoF resolve este cenário com precisão?",
    options: [
      { text: "Command + Memento: cada ação é um objeto Command na pilha de histórico e, antes de executar, solicita ao Originator (Figura) um objeto Memento opaco para restaurar o estado exato no unexecute().", isCorrect: true },
      { text: "Observer + Singleton: notificando o banco de dados a cada movimento do mouse.", isCorrect: false },
      { text: "Factory Method + Adapter: adaptando o mouse para o teclado.", isCorrect: false },
      { text: "Bridge + Flyweight: compartilhando o histórico entre todos os usuários da empresa.", isCorrect: false }
    ],
    explanation: "Command e Memento atuam juntos classicamente (GoF pág. 239 e 287): o Command encapsula a operação e gerencia a lista de histórico, enquanto o Memento guarda com segurança o estado interno do Originator antes da execução para viabilizar o rollback sem expor detalhes privados."
  },
  {
    id: "sc-10",
    title: "Compilador e Analisador de Árvore Sintática (TypeCheck, PrettyPrint e CodeGen)",
    patternId: "visitor",
    category: "combinado",
    difficulty: "dificil",
    context: "Você construiu a Árvore Sintática Abstrata (AST) de uma linguagem de regras financeiras. A estrutura da árvore contém nós folha ('NumberLiteral', 'VariableRef') e nós compostos ('BinaryExpression', 'ConditionalBlock', 'FunctionCall'). As classes dos nós da gramática já estão estáveis e raramente mudam. Porém, a equipe precisa adicionar constantemente novas operações sobre essa árvore: verificação de tipos, exportação para JSON, otimização de constantes, formatação visual (Pretty Print) e geração de bytecode, sem poluir as classes dos nós com dezenas de métodos diferentes.",
    requirements: [
      "Representar a árvore sintática hierárquica de expressões primárias e compostas de modo uniforme.",
      "Permitir adicionar novas operações sobre toda a árvore sem modificar as classes dos nós da AST.",
      "Executar a operação correta para cada tipo concreto de nó usando despacho duplo (Double Dispatch)."
    ],
    question: "Qual combinação de padrões de projeto é a mais indicada para este cenário?",
    options: [
      { text: "Composite + Visitor: Composite estrutura a árvore hierárquica de nós da AST, e Visitor permite criar novas operações ('TypeCheckVisitor', 'PrettyPrintVisitor') que percorrem a estrutura via accept(visitor).", isCorrect: true },
      { text: "Decorator + Proxy: envolvendo cada número em um proxy remoto.", isCorrect: false },
      { text: "Mediator + State: mudando o estado da linguagem a cada linha compilada.", isCorrect: false },
      { text: "Abstract Factory + Builder: reconstruindo o compilador a cada operação.", isCorrect: false }
    ],
    explanation: "Composite e Visitor formam uma das duplas mais poderosas do GoF (pág. 331): o Composite modela a árvore parte-todo, e o Visitor concentra em classes separadas cada algoritmo que opera sobre os elementos dessa árvore."
  },
  {
    id: "sc-11",
    title: "Motor Multi-Plataforma de Janelas e Renderizadores Gráficos (Vulkan, Metal, DirectX)",
    patternId: "bridge",
    category: "estrutural",
    difficulty: "dificil",
    context: "Sua equipe está projetando um framework gráfico que possui diferentes tipos de janelas de alto nível ('StandardWindow', 'DialogWindow', 'FloatingPalette', 'FullscreenOverlay') e precisa rodar sobre quatro APIs gráficas de baixo nível ('VulkanRenderer', 'MetalRenderer', 'DirectX12Renderer', 'WebGPURenderer'). Se você usar herança direta, precisará criar 4 x 4 = 16 subclasses ('VulkanDialogWindow', 'MetalDialogWindow', etc.), e adicionar um novo tipo de janela exigirá criar mais 4 subclasses imediatamente.",
    requirements: [
      "Evitar a explosão combinatória (produto cartesiano) de subclasses entre tipos de Janela e APIs de Renderização.",
      "Permitir adicionar novos tipos de Janela independentemente de novas APIs de Renderização.",
      "Permitir inclusive trocar o renderizador de baixo nível em tempo de execução."
    ],
    question: "Qual padrão de projeto deve ser aplicado na arquitetura deste framework?",
    options: [
      { text: "Bridge, separando a hierarquia de Abstração ('Window' e suas subclasses) da hierarquia de Implementação ('RendererImplementor': Vulkan, Metal, DirectX, WebGPU) conectadas por composição.", isCorrect: true },
      { text: "Adapter, pois o framework ainda está sendo projetado do zero e queremos acoplar as classes por herança múltipla.", isCorrect: false },
      { text: "Facade, criando uma única janela fixa que só roda em DirectX.", isCorrect: false },
      { text: "Singleton, limitando o sistema a abrir apenas uma janela por vez.", isCorrect: false }
    ],
    explanation: "O padrão Bridge desacopla uma abstração ('Window') de sua implementação ('Renderer') em duas hierarquias independentes ligadas por composição, reduzindo N x M classes para apenas N + M classes."
  },
  {
    id: "sc-12",
    title: "Pipeline de Middleware HTTP com Aprovação Escalonada de Crédito",
    patternId: "chain-of-responsibility",
    category: "comportamental",
    difficulty: "dificil",
    context: "Em um banco digital, uma solicitação de empréstimo empresarial passa por uma esteira de validação e alçada: (1) filtro anti-fraude básico; (2) verificação de score de crédito; (3) se o valor for até R$ 50 mil, o Gerente Júnior aprova automaticamente; (4) se for até R$ 500 mil, repassa ao Diretor Regional; (5) acima disso, repassa ao Comitê Executivo. A ordem das etapas de validação e alçada precisa ser configurável dinamicamente por tipo de produto bancário, e qualquer etapa pode interromper o fluxo (rejeitando ou aprovando) ou encaminhar ao próximo elo.",
    requirements: [
      "Desacoplar quem envia a solicitação de empréstimo de quem a avalia em cada etapa.",
      "Permitir compor e reordenar os elos da esteira dinamicamente.",
      "Permitir que cada elo decida se encerra o processamento ou se delega ao sucessor."
    ],
    question: "Qual padrão de projeto modela essa esteira de processamento e escalonamento?",
    options: [
      { text: "Chain of Responsibility, onde cada validador/aprovador implementa 'LoanHandler' e mantém uma referência 'next' para o sucessor na cadeia.", isCorrect: true },
      { text: "Observer, onde todos os diretores aprovam todos os empréstimos ao mesmo tempo sem hierarquia.", isCorrect: false },
      { text: "Visitor, visitando o banco de dados de clientes.", isCorrect: false },
      { text: "Prototype, clonando a dívida do cliente.", isCorrect: false }
    ],
    explanation: "O Chain of Responsibility encadeia os objetos receptores e passa a requisição ao longo da corrente até que um Handler a processe (ou interrompa a cadeia), sendo a base de pipelines de middleware e fluxos de alçada."
  }
];

/**
 * Exercícios Práticos (Mão na Massa)
 * Desafios de refatoração e implementação sem necessidade de validação automática do sistema.
 * O usuário pode praticar no rascunho interativo ou em sua IDE e comparar com a solução de referência.
 */
export const practicalExercisesData = [
  {
    id: "prac-1",
    title: "Refatorando Notificações Hardcoded com Factory Method",
    difficulty: "facil",
    category: "criacional",
    targetPatterns: ["Factory Method"],
    scenario: "Uma clínica médica possui um serviço de lembretes de consulta que instancia diretamente a classe 'EmailNotification' dentro do método de envio. Agora a clínica precisa suportar envio por SMS e WhatsApp sem acoplar a lógica de agendamento às classes concretas de cada canal.",
    starterCode: `// Código acoplado atual (Sem Padrão)
class EmailNotification {
  send(recipient: string, message: string) {
    console.log(\`[EMAIL para \${recipient}]: \${message}\`);
  }
}

class AppointmentReminderService {
  notifyPatient(patientContact: string, date: string, channel: string) {
    const msg = \`Sua consulta está confirmada para \${date}.\`;
    // Problema: acoplamento direto e condicional a cada novo canal
    if (channel === "email") {
      const notifier = new EmailNotification();
      notifier.send(patientContact, msg);
    }
  }
}`,
    steps: [
      "Crie uma interface 'Notification' com o método 'send(recipient: string, message: string): void'.",
      "Implemente as classes concretas 'EmailNotification', 'SmsNotification' e 'WhatsAppNotification'.",
      "Transforme 'AppointmentReminder' em uma classe base abstrata com o Factory Method abstrato 'createNotification(): Notification' e o método de negócio 'notifyPatient()'.",
      "Crie subclasses criadoras ('EmailReminder', 'SmsReminder', 'WhatsAppReminder') que sobrescrevem 'createNotification()'."
    ],
    hints: [
      "O método 'notifyPatient()' na classe base não deve conter nenhum 'new' nem 'if/else': ele deve chamar 'const notifier = this.createNotification()' e em seguida 'notifier.send(...)'.",
      "Cada subclasse criadora fica responsável apenas por instanciar e retornar o produto concreto correspondente."
    ],
    referenceSolution: `interface Notification {
  send(recipient: string, message: string): void;
}

class EmailNotification implements Notification {
  send(recipient: string, message: string): void {
    console.log(\`[EMAIL -> \${recipient}]: \${message}\`);
  }
}

class SmsNotification implements Notification {
  send(recipient: string, message: string): void {
    console.log(\`[SMS -> \${recipient}]: \${message}\`);
  }
}

class WhatsAppNotification implements Notification {
  send(recipient: string, message: string): void {
    console.log(\`[WHATSAPP -> \${recipient}]: \${message}\`);
  }
}

// Creator Abstrato
abstract class AppointmentReminder {
  // Factory Method
  protected abstract createNotification(): Notification;

  public notifyPatient(recipient: string, date: string): void {
    const notifier = this.createNotification();
    notifier.send(recipient, \`Consulta confirmada para \${date}.\`);
  }
}

// Concrete Creators
class EmailReminder extends AppointmentReminder {
  protected createNotification(): Notification {
    return new EmailNotification();
  }
}

class WhatsAppReminder extends AppointmentReminder {
  protected createNotification(): Notification {
    return new WhatsAppNotification();
  }
}

// Uso pelo cliente:
const reminder: AppointmentReminder = new WhatsAppReminder();
reminder.notifyPatient("+5511999999999", "14/11 às 10h");`
  },
  {
    id: "prac-2",
    title: "Eliminando Condicionais de Desconto com Strategy",
    difficulty: "facil",
    category: "comportamental",
    targetPatterns: ["Strategy"],
    scenario: "O carrinho de compras de uma livraria calcula descontos usando uma estrutura 'switch/case' baseada em strings ('REGULAR', 'VIP', 'BLACK_FRIDAY', 'COUPON'). Refatore o código para que novas políticas promocionais possam ser criadas e injetadas sem modificar a classe 'ShoppingCart'.",
    starterCode: `// Código problemático atual
class ShoppingCart {
  private totalAmount: number;

  constructor(totalAmount: number) {
    this.totalAmount = totalAmount;
  }

  calculateFinalPrice(discountType: string): number {
    if (discountType === "NONE") {
      return this.totalAmount;
    } else if (discountType === "VIP") {
      return this.totalAmount * 0.85; // 15% off
    } else if (discountType === "BLACK_FRIDAY") {
      return this.totalAmount > 200 ? this.totalAmount - 50 : this.totalAmount * 0.9;
    }
    return this.totalAmount;
  }
}`,
    steps: [
      "Declare a interface 'DiscountStrategy' com o método 'applyDiscount(amount: number): number'.",
      "Crie estratégias concretas para cada regra: 'NoDiscount', 'VipDiscount' (15%) e 'ProgressiveBlackFridayDiscount'.",
      "Refatore 'ShoppingCart' para receber uma instância de 'DiscountStrategy' (no construtor ou via 'setDiscountStrategy()').",
      "Delegue o cálculo em 'calculateFinalPrice()' para a estratégia ativa."
    ],
    hints: [
      "Você pode definir 'NoDiscount' como estratégia padrão no construtor de 'ShoppingCart' para evitar verificações de nulo (Null Object + Strategy).",
      "Teste trocar a estratégia do mesmo carrinho em tempo de execução usando um método 'setStrategy()'."
    ],
    referenceSolution: `interface DiscountStrategy {
  applyDiscount(amount: number): number;
}

class NoDiscount implements DiscountStrategy {
  applyDiscount(amount: number): number {
    return amount;
  }
}

class VipDiscount implements DiscountStrategy {
  applyDiscount(amount: number): number {
    return amount * 0.85;
  }
}

class BlackFridayDiscount implements DiscountStrategy {
  applyDiscount(amount: number): number {
    return amount > 200 ? amount - 50 : amount * 0.90;
  }
}

class ShoppingCart {
  private strategy: DiscountStrategy;

  constructor(
    private readonly totalAmount: number,
    strategy: DiscountStrategy = new NoDiscount()
  ) {
    this.strategy = strategy;
  }

  public setDiscountStrategy(strategy: DiscountStrategy): void {
    this.strategy = strategy;
  }

  public calculateFinalPrice(): number {
    return this.strategy.applyDiscount(this.totalAmount);
  }
}

// Uso:
const cart = new ShoppingCart(300, new VipDiscount());
console.log(cart.calculateFinalPrice()); // 255
cart.setDiscountStrategy(new BlackFridayDiscount());
console.log(cart.calculateFinalPrice()); // 250`
  },
  {
    id: "prac-3",
    title: "Desacoplando Provedor de Clima Externo com Adapter",
    difficulty: "facil",
    category: "estrutural",
    targetPatterns: ["Adapter"],
    scenario: "Seu painel agrícola espera objetos que implementem a interface 'WeatherProvider' retornando a temperatura em graus Celsius ('getTemperatureCelsius(city: string): number'). Porém, a nova API contratada ('UsaMeteoSdk') retorna a temperatura em Fahrenheit e exige latitude/longitude através do método 'fetchTempFahrenheit(lat: number, lon: number): number'.",
    starterCode: `// Interface esperada pelo seu domínio
interface WeatherProvider {
  getTemperatureCelsius(city: string): number;
}

// SDK de terceiros incompatível (não modifique esta classe)
class UsaMeteoSdk {
  fetchTempFahrenheit(lat: number, lon: number): number {
    return 77; // Exemplo: 77°F
  }
}

// Crie o Adapter abaixo para conectar UsaMeteoSdk ao WeatherProvider`,
    steps: [
      "Crie a classe 'UsaMeteoAdapter' implementando a interface 'WeatherProvider'.",
      "Receba uma instância de 'UsaMeteoSdk' no construtor do Adapter (Object Adapter por composição).",
      "Dentro de 'getTemperatureCelsius(city)', mapeie a cidade para coordenadas (lat, lon), chame 'fetchTempFahrenheit()' no SDK adaptado e converta o resultado de Fahrenheit para Celsius: (F - 32) * 5 / 9."
    ],
    hints: [
      "O cliente que consome 'WeatherProvider' jamais deve saber que 'UsaMeteoSdk' existe ou que houve conversão matemática de Fahrenheit para Celsius.",
      "Use um dicionário simples de cidades para coordenadas dentro do Adapter."
    ],
    referenceSolution: `interface WeatherProvider {
  getTemperatureCelsius(city: string): number;
}

class UsaMeteoSdk {
  fetchTempFahrenheit(lat: number, lon: number): number {
    return 77; // 77°F = 25°C
  }
}

class UsaMeteoAdapter implements WeatherProvider {
  private readonly cityCoords: Record<string, [number, number]> = {
    "Sao Paulo": [-23.55, -46.63],
    "Curitiba": [-25.42, -49.27]
  };

  constructor(private readonly sdk: UsaMeteoSdk) {}

  public getTemperatureCelsius(city: string): number {
    const [lat, lon] = this.cityCoords[city] ?? [0, 0];
    const fahrenheit = this.sdk.fetchTempFahrenheit(lat, lon);
    return Number(((fahrenheit - 32) * (5 / 9)).toFixed(1));
  }
}

// Uso pelo cliente:
const provider: WeatherProvider = new UsaMeteoAdapter(new UsaMeteoSdk());
console.log(provider.getTemperatureCelsius("Sao Paulo")); // 25`
  },
  {
    id: "prac-4",
    title: "Construindo Consultas SQL Complexas com Builder",
    difficulty: "medio",
    category: "criacional",
    targetPatterns: ["Builder"],
    scenario: "Desenvolvedores da sua equipe estão concatenando strings manualmente para montar queries SQL de relatórios analíticos, gerando erros de sintaxe quando cláusulas opcionais ('WHERE', 'JOIN', 'ORDER BY', 'LIMIT') são omitidas ou passadas fora de ordem. Projete um 'SqlQueryBuilder' passo a passo.",
    starterCode: `// Problema: concatenação manual propensa a bugs de sintaxe
function buildReportQuery(table: string, filters: string[], limit?: number) {
  let sql = "SELECT * FROM " + table;
  if (filters.length > 0) {
    sql += " WHERE " + filters.join(" AND ");
  }
  if (limit) {
    sql += " LIMIT " + limit;
  }
  return sql + ";";
}

// Projete uma interface Builder estruturada e um Director opcional para relatórios padrão`,
    steps: [
      "Crie o produto 'SqlQuery' contendo os campos estruturados da consulta e um método 'toSql(): string'.",
      "Defina a interface 'QueryBuilder' com passos claros: 'select(cols)', 'from(table)', 'where(condition)', 'orderBy(col, dir)' e 'limit(max)'.",
      "Implemente 'PostgresQueryBuilder' validando se a tabela foi definida antes de retornar o resultado final em 'build(): SqlQuery'.",
      "Opcional: crie uma classe 'ReportQueryDirector' com receitas prontas como 'buildTopActiveUsersQuery(builder)'."
    ],
    hints: [
      "Retornar 'this' em cada método de passo do Builder permite encadeamento fluente (Fluent Interface), mantendo a separação da construção passo a passo.",
      "No método 'build()', reinicie o estado interno do Builder (ou instancie um novo produto) para que o mesmo Builder possa construir outra query depois."
    ],
    referenceSolution: `class SqlQuery {
  constructor(
    public readonly columns: string[],
    public readonly table: string,
    public readonly conditions: string[],
    public readonly orderClause: string | null,
    public readonly limitCount: number | null
  ) {}

  public toSql(): string {
    const cols = this.columns.length ? this.columns.join(", ") : "*";
    let query = \`SELECT \${cols} FROM \${this.table}\`;
    if (this.conditions.length > 0) {
      query += \` WHERE \${this.conditions.join(" AND ")}\`;
    }
    if (this.orderClause) {
      query += \` ORDER BY \${this.orderClause}\`;
    }
    if (this.limitCount !== null) {
      query += \` LIMIT \${this.limitCount}\`;
    }
    return query + ";";
  }
}

class SqlQueryBuilder {
  private columns: string[] = [];
  private table = "";
  private conditions: string[] = [];
  private orderClause: string | null = null;
  private limitCount: number | null = null;

  public select(...cols: string[]): this {
    this.columns.push(...cols);
    return this;
  }

  public from(table: string): this {
    this.table = table;
    return this;
  }

  public where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  public orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderClause = \`\${column} \${direction}\`;
    return this;
  }

  public limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  public build(): SqlQuery {
    if (!this.table) {
      throw new Error("A cláusula FROM é obrigatória.");
    }
    return new SqlQuery(
      [...this.columns],
      this.table,
      [...this.conditions],
      this.orderClause,
      this.limitCount
    );
  }
}

// Uso:
const query = new SqlQueryBuilder()
  .select("id", "name", "email")
  .from("users")
  .where("active = true")
  .where("role = 'admin'")
  .orderBy("created_at", "DESC")
  .limit(25)
  .build();

console.log(query.toSql());`
  },
  {
    id: "prac-5",
    title: "Cliente HTTP Resiliente com Decorator (Logging, Retry e Cache)",
    difficulty: "medio",
    category: "estrutural",
    targetPatterns: ["Decorator"],
    scenario: "Você possui um cliente HTTP básico que implementa 'HttpClient { get(url: string): Promise<string> }'. Em diferentes partes do sistema, você precisa adicionar: (1) medição de tempo e log de requisições; (2) cache em memória por URL; e (3) repetição automática (Retry) em caso de falha. Implemente esses comportamentos como Decorators empilháveis.",
    starterCode: `interface HttpClient {
  get(url: string): Promise<string>;
}

class FetchHttpClient implements HttpClient {
  async get(url: string): Promise<string> {
    return \`{"url": "\${url}", "status": 200}\`;
  }
}

// Implemente HttpClientDecorator, LoggingDecorator, CacheDecorator e RetryDecorator`,
    steps: [
      "Crie a classe base 'HttpClientDecorator' que implementa 'HttpClient' e recebe 'protected readonly wrapped: HttpClient' no construtor.",
      "Implemente 'LoggingHttpDecorator' que registra no console o início e o tempo gasto na chamada de 'this.wrapped.get(url)'.",
      "Implemente 'CacheHttpDecorator' que guarda respostas em um 'Map<string, string>' e retorna imediatamente se a URL já estiver em cache.",
      "Monte uma instância combinando Logging -> Cache -> FetchHttpClient e observe a diferença entre a primeira e a segunda chamada para a mesma URL."
    ],
    hints: [
      "A ordem de empilhamento importa: se 'LoggingDecorator' envolve 'CacheDecorator', o log medirá também os hits ultrarrápidos do cache; se 'CacheDecorator' ficar por fora, chamadas em cache nem passarão pelo logger interno.",
      "Todos os decoradores devem implementar exatamente a interface 'HttpClient'."
    ],
    referenceSolution: `interface HttpClient {
  get(url: string): Promise<string>;
}

class FetchHttpClient implements HttpClient {
  async get(url: string): Promise<string> {
    return \`{"url": "\${url}", "timestamp": \${Date.now()}}\`;
  }
}

abstract class HttpClientDecorator implements HttpClient {
  constructor(protected readonly wrapped: HttpClient) {}

  abstract get(url: string): Promise<string>;
}

class CacheHttpDecorator extends HttpClientDecorator {
  private readonly cache = new Map<string, string>();

  async get(url: string): Promise<string> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }
    const response = await this.wrapped.get(url);
    this.cache.set(url, response);
    return response;
  }
}

class LoggingHttpDecorator extends HttpClientDecorator {
  async get(url: string): Promise<string> {
    const start = performance.now();
    const result = await this.wrapped.get(url);
    const elapsed = (performance.now() - start).toFixed(2);
    console.log(\`[HTTP GET] \${url} concluído em \${elapsed}ms\`);
    return result;
  }
}

// Empilhando os decoradores dinamicamente:
const client: HttpClient = new LoggingHttpDecorator(
  new CacheHttpDecorator(
    new FetchHttpClient()
  )
);`
  },
  {
    id: "prac-6",
    title: "Máquina de Estados de Player de Mídia (Playing, Paused, Locked)",
    difficulty: "medio",
    category: "comportamental",
    targetPatterns: ["State"],
    scenario: "Um player de áudio possui três botões principais: 'clickPlay()', 'clickLock()' e 'clickNext()'. Quando está no estado 'Ready', clicar em Play inicia a reprodução e muda para 'Playing'. Quando está em 'Playing', clicar em Play pausa a música (volta para 'Ready'). Em qualquer estado, clicar em Lock trava os controles ('Locked') para evitar toques acidentais no bolso.",
    starterCode: `// Refatore este AudioPlayer eliminando as flags 'isPlaying' e 'isLocked'
class AudioPlayer {
  public isPlaying = false;
  public isLocked = false;

  clickPlay() {
    if (this.isLocked) {
      console.log("Ignorado: player travado.");
      return;
    }
    if (this.isPlaying) {
      this.isPlaying = false;
      console.log("Pausando reprodução.");
    } else {
      this.isPlaying = true;
      console.log("Iniciando reprodução.");
    }
  }
}`,
    steps: [
      "Crie a interface 'PlayerState' com os métodos 'clickPlay(player: AudioPlayer): void' e 'clickLock(player: AudioPlayer): void'.",
      "Implemente os estados concretos 'ReadyState', 'PlayingState' e 'LockedState'.",
      "Na classe 'AudioPlayer' (Context), mantenha apenas o atributo 'private state: PlayerState' e um método 'changeState(next: PlayerState)'.",
      "Faça os métodos do 'AudioPlayer' delegarem diretamente para 'this.state'."
    ],
    hints: [
      "O estado 'LockedState' pode receber no construtor qual era o estado anterior ('previousState: PlayerState') para restaurá-lo exatamente como estava quando o usuário destravar o aparelho!",
      "Perceba como cada classe de estado fica pequena, coesa e sem 'if/else' aninhados."
    ],
    referenceSolution: `interface PlayerState {
  clickPlay(player: AudioPlayer): void;
  clickLock(player: AudioPlayer): void;
}

class AudioPlayer {
  private state: PlayerState;

  constructor() {
    this.state = new ReadyState();
  }

  public changeState(nextState: PlayerState): void {
    this.state = nextState;
  }

  public clickPlay(): void {
    this.state.clickPlay(this);
  }

  public clickLock(): void {
    this.state.clickLock(this);
  }
}

class ReadyState implements PlayerState {
  clickPlay(player: AudioPlayer): void {
    console.log("Iniciando reprodução...");
    player.changeState(new PlayingState());
  }

  clickLock(player: AudioPlayer): void {
    console.log("Travando player (estava parado).");
    player.changeState(new LockedState(this));
  }
}

class PlayingState implements PlayerState {
  clickPlay(player: AudioPlayer): void {
    console.log("Pausando reprodução...");
    player.changeState(new ReadyState());
  }

  clickLock(player: AudioPlayer): void {
    console.log("Travando botões enquanto a música toca.");
    player.changeState(new LockedState(this));
  }
}

class LockedState implements PlayerState {
  constructor(private readonly previousState: PlayerState) {}

  clickPlay(): void {
    console.log("Controles bloqueados. Destrave primeiro.");
  }

  clickLock(player: AudioPlayer): void {
    console.log("Destravando controles...");
    player.changeState(this.previousState);
  }
}`
  },
  {
    id: "prac-7",
    title: "Sistema de Arquivos em Memória com Auditoria (Composite + Visitor)",
    difficulty: "dificil",
    category: "estrutural",
    targetPatterns: ["Composite", "Visitor"],
    scenario: "Projete uma árvore de diretórios e arquivos em memória onde um diretório pode conter arquivos e outros subdiretórios recursivamente. Em seguida, sem adicionar métodos de relatório dentro das classes de Arquivo e Diretório, implemente dois Visitors independentes: um para calcular o tamanho total em bytes e outro para listar apenas arquivos com extensão '.log' ou '.env' (auditoria de segurança).",
    starterCode: `// Estruture a árvore com Composite (FileSystemNode, FileLeaf, DirectoryComposite)
// e desacople as operações usando Visitor (FileSystemVisitor)

interface FileSystemNode {
  readonly name: string;
  // Adicione o método accept(visitor: FileSystemVisitor): void
}

interface FileSystemVisitor {
  // Declare visitFile e visitDirectory
}`,
    steps: [
      "Defina a interface 'FileSystemNode' (Component) com 'accept(visitor: FileSystemVisitor): void'.",
      "Implemente 'FileLeaf' (com 'name' e 'sizeInBytes') e 'DirectoryComposite' (com lista de 'children: FileSystemNode[]' e método 'add()').",
      "Implemente o Double Dispatch: em 'FileLeaf.accept(v)', chame 'v.visitFile(this)'; em 'DirectoryComposite.accept(v)', chame 'v.visitDirectory(this)'.",
      "Crie 'TotalSizeVisitor' e 'SensitiveFileAuditVisitor' implementando 'FileSystemVisitor'."
    ],
    hints: [
      "Dentro de 'visitDirectory(dir)', o Visitor pode iterar sobre 'dir.getChildren()' e chamar 'child.accept(this)' para percorrer toda a subárvore recursivamente.",
      "Observe como você pode criar quantos relatórios novos quiser (ex: 'XmlExportVisitor') sem tocar em 'FileLeaf' ou 'DirectoryComposite'."
    ],
    referenceSolution: `interface FileSystemVisitor {
  visitFile(file: FileLeaf): void;
  visitDirectory(dir: DirectoryComposite): void;
}

interface FileSystemNode {
  readonly name: string;
  accept(visitor: FileSystemVisitor): void;
}

class FileLeaf implements FileSystemNode {
  constructor(
    public readonly name: string,
    public readonly sizeBytes: number
  ) {}

  accept(visitor: FileSystemVisitor): void {
    visitor.visitFile(this);
  }
}

class DirectoryComposite implements FileSystemNode {
  private readonly children: FileSystemNode[] = [];

  constructor(public readonly name: string) {}

  public add(node: FileSystemNode): this {
    this.children.push(node);
    return this;
  }

  public getChildren(): readonly FileSystemNode[] {
    return this.children;
  }

  accept(visitor: FileSystemVisitor): void {
    visitor.visitDirectory(this);
  }
}

// Visitor 1: Cálculo de Tamanho Total
class TotalSizeVisitor implements FileSystemVisitor {
  public totalBytes = 0;

  visitFile(file: FileLeaf): void {
    this.totalBytes += file.sizeBytes;
  }

  visitDirectory(dir: DirectoryComposite): void {
    for (const child of dir.getChildren()) {
      child.accept(this);
    }
  }
}

// Visitor 2: Auditoria de Arquivos Sensíveis
class SecurityAuditVisitor implements FileSystemVisitor {
  public flaggedFiles: string[] = [];

  visitFile(file: FileLeaf): void {
    if (file.name.endsWith(".env") || file.name.endsWith(".key")) {
      this.flaggedFiles.push(file.name);
    }
  }

  visitDirectory(dir: DirectoryComposite): void {
    for (const child of dir.getChildren()) {
      child.accept(this);
    }
  }
}`
  },
  {
    id: "prac-8",
    title: "Editor de Texto com Histórico Undo/Redo Seguro (Command + Memento)",
    difficulty: "dificil",
    category: "comportamental",
    targetPatterns: ["Command", "Memento"],
    scenario: "Construa o núcleo de um editor de texto que suporta comandos como 'WriteTextCommand' e 'ClearAllCommand', mantendo o estado interno do documento (texto atual e posição do cursor) protegido. Cada comando deve salvar um Memento do documento antes de modificar seu estado, permitindo desfazer múltiplas operações na ordem inversa.",
    starterCode: `// Originator: TextDocument
class TextDocument {
  private content = "";
  private cursor = 0;

  public write(text: string): void {
    this.content += text;
    this.cursor = this.content.length;
  }

  public clear(): void {
    this.content = "";
    this.cursor = 0;
  }

  public getText(): string {
    return this.content;
  }
  // Adicione createMemento() e restore(memento)
}`,
    steps: [
      "Crie a interface estreita 'DocumentMemento' (sem expor setters públicos) e a classe concreta de snapshot usada pelo 'TextDocument'.",
      "Adicione 'save(): DocumentMemento' e 'restore(m: DocumentMemento): void' na classe 'TextDocument' (Originator).",
      "Crie a interface 'EditorCommand' com 'execute(): void' e 'undo(): void'.",
      "Implemente a classe 'CommandHistory' (Invoker/Caretaker) com pilhas de 'undoStack' e 'redoStack'."
    ],
    hints: [
      "Apenas o 'TextDocument' deve conhecer a estrutura interna do snapshot; o comando e o histórico apenas guardam a referência do Memento e a devolvem em 'doc.restore(this.backup)'.",
      "Quando um novo comando é executado pelo usuário, a pilha de 'redoStack' deve ser limpa."
    ],
    referenceSolution: `// Interface estreita (opaca para o Caretaker)
interface DocumentMemento {
  readonly createdAt: number;
}

// Implementação interna do Memento
class ConcreteDocumentSnapshot implements DocumentMemento {
  public readonly createdAt = Date.now();
  constructor(
    public readonly content: string,
    public readonly cursor: number
  ) {}
}

// Originator
class TextDocument {
  private content = "";
  private cursor = 0;

  public write(text: string): void {
    this.content += text;
    this.cursor = this.content.length;
  }

  public clear(): void {
    this.content = "";
    this.cursor = 0;
  }

  public getText(): string {
    return this.content;
  }

  public save(): DocumentMemento {
    return new ConcreteDocumentSnapshot(this.content, this.cursor);
  }

  public restore(memento: DocumentMemento): void {
    const snap = memento as ConcreteDocumentSnapshot;
    this.content = snap.content;
    this.cursor = snap.cursor;
  }
}

interface EditorCommand {
  execute(): void;
  undo(): void;
}

class WriteCommand implements EditorCommand {
  private backup: DocumentMemento | null = null;

  constructor(
    private readonly doc: TextDocument,
    private readonly textToAdd: string
  ) {}

  execute(): void {
    this.backup = this.doc.save();
    this.doc.write(this.textToAdd);
  }

  undo(): void {
    if (this.backup) {
      this.doc.restore(this.backup);
    }
  }
}

class EditorHistory {
  private readonly undoStack: EditorCommand[] = [];
  private readonly redoStack: EditorCommand[] = [];

  public executeCommand(cmd: EditorCommand): void {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack.length = 0;
  }

  public undo(): void {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
    }
  }

  public redo(): void {
    const cmd = this.redoStack.pop();
    if (cmd) {
      cmd.execute();
      this.undoStack.push(cmd);
    }
  }
}`
  },
  {
    id: "prac-9",
    title: "Pipeline de Validação de Requisições API (Chain of Responsibility)",
    difficulty: "dificil",
    category: "comportamental",
    targetPatterns: ["Chain of Responsibility"],
    scenario: "Construa um pipeline de segurança para uma API REST onde cada requisição ('ApiRequest') precisa atravessar três validadores independentes em sequência: (1) 'RateLimitHandler' (verifica se o IP não excedeu o limite); (2) 'JwtAuthHandler' (verifica se o cabeçalho Authorization possui um token válido); e (3) 'RolePermissionHandler' (verifica se o usuário tem permissão 'ADMIN' para rotas críticas). Se qualquer elo reprovar, ele retorna uma resposta de erro imediatamente (curto-circuito); se aprovar, repassa ao próximo elo.",
    starterCode: `interface ApiRequest {
  ip: string;
  token?: string;
  role?: "USER" | "ADMIN";
  path: string;
}

interface ApiResponse {
  status: number;
  body: string;
}

// Implemente a classe base abstrata MiddlewareHandler e os 3 elos concretos`,
    steps: [
      "Crie a classe abstrata 'MiddlewareHandler' com o método 'linkWith(next: MiddlewareHandler): MiddlewareHandler' para facilitar o encadeamento ('h1.linkWith(h2).linkWith(h3)').",
      "Implemente o método protegido 'handleNext(req: ApiRequest): ApiResponse' que invoca o próximo elo ou retorna '{ status: 200, body: \"OK\" }' ao final da cadeia.",
      "Implemente 'RateLimitHandler', 'JwtAuthHandler' e 'RolePermissionHandler' herdando de 'MiddlewareHandler'.",
      "Monte a cadeia e teste com diferentes objetos 'ApiRequest'."
    ],
    hints: [
      "O método 'linkWith(next)' deve retornar 'next' para que você possa encadear vários handlers de forma limpa: 'auth.linkWith(rateLimit).linkWith(roleCheck)'.",
      "Você pode reordenar os elos facilmente (por exemplo, colocar 'RateLimitHandler' antes de 'JwtAuthHandler' para proteger o servidor de ataques de força bruta)."
    ],
    referenceSolution: `interface ApiRequest {
  ip: string;
  token?: string;
  role?: "USER" | "ADMIN";
  path: string;
}

interface ApiResponse {
  status: number;
  body: string;
}

abstract class MiddlewareHandler {
  private nextHandler: MiddlewareHandler | null = null;

  public linkWith(next: MiddlewareHandler): MiddlewareHandler {
    this.nextHandler = next;
    return next;
  }

  public abstract handle(req: ApiRequest): ApiResponse;

  protected handleNext(req: ApiRequest): ApiResponse {
    if (!this.nextHandler) {
      return { status: 200, body: "Requisição processada com sucesso." };
    }
    return this.nextHandler.handle(req);
  }
}

class RateLimitHandler extends MiddlewareHandler {
  constructor(private readonly blockedIps: Set<string>) {
    super();
  }

  public handle(req: ApiRequest): ApiResponse {
    if (this.blockedIps.has(req.ip)) {
      return { status: 429, body: "Too Many Requests: IP bloqueado temporariamente." };
    }
    return this.handleNext(req);
  }
}

class JwtAuthHandler extends MiddlewareHandler {
  public handle(req: ApiRequest): ApiResponse {
    if (!req.token || !req.token.startsWith("Bearer ")) {
      return { status: 401, body: "Unauthorized: Token JWT ausente ou inválido." };
    }
    return this.handleNext(req);
  }
}

class AdminRoleHandler extends MiddlewareHandler {
  public handle(req: ApiRequest): ApiResponse {
    if (req.path.startsWith("/admin") && req.role !== "ADMIN") {
      return { status: 403, body: "Forbidden: Permissão de administrador exigida." };
    }
    return this.handleNext(req);
  }
}

// Montagem da cadeia:
const pipeline = new RateLimitHandler(new Set(["10.0.0.99"]));
pipeline
  .linkWith(new JwtAuthHandler())
  .linkWith(new AdminRoleHandler());

console.log(pipeline.handle({ ip: "192.168.1.10", token: "Bearer xyz", role: "USER", path: "/admin/users" }));
// { status: 403, body: "Forbidden: Permissão de administrador exigida." }`
  }
];
