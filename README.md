# Padrões de Projeto (GoF) • Guia Completo & Interativo

> Um portal educacional moderno, completo e interativo sobre a obra clássica **"Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos"** (*Design Patterns: Elements of Reusable Object-Oriented Software*), de **Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides** (a célebre *Gang of Four* — GoF).

---

## Visão Geral

Este projeto foi construído para ir muito além de um resumo convencional: ele **expande e atualiza a obra original de 1994** para o ecossistema de software contemporâneo, integrando exemplos de frameworks modernos (Spring Boot, React, NestJS, Express, JDK, Android), campos de prática interativos (playgrounds) e um sistema de quizzes para fixação de conteúdo.

### Principais Destaques

- **Os 23 Padrões de Projeto GoF Completos:**
  - **Criacionais (5):** Abstract Factory, Builder, Factory Method, Prototype, Singleton.
  - **Estruturais (7):** Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.
  - **Comportamentais (11):** Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor.
- **Código em Múltiplas Linguagens com 1 Clique para Copiar:**
  - **TypeScript / Modern JavaScript** (tipagem estrita e padrões limpos)
  - **Java 21+** (idiomático com interfaces e POO moderna)
  - **Python 3.12+** (com classes abstratas `ABC` e type hints)
  - **C++ Original do GoF** (código histórico documentado no livro)
- **9 Campos de Prática Interativos (Live Playgrounds):**
  - **Observer:** Mercado de ações com simulação de cotações ao vivo e múltiplos ouvintes desacoplados.
  - **Strategy:** Calculadora de checkout alternando algoritmos de frete (Sedex, PAC, Motoboy, Frete Grátis) dinamicamente.
  - **Decorator:** Customizador de café gourmet com empilhamento dinâmico de envoltórios em tempo de execução.
  - **Command:** Mini editor com pilha de histórico (Passado / Linha do Presente / Futuro), Undo, Redo e MacroCommands.
  - **State:** Máquina de estados finitos para conexão de rede TCP (`Closed`, `Listen`, `Established`).
  - **Abstract Factory:** Sandbox visual alternando famílias de interfaces gráficas (Windows 11, macOS, Linux, Motif 1995).
  - **Composite:** Explorador hierárquico de pastas e arquivos com cálculo recursivo e uniforme de tamanho total.
  - **Chain of Responsibility:** Esteira corporativa de aprovação de despesas por níveis de autoridade.
  - **Adapter:** Conversor de API moderna em JSON para webservice legado em XML/SOAP.
- **Quizzes de Fixação & Modo Certificação:**
  - Perguntas com correção imediata, justificativas técnicas e referências às páginas do livro.
  - Classificação de perfil do desenvolvedor (*Aprendiz*, *Pleno* e *Arquiteto de Software GoF*).
- **O Caso de Estudo Lexi (Capítulo 2):**
  - Análise aprofundada dos 7 problemas de engenharia do editor de documentos WYSIWYG e como os 8 padrões interagem em harmonia.
- **Fundamentos e Princípios de Arquitetura:**
  - *"Programe para uma interface, não para uma implementação"*.
  - *"Prefira a composição de objetos à herança de classes"*.
  - Análise das 8 causas clássicas de reformulação de software.
  - A Matriz do Espaço dos Padrões (Tabela 1.1) e o Grafo de Relacionamentos (Figura 1.1).
- **Modo Claro & Modo Escuro (Dark Mode):**
  - Desenvolvido primariamente em **Modo Claro** com tipografia editorial de alta legibilidade (*Outfit*, *Inter*, *JetBrains Mono*).
  - Suporte completo a **Modo Escuro**, com contraste WCAG AA e persistência da preferência no `localStorage`.
- **Navegação Lateral Estilo W3Schools:**
  - Barra de pesquisa em tempo real no menu lateral com ícone vetorial sóbrio.
  - Categorias colapsáveis e indicadores visuais de padrões já estudados com botão de bookmark.

---

## Como Executar o Projeto Localmente

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior)

### Passo a Passo

1. **Clone ou navegue até o diretório do projeto:**
   ```bash
   cd /caminho/para/design-patterns
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   *(Ou execute `npx vite --port 5188 --host` caso deseje especificar a porta).*

4. **Acesse no seu navegador:**
   ```text
   http://localhost:5188/
   ```

### Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor Vite local com Hot Module Replacement (HMR). |
| `npm run build` | Compila os arquivos para produção na pasta `dist/`. |
| `npm run preview` | Executa um servidor local servindo o build da pasta `dist/`. |

---

## Estrutura de Arquivos e Diretórios

```text
design-patterns/
├── index.html                   # Shell da página principal HTML5 com estrutura semântica
├── package.json                 # Configuração do projeto e dependências (Vite)
├── README.md                    # Este arquivo com as instruções e documentação
├── public/                      # Ativos estáticos públicos
└── src/
    ├── main.js                  # Ponto de entrada JS (inicialização do tema, rotas e eventos)
    ├── styles/
    │   ├── variables.css        # Design tokens, variáveis CSS (Light & Dark theme)
    │   ├── layout.css           # Estrutura do cabeçalho, menu lateral (sidebar) e container
    │   ├── components.css       # Estilização de cards, badges, abas de código e tabelas
    │   ├── labs.css             # Estilos dedicados aos 9 campos de prática interativos
    │   └── quiz.css             # Estilos do sistema de perguntas, feedback e pontuação
    ├── data/
    │   ├── book-overview.js     # Dados históricos do GoF, princípios de POO e estudo Lexi
    │   ├── patterns-data.js     # Base detalhada dos 23 padrões com exemplos em 4 linguagens
    │   └── quizzes-data.js      # Banco de questões comentadas com justificativas
    └── components/
        ├── icons.js             # Biblioteca de ícones vetoriais SVG sóbrios e minimalistas
        ├── theme.js             # Gerenciamento de tema Claro/Escuro com persistência
        ├── sidebar.js           # Menu lateral com busca em tempo real e contador de progresso
        ├── router.js            # Roteador SPA hash-based (`#/`, `#/padrao/:id`, `#/lexi`, etc.)
        ├── labs.js              # Implementação funcional e reativa dos 9 laboratórios práticos
        └── quiz-engine.js       # Mecanismo interativo de correção de testes e pontuação
```

---

## Mapa de Rotas do Portal

O sistema utiliza rotas baseadas em hash (`#`), permitindo acesso direto e compatibilidade total offline:

- `#/` ou `#/livro` — Apresentação da obra, biografia dos 4 autores e resumo geral.
- `#/principios` — Os 2 Princípios Centrais de POO e a comparação Herança vs Composição.
- `#/remodelacao` — As 8 Causas de Reformulação de Software e quais padrões as solucionam.
- `#/lexi` — O Estudo de Caso do Editor de Documentos "Lexi" (os 8 padrões combinados).
- `#/matriz` — A Matriz do Espaço dos Padrões (Tabela 1.1: 3 Propósitos × 2 Escopos).
- `#/relacionamentos` — Mapa de Relacionamentos e conexões entre os padrões.
- `#/padrao/:id` — Página individual com análise aprofundada de cada padrão (ex: `#/padrao/strategy`, `#/padrao/observer`, `#/padrao/abstract-factory`).
- `#/laboratorios` — Central dos 9 Campos de Prática interativos com simulações ao vivo.
- `#/quizzes` — Central de Quizzes e Desafios para fixação com filtro por categoria.
- `#/referencias` — Bibliografia técnica completa comentada.

---

## Referências Bibliográficas

1. **GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John.** *Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos.* Porto Alegre: Bookman, 2000 / 2007. (Edição original: *Design Patterns: Elements of Reusable Object-Oriented Software.* Addison-Wesley, 1994).
2. **ALEXANDER, Christopher et al.** *A Pattern Language: Towns, Buildings, Construction.* Oxford University Press, 1977.
3. **BLOCH, Joshua.** *Effective Java.* 3ª Edição. Addison-Wesley, 2018.
4. **FOWLER, Martin.** *Refactoring: Improving the Design of Existing Code.* Addison-Wesley, 1999 (2ª Ed. em 2018).
5. **MARTIN, Robert C. (Uncle Bob).** *Clean Architecture: A Craftsman's Guide to Software Structure and Design.* Prentice Hall, 2017.
6. **SHVETS, Alexander.** *Dive Into Design Patterns.* Refactoring.Guru, 2021.
