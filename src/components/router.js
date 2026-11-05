import { patternsData } from "../data/patterns-data.js";
import { patternAnimations } from "../data/pattern-animations.js";
import { bookOverview } from "../data/book-overview.js";
import { quizzesData } from "../data/quizzes-data.js";
import { getLang, t, patternI18n } from "../data/i18n.js";
import { renderSingleQuiz, renderQuizzesPage } from "./quiz-engine.js";
import { labs } from "./labs.js";
import { getStudiedPatterns, togglePatternStudied } from "./sidebar.js";
import { renderPatternVisualizer, stopActiveVisualizerTimer } from "./pattern-visualizer.js";
import { icons } from "./icons.js";

function getPatternLocalized(p) {
  const lang = getLang();
  const ov = patternI18n[p.id] && patternI18n[p.id][lang];
  if (!ov || lang === "pt") {
    return {
      localName: p.ptName,
      tagline: `${p.category.toUpperCase()} • ${p.scope.toUpperCase()}`,
      intent: p.intent,
      problem: p.problemAndMotivation,
      solution: p.solution,
      pros: p.consequences.pros,
      cons: p.consequences.cons
    };
  }
  return {
    localName: ov.localName || p.name,
    tagline: ov.tagline || `${p.category.toUpperCase()}`,
    intent: ov.intent || p.intent,
    problem: ov.problem || p.problemAndMotivation,
    solution: ov.solution || p.solution,
    pros: ov.pros || p.consequences.pros,
    cons: ov.cons || p.consequences.cons
  };
}

function getCatLabel(cat) {
  if (cat === "criacional") return t("catCreational");
  if (cat === "estrutural") return t("catStructural");
  return t("catBehavioral");
}

export function updateHeaderTelemetry(hash) {
  const badgeEl = document.getElementById("header-active-module");
  if (!badgeEl) return;

  if (hash.startsWith("#/padrao/")) {
    const id = hash.replace("#/padrao/", "").trim();
    const p = patternsData.find(item => item.id === id);
    const anim = patternAnimations[id];
    if (p) {
      const code = anim ? anim.code : "DP";
      badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("nowLearning")}:</span> <strong>${code} · ${p.name.toUpperCase()}</strong>`;
      return;
    }
  }
  badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("overviewLabel")}:</span> <strong>23 GOF PATTERNS</strong>`;
}

export function handleRoute(contentArea) {
  stopActiveVisualizerTimer();
  const hash = window.location.hash || "#/";
  updateHeaderTelemetry(hash);

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
        <h4>404</h4>
        <p><a href="#/">${t("navHome")}</a></p>
      </div>
    `;
  }
}

function renderHomePage(container) {
  const studied = getStudiedPatterns();
  const lang = getLang();

  container.innerHTML = `
    <!-- Protocol Explorer Style Hero Banner -->
    <section class="pe-home-hero">
      <div class="pe-hero-top-row">
        <span class="pe-hero-kicker">${t("heroTag")}</span>
        <div class="pe-hero-stats">
          <span class="pe-stat-chip">${t("heroStatPatterns")}</span>
          <span class="pe-stat-chip">${t("heroStatSteps")}</span>
          <span class="pe-stat-chip">${t("heroStatLangs")}</span>
        </div>
      </div>

      <h1 class="pe-hero-title">${t("heroHeadline")}</h1>
      <p class="pe-hero-desc">${t("heroDescription")}</p>

      <div class="pe-hero-actions">
        <a href="#/padrao/abstract-factory" class="pe-cta-btn primary">${t("heroCtaPrimary")} →</a>
        <a href="#/laboratorios" class="pe-cta-btn secondary">${t("heroCtaSecondary")}</a>
        <a href="https://github.com/victor-reghini" target="_blank" rel="noopener noreferrer" class="pe-cta-btn ghost">
          ${icons.github} <span>Victor Reghini</span> ${icons.externalLink}
        </a>
      </div>
    </section>

    <!-- Category Filter Bar -->
    <div class="pe-catalog-toolbar" role="tablist" aria-label="Filter Design Patterns by Category">
      <button type="button" class="pe-filter-tab active" data-cat-filter="all">${t("heroFilterAll")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="criacional">${t("heroFilterCreational")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="estrutural">${t("heroFilterStructural")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="comportamental">${t("heroFilterBehavioral")}</button>
    </div>

    <!-- 23 Interactive Pattern Protocol Cards Grid -->
    <div class="pe-pattern-cards-grid" id="pe-catalog-grid">
      ${patternsData.map(p => {
        const anim = patternAnimations[p.id];
        const loc = getPatternLocalized(p);
        const isDone = studied.includes(p.id);
        const code = anim ? anim.code : "DP";
        const stepsCount = anim ? anim.steps.length : 5;
        const firstStepTag = anim ? (anim.steps[0].tag[lang] || anim.steps[0].tag.pt) : "STEP 1";
        const lastStepTag = anim ? (anim.steps[stepsCount - 1].tag[lang] || anim.steps[stepsCount - 1].tag.pt) : "STEP 5";

        return `
          <a href="#/padrao/${p.id}" class="pe-pattern-card cat-${p.category}" data-card-cat="${p.category}">
            <div class="pe-card-top">
              <div class="pe-card-code-wrap">
                <span class="pe-card-code cat-${p.category}">${code}</span>
                <div>
                  <h3 class="pe-card-title">${p.name}</h3>
                  <span class="pe-card-sub">${loc.localName}</span>
                </div>
              </div>
              <div class="pe-card-badges">
                <span class="pe-mini-pill">${stepsCount} ${t("stepsCountSuffix")}</span>
                ${isDone ? `<span class="pe-done-pill" title="${t("markedStudied")}">${icons.check}</span>` : ""}
              </div>
            </div>

            <p class="pe-card-intent">${loc.intent}</p>

            <div class="pe-card-pipeline-preview">
              <span class="pe-pipe-step">01 ${firstStepTag}</span>
              <span class="pe-pipe-arrow">→</span>
              <span class="pe-pipe-dots">•••</span>
              <span class="pe-pipe-arrow">→</span>
              <span class="pe-pipe-step">0${stepsCount} ${lastStepTag}</span>
            </div>

            <div class="pe-card-footer">
              <span class="pe-card-cat-tag cat-${p.category}">${getCatLabel(p.category)} • ${anim ? anim.scopeType : "OBJECT"}</span>
              <span class="pe-card-inspect-link">${t("openVisualizer")} →</span>
            </div>
          </a>
        `;
      }).join("")}
    </div>

    <!-- Gang of Four Foundations & Authors -->
    <h2 class="section-title mt-5">Gang of Four (GoF) • ${bookOverview.originalTitle} (1994)</h2>
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

    <div class="grid-2 mt-3">
      ${bookOverview.patternElements.map(el => `
        <div class="info-card">
          <h4 style="color: var(--accent-primary)">${el.title}</h4>
          <p style="font-size: 0.9rem">${el.desc}</p>
        </div>
      `).join("")}
    </div>
  `;

  // Bind category filter buttons
  const filterTabs = container.querySelectorAll(".pe-filter-tab");
  const cards = container.querySelectorAll(".pe-pattern-card");
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(btn => btn.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.getAttribute("data-cat-filter");
      cards.forEach(card => {
        if (cat === "all" || card.getAttribute("data-card-cat") === cat) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function renderPrinciplesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/" class="pager-btn">← ${t("prevLabel")}: ${t("navHome")}</a>
      <a href="#/remodelacao" class="pager-btn next-btn">${t("nextLabel")}: ${t("navRedesign")} →</a>
    </div>

    <h1 class="page-title">${t("navPrinciples")}</h1>
    <p class="page-subtitle">Program to an interface, not an implementation • Favor object composition over class inheritance.</p>

    ${bookOverview.corePrinciples.map(p => `
      <div class="info-card mt-4" style="border-left: 4px solid var(--accent-primary)">
        <h3>${p.title}</h3>
        <p class="text-muted" style="font-style: italic; margin-bottom: 0.8rem">"${p.original}"</p>
        <p>${p.summary}</p>

        <ul style="padding-left: 1.25rem; font-size: 0.9rem; margin-top: 0.6rem">
          ${p.benefits.map(b => `<li>${b}</li>`).join("")}
        </ul>

        <div class="tradeoffs-container mt-3">
          <div class="tradeoff-card tradeoff-cons">
            <h5>Anti-Pattern (Coupled)</h5>
            <code>${p.badPractice}</code>
          </div>
          <div class="tradeoff-card tradeoff-pros">
            <h5>GoF Principle (Decoupled)</h5>
            <code>${p.goodPractice}</code>
          </div>
        </div>
      </div>
    `).join("")}

    <h2 class="section-title">White-Box Inheritance vs. Black-Box Object Composition</h2>
    <div class="table-responsive">
      <table class="gof-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Class Inheritance (White-Box Reuse)</th>
            <th>Object Composition (Black-Box Reuse)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Binding Time</strong></td>
            <td>Static (fixed at compile time)</td>
            <td>Dynamic (hot-swappable at runtime via pointers)</td>
          </tr>
          <tr>
            <td><strong>Encapsulation</strong></td>
            <td>Weak (exposes parent internals to subclasses)</td>
            <td>Strict (interacts solely through interface contracts)</td>
          </tr>
          <tr>
            <td><strong>Class Hierarchy</strong></td>
            <td>Combinatorial subclass explosion (N x M)</td>
            <td>Compact, orthogonal hierarchies (N + M)</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderRedesignCausesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/principios" class="pager-btn">← ${t("prevLabel")}: ${t("navPrinciples")}</a>
      <a href="#/lexi" class="pager-btn next-btn">${t("nextLabel")}: ${t("navLexi")} →</a>
    </div>

    <h1 class="page-title">${t("navRedesign")}</h1>
    <p class="page-subtitle">GoF Chapter 1 (pp. 39-40): 8 architectural smells that force costly system rewrites and the exact patterns that eliminate them.</p>

    <div class="grid-2 mt-4">
      ${bookOverview.causesOfRedesign.map(c => `
        <div class="info-card">
          <span class="badge badge-scope">#0${c.number}</span>
          <h4 class="mt-2" style="font-size: 1.05rem">${c.cause}</h4>
          <p class="text-muted" style="font-size: 0.88rem; margin: 0.5rem 0">${c.description}</p>
          <div style="margin-top: 0.8rem">
            <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-top: 0.3rem">
              ${c.patterns.map(pName => {
                const pat = patternsData.find(p => p.name === pName || p.ptName === pName || (pName === "Façade" && p.id === "facade"));
                const link = pat ? `#/padrao/${pat.id}` : "#/padrao/facade";
                return `<a href="${link}" class="btn btn-sm btn-outline">${pName}</a>`;
              }).join("")}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderLexiPage(container) {
  const lexi = bookOverview.lexiCaseStudy;

  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/remodelacao" class="pager-btn">← ${t("prevLabel")}: ${t("navRedesign")}</a>
      <a href="#/matriz" class="pager-btn next-btn">${t("nextLabel")}: ${t("navMatrix")} →</a>
    </div>

    <h1 class="page-title">${lexi.title}</h1>
    <p class="page-subtitle">${lexi.subtitle}</p>

    <div class="callout callout-info">
      <p>${lexi.description}</p>
    </div>

    <div class="lexi-challenges-list">
      ${lexi.challenges.map(c => `
        <div class="info-card mt-3">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem">
            <h4 style="margin: 0">${c.problem}</h4>
            <span class="badge badge-scope">${t("gofPagePrefix")} ${c.gofPage}</span>
          </div>
          <p class="mt-2 text-muted" style="font-size: 0.92rem">${c.description}</p>
          <div class="callout callout-success mt-2" style="margin-bottom: 0.5rem">
            <strong>Pattern: <a href="#/padrao/${patternsData.find(p => p.name === c.patternUsed)?.id || "composite"}">${c.patternUsed}</a></strong>
            <p style="margin-top: 0.3rem">${c.solution}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderMatrixPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/lexi" class="pager-btn">← ${t("prevLabel")}: ${t("navLexi")}</a>
      <a href="#/relacionamentos" class="pager-btn next-btn">${t("nextLabel")}: ${t("navRelationships")} →</a>
    </div>

    <h1 class="page-title">${bookOverview.catalogMatrix.title}</h1>
    <p class="page-subtitle">${bookOverview.catalogMatrix.description}</p>

    <div class="table-responsive mt-4">
      <table class="gof-table">
        <thead>
          <tr>
            <th style="width: 22%">${t("scopeLabel")} \\ ${t("gofLayerLabel")}</th>
            <th style="width: 26%">1. ${t("catCreational")} (5)</th>
            <th style="width: 26%">2. ${t("catStructural")} (7)</th>
            <th style="width: 26%">3. ${t("catBehavioral")} (11)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${t("scopeClass")}</strong><br />
              <small class="text-muted">Compile-time inheritance</small>
            </td>
            <td>
              <a href="#/padrao/factory-method" class="pattern-tag-link badge-creational">FM · Factory Method</a>
            </td>
            <td>
              <a href="#/padrao/adapter" class="pattern-tag-link badge-structural">AD · Adapter (Class)</a>
            </td>
            <td>
              <a href="#/padrao/interpreter" class="pattern-tag-link badge-behavioral">IN · Interpreter</a><br />
              <a href="#/padrao/template-method" class="pattern-tag-link badge-behavioral">TM · Template Method</a>
            </td>
          </tr>
          <tr>
            <td>
              <strong>${t("scopeObject")}</strong><br />
              <small class="text-muted">Runtime object composition</small>
            </td>
            <td>
              <a href="#/padrao/abstract-factory" class="pattern-tag-link badge-creational">AF · Abstract Factory</a><br />
              <a href="#/padrao/builder" class="pattern-tag-link badge-creational">BL · Builder</a><br />
              <a href="#/padrao/prototype" class="pattern-tag-link badge-creational">PR · Prototype</a><br />
              <a href="#/padrao/singleton" class="pattern-tag-link badge-creational">SG · Singleton</a>
            </td>
            <td>
              <a href="#/padrao/adapter" class="pattern-tag-link badge-structural">AD · Adapter (Object)</a><br />
              <a href="#/padrao/bridge" class="pattern-tag-link badge-structural">BR · Bridge</a><br />
              <a href="#/padrao/composite" class="pattern-tag-link badge-structural">CP · Composite</a><br />
              <a href="#/padrao/decorator" class="pattern-tag-link badge-structural">DC · Decorator</a><br />
              <a href="#/padrao/facade" class="pattern-tag-link badge-structural">FC · Facade</a><br />
              <a href="#/padrao/flyweight" class="pattern-tag-link badge-structural">FW · Flyweight</a><br />
              <a href="#/padrao/proxy" class="pattern-tag-link badge-structural">PX · Proxy</a>
            </td>
            <td>
              <a href="#/padrao/chain-of-responsibility" class="pattern-tag-link badge-behavioral">CR · Chain of Responsibility</a><br />
              <a href="#/padrao/command" class="pattern-tag-link badge-behavioral">CM · Command</a><br />
              <a href="#/padrao/iterator" class="pattern-tag-link badge-behavioral">IT · Iterator</a><br />
              <a href="#/padrao/mediator" class="pattern-tag-link badge-behavioral">MD · Mediator</a><br />
              <a href="#/padrao/memento" class="pattern-tag-link badge-behavioral">MM · Memento</a><br />
              <a href="#/padrao/observer" class="pattern-tag-link badge-behavioral">OB · Observer</a><br />
              <a href="#/padrao/state" class="pattern-tag-link badge-behavioral">ST · State</a><br />
              <a href="#/padrao/strategy" class="pattern-tag-link badge-behavioral">SR · Strategy</a><br />
              <a href="#/padrao/visitor" class="pattern-tag-link badge-behavioral">VS · Visitor</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderRelationshipsPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/matriz" class="pager-btn">← ${t("prevLabel")}: ${t("navMatrix")}</a>
      <a href="#/padrao/abstract-factory" class="pager-btn next-btn">${t("nextLabel")}: Abstract Factory →</a>
    </div>

    <h1 class="page-title">${t("navRelationships")}</h1>
    <p class="page-subtitle">GoF Figure 1.1 (pp. 27 & 360): How the 23 patterns collaborate in real-world architectures.</p>

    <div class="info-card mt-3">
      <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.75rem">
        <li><strong><a href="#/padrao/composite">Composite</a> + <a href="#/padrao/iterator">Iterator</a> + <a href="#/padrao/visitor">Visitor</a>:</strong> Composite builds recursive trees; Iterator traverses them without leaking internal pointers; Visitor applies external operations via Double Dispatch.</li>
        <li><strong><a href="#/padrao/command">Command</a> + <a href="#/padrao/memento">Memento</a> + <a href="#/padrao/prototype">Prototype</a>:</strong> Command encapsulates actions; Memento stores private state snapshots for rollback; Prototype clones commands into the history stack.</li>
        <li><strong><a href="#/padrao/decorator">Decorator</a> vs <a href="#/padrao/adapter">Adapter</a> vs <a href="#/padrao/proxy">Proxy</a>:</strong> Decorator stacks responsibilities keeping the same interface; Adapter converts an incompatible interface; Proxy keeps the exact interface to control access, caching, or lazy loading.</li>
        <li><strong><a href="#/padrao/strategy">Strategy</a> vs <a href="#/padrao/state">State</a>:</strong> Strategy swaps interchangeable algorithms chosen by the client; State transitions behavior autonomously as internal lifecycle state changes.</li>
        <li><strong><a href="#/padrao/observer">Observer</a> vs <a href="#/padrao/mediator">Mediator</a>:</strong> Observer broadcasts one-to-many state updates; Mediator centralizes many-to-many coordination into a star hub.</li>
      </ul>
    </div>
  `;
}

function renderPatternPage(container, patternId) {
  const patternIndex = patternsData.findIndex(p => p.id === patternId);
  if (patternIndex === -1) {
    container.innerHTML = `<div class="callout callout-danger"><h4>Pattern not found</h4></div>`;
    return;
  }

  const p = patternsData[patternIndex];
  const loc = getPatternLocalized(p);
  const anim = patternAnimations[p.id];
  const prevPattern = patternIndex > 0 ? patternsData[patternIndex - 1] : null;
  const nextPattern = patternIndex < patternsData.length - 1 ? patternsData[patternIndex + 1] : null;

  const studied = getStudiedPatterns();
  const isStudied = studied.includes(p.id);

  const categoryBadgeClass = p.category === "criacional"
    ? "badge-creational"
    : p.category === "estrutural"
    ? "badge-structural"
    : "badge-behavioral";

  container.innerHTML = `
    <!-- Top Navigation & Completion Bar -->
    <div class="page-action-header">
      <div class="pager-buttons">
        ${prevPattern ? `
          <a href="#/padrao/${prevPattern.id}" class="pager-btn">← ${t("prevLabel")}: ${prevPattern.name}</a>
        ` : `
          <a href="#/" class="pager-btn">← ${t("navHome")}</a>
        `}
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>${t("markedStudied")}</span>` : `${icons.bookmark} <span>${t("markStudied")}</span>`}
      </button>

      <div class="pager-buttons">
        ${nextPattern ? `
          <a href="#/padrao/${nextPattern.id}" class="pager-btn next-btn">${t("nextLabel")}: ${nextPattern.name} →</a>
        ` : `
          <a href="#/quizzes" class="pager-btn next-btn">${t("navQuizzes")} →</a>
        `}
      </div>
    </div>

    <!-- Pattern Header Summary -->
    <div class="pattern-header-card">
      <div class="pattern-meta-badges">
        <span class="badge ${categoryBadgeClass}">${anim ? anim.code : "DP"} • ${getCatLabel(p.category)}</span>
        <span class="badge badge-scope">${t("scopeLabel")}: ${anim ? anim.scopeType : p.scope.toUpperCase()}</span>
        <span class="badge badge-scope">${t("gofPagePrefix")} ${p.gofPage}</span>
        ${p.aliases && p.aliases.length > 0 ? `<span class="badge badge-scope">${t("alsoKnownAs")}: ${p.aliases.join(", ")}</span>` : ""}
      </div>

      <h1 class="page-title">${p.name} <small class="pattern-local-subtitle">(${loc.localName})</small></h1>

      <div class="callout callout-info" style="margin-top: 0.75rem; margin-bottom: 0">
        <h5>${t("intentTitle")}</h5>
        <p style="font-size: 1.02rem; font-weight: 500">${loc.intent}</p>
      </div>
    </div>

    <!-- Quick Jump Workspace Tabs -->
    <nav class="pe-section-jump-nav" aria-label="Pattern Sections">
      <a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">${t("tabVisualizer")}</a>
      <a href="#sec-architecture" class="pe-jump-link" data-jump="sec-architecture">${t("tabArchitecture")}</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">${t("tabCode")}</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">${t("tabLabQuiz")}</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer & Memory Inspector (Protocol Explorer Core) -->
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>

    <!-- 2. Problem, Solution & Structure -->
    <div id="sec-architecture">
      <h2 class="section-title">${t("problemTitle")}</h2>
      <div class="info-card">
        <p style="white-space: pre-line; line-height: 1.65">${loc.problem}</p>
      </div>

      <h2 class="section-title">${t("solutionTitle")}</h2>
      <div class="info-card" style="border-left: 4px solid var(--accent-primary)">
        <p style="white-space: pre-line; line-height: 1.65">${loc.solution}</p>
      </div>

      <h2 class="section-title">${t("structureTitle")}</h2>
      <div class="info-card">
        <h5>${t("participantsSubtitle")}</h5>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; margin: 0.75rem 0; display: flex; flex-direction: column; gap: 0.5rem">
          ${p.structure.participants.map(part => `
            <li><strong>${part.name}:</strong> ${part.role}</li>
          `).join("")}
        </ul>
        <p class="text-muted" style="font-size: 0.88rem; margin-top: 0.75rem"><strong>${t("collaborationsLabel")}</strong> ${p.structure.collaborations}</p>
      </div>

      <h2 class="section-title">${t("applicabilityTitle")}</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${p.applicability.map(app => `<li>${app}</li>`).join("")}
        </ul>
      </div>

      <h2 class="section-title">${t("consequencesTitle")}</h2>
      <div class="tradeoffs-container">
        <div class="tradeoff-card tradeoff-pros">
          <h5>${t("prosTitle")}</h5>
          <ul>
            ${loc.pros.map(pro => `<li>${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="tradeoff-card tradeoff-cons">
          <h5>${t("consTitle")}</h5>
          <ul>
            ${loc.cons.map(con => `<li>${con}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h2 class="section-title">${t("implementationTitle")}</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${p.implementationNotes.map(note => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 3. Multi-Language Code Examples -->
    <div id="sec-code">
      <h2 class="section-title">${t("codeExamplesTitle")}</h2>
      <div class="code-block-wrapper" id="pattern-code-box">
        <div class="code-header">
          <div class="code-tabs" role="tablist" aria-label="Code language selector">
            <button type="button" class="code-tab-btn active" data-lang="typescript">TypeScript</button>
            <button type="button" class="code-tab-btn" data-lang="java">Java 21</button>
            <button type="button" class="code-tab-btn" data-lang="python">Python 3</button>
            <button type="button" class="code-tab-btn" data-lang="gofOriginal">C++ (GoF 1994)</button>
          </div>
          <button type="button" class="copy-btn" id="btn-copy-code">${icons.copy} <span>${t("copyCode")}</span></button>
        </div>
        <pre class="code-content"><code id="code-snippet-el"></code></pre>
      </div>

      <h2 class="section-title">${t("realWorldTitle")}</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${p.realWorldUses.map(use => `<li>${use}</li>`).join("")}
        </ul>
      </div>

      <h2 class="section-title">${t("relatedPatternsTitle")}</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${p.relatedPatterns.map(rel => `<li>${rel}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 4. Interactive Playground & Quiz -->
    <div id="sec-quiz">
      ${p.hasPlayground && labs[p.playgroundId] ? `
        <h2 class="section-title">${t("livePlaygroundTitle")}</h2>
        <div id="inline-lab-container"></div>
      ` : ""}

      <h2 class="section-title">${t("quizSectionTitle")}</h2>
      <div id="inline-quiz-container"></div>

      <h2 class="section-title">${t("referencesTitle")}</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary)">
          ${p.references.map(ref => `<li>${ref}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="page-action-header mt-5">
      <div class="pager-buttons">
        ${prevPattern ? `
          <a href="#/padrao/${prevPattern.id}" class="pager-btn">← ${t("prevLabel")}: ${prevPattern.name}</a>
        ` : `
          <a href="#/" class="pager-btn">← ${t("navHome")}</a>
        `}
      </div>
      <div class="pager-buttons">
        ${nextPattern ? `
          <a href="#/padrao/${nextPattern.id}" class="pager-btn next-btn">${t("nextLabel")}: ${nextPattern.name} →</a>
        ` : `
          <a href="#/quizzes" class="pager-btn next-btn">${t("navQuizzes")} →</a>
        `}
      </div>
    </div>
  `;

  // Mount Interactive Pattern Visualizer
  const vizMount = container.querySelector("#pattern-visualizer-mount");
  if (vizMount) {
    renderPatternVisualizer(vizMount, p);
  }

  // Section Jump Links (prevent hash route conflict!)
  container.querySelectorAll(".pe-jump-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      container.querySelectorAll(".pe-jump-link").forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      const targetId = link.getAttribute("data-jump");
      const targetEl = container.querySelector(`#${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Bookmark Toggle
  const btnBookmark = container.querySelector("#btn-toggle-bookmark");
  if (btnBookmark) {
    btnBookmark.addEventListener("click", () => {
      const isNowStudied = togglePatternStudied(p.id);
      if (isNowStudied) {
        btnBookmark.classList.add("marked");
        btnBookmark.innerHTML = `${icons.bookmarkCheck} <span>${t("markedStudied")}</span>`;
      } else {
        btnBookmark.classList.remove("marked");
        btnBookmark.innerHTML = `${icons.bookmark} <span>${t("markStudied")}</span>`;
      }
    });
  }

  // Code Tabs & Snippet
  const codeEl = container.querySelector("#code-snippet-el");
  const tabButtons = container.querySelectorAll(".code-tab-btn");
  const btnCopy = container.querySelector("#btn-copy-code");

  function switchCode(langKey) {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = container.querySelector(`.code-tab-btn[data-lang="${langKey}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    if (codeEl) {
      codeEl.textContent = p.codeExamples[langKey] || "// Code snippet unavailable.";
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      switchCode(btn.getAttribute("data-lang"));
    });
  });

  if (btnCopy && codeEl) {
    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(codeEl.textContent);
      btnCopy.innerHTML = `${icons.check} <span>${t("copiedCode")}</span>`;
      setTimeout(() => {
        btnCopy.innerHTML = `${icons.copy} <span>${t("copyCode")}</span>`;
      }, 2000);
    });
  }

  switchCode("typescript");

  // Render Inline Lab
  if (p.hasPlayground && labs[p.playgroundId]) {
    const labContainer = container.querySelector("#inline-lab-container");
    if (labContainer) {
      labs[p.playgroundId].render(labContainer);
    }
  }

  // Render Inline Quiz
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  const patternQuiz = quizzesData.find(q => q.patternId === p.id);
  if (inlineQuizContainer && patternQuiz) {
    renderSingleQuiz(inlineQuizContainer, patternQuiz);
  } else if (inlineQuizContainer) {
    inlineQuizContainer.innerHTML = `
      <div class="callout callout-info">
        <p><a href="#/quizzes">${t("navQuizzes")} →</a></p>
      </div>
    `;
  }
}

function renderLabsHubPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/padrao/abstract-factory" class="pager-btn">← ${t("prevLabel")}</a>
      <a href="#/quizzes" class="pager-btn next-btn">${t("nextLabel")}: ${t("navQuizzes")} →</a>
    </div>

    <h1 class="page-title">${t("navLabs")}</h1>
    <p class="page-subtitle">9 interactive sandboxes for testing runtime object collaborations.</p>

    <div class="factory-selector-tabs mb-4" id="labs-selector-tabs">
      <button type="button" class="btn btn-tab active" data-lab="observer-lab">OB · Observer</button>
      <button type="button" class="btn btn-tab" data-lab="strategy-lab">SR · Strategy</button>
      <button type="button" class="btn btn-tab" data-lab="decorator-lab">DC · Decorator</button>
      <button type="button" class="btn btn-tab" data-lab="command-lab">CM · Command</button>
      <button type="button" class="btn btn-tab" data-lab="state-lab">ST · State</button>
      <button type="button" class="btn btn-tab" data-lab="factory-lab">AF · Abstract Factory</button>
      <button type="button" class="btn btn-tab" data-lab="composite-lab">CP · Composite</button>
      <button type="button" class="btn btn-tab" data-lab="chain-lab">CR · Chain of Resp.</button>
      <button type="button" class="btn btn-tab" data-lab="adapter-lab">AD · Adapter</button>
    </div>

    <div id="active-lab-render-area"></div>
  `;

  const tabs = container.querySelectorAll("#labs-selector-tabs .btn-tab");
  const area = container.querySelector("#active-lab-render-area");

  function switchLab(labKey) {
    tabs.forEach(tab => tab.classList.remove("active"));
    const active = container.querySelector(`[data-lab="${labKey}"]`);
    if (active) active.classList.add("active");
    if (labs[labKey] && area) {
      labs[labKey].render(area);
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => switchLab(tab.getAttribute("data-lab")));
  });

  switchLab("observer-lab");
}

function renderReferencesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/quizzes" class="pager-btn">← ${t("prevLabel")}: ${t("navQuizzes")}</a>
      <a href="#/" class="pager-btn next-btn">${t("navHome")} →</a>
    </div>

    <h1 class="page-title">${t("navReferences")}</h1>
    <p class="page-subtitle">Foundational software architecture references and credits.</p>

    <div class="grid-2 mt-4">
      <div class="info-card">
        <h4>1. Gang of Four (GoF)</h4>
        <p><strong>GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John.</strong></p>
        <p class="text-muted"><em>Design Patterns: Elements of Reusable Object-Oriented Software.</em> Addison-Wesley, 1994 (Bookman, 2000).</p>
      </div>

      <div class="info-card">
        <h4>2. Pattern Language</h4>
        <p><strong>ALEXANDER, Christopher et al.</strong></p>
        <p class="text-muted"><em>A Pattern Language: Towns, Buildings, Construction.</em> Oxford University Press, 1977.</p>
      </div>

      <div class="info-card">
        <h4>3. Effective Java</h4>
        <p><strong>BLOCH, Joshua.</strong></p>
        <p class="text-muted"><em>Effective Java (3rd Edition).</em> Addison-Wesley, 2018.</p>
      </div>

      <div class="info-card">
        <h4>4. Refactoring & Enterprise Patterns</h4>
        <p><strong>FOWLER, Martin.</strong></p>
        <p class="text-muted"><em>Refactoring: Improving the Design of Existing Code.</em> Addison-Wesley, 2018.</p>
      </div>
    </div>
  `;
}
