import { patternsData } from "../data/patterns-data.js";
import { patternAnimations } from "../data/pattern-animations.js";
import { t } from "../data/i18n.js";
import { icons } from "./icons.js";

const STUDIED_KEY = "gof_studied_patterns";

export function getStudiedPatterns() {
  try {
    return JSON.parse(localStorage.getItem(STUDIED_KEY)) || [];
  } catch {
    return [];
  }
}

export function togglePatternStudied(patternId) {
  const studied = getStudiedPatterns();
  const idx = studied.indexOf(patternId);
  if (idx === -1) {
    studied.push(patternId);
  } else {
    studied.splice(idx, 1);
  }
  try {
    localStorage.setItem(STUDIED_KEY, JSON.stringify(studied));
  } catch {
    // ignore storage errors
  }
  updateSidebarProgress();
  return studied.includes(patternId);
}

export function renderSidebar(sidebarEl, currentHash = "") {
  if (!sidebarEl) return;
  const studied = getStudiedPatterns();
  const totalPatterns = patternsData.length;
  const studiedCount = studied.length;
  const progressPercent = Math.round((studiedCount / totalPatterns) * 100);

  const creational = patternsData.filter(p => p.category === "criacional");
  const structural = patternsData.filter(p => p.category === "estrutural");
  const behavioral = patternsData.filter(p => p.category === "comportamental");

  sidebarEl.innerHTML = `
    <div class="sidebar-search-box">
      <div class="search-input-wrapper">
        <span class="search-icon">${icons.search}</span>
        <input
          type="search"
          id="sidebar-filter-input"
          placeholder="${t("searchPlaceholder")}"
          aria-label="${t("searchPlaceholder")}"
        />
      </div>
    </div>

    <div class="study-tracker">
      <div class="study-tracker-row">
        <span class="study-tracker-label">${t("learningProgress")}</span>
        <strong id="study-count-text">${studiedCount}/${totalPatterns} ${t("completeLabel")} (${progressPercent}%)</strong>
      </div>
      <div class="study-progress-bar-bg" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
        <div class="study-progress-bar-fill" id="study-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <div class="sidebar-empty-state" id="sidebar-empty-state" hidden>
      <p>${t("searchNoResults")}</p>
      <button type="button" class="pe-ctrl-btn" id="sidebar-clear-filter-btn">${t("clearFilter")}</button>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav-container" aria-label="GoF Design Patterns Navigation">
      <!-- Creational (5) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="criacional" aria-expanded="true">
          <span>${t("groupCreational")}</span>
          <span class="chevron">${icons.chevronDown}</span>
        </button>
        <div class="sidebar-items-group" id="group-criacional">
          ${creational.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Structural (7) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="estrutural" aria-expanded="true">
          <span>${t("groupStructural")}</span>
          <span class="chevron">${icons.chevronDown}</span>
        </button>
        <div class="sidebar-items-group" id="group-estrutural">
          ${structural.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Behavioral (11) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="comportamental" aria-expanded="true">
          <span>${t("groupBehavioral")}</span>
          <span class="chevron">${icons.chevronDown}</span>
        </button>
        <div class="sidebar-items-group" id="group-comportamental">
          ${behavioral.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Foundations & Book Overview -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="geral" aria-expanded="true">
          <span>${t("groupFoundations")}</span>
          <span class="chevron">${icons.chevronDown}</span>
        </button>
        <div class="sidebar-items-group" id="group-geral">
          <a href="#/" class="sidebar-item ${currentHash === "#/" || currentHash === "" || currentHash === "#/livro" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">00</span>
              <span>${t("navHome")}</span>
            </span>
          </a>
          <a href="#/principios" class="sidebar-item ${currentHash === "#/principios" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">OO</span>
              <span>${t("navPrinciples")}</span>
            </span>
          </a>
          <a href="#/remodelacao" class="sidebar-item ${currentHash === "#/remodelacao" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">8C</span>
              <span>${t("navRedesign")}</span>
            </span>
          </a>
          <a href="#/lexi" class="sidebar-item ${currentHash === "#/lexi" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">LX</span>
              <span>${t("navLexi")}</span>
            </span>
          </a>
          <a href="#/matriz" class="sidebar-item ${currentHash === "#/matriz" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">MX</span>
              <span>${t("navMatrix")}</span>
            </span>
          </a>
          <a href="#/relacionamentos" class="sidebar-item ${currentHash === "#/relacionamentos" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">GR</span>
              <span>${t("navRelationships")}</span>
            </span>
          </a>
        </div>
      </div>

      <!-- Labs & Evaluation -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="pratica" aria-expanded="true">
          <span>${t("groupPractice")}</span>
          <span class="chevron">${icons.chevronDown}</span>
        </button>
        <div class="sidebar-items-group" id="group-pratica">
          <a href="#/laboratorios" class="sidebar-item ${currentHash === "#/laboratorios" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">LB</span>
              <span>${t("navLabs")}</span>
            </span>
            <span class="item-badge">9 LABS</span>
          </a>
          <a href="#/quizzes" class="sidebar-item ${currentHash === "#/quizzes" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">QZ</span>
              <span>${t("navQuizzes")}</span>
            </span>
            <span class="item-badge">QUIZ</span>
          </a>
          <a href="#/referencias" class="sidebar-item ${currentHash === "#/referencias" ? "active" : ""}">
            <span class="sidebar-item-left">
              <span class="sidebar-code-pill">RF</span>
              <span>${t("navReferences")}</span>
            </span>
          </a>
        </div>
      </div>
    </nav>

    <!-- Sidebar Author / GitHub Profile Footer -->
    <div class="sidebar-profile-footer">
      <a
        href="https://github.com/victor-reghini"
        target="_blank"
        rel="noopener noreferrer"
        class="sidebar-profile-link"
        aria-label="Victor Reghini GitHub Profile"
      >
        <span class="sidebar-profile-avatar">${icons.github}</span>
        <span class="sidebar-profile-meta">
          <strong>Victor Reghini</strong>
          <small>github.com/victor-reghini</small>
        </span>
        <span class="sidebar-profile-ext">${icons.externalLink}</span>
      </a>
    </div>
  `;

  const filterInput = sidebarEl.querySelector("#sidebar-filter-input");
  const emptyState = sidebarEl.querySelector("#sidebar-empty-state");
  const clearBtn = sidebarEl.querySelector("#sidebar-clear-filter-btn");

  function applyFilter(term) {
    const clean = term.toLowerCase().trim();
    const items = sidebarEl.querySelectorAll(".sidebar-item");
    let visibleCount = 0;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!clean || text.includes(clean)) {
        item.style.display = "flex";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  if (filterInput) {
    filterInput.addEventListener("input", e => applyFilter(e.target.value));
  }

  if (clearBtn && filterInput) {
    clearBtn.addEventListener("click", () => {
      filterInput.value = "";
      applyFilter("");
      filterInput.focus();
    });
  }

  const groupTitles = sidebarEl.querySelectorAll(".sidebar-group-title");
  groupTitles.forEach(title => {
    title.addEventListener("click", () => {
      const grpId = title.getAttribute("data-group");
      const groupEl = sidebarEl.querySelector(`#group-${grpId}`);
      const chevron = title.querySelector(".chevron");
      if (!groupEl) return;
      const isHidden = groupEl.style.display === "none";
      groupEl.style.display = isHidden ? "block" : "none";
      title.setAttribute("aria-expanded", isHidden ? "true" : "false");
      if (chevron) {
        chevron.innerHTML = isHidden ? icons.chevronDown : icons.chevronRight;
      }
    });
  });
}

function renderPatternItem(p, currentHash, studied) {
  const isStudied = studied.includes(p.id);
  const isActive = currentHash === `#/padrao/${p.id}`;
  const anim = patternAnimations[p.id];
  const code = anim ? anim.code : p.name.slice(0, 2).toUpperCase();
  const scopeShort = anim && anim.scopeType === "CLASS" ? "CLS" : "OBJ";

  return `
    <a href="#/padrao/${p.id}" class="sidebar-item ${isActive ? "active" : ""}" data-pattern-id="${p.id}">
      <span class="sidebar-item-left">
        <span class="sidebar-code-pill cat-${p.category}">${code}</span>
        <span class="sidebar-item-name">${p.name}</span>
      </span>
      <span class="sidebar-item-right">
        ${isStudied ? `<span class="read-check" title="${t("markedStudied")}">${icons.check}</span>` : `<span class="scope-mini-tag">${scopeShort}</span>`}
      </span>
    </a>
  `;
}

export function updateSidebarProgress() {
  const studied = getStudiedPatterns();
  const total = patternsData.length;
  const count = studied.length;
  const percent = Math.round((count / total) * 100);

  const countText = document.getElementById("study-count-text");
  const fill = document.getElementById("study-progress-fill");

  if (countText) countText.textContent = `${count}/${total} ${t("completeLabel")} (${percent}%)`;
  if (fill) fill.style.width = `${percent}%`;

  document.querySelectorAll(".sidebar-item[data-pattern-id]").forEach(item => {
    const pid = item.getAttribute("data-pattern-id");
    const rightSpan = item.querySelector(".sidebar-item-right");
    const anim = patternAnimations[pid];
    const scopeShort = anim && anim.scopeType === "CLASS" ? "CLS" : "OBJ";
    if (!rightSpan) return;
    if (studied.includes(pid)) {
      rightSpan.innerHTML = `<span class="read-check" title="${t("markedStudied")}">${icons.check}</span>`;
    } else {
      rightSpan.innerHTML = `<span class="scope-mini-tag">${scopeShort}</span>`;
    }
  });
}
