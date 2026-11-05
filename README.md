# Pattern Explorer • GoF Design Patterns Interactive Visualizer

> Portal interativo de arquitetura de software inspirado no **Protocol Explorer**, demonstrando todos os **23 Padrões de Projeto do Gang of Four (GoF)** mensagem por mensagem e objeto por objeto, com animações passo a passo, decodificador de quadros de memória (Hex/ASCII), suporte multi-idiomas (**Português, English, Español**), **Modo Escuro & Modo Claro** e laboratórios práticos.

Desenvolvido por **[Victor Reghini](https://github.com/victor-reghini)**.

---

## Principais Funcionalidades

- **Simulador de Topologia & Fluxo de Mensagens (23 Padrões GoF):**
  - **115 Etapas Animadas (5 etapas por padrão)** demonstrando em tempo de execução como objetos clientes, interfaces abstratas, tabelas virtuais (`vtable`) e instâncias concretas interagem.
  - **Controles de Reprodução:** `Executar / Pausar` (Play/Pause), avanço e retrocesso passo a passo (`←` / `→`), `Reiniciar` e seletor de velocidade (`0.5x`, `1x`, `2x`).
  - **Indicadores de Camada GoF & Escopo:** Visualização imediata do propósito (`1:C Criacional`, `2:S Estrutural`, `3:B Comportamental`) e do escopo (`CLASSE` vs. `OBJETO`).
- **Inspetor de Pilha de Execução & Decodificador de Memória (Hex & ASCII):**
  - Inspirado em analisadores de pacotes como Wireshark e Protocol Explorer.
  - Decompõe cada etapa em 4 quadros de 8 bytes (`Frame Header`, `Heap Pointers Src -> Dst`, `VTable / Method Selector` e `Return / State Payload`) com destaque bidirecional de bytes.
- **Suporte Multi-Idiomas Instantâneo (`PT` • `EN` • `ES`):**
  - Alternância em tempo real entre **Português (PT-BR)**, **English (EN)** e **Español (ES)** com persistência no `localStorage`.
- **Modo Escuro & Modo Claro (WCAG AA Verificado):**
  - Tema escuro técnico de alto contraste (`#0b0f17` / `#111827`) e tema claro editorial (`#f8fafc` / `#ffffff`), ambos verificados segundo a norma WCAG AA (4.5:1 para texto normal, 3:1 para texto grande e componentes).
- **Exemplos de Código em 4 Linguagens:**
  - **TypeScript**, **Java 21**, **Python 3** e **C++ Original do GoF (1994)** com cópia em 1 clique.
- **9 Laboratórios Práticos (Sandboxes) & Sistema de Quizzes:**
  - Simulações interativas para `Observer`, `Strategy`, `Decorator`, `Command`, `State`, `Abstract Factory`, `Composite`, `Chain of Responsibility` e `Adapter`, além de quizzes comentados.

---

## Como Executar Localmente

```bash
npm install
npm run dev
```

Para gerar o pacote de produção:

```bash
npm run build
npm run preview
```

---

## Autor

- **Victor Reghini** ([github.com/victor-reghini](https://github.com/victor-reghini))
