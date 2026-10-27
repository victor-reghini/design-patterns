/**
 * Roteador SPA (Single Page Application) Baseado em Hash
 * Renderiza dinamicamente as páginas individuais de cada padrão, visão geral, Lexi, labs e quizzes.
 */

import { patternsData } from "../data/patterns-data.js";
import { bookOverview } from "../data/book-overview.js";
import { quizzesData } from "../data/quizzes-data.js";
import { renderSingleQuiz, renderQuizzesPage } from "./quiz-engine.js";
import { labs } from "./labs.js";
import { getStudiedPatterns, togglePatternStudied, updateSidebarProgress } from "./sidebar.js";

export function handleRoute(contentArea) {
  const hash = window.location.hash || "#/";

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (hash === "#/" || hash === "#/livro") {
    renderHomePage(contentArea);
  } else if (hash === "#/principios") {
    renderPrinciplesPage(contentArea);
  } else if (hash === "#/remodelacao") {
    renderRedesignCausesPage(contentArea);
  } else if (hash === "#/lexi") {
    renderLexiPage(contentArea);
  } else if (hash === "#/matriz") {
    renderMatrixPage(contentArea);
  } else if (hash === "#/relacionamentos") {
    renderRelationshipsPage(contentArea);
  } else if (hash === "#/laboratorios") {
    renderLabsHubPage(contentArea);
  } else if (hash === "#/quizzes") {
    renderQuizzesPage(contentArea);
  } else if (hash === "#/referencias") {
    renderReferencesPage(contentArea);
  } else if (hash.startsWith("#/padrao/")) {
    const patternId = hash.replace("#/padrao/", "").trim();
    renderPatternPage(contentArea, patternId);
  } else {
    contentArea.innerHTML = `
      <div class="callout callout-warning">
        <h4>Página não encontrada</h4>
        <p>A rota solicitada não existe. <a href="#/">Voltar para o início</a>.</p>
      </div>
    `;
  }
}

// ----------------------------------------------------
// 1. PÁGINA INICIAL (Visão Geral do Livro & Autores)
// ----------------------------------------------------
function renderHomePage(container) {
  const studied = getStudiedPatterns();

  container.innerHTML = `
    <div class="page-action-header">
      <div class="breadcrumb text-muted" style="font-size: 0.85rem">
        GoF Padrões de Projeto ❯ <strong>Apresentação & Visão Geral</strong>
      </div>
      <a href="#/principios" class="pager-btn next-btn">Próximo: 2 Princípios de POO ❯</a>
    </div>

    <div class="hero-section">
      <span class="badge badge-scope">Livro Clássico da Engenharia de Software</span>
      <h1 class="page-title mt-2">${bookOverview.title}</h1>
      <p class="page-subtitle">${bookOverview.subtitle} • Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides</p>
    </div>

    <div class="callout callout-info">
      <h5>💡 Sobre Esta Edição Digital Expandida</h5>
      <p>Este portal tem como objetivo <strong>"resumir"</strong> a clássica obra do Gang of Four (GoF) — entre aspas porque o conteúdo foi <strong>expandido e atualizado</strong> com implementações modernas (TypeScript, Java 21, Python 3 e C++ original), exemplos de arquitetura real em frameworks consagrados (Spring, React, NestJS, Express), <strong>campos de prática interativos</strong> e <strong>quizzes de fixação</strong> com explicações ponto a ponto.</p>
    </div>

    <h2 class="section-title">👥 Os Autores (A Famosa "Gang of Four" - GoF)</h2>
    <div class="grid-2">
      ${bookOverview.authors.map(a => `
        <div class="author-pill">
          <div class="author-avatar">${a.avatar}</div>
          <div>
            <strong>${a.name}</strong>
            <p class="text-muted" style="font-size: 0.82rem; margin-top: 0.2rem">${a.bio}</p>
          </div>
        </div>
      `).join("")}
    </div>

    <h2 class="section-title">🧭 Os 4 Elementos Essenciais de um Padrão</h2>
    <p class="text-muted">Conforme definido por Christopher Alexander e adaptado pelo GoF (pág. 19), todo padrão de projeto é composto por quatro elementos indispensáveis:</p>
    <div class="grid-2 mt-3">
      ${bookOverview.patternElements.map(el => `
        <div class="info-card">
          <h4 style="color: var(--accent-primary)">${el.title}</h4>
          <p style="font-size: 0.9rem">${el.desc}</p>
        </div>
      `).join("")}
    </div>

    <h2 class="section-title">📊 Os 23 Padrões Catalogados por Categoria</h2>
    <div class="grid-3">
      <div class="info-card" style="border-top: 4px solid var(--cat-creational)">
        <span class="badge badge-creational">5 Padrões</span>
        <h4 class="mt-2">Padrões de Criação</h4>
        <p class="text-muted" style="font-size: 0.85rem">Abstraem o processo de instanciação, tornando o sistema independente de como seus objetos são criados e compostos.</p>
        <ul style="padding-left: 1.2rem; margin-top: 0.75rem; font-size: 0.88rem">
          <li><a href="#/padrao/abstract-factory">Abstract Factory</a></li>
          <li><a href="#/padrao/builder">Builder</a></li>
          <li><a href="#/padrao/factory-method">Factory Method</a></li>
          <li><a href="#/padrao/prototype">Prototype</a></li>
          <li><a href="#/padrao/singleton">Singleton</a></li>
        </ul>
      </div>

      <div class="info-card" style="border-top: 4px solid var(--cat-structural)">
        <span class="badge badge-structural">7 Padrões</span>
        <h4 class="mt-2">Padrões Estruturais</h4>
        <p class="text-muted" style="font-size: 0.85rem">Preocupam-se com a composição de classes ou objetos para formar estruturas maiores, flexíveis e eficientes.</p>
        <ul style="padding-left: 1.2rem; margin-top: 0.75rem; font-size: 0.88rem">
          <li><a href="#/padrao/adapter">Adapter</a></li>
          <li><a href="#/padrao/bridge">Bridge</a></li>
          <li><a href="#/padrao/composite">Composite</a></li>
          <li><a href="#/padrao/decorator">Decorator</a></li>
          <li><a href="#/padrao/facade">Facade</a></li>
          <li><a href="#/padrao/flyweight">Flyweight</a></li>
          <li><a href="#/padrao/proxy">Proxy</a></li>
        </ul>
      </div>

      <div class="info-card" style="border-top: 4px solid var(--cat-behavioral)">
        <span class="badge badge-behavioral">11 Padrões</span>
        <h4 class="mt-2">Padrões Comportamentais</h4>
        <p class="text-muted" style="font-size: 0.85rem">Focam nos algoritmos e na distribuição e desacoplamento de responsabilidades e comunicação entre objetos.</p>
        <ul style="padding-left: 1.2rem; margin-top: 0.75rem; font-size: 0.88rem">
          <li><a href="#/padrao/chain-of-responsibility">Chain of Responsibility</a></li>
          <li><a href="#/padrao/command">Command</a></li>
          <li><a href="#/padrao/interpreter">Interpreter</a></li>
          <li><a href="#/padrao/iterator">Iterator</a></li>
          <li><a href="#/padrao/mediator">Mediator</a></li>
          <li><a href="#/padrao/memento">Memento</a></li>
          <li><a href="#/padrao/observer">Observer</a></li>
          <li><a href="#/padrao/state">State</a></li>
          <li><a href="#/padrao/strategy">Strategy</a></li>
          <li><a href="#/padrao/template-method">Template Method</a></li>
          <li><a href="#/padrao/visitor">Visitor</a></li>
        </ul>
      </div>
    </div>

    <div class="callout callout-success mt-4">
      <h5>🎓 Dica de Aprendizado Rápido do GoF (pág. 10)</h5>
      <p>Se você está começando a estudar agora, o próprio livro sugere iniciar pelos 8 padrões mais comuns e essenciais no mercado de trabalho:</p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem">
        <a href="#/padrao/abstract-factory" class="btn btn-sm btn-outline">Abstract Factory</a>
        <a href="#/padrao/adapter" class="btn btn-sm btn-outline">Adapter</a>
        <a href="#/padrao/composite" class="btn btn-sm btn-outline">Composite</a>
        <a href="#/padrao/decorator" class="btn btn-sm btn-outline">Decorator</a>
        <a href="#/padrao/factory-method" class="btn btn-sm btn-outline">Factory Method</a>
        <a href="#/padrao/observer" class="btn btn-sm btn-outline">Observer</a>
        <a href="#/padrao/strategy" class="btn btn-sm btn-outline">Strategy</a>
        <a href="#/padrao/template-method" class="btn btn-sm btn-outline">Template Method</a>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// 2. DOIS PRINCÍPIOS FUNDAMENTAIS DE POO
// ----------------------------------------------------
function renderPrinciplesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/" class="pager-btn">❮ Anterior: Apresentação</a>
      <a href="#/remodelacao" class="pager-btn next-btn">Próximo: 8 Causas de Reformulação ❯</a>
    </div>

    <h1 class="page-title">Dois Princípios Fundamentais de Projeto O.O.</h1>
    <p class="page-subtitle">Os pilares universais estabelecidos pelo Gang of Four no Capítulo 1 para arquitetura de software reutilizável e manutenível.</p>

    ${bookOverview.corePrinciples.map(p => `
      <div class="info-card mt-4" style="border-left: 6px solid var(--accent-primary)">
        <h3>${p.title}</h3>
        <p class="text-muted" style="font-style: italic; margin-bottom: 0.8rem">"${p.original}"</p>
        <p>${p.summary}</p>

        <h5 class="mt-3">Principais Benefícios:</h5>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; margin-top: 0.4rem">
          ${p.benefits.map(b => `<li>${b}</li>`).join("")}
        </ul>

        <div class="tradeoffs-container mt-3">
          <div class="tradeoff-card tradeoff-cons">
            <h5>❌ Código Rígido (Anti-padrão)</h5>
            <code>${p.badPractice}</code>
          </div>
          <div class="tradeoff-card tradeoff-pros">
            <h5>✅ Código Flexível (GoF)</h5>
            <code>${p.goodPractice}</code>
          </div>
        </div>
      </div>
    `).join("")}

    <h2 class="section-title">⚖️ Herança de Classe vs Composição de Objetos</h2>
    <div class="table-responsive">
      <table class="gof-table">
        <thead>
          <tr>
            <th>Critério</th>
            <th>Herança de Classe (Caixa Branca / White-Box)</th>
            <th>Composição de Objetos (Caixa Preta / Black-Box)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Vinculação</strong></td>
            <td>Estática (definida em tempo de compilação)</td>
            <td>Dinâmica (definida em tempo de execução via referências)</td>
          </tr>
          <tr>
            <td><strong>Encapsulamento</strong></td>
            <td>Fraco (frequentemente viola o encapsulamento da classe ancestral)</td>
            <td>Forte (respeita contratos e esconde detalhes internos)</td>
          </tr>
          <tr>
            <td><strong>Flexibilidade</strong></td>
            <td>Baixa: mudar a superclasse propaga mudanças e quebra subclasses</td>
            <td>Alta: o objeto delegado pode ser substituído a qualquer instante</td>
          </tr>
          <tr>
            <td><strong>Número de Classes</strong></td>
            <td>Causa explosão combinatória de subclasses</td>
            <td>Mantém a hierarquia de classes enxuta e coesa</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ----------------------------------------------------
// 3. AS 8 CAUSAS DE REFORMULAÇÃO DE PROJETO
// ----------------------------------------------------
function renderRedesignCausesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/principios" class="pager-btn">❮ Anterior: Princípios</a>
      <a href="#/lexi" class="pager-btn next-btn">Próximo: O Caso Lexi ❯</a>
    </div>

    <h1 class="page-title">As 8 Causas de Reformulação de Software</h1>
    <p class="page-subtitle">Como antecipar requisitos mutáveis e aplicar os padrões certos para evitar reescritas caras (GoF pág. 39-40).</p>

    <div class="callout callout-info">
      <p>"Projetar para mudanças: A chave para maximização da reutilização está na antecipação de novos requisitos e em projetar sistemas de modo que eles possam evoluir de acordo." — GoF</p>
    </div>

    <div class="grid-2 mt-4">
      ${bookOverview.causesOfRedesign.map(c => `
        <div class="info-card">
          <span class="badge badge-scope">Causa #${c.number}</span>
          <h4 class="mt-2" style="font-size: 1.05rem">${c.cause}</h4>
          <p class="text-muted" style="font-size: 0.88rem; margin: 0.5rem 0">${c.description}</p>
          <div style="margin-top: 0.8rem">
            <strong style="font-size: 0.78rem; text-transform: uppercase; color: var(--text-muted)">Padrões que Solucionam:</strong>
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 0.3rem">
              ${c.patterns.map(pName => {
                const pat = patternsData.find(p => p.name === pName || p.ptName === pName);
                const link = pat ? `#/padrao/${pat.id}` : '#';
                return `<a href="${link}" class="btn btn-sm btn-outline">${pName}</a>`;
              }).join("")}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ----------------------------------------------------
// 4. O CASO LEXI (ESTUDO DE CASO COMPLETO DO GOF)
// ----------------------------------------------------
function renderLexiPage(container) {
  const lexi = bookOverview.lexiCaseStudy;

  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/remodelacao" class="pager-btn">❮ Anterior: Causas de Reformulação</a>
      <a href="#/matriz" class="pager-btn next-btn">Próximo: Matriz GoF ❯</a>
    </div>

    <h1 class="page-title">${lexi.title}</h1>
    <p class="page-subtitle">${lexi.subtitle}</p>

    <div class="callout callout-info">
      <h5>📄 Sobre o Editor Lexi (Capítulo 2 do Livro)</h5>
      <p>${lexi.description}</p>
    </div>

    <h2 class="section-title">🧩 Os 8 Desafios Arquiteturais do Lexi e suas Soluções</h2>
    <div class="lexi-challenges-list">
      ${lexi.challenges.map(c => `
        <div class="info-card mt-3">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem">
            <h4 style="margin: 0">${c.problem}</h4>
            <span class="badge badge-scope">GoF pág. ${c.gofPage}</span>
          </div>
          <p class="mt-2 text-muted" style="font-size: 0.92rem"><strong>O Desafio:</strong> ${c.description}</p>
          <div class="callout callout-success mt-2" style="margin-bottom: 0.5rem">
            <strong>Padrão Aplicado: <a href="#/padrao/${patternsData.find(p => p.name === c.patternUsed)?.id || ''}">${c.patternUsed}</a></strong>
            <p style="margin-top: 0.3rem">${c.solution}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// ----------------------------------------------------
// 5. MATRIZ GOF (TABELA 1.1)
// ----------------------------------------------------
function renderMatrixPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/lexi" class="pager-btn">❮ Anterior: O Caso Lexi</a>
      <a href="#/relacionamentos" class="pager-btn next-btn">Próximo: Grafo de Relações ❯</a>
    </div>

    <h1 class="page-title">${bookOverview.catalogMatrix.title}</h1>
    <p class="page-subtitle">${bookOverview.catalogMatrix.description}</p>

    <div class="table-responsive mt-4">
      <table class="gof-table">
        <thead>
          <tr>
            <th style="width: 22%">Escopo \\ Propósito</th>
            <th style="width: 26%">De Criação</th>
            <th style="width: 26%">Estrutural</th>
            <th style="width: 26%">Comportamental</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Classe</strong><br />
              <small class="text-muted">Herança estática / tempo de compilação</small>
            </td>
            <td>
              <a href="#/padrao/factory-method" class="pattern-tag-link badge-creational">Factory Method</a>
            </td>
            <td>
              <a href="#/padrao/adapter" class="pattern-tag-link badge-structural">Adapter (de classe)</a>
            </td>
            <td>
              <a href="#/padrao/interpreter" class="pattern-tag-link badge-behavioral">Interpreter</a><br />
              <a href="#/padrao/template-method" class="pattern-tag-link badge-behavioral">Template Method</a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Objeto</strong><br />
              <small class="text-muted">Composição dinâmica / tempo de execução</small>
            </td>
            <td>
              <a href="#/padrao/abstract-factory" class="pattern-tag-link badge-creational">Abstract Factory</a><br />
              <a href="#/padrao/builder" class="pattern-tag-link badge-creational">Builder</a><br />
              <a href="#/padrao/prototype" class="pattern-tag-link badge-creational">Prototype</a><br />
              <a href="#/padrao/singleton" class="pattern-tag-link badge-creational">Singleton</a>
            </td>
            <td>
              <a href="#/padrao/adapter" class="pattern-tag-link badge-structural">Adapter (de objeto)</a><br />
              <a href="#/padrao/bridge" class="pattern-tag-link badge-structural">Bridge</a><br />
              <a href="#/padrao/composite" class="pattern-tag-link badge-structural">Composite</a><br />
              <a href="#/padrao/decorator" class="pattern-tag-link badge-structural">Decorator</a><br />
              <a href="#/padrao/facade" class="pattern-tag-link badge-structural">Façade</a><br />
              <a href="#/padrao/flyweight" class="pattern-tag-link badge-structural">Flyweight</a><br />
              <a href="#/padrao/proxy" class="pattern-tag-link badge-structural">Proxy</a>
            </td>
            <td>
              <a href="#/padrao/chain-of-responsibility" class="pattern-tag-link badge-behavioral">Chain of Responsibility</a><br />
              <a href="#/padrao/command" class="pattern-tag-link badge-behavioral">Command</a><br />
              <a href="#/padrao/iterator" class="pattern-tag-link badge-behavioral">Iterator</a><br />
              <a href="#/padrao/mediator" class="pattern-tag-link badge-behavioral">Mediator</a><br />
              <a href="#/padrao/memento" class="pattern-tag-link badge-behavioral">Memento</a><br />
              <a href="#/padrao/observer" class="pattern-tag-link badge-behavioral">Observer</a><br />
              <a href="#/padrao/state" class="pattern-tag-link badge-behavioral">State</a><br />
              <a href="#/padrao/strategy" class="pattern-tag-link badge-behavioral">Strategy</a><br />
              <a href="#/padrao/visitor" class="pattern-tag-link badge-behavioral">Visitor</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ----------------------------------------------------
// 6. GRAFO DE RELACIONAMENTOS INTERATIVO
// ----------------------------------------------------
function renderRelationshipsPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/matriz" class="pager-btn">❮ Anterior: Matriz GoF</a>
      <a href="#/padrao/abstract-factory" class="pager-btn next-btn">Iniciar Catálogo: Abstract Factory ❯</a>
    </div>

    <h1 class="page-title">Mapa de Relacionamentos entre os Padrões</h1>
    <p class="page-subtitle">A famosa Figura 1.1 do livro GoF (pág. 27 e 360) mostrando como os padrões se entrelaçam em sinergia.</p>

    <div class="callout callout-info">
      <p>"Sistemas orientados a objeto bem-projetados têm múltiplos padrões embutidos. A composição em termos de padrões permite-nos atingir essa sinergia com maior facilidade." — GoF</p>
    </div>

    <div class="info-card mt-3">
      <h4>Conexões Chave do Catálogo:</h4>
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem">
        <li><strong>Composite + Iterator + Visitor:</strong> O Composite monta a estrutura em árvore; o Iterator percorre os elementos sem expor os ponteiros; o Visitor aplica operações analíticas sobre cada nó usando Despacho Duplo.</li>
        <li><strong>Command + Memento + Prototype:</strong> O Command encapsula a solicitação; o Memento salva o snapshot do estado para Undo; o Prototype clona o comando antes de entrar na lista de histórico.</li>
        <li><strong>Decorator vs Adapter vs Proxy:</strong> Todos são 'Wrappers' que envolvem um objeto interno. O <em>Decorator</em> adiciona responsabilidades mantendo a mesma interface; o <em>Adapter</em> altera a interface para compatibilidade; o <em>Proxy</em> mantém a mesma interface mas controla o acesso (segurança, cache, lazy loading).</li>
        <li><strong>Strategy vs State:</strong> Ambos usam delegação e possuem diagramas quase idênticos. O <em>Strategy</em> é escolhido pelo cliente externamente para variar o algoritmo; o <em>State</em> muda seu estado internamente conforme transições de ciclo de vida.</li>
        <li><strong>Observer vs Mediator:</strong> Ambos desacoplam colegas. O <em>Observer</em> distribui a comunicação de eventos (1:N); o <em>Mediator</em> centraliza o controle e a coordenação multilateral.</li>
      </ul>
    </div>
  `;
}

// ----------------------------------------------------
// 7. PÁGINA INDIVIDUAL DO PADRÃO (TODOS OS 23)
// ----------------------------------------------------
function renderPatternPage(container, patternId) {
  const patternIndex = patternsData.findIndex(p => p.id === patternId);
  if (patternIndex === -1) {
    container.innerHTML = `<div class="callout callout-danger"><h4>Padrão não encontrado</h4></div>`;
    return;
  }

  const p = patternsData[patternIndex];
  const prevPattern = patternIndex > 0 ? patternsData[patternIndex - 1] : null;
  const nextPattern = patternIndex < patternsData.length - 1 ? patternsData[patternIndex + 1] : null;

  const studied = getStudiedPatterns();
  const isStudied = studied.includes(p.id);

  const categoryBadgeClass = p.category === 'criacional'
    ? 'badge-creational'
    : p.category === 'estrutural'
    ? 'badge-structural'
    : 'badge-behavioral';

  container.innerHTML = `
    <!-- Top Action Bar (Previous / Next / Bookmark) -->
    <div class="page-action-header">
      <div class="pager-buttons">
        ${prevPattern ? `
          <a href="#/padrao/${prevPattern.id}" class="pager-btn">❮ Anterior: ${prevPattern.name}</a>
        ` : `
          <a href="#/" class="pager-btn">❮ Início</a>
        `}
      </div>

      <button class="bookmark-action-btn ${isStudied ? 'marked' : ''}" id="btn-toggle-bookmark">
        ${isStudied ? '✓ Marcado como Estudado' : '🔖 Marcar como Estudado'}
      </button>

      <div class="pager-buttons">
        ${nextPattern ? `
          <a href="#/padrao/${nextPattern.id}" class="pager-btn next-btn">Próximo: ${nextPattern.name} ❯</a>
        ` : `
          <a href="#/quizzes" class="pager-btn next-btn">Ir para Quizzes ❯</a>
        `}
      </div>
    </div>

    <!-- Cabeçalho do Padrão -->
    <div class="pattern-header-card">
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem">
        <span class="badge ${categoryBadgeClass}">${p.category}</span>
        <span class="badge badge-scope">Escopo de ${p.scope}</span>
        <span class="badge badge-scope">GoF pág. ${p.gofPage}</span>
        ${p.aliases && p.aliases.length > 0 ? `<span class="badge badge-scope">Também conhecido como: ${p.aliases.join(", ")}</span>` : ''}
      </div>

      <h1 class="page-title">${p.name} <small style="font-size: 1.2rem; color: var(--text-muted); font-weight: 400">(${p.ptName})</small></h1>
      <p class="page-subtitle" style="margin-bottom: 1.25rem"><em>${p.originalName} Design Pattern</em></p>

      <div class="callout callout-info" style="margin-top: 0">
        <h5>🎯 Intenção e Objetivo (GoF)</h5>
        <p style="font-size: 1.05rem; font-weight: 500">${p.intent}</p>
      </div>
    </div>

    <!-- Problema & Motivação -->
    <h2 class="section-title">🔍 Problema & Motivação no Mundo Real</h2>
    <div class="info-card">
      <p style="white-space: pre-line; line-height: 1.65">${p.problemAndMotivation}</p>
    </div>

    <!-- Solução Arquitetural -->
    <h2 class="section-title">💡 Solução Arquitetural</h2>
    <div class="info-card" style="border-left: 4px solid var(--accent-primary)">
      <p style="white-space: pre-line; line-height: 1.65">${p.solution}</p>
    </div>

    <!-- Estrutura & Participantes -->
    <h2 class="section-title">🏗️ Estrutura & Participantes</h2>
    <div class="info-card">
      <h5>Participantes do Padrão:</h5>
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; margin: 0.75rem 0; display: flex; flex-direction: column; gap: 0.5rem">
        ${p.structure.participants.map(part => `
          <li><strong>${part.name}:</strong> ${part.role}</li>
        `).join("")}
      </ul>
      <p class="text-muted" style="font-size: 0.88rem; margin-top: 0.75rem"><strong>Colaborações:</strong> ${p.structure.collaborations}</p>
    </div>

    <!-- Aplicabilidade -->
    <h2 class="section-title">🎯 Aplicabilidade (Quando Usar e Quando Evitar)</h2>
    <div class="info-card">
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
        ${p.applicability.map(app => `<li>${app}</li>`).join("")}
      </ul>
    </div>

    <!-- Consequências & Trade-offs -->
    <h2 class="section-title">⚖️ Consequências & Trade-offs</h2>
    <div class="tradeoffs-container">
      <div class="tradeoff-card tradeoff-pros">
        <h5>✅ Vantagens & Benefícios</h5>
        <ul>
          ${p.consequences.pros.map(pro => `<li>${pro}</li>`).join("")}
        </ul>
      </div>
      <div class="tradeoff-card tradeoff-cons">
        <h5>⚠️ Desvantagens & Custos</h5>
        <ul>
          ${p.consequences.cons.map(con => `<li>${con}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Notas de Implementação -->
    <h2 class="section-title">🛠️ Notas de Implementação & Dicas dos Autores</h2>
    <div class="info-card">
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
        ${p.implementationNotes.map(note => `<li>${note}</li>`).join("")}
      </ul>
    </div>

    <!-- Exemplos de Código Multi-Linguagem -->
    <h2 class="section-title">💻 Exemplos de Código Prático</h2>
    <div class="code-block-wrapper" id="pattern-code-box">
      <div class="code-header">
        <div class="code-tabs">
          <button class="code-tab-btn active" data-lang="typescript">TypeScript</button>
          <button class="code-tab-btn" data-lang="java">Java</button>
          <button class="code-tab-btn" data-lang="python">Python</button>
          <button class="code-tab-btn" data-lang="gofOriginal">C++ (GoF Original)</button>
        </div>
        <button class="copy-btn" id="btn-copy-code">📋 Copiar Código</button>
      </div>
      <pre class="code-content"><code id="code-snippet-el"></code></pre>
    </div>

    <!-- Usos no Mundo Real -->
    <h2 class="section-title">🌍 Usos Conhecidos & Frameworks Modernos</h2>
    <div class="info-card">
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
        ${p.realWorldUses.map(use => `<li>${use}</li>`).join("")}
      </ul>
    </div>

    <!-- Padrões Relacionados -->
    <h2 class="section-title">🔗 Padrões Relacionados & Diferenças</h2>
    <div class="info-card">
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
        ${p.relatedPatterns.map(rel => `<li>${rel}</li>`).join("")}
      </ul>
    </div>

    <!-- Campo de Prática Interativo (Se houver) -->
    ${p.hasPlayground && labs[p.playgroundId] ? `
      <h2 class="section-title">🧪 Campo de Prática Interativo (Live Playground)</h2>
      <div id="inline-lab-container"></div>
    ` : ''}

    <!-- Quiz de Fixação -->
    <h2 class="section-title">🧠 Teste Seus Conhecimentos</h2>
    <div id="inline-quiz-container"></div>

    <!-- Referências Bibliográficas -->
    <h2 class="section-title">📚 Referências Bibliográficas</h2>
    <div class="info-card">
      <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary)">
        ${p.references.map(ref => `<li>${ref}</li>`).join("")}
      </ul>
    </div>

    <!-- Bottom Action Bar -->
    <div class="page-action-header mt-5">
      <div class="pager-buttons">
        ${prevPattern ? `
          <a href="#/padrao/${prevPattern.id}" class="pager-btn">❮ Anterior: ${prevPattern.name}</a>
        ` : `
          <a href="#/" class="pager-btn">❮ Início</a>
        `}
      </div>
      <div class="pager-buttons">
        ${nextPattern ? `
          <a href="#/padrao/${nextPattern.id}" class="pager-btn next-btn">Próximo: ${nextPattern.name} ❯</a>
        ` : `
          <a href="#/quizzes" class="pager-btn next-btn">Ir para Quizzes ❯</a>
        `}
      </div>
    </div>
  `;

  // Bookmark Toggle
  const btnBookmark = container.querySelector("#btn-toggle-bookmark");
  btnBookmark.addEventListener("click", () => {
    const isNowStudied = togglePatternStudied(p.id);
    if (isNowStudied) {
      btnBookmark.classList.add("marked");
      btnBookmark.textContent = "✓ Marcado como Estudado";
    } else {
      btnBookmark.classList.remove("marked");
      btnBookmark.textContent = "🔖 Marcar como Estudado";
    }
  });

  // Code Tabs & Snippet
  const codeEl = container.querySelector("#code-snippet-el");
  const tabButtons = container.querySelectorAll(".code-tab-btn");
  const btnCopy = container.querySelector("#btn-copy-code");

  function switchCode(lang) {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = container.querySelector(`.code-tab-btn[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    codeEl.textContent = p.codeExamples[lang] || "// Exemplo não disponível.";
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchCode(btn.getAttribute("data-lang"));
    });
  });

  btnCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(codeEl.textContent);
    btnCopy.textContent = "✅ Copiado!";
    setTimeout(() => { btnCopy.textContent = "📋 Copiar Código"; }, 2000);
  });

  switchCode("typescript");

  // Renderiza Playground Inline
  if (p.hasPlayground && labs[p.playgroundId]) {
    const labContainer = container.querySelector("#inline-lab-container");
    if (labContainer) {
      labs[p.playgroundId].render(labContainer);
    }
  }

  // Renderiza Quiz Inline
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  const patternQuiz = quizzesData.find(q => q.patternId === p.id);
  if (inlineQuizContainer && patternQuiz) {
    renderSingleQuiz(inlineQuizContainer, patternQuiz);
  } else if (inlineQuizContainer) {
    inlineQuizContainer.innerHTML = `
      <div class="callout callout-info">
        <p>Pratique este padrão e teste suas habilidades completas na nossa <a href="#/quizzes">Central de Quizzes & Desafios</a>!</p>
      </div>
    `;
  }
}

// ----------------------------------------------------
// 8. HUB DE LABORATÓRIOS INTERATIVOS
// ----------------------------------------------------
function renderLabsHubPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/padrao/abstract-factory" class="pager-btn">❮ Ir para Padrões</a>
      <a href="#/quizzes" class="pager-btn next-btn">Ir para Quizzes ❯</a>
    </div>

    <h1 class="page-title">🧪 Central de Laboratórios & Campos de Prática</h1>
    <p class="page-subtitle">Experimente e interaja com simulações dinâmicas em tempo real dos principais padrões de projeto do GoF.</p>

    <div class="factory-selector-tabs mb-4" id="labs-selector-tabs">
      <button class="btn btn-tab active" data-lab="observer-lab">📊 Observer (Ações)</button>
      <button class="btn btn-tab" data-lab="strategy-lab">📦 Strategy (Frete)</button>
      <button class="btn btn-tab" data-lab="decorator-lab">☕ Decorator (Cafeteria)</button>
      <button class="btn btn-tab" data-lab="command-lab">↩️ Command (Undo/Redo)</button>
      <button class="btn btn-tab" data-lab="state-lab">🔀 State (Conexão TCP)</button>
      <button class="btn btn-tab" data-lab="factory-lab">🪟 Abstract Factory (UI)</button>
      <button class="btn btn-tab" data-lab="composite-lab">📁 Composite (Árvore)</button>
      <button class="btn btn-tab" data-lab="chain-lab">⛓️ Chain of Responsibility</button>
      <button class="btn btn-tab" data-lab="adapter-lab">🔌 Adapter (JSON/XML)</button>
    </div>

    <div id="active-lab-render-area"></div>
  `;

  const tabs = container.querySelectorAll("#labs-selector-tabs .btn-tab");
  const area = container.querySelector("#active-lab-render-area");

  function switchLab(labKey) {
    tabs.forEach(t => t.classList.remove("active"));
    const active = container.querySelector(`[data-lab="${labKey}"]`);
    if (active) active.classList.add("active");
    if (labs[labKey]) {
      labs[labKey].render(area);
    }
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => switchLab(t.getAttribute("data-lab")));
  });

  switchLab("observer-lab");
}

// ----------------------------------------------------
// 9. REFERÊNCIAS BIBLIOGRÁFICAS
// ----------------------------------------------------
function renderReferencesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/quizzes" class="pager-btn">❮ Anterior: Quizzes</a>
      <a href="#/" class="pager-btn next-btn">Voltar ao Início ❯</a>
    </div>

    <h1 class="page-title">📚 Referências Bibliográficas & Literatura Recomendada</h1>
    <p class="page-subtitle">Obras fundamentais citadas no livro GoF e literatura moderna que expandiu os conceitos de design patterns.</p>

    <div class="grid-2 mt-4">
      <div class="info-card">
        <h4>1. O Livro Clássico da Gang of Four</h4>
        <p><strong>GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John.</strong></p>
        <p class="text-muted"><em>Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos.</em> Porto Alegre: Bookman, 2000 / 2007. Tradução de Luiz A. Meirelles Salgado.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">Original em inglês: <em>Design Patterns: Elements of Reusable Object-Oriented Software.</em> Addison-Wesley, 1994.</p>
      </div>

      <div class="info-card">
        <h4>2. A Inspiração na Arquitetura Civil</h4>
        <p><strong>ALEXANDER, Christopher et al.</strong></p>
        <p class="text-muted"><em>A Pattern Language: Towns, Buildings, Construction.</em> Oxford University Press, New York, 1977.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">A obra de Alexander que cunhou o conceito seminal de "linguagem de padrões" adotado pela comunidade de software.</p>
      </div>

      <div class="info-card">
        <h4>3. Boas Práticas Modernas em Java</h4>
        <p><strong>BLOCH, Joshua.</strong></p>
        <p class="text-muted"><em>Effective Java (3ª Edição).</em> Addison-Wesley, 2018.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">Contém análises definitivas sobre Builder (Item 2), Static Factory Methods (Item 1) e Singleton com Enums (Item 3).</p>
      </div>

      <div class="info-card">
        <h4>4. Refatoração e Padrões Corporativos</h4>
        <p><strong>FOWLER, Martin.</strong></p>
        <p class="text-muted"><em>Refactoring: Improving the Design of Existing Code.</em> Addison-Wesley, 1999 (2ª Ed. com JS em 2018).</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">Também autor de <em>Patterns of Enterprise Application Architecture</em> (2002) e <em>Analysis Patterns</em>.</p>
      </div>

      <div class="info-card">
        <h4>5. Clean Code & Arquitetura</h4>
        <p><strong>MARTIN, Robert C. (Uncle Bob).</strong></p>
        <p class="text-muted"><em>Clean Architecture: A Craftsman's Guide to Software Structure and Design.</em> Prentice Hall, 2017.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">Princípios SOLID e como os padrões GoF se integram à separação de camadas.</p>
      </div>

      <div class="info-card">
        <h4>6. Recursos Web de Destaque</h4>
        <p><strong>SHVETS, Alexander (Refactoring Guru).</strong></p>
        <p class="text-muted"><em>Dive Into Design Patterns.</em> Refactoring.Guru, 2021.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem">Referência visual contemporânea amplamente utilizada por desenvolvedores em todo o mundo.</p>
      </div>
    </div>
  `;
}
