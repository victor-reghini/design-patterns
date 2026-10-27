/**
 * Banco de Questões e Quizzes Interativos sobre Padrões de Projeto GoF
 * Para fixação de conteúdo, com explicações detalhadas e referências às páginas do livro.
 */

export const quizzesData = [
  {
    id: "q-principles-1",
    patternId: "book-overview",
    category: "principios",
    question: "Quais são os dois princípios fundamentais de projeto orientado a objetos defendidos com veemência pelo Gang of Four (GoF)?",
    options: [
      { text: "Herde sempre para reutilizar código; e crie classes com nomes em inglês.", isCorrect: false },
      { text: "Programe para uma interface, não para uma implementação; e prefira a composição de objetos à herança de classes.", isCorrect: true },
      { text: "Toda classe deve ser um Singleton; e evite o uso de polimorfismo dinâmico.", isCorrect: false },
      { text: "Centralize o controle em um único objeto deus; e reutilize estruturas através de caixa branca.", isCorrect: false }
    ],
    explanation: "O GoF estabelece no Capítulo 1 duas regras de ouro: (1) 'Programe para uma interface, não para uma implementação' e (2) 'Prefira a composição de objetos à herança de classes', promovendo reutilização de caixa preta e desacoplamento."
  },
  {
    id: "q-lexi-1",
    patternId: "book-overview",
    category: "lexi",
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
    id: "q-abstract-factory-1",
    patternId: "abstract-factory",
    category: "criacional",
    question: "Qual é a principal intenção do padrão Abstract Factory segundo o GoF?",
    options: [
      { text: "Permitir a criação de um objeto complexo passo a passo através de um Director.", isCorrect: false },
      { text: "Fornecer uma interface para criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas.", isCorrect: true },
      { text: "Garantir que apenas uma única instância da classe exista em todo o sistema operacional.", isCorrect: false },
      { text: "Converter a interface incompatível de um componente de terceiros em uma esperada pelo cliente.", isCorrect: false }
    ],
    explanation: "A definição clássica do GoF (pág. 95) é fornecer uma interface para criação de famílias de objetos relacionados ou dependentes sem especificar suas classes concretas."
  },
  {
    id: "q-builder-1",
    patternId: "builder",
    category: "criacional",
    question: "Em que situação o padrão Builder é mais indicado do que o Abstract Factory?",
    options: [
      { text: "Quando queremos criar famílias imediatas de produtos com interfaces compatíveis de uma só vez.", isCorrect: false },
      { text: "Quando a construção de um objeto envolve múltiplos passos graduais e o processo deve permitir diferentes representações internas.", isCorrect: true },
      { text: "Quando o objeto precisa ser clonado a partir de uma cópia em memória.", isCorrect: false },
      { text: "Quando precisamos que duas interfaces incompatíveis conversem entre si.", isCorrect: false }
    ],
    explanation: "O Builder foca na construção gradual passo a passo sob o comando de um Director, enquanto o Abstract Factory entrega a família de produtos instantaneamente (pág. 104-107)."
  },
  {
    id: "q-factory-method-1",
    patternId: "factory-method",
    category: "criacional",
    question: "Qual o escopo do padrão Factory Method na matriz de classificação do GoF?",
    options: [
      { text: "Escopo de Objeto, pois trabalha com delegação dinâmica em tempo de execução.", isCorrect: false },
      { text: "Escopo de Classe, pois utiliza herança para permitir que subclasses decidam qual classe concreta instanciar.", isCorrect: true },
      { text: "Escopo Global, pois funciona como uma função utilitária estática.", isCorrect: false },
      { text: "Escopo de Componente, pois conecta pacotes inteiros de terceiros.", isCorrect: false }
    ],
    explanation: "Na Tabela 1.1 do livro (pág. 26), o Factory Method é o único padrão criacional com escopo de Classe, pois baseia-se na sobreposição de métodos virtuais por subclasses."
  },
  {
    id: "q-singleton-1",
    patternId: "singleton",
    category: "criacional",
    question: "Por que o padrão Singleton é frequentemente criticado por engenheiros de software modernos se usado em excesso?",
    options: [
      { text: "Porque ele não funciona em linguagens orientadas a objetos puras.", isCorrect: false },
      { text: "Porque introduz estado global oculto, acoplamento temporal e dificulta testes unitários automatizados.", isCorrect: true },
      { text: "Porque consome mais memória do que instanciar 50 objetos repetidos.", isCorrect: false },
      { text: "Porque exige o uso de herança múltipla obrigatória.", isCorrect: false }
    ],
    explanation: "O Singleton mascara dependências e introduz estado compartilhado mutável, impedindo o isolamento em testes unitários e gerando problemas em ambientes concorrentes."
  },
  {
    id: "q-adapter-1",
    patternId: "adapter",
    category: "estrutural",
    question: "Qual a diferença essencial entre o Adapter e o Bridge?",
    options: [
      { text: "O Adapter é sempre de classe e o Bridge é sempre funcional.", isCorrect: false },
      { text: "O Adapter faz interfaces incompatíveis existentes trabalharem juntas (pós-design); o Bridge é concebido antecipadamente para desacoplar abstração e implementação permitindo evolução independente.", isCorrect: true },
      { text: "O Adapter adiciona novas responsabilidades dinâmicas; o Bridge remove métodos de classes.", isCorrect: false },
      { text: "Não há diferença: ambos são exatamente a mesma coisa com nomes diferentes.", isCorrect: false }
    ],
    explanation: "Conforme a discussão GoF (pág. 208): 'O padrão Adapter faz as coisas funcionarem após elas terem sido projetadas; o Bridge as faz funcionarem antes que existam'."
  },
  {
    id: "q-decorator-1",
    patternId: "decorator",
    category: "estrutural",
    question: "Como o Decorator consegue adicionar responsabilidades a um objeto de forma transparente para o cliente?",
    options: [
      { text: "Ele herda de todas as classes filhas possíveis.", isCorrect: false },
      { text: "Ele implementa a mesma interface do componente que decora e repassa as chamadas para o componente envolvido, executando ações extras antes ou depois.", isCorrect: true },
      { text: "Ele converte o componente em um Singleton estático.", isCorrect: false },
      { text: "Ele altera a tabela de métodos virtuais na memória de baixo nível.", isCorrect: false }
    ],
    explanation: "O Decorator implementa a mesma interface do Component e contém uma referência para o objeto decorado (fecho transparente), permitindo aninhamento recursivo (pág. 170-173)."
  },
  {
    id: "q-facade-1",
    patternId: "facade",
    category: "estrutural",
    question: "Qual o principal benefício do padrão Façade (Fachada)?",
    options: [
      { text: "Substituir todas as classes do subsistema e impedir que clientes avançados acessem recursos complexos.", isCorrect: false },
      { text: "Fornecer uma interface unificada e simplificada de alto nível para um subsistema complexo, reduzindo o acoplamento.", isCorrect: true },
      { text: "Economizar memória RAM compartilhando estados intrínsecos.", isCorrect: false },
      { text: "Permitir múltiplos percursos em uma árvore.", isCorrect: false }
    ],
    explanation: "A Fachada fornece uma porta de entrada amigável para um conjunto complexo de classes, desacoplando os clientes das engrenagens internas do subsistema (pág. 179-182)."
  },
  {
    id: "q-flyweight-1",
    patternId: "flyweight",
    category: "estrutural",
    question: "No padrão Flyweight, o que diferencia o Estado Intrínseco do Estado Extrínseco?",
    options: [
      { text: "O estado intrínseco é armazenado no banco de dados e o extrínseco em cookies.", isCorrect: false },
      { text: "O estado intrínseco é independente do contexto e compartilhado no objeto; o estado extrínseco varia com o contexto e é passado pelo cliente.", isCorrect: true },
      { text: "O estado intrínseco é temporário e o extrínseco é permanente.", isCorrect: false },
      { text: "Ambos são idênticos e clonados via Prototype.", isCorrect: false }
    ],
    explanation: "O estado intrínseco é fixo e compartilhado (ex: o caractere 'A'); o extrínseco depende do contexto onde o objeto é exibido (ex: coordenadas X, Y na tela) (pág. 188-192)."
  },
  {
    id: "q-proxy-1",
    patternId: "proxy",
    category: "estrutural",
    question: "Qual tipo de Proxy é responsável por adiar o carregamento ou instanciação de um objeto pesado até o momento em que ele é realmente necessário?",
    options: [
      { text: "Remote Proxy", isCorrect: false },
      { text: "Protection Proxy", isCorrect: false },
      { text: "Virtual Proxy", isCorrect: true },
      { text: "Smart Reference", isCorrect: false }
    ],
    explanation: "O Virtual Proxy executa Lazy Loading (inicialização tardia) de objetos pesados como imagens de alta resolução (pág. 198-201)."
  },
  {
    id: "q-observer-1",
    patternId: "observer",
    category: "comportamental",
    question: "No padrão Observer, qual a diferença entre o modelo 'Push' e o modelo 'Pull'?",
    options: [
      { text: "No modelo Push o cliente puxa os dados do banco; no Pull o banco empurra.", isCorrect: false },
      { text: "No Push o Subject envia informações detalhadas da mudança nos argumentos de Update; no Pull o Subject apenas notifica a ocorrência e o Observer busca o que precisa.", isCorrect: true },
      { text: "Push só funciona em Java e Pull só funciona em C++.", isCorrect: false },
      { text: "No Push há apenas um observador; no Pull há infinitos observadores.", isCorrect: false }
    ],
    explanation: "O livro detalha na página 279 os modelos Push (Subject empurra os detalhes) e Pull (Subject apenas avisa e o Observer consulta sob demanda)."
  },
  {
    id: "q-command-1",
    patternId: "command",
    category: "comportamental",
    question: "Como o padrão Command suporta operações de múltiplos níveis de Desfazer (Undo) e Refazer (Redo)?",
    options: [
      { text: "Recriando o banco de dados a cada clique.", isCorrect: false },
      { text: "Armazenando os objetos Command executados em uma lista de histórico e invocando unexecute() na ordem inversa.", isCorrect: true },
      { text: "Usando herança múltipla entre o botão e a janela.", isCorrect: false },
      { text: "Reiniciando o sistema operacional.", isCorrect: false }
    ],
    explanation: "O Command encapsula a ação e seu estado inverso em unexecute(). Uma pilha de histórico navega entre passado e futuro conforme ilustrado nas páginas 74-75 do livro."
  },
  {
    id: "q-strategy-vs-state",
    patternId: "strategy",
    category: "comportamental",
    question: "Embora os diagramas UML de Strategy e State sejam quase idênticos, qual é a diferença conceitual e de intenção entre eles?",
    options: [
      { text: "O Strategy só aceita um algoritmo estático; o State altera o código-fonte em tempo de compilação.", isCorrect: false },
      { text: "No Strategy os algoritmos são independentes e escolhidos pelo cliente; no State o comportamento muda internamente e as transições são gerenciadas pelo ciclo de vida do próprio objeto.", isCorrect: true },
      { text: "O State é um padrão criacional e o Strategy é estrutural.", isCorrect: false },
      { text: "Não há nenhuma diferença prática.", isCorrect: false }
    ],
    explanation: "No Strategy o cliente passa uma estratégia intercambiável para uma tarefa; no State o objeto altera seu próprio comportamento conforme transita de estados internos."
  },
  {
    id: "q-visitor-1",
    patternId: "visitor",
    category: "comportamental",
    question: "Qual técnica o padrão Visitor utiliza para garantir que a operação executada dependa tanto do tipo do visitante quanto do tipo do elemento visitado?",
    options: [
      { text: "Despacho Duplo (Double Dispatch)", isCorrect: true },
      { text: "Herança Privada", isCorrect: false },
      { text: "Lazy Loading", isCorrect: false },
      { text: "Injeção Estática", isCorrect: false }
    ],
    explanation: "O Visitor utiliza Double Dispatch: o elemento chama 'v.visitElement(this)', onde a execução é vinculada dinamicamente ao tipo de ambos (pág. 312)."
  }
];
