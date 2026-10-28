/**
 * Componente de Navegação Lateral (Sidebar)
 * Inspirado no formato da documentação de referência (W3Schools)
 * Inclui busca em tempo real, seções colapsáveis e rastreador de progresso
 */

import { patternsData } from "../data/patterns-data.js";
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
  localStorage.setItem(STUDIED_KEY, JSON.stringify(studied));
  updateSidebarProgress();
  return studied.includes(patternId);
}

export function renderSidebar(sidebarEl, currentHash = "") {
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
        <input type="text" id="sidebar-filter-input" placeholder="Filtrar padrões (ex: Factory, Undo)..." />
      </div>
    </div>

    <div class="study-tracker">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Progresso de Estudo:</span>
        <strong id="study-count-text">${studiedCount}/${totalPatterns} (${progressPercent}%)</strong>
      </div>
      <div class="study-progress-bar-bg">
        <div class="study-progress-bar-fill" id="study-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav-container">
      <!-- Visão Geral -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" data-group="geral">
          <span>O Livro GoF</span>
          <span class="chevron">${icons.chevronDown}</span>
        </div>
        <div class="sidebar-items-group" id="group-geral">
          <a href="#/" class="sidebar-item ${currentHash === '#/' || currentHash === '' ? 'active' : ''}">
            <span>Visão Geral & Autores</span>
          </a>
          <a href="#/principios" class="sidebar-item ${currentHash === '#/principios' ? 'active' : ''}">
            <span>2 Princípios de O.O.</span>
          </a>
          <a href="#/remodelacao" class="sidebar-item ${currentHash === '#/remodelacao' ? 'active' : ''}">
            <span>8 Causas de Reformulação</span>
          </a>
          <a href="#/lexi" class="sidebar-item ${currentHash === '#/lexi' ? 'active' : ''}">
            <span>O Caso Lexi (8 Padrões)</span>
          </a>
          <a href="#/matriz" class="sidebar-item ${currentHash === '#/matriz' ? 'active' : ''}">
            <span>Matriz GoF (Tabela 1.1)</span>
          </a>
          <a href="#/relacionamentos" class="sidebar-item ${currentHash === '#/relacionamentos' ? 'active' : ''}">
            <span>Grafo de Relações</span>
          </a>
        </div>
      </div>

      <!-- Criacionais -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" data-group="criacional">
          <span>Padrões de Criação (5)</span>
          <span class="chevron">${icons.chevronDown}</span>
        </div>
        <div class="sidebar-items-group" id="group-criacional">
          ${creational.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Estruturais -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" data-group="estrutural">
          <span>Padrões Estruturais (7)</span>
          <span class="chevron">${icons.chevronDown}</span>
        </div>
        <div class="sidebar-items-group" id="group-estrutural">
          ${structural.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Comportamentais -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" data-group="comportamental">
          <span>Padrões Comportamentais (11)</span>
          <span class="chevron">${icons.chevronDown}</span>
        </div>
        <div class="sidebar-items-group" id="group-comportamental">
          ${behavioral.map(p => renderPatternItem(p, currentHash, studied)).join("")}
        </div>
      </div>

      <!-- Prática & Quizzes -->
      <div class="sidebar-group">
        <div class="sidebar-group-title" data-group="pratica">
          <span>Prática & Avaliação</span>
          <span class="chevron">${icons.chevronDown}</span>
        </div>
        <div class="sidebar-items-group" id="group-pratica">
          <a href="#/laboratorios" class="sidebar-item ${currentHash === '#/laboratorios' ? 'active' : ''}">
            <span>Campos de Prática</span>
            <span class="item-badge" style="background:var(--bg-sidebar-hover); color:var(--text-secondary)">Labs</span>
          </a>
          <a href="#/quizzes" class="sidebar-item ${currentHash === '#/quizzes' ? 'active' : ''}">
            <span>Quizzes & Testes</span>
            <span class="item-badge" style="background:var(--bg-sidebar-hover); color:var(--text-secondary)">Quiz</span>
          </a>
          <a href="#/referencias" class="sidebar-item ${currentHash === '#/referencias' ? 'active' : ''}">
            <span>Referências Bibliográficas</span>
          </a>
        </div>
      </div>
    </nav>
  `;

  // Configura filtro em tempo real
  const filterInput = sidebarEl.querySelector("#sidebar-filter-input");
  filterInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = sidebarEl.querySelectorAll(".sidebar-item");
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!term || text.includes(term)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Configura acordeão colapsável
  const groupTitles = sidebarEl.querySelectorAll(".sidebar-group-title");
  groupTitles.forEach(title => {
    title.addEventListener("click", () => {
      const grpId = title.getAttribute("data-group");
      const groupEl = sidebarEl.querySelector(`#group-${grpId}`);
      const chevron = title.querySelector(".chevron");
      if (groupEl.style.display === "none") {
        groupEl.style.display = "block";
        chevron.innerHTML = icons.chevronDown;
      } else {
        groupEl.style.display = "none";
        chevron.innerHTML = icons.chevronRight;
      }
    });
  });
}

function renderPatternItem(p, currentHash, studied) {
  const isStudied = studied.includes(p.id);
  const isActive = currentHash === `#/padrao/${p.id}`;
  return `
    <a href="#/padrao/${p.id}" class="sidebar-item ${isActive ? 'active' : ''}" data-pattern-id="${p.id}">
      <span>
        ${p.name}
        ${isStudied ? `<span class="read-check" title="Padrão já estudado">${icons.check}</span>` : ''}
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

  if (countText) countText.textContent = `${count}/${total} (${percent}%)`;
  if (fill) fill.style.width = `${percent}%`;

  // Atualiza os checks nos itens
  document.querySelectorAll(".sidebar-item[data-pattern-id]").forEach(item => {
    const pid = item.getAttribute("data-pattern-id");
    const existingCheck = item.querySelector(".read-check");
    if (studied.includes(pid)) {
      if (!existingCheck) {
        const span = document.createElement("span");
        span.className = "read-check";
        span.title = "Padrão já estudado";
        span.innerHTML = icons.check;
        item.querySelector("span").appendChild(span);
      }
    } else {
      if (existingCheck) existingCheck.remove();
    }
  });
}
