/**
 * Motor de Exercícios de Fixação, Cenários Fictícios e Exercícios Práticos (Mão na Massa).
 * Suporta filtragem por dificuldade (Fácil, Médio, Difícil), categoria e rascunho livre sem validação rígida.
 */

import { quizzesData, scenariosData, practicalExercisesData } from "../data/quizzes-data.js";
import { highlightCode } from "../utils/code-highlighter.js";
import { icons } from "./icons.js";

const QUIZ_PROGRESS_KEY = "gof_quiz_answers";
const PRACTICAL_STATE_KEY = "gof_practical_exercises_state";

const DIFFICULTY_META = {
  facil: { label: "Fácil", className: "diff-easy" },
  medio: { label: "Médio", className: "diff-medium" },
  dificil: { label: "Difícil", className: "diff-hard" }
};

const CATEGORY_LABELS = {
  principios: "Princípios & POO",
  criacional: "Criacional",
  estrutural: "Estrutural",
  comportamental: "Comportamental",
  combinado: "Padrões Combinados"
};

export function getSavedAnswers() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

export function saveAnswer(questionId, selectedIndex) {
  const answers = getSavedAnswers();
  answers[questionId] = selectedIndex;
  try {
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(answers));
  } catch {
    // ignore storage quota errors
  }
}

function getPracticalState() {
  try {
    return JSON.parse(localStorage.getItem(PRACTICAL_STATE_KEY)) || {};
  } catch {
    return {};
  }
}

function savePracticalState(nextState) {
  try {
    localStorage.setItem(PRACTICAL_STATE_KEY, JSON.stringify(nextState));
  } catch {
    // ignore storage quota errors
  }
}

function getDifficultyBadge(difficulty) {
  const meta = DIFFICULTY_META[difficulty] || DIFFICULTY_META.medio;
  return `<span class="quiz-diff-badge ${meta.className}">Nível ${meta.label}</span>`;
}

function getCategoryBadge(category) {
  const label = CATEGORY_LABELS[category] || category;
  return `<span class="quiz-cat-badge cat-${category}">${label}</span>`;
}

/**
 * Renderiza uma questão de múltipla escolha (ou cenário fictício) em um elemento container.
 */
export function renderSingleQuiz(container, question, options = {}) {
  if (!container || !question) return;

  const savedAnswers = getSavedAnswers();
  const previouslySelected = savedAnswers[question.id];
  const isScenario = Boolean(question.context);
  const indexLabel = options.indexLabel || (isScenario ? "Cenário de Arquitetura" : "Questão de Fixação");

  container.innerHTML = `
    <article class="quiz-container ${isScenario ? "scenario-container" : ""}" id="quiz-${question.id}">
      <div class="quiz-header">
        <div class="quiz-header-badges">
          <span class="quiz-badge">${indexLabel}</span>
          ${getCategoryBadge(question.category)}
          ${getDifficultyBadge(question.difficulty)}
        </div>
        ${question.patternId && question.patternId !== "book-overview" && !options.hidePatternLink ? `
          <a href="#/padrao/${question.patternId}" class="quiz-pattern-link">Revisar padrão</a>
        ` : ""}
      </div>

      ${question.title ? `<h3 class="scenario-title">${question.title}</h3>` : ""}

      ${isScenario ? `
        <div class="scenario-context-box">
          <div class="scenario-context-label">Contexto do Problema Fictício</div>
          <p class="scenario-context-text">${question.context}</p>
          ${question.requirements && question.requirements.length ? `
            <div class="scenario-req-box">
              <strong>Requisitos e Restrições da Arquitetura:</strong>
              <ul>
                ${question.requirements.map(req => `<li>${req}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
        </div>
      ` : ""}

      <div class="quiz-question-text">${question.question}</div>

      <div class="quiz-options-list" role="group" aria-label="${question.question}">
        ${question.options.map((opt, idx) => {
          const stateClass = previouslySelected !== undefined
            ? (opt.isCorrect ? "answered correct" : (previouslySelected === idx ? "answered wrong" : "answered"))
            : "";
          return `
            <button type="button" class="quiz-option-item ${stateClass}" data-idx="${idx}">
              <span class="option-marker">${String.fromCharCode(65 + idx)}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `;
        }).join("")}
      </div>

      <div class="quiz-feedback-box" style="display: ${previouslySelected !== undefined ? "block" : "none"}">
        ${previouslySelected !== undefined ? `
          <div class="${question.options[previouslySelected]?.isCorrect ? "feedback-correct" : "feedback-wrong"}">
            <strong>${question.options[previouslySelected]?.isCorrect ? "Resposta Correta!" : "Resposta Incorreta."}</strong>
            <p>${question.explanation}</p>
          </div>
        ` : ""}
      </div>
    </article>
  `;

  const optionElements = container.querySelectorAll(".quiz-option-item");
  const feedbackBox = container.querySelector(".quiz-feedback-box");

  optionElements.forEach(item => {
    item.addEventListener("click", () => {
      const selectedIdx = parseInt(item.getAttribute("data-idx"), 10);
      saveAnswer(question.id, selectedIdx);

      optionElements.forEach((el, idx) => {
        el.classList.add("answered");
        el.classList.remove("correct", "wrong");
        if (question.options[idx].isCorrect) {
          el.classList.add("correct");
        } else if (idx === selectedIdx) {
          el.classList.add("wrong");
        }
      });

      const isRight = question.options[selectedIdx].isCorrect;
      feedbackBox.style.display = "block";
      feedbackBox.innerHTML = `
        <div class="${isRight ? "feedback-correct" : "feedback-wrong"}">
          <strong>${isRight ? "Resposta Correta!" : "Resposta Incorreta."}</strong>
          <p>${question.explanation}</p>
        </div>
      `;

      if (typeof options.onAnswered === "function") {
        options.onAnswered(question.id, isRight);
      }
    });
  });
}

/**
 * Renderiza um Exercício Prático (sem validação automática do sistema, focado em prática livre).
 */
export function renderPracticalExercise(container, exercise, options = {}) {
  if (!container || !exercise) return;

  const allPracState = getPracticalState();
  const exState = allPracState[exercise.id] || {
    checkedSteps: [],
    completed: false,
    scratchpad: exercise.starterCode
  };

  const starterHighlighted = highlightCode(exercise.starterCode, "typescript");
  const solutionHighlighted = highlightCode(exercise.referenceSolution, "typescript");

  container.innerHTML = `
    <article class="quiz-container practical-container" id="prac-${exercise.id}">
      <div class="quiz-header">
        <div class="quiz-header-badges">
          <span class="quiz-badge practical-badge">Exercício Prático Livre</span>
          ${getCategoryBadge(exercise.category)}
          ${getDifficultyBadge(exercise.difficulty)}
          ${exercise.targetPatterns.map(pat => `<span class="practical-pattern-chip">${pat}</span>`).join("")}
        </div>
        <button type="button" class="btn btn-sm ${exState.completed ? "btn-practical-done" : "btn-outline"}" id="btn-toggle-prac-${exercise.id}">
          ${icons.check} <span>${exState.completed ? "Prática Concluída" : "Marcar como Praticado"}</span>
        </button>
      </div>

      <h3 class="scenario-title">${exercise.title}</h3>
      <p class="practical-scenario-desc">${exercise.scenario}</p>

      <div class="practical-grid">
        <div class="practical-col">
          <div class="practical-sub-header">
            <span>1. Código Inicial (Acoplado / Ponto de Partida)</span>
            <button type="button" class="copy-btn" data-copy-starter="${exercise.id}">${icons.copy} <span>Copiar Inicial</span></button>
          </div>
          <pre class="code-content practical-code-pre"><code>${starterHighlighted}</code></pre>
        </div>

        <div class="practical-col">
          <div class="practical-sub-header">
            <span>2. Roteiro de Implementação Sugerido (Autoavaliação)</span>
            <span class="text-muted" style="font-size: 0.78rem;">Sem correção automática</span>
          </div>
          <ul class="practical-steps-list">
            ${exercise.steps.map((step, sIdx) => {
              const isChecked = exState.checkedSteps.includes(sIdx);
              return `
                <li>
                  <label class="practical-step-label ${isChecked ? "step-done" : ""}">
                    <input type="checkbox" class="practical-step-check" data-step-idx="${sIdx}" ${isChecked ? "checked" : ""} />
                    <span>${step}</span>
                  </label>
                </li>
              `;
            }).join("")}
          </ul>
        </div>
      </div>

      <div class="practical-scratchpad-section">
        <div class="practical-sub-header">
          <label for="scratchpad-${exercise.id}">3. Área de Prática Livre (Escreva sua solução aqui ou na sua IDE)</label>
          <div class="practical-scratchpad-actions">
            <button type="button" class="copy-btn" id="btn-reset-scratch-${exercise.id}">${icons.refresh} <span>Restaurar Código Inicial</span></button>
            <button type="button" class="copy-btn" id="btn-copy-scratch-${exercise.id}">${icons.copy} <span>Copiar Meu Código</span></button>
          </div>
        </div>
        <textarea
          id="scratchpad-${exercise.id}"
          class="practical-scratchpad-textarea"
          rows="11"
          spellcheck="false"
          placeholder="Implemente sua refatoração aqui..."
        ></textarea>
      </div>

      <div class="practical-accordions">
        <details class="practical-details">
          <summary>Ver Dicas de Arquitetura (${exercise.hints.length})</summary>
          <div class="practical-details-body">
            <ul>
              ${exercise.hints.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </div>
        </details>

        <details class="practical-details">
          <summary>Ver Solução de Referência Comentada (Comparação Livre)</summary>
          <div class="practical-details-body">
            <div class="practical-sub-header" style="margin-bottom: 0.5rem;">
              <span>Implementação de Referência em TypeScript</span>
              <button type="button" class="copy-btn" data-copy-solution="${exercise.id}">${icons.copy} <span>Copiar Solução</span></button>
            </div>
            <pre class="code-content practical-code-pre"><code>${solutionHighlighted}</code></pre>
          </div>
        </details>
      </div>
    </article>
  `;

  const scratchpadEl = container.querySelector(`#scratchpad-${exercise.id}`);
  if (scratchpadEl) {
    scratchpadEl.value = exState.scratchpad !== undefined ? exState.scratchpad : exercise.starterCode;
    scratchpadEl.addEventListener("input", () => {
      const current = getPracticalState();
      const prev = current[exercise.id] || { checkedSteps: [], completed: false };
      current[exercise.id] = { ...prev, scratchpad: scratchpadEl.value };
      savePracticalState(current);
    });
  }

  // Checkboxes de passos
  container.querySelectorAll(".practical-step-check").forEach(chk => {
    chk.addEventListener("change", () => {
      const idx = parseInt(chk.getAttribute("data-step-idx"), 10);
      const current = getPracticalState();
      const prev = current[exercise.id] || { checkedSteps: [], completed: false, scratchpad: exercise.starterCode };
      const set = new Set(prev.checkedSteps || []);
      if (chk.checked) {
        set.add(idx);
      } else {
        set.delete(idx);
      }
      const label = chk.closest(".practical-step-label");
      if (label) label.classList.toggle("step-done", chk.checked);
      current[exercise.id] = { ...prev, checkedSteps: Array.from(set) };
      savePracticalState(current);
    });
  });

  // Botão Marcar como Praticado
  const toggleDoneBtn = container.querySelector(`#btn-toggle-prac-${exercise.id}`);
  if (toggleDoneBtn) {
    toggleDoneBtn.addEventListener("click", () => {
      const current = getPracticalState();
      const prev = current[exercise.id] || { checkedSteps: [], completed: false, scratchpad: exercise.starterCode };
      const nextCompleted = !prev.completed;
      current[exercise.id] = { ...prev, completed: nextCompleted };
      savePracticalState(current);

      toggleDoneBtn.classList.toggle("btn-practical-done", nextCompleted);
      toggleDoneBtn.classList.toggle("btn-outline", !nextCompleted);
      toggleDoneBtn.innerHTML = `${icons.check} <span>${nextCompleted ? "Prática Concluída" : "Marcar como Praticado"}</span>`;

      if (typeof options.onStateChange === "function") {
        options.onStateChange();
      }
    });
  }

  // Botões de copiar / restaurar
  const copyStarterBtn = container.querySelector(`[data-copy-starter="${exercise.id}"]`);
  if (copyStarterBtn) {
    copyStarterBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(exercise.starterCode);
      copyStarterBtn.innerHTML = `${icons.check} <span>Copiado!</span>`;
      setTimeout(() => {
        copyStarterBtn.innerHTML = `${icons.copy} <span>Copiar Inicial</span>`;
      }, 1800);
    });
  }

  const copySolutionBtn = container.querySelector(`[data-copy-solution="${exercise.id}"]`);
  if (copySolutionBtn) {
    copySolutionBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(exercise.referenceSolution);
      copySolutionBtn.innerHTML = `${icons.check} <span>Copiado!</span>`;
      setTimeout(() => {
        copySolutionBtn.innerHTML = `${icons.copy} <span>Copiar Solução</span>`;
      }, 1800);
    });
  }

  const resetScratchBtn = container.querySelector(`#btn-reset-scratch-${exercise.id}`);
  if (resetScratchBtn && scratchpadEl) {
    resetScratchBtn.addEventListener("click", () => {
      scratchpadEl.value = exercise.starterCode;
      const current = getPracticalState();
      const prev = current[exercise.id] || { checkedSteps: [], completed: false };
      current[exercise.id] = { ...prev, scratchpad: exercise.starterCode };
      savePracticalState(current);
    });
  }

  const copyScratchBtn = container.querySelector(`#btn-copy-scratch-${exercise.id}`);
  if (copyScratchBtn && scratchpadEl) {
    copyScratchBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(scratchpadEl.value);
      copyScratchBtn.innerHTML = `${icons.check} <span>Copiado!</span>`;
      setTimeout(() => {
        copyScratchBtn.innerHTML = `${icons.copy} <span>Copiar Meu Código</span>`;
      }, 1800);
    });
  }
}

/**
 * Renderiza todos os exercícios e cenários vinculados a um padrão específico (na página individual do padrão).
 */
export function renderPatternExercises(container, patternId) {
  if (!container) return;

  const patternQuestions = quizzesData.filter(q => q.patternId === patternId);
  const patternScenarios = scenariosData.filter(s => s.patternId === patternId);

  if (patternQuestions.length === 0 && patternScenarios.length === 0) {
    container.innerHTML = `
      <div class="callout callout-info">
        <p><a href="#/quizzes">Acessar Central de Exercícios, Cenários e Prática →</a></p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="inline-exercises-stack" id="inline-exercises-list"></div>
    <div class="inline-exercises-footer">
      <a href="#/quizzes" class="pe-cta-btn secondary">Ver todos os ${quizzesData.length} Quizzes, ${scenariosData.length} Cenários Fictícios e ${practicalExercisesData.length} Exercícios Práticos →</a>
    </div>
  `;

  const listEl = container.querySelector("#inline-exercises-list");
  patternQuestions.forEach((q, idx) => {
    const wrap = document.createElement("div");
    renderSingleQuiz(wrap, q, {
      hidePatternLink: true,
      indexLabel: `Questão ${idx + 1} de ${patternQuestions.length}`
    });
    listEl.appendChild(wrap);
  });

  patternScenarios.forEach(sc => {
    const wrap = document.createElement("div");
    renderSingleQuiz(wrap, sc, {
      hidePatternLink: true,
      indexLabel: "Cenário Fictício Aplicado"
    });
    listEl.appendChild(wrap);
  });
}

// Estado em memória dos filtros na página central de Quizzes & Exercícios
const hubFilterState = {
  activeTab: "questoes", // "questoes" | "cenarios" | "praticos"
  difficulty: "todos",   // "todos" | "facil" | "medio" | "dificil"
  category: "todos"      // "todos" | "principios" | "criacional" | "estrutural" | "comportamental" | "combinado"
};

/**
 * Renderiza a Central Completa de Exercícios de Fixação, Cenários Fictícios e Exercícios Práticos.
 */
export function renderQuizzesPage(container, overrideState = {}) {
  if (!container) return;

  Object.assign(hubFilterState, overrideState);
  const { activeTab, difficulty, category } = hubFilterState;

  const saved = getSavedAnswers();
  const pracState = getPracticalState();

  const allEvaluated = [...quizzesData, ...scenariosData];
  let correctCount = 0;
  allEvaluated.forEach(item => {
    if (saved[item.id] !== undefined && item.options[saved[item.id]]?.isCorrect) {
      correctCount++;
    }
  });

  const completedPracticalCount = practicalExercisesData.filter(ex => pracState[ex.id]?.completed).length;
  const percent = Math.round((correctCount / allEvaluated.length) * 100);

  // Seleciona a coleção ativa conforme a aba
  let sourceList = quizzesData;
  if (activeTab === "cenarios") sourceList = scenariosData;
  if (activeTab === "praticos") sourceList = practicalExercisesData;

  const filtered = sourceList.filter(item => {
    const passDiff = difficulty === "todos" || item.difficulty === difficulty;
    const passCat = category === "todos" || item.category === category;
    return passDiff && passCat;
  });

  const countByDiff = (diffKey) => sourceList.filter(i => (category === "todos" || i.category === category) && (diffKey === "todos" || i.difficulty === diffKey)).length;

  container.innerHTML = `
    <div class="quizzes-hub">
      <div class="quizzes-hero">
        <h1 class="page-title">Central de Fixação, Cenários & Prática GoF</h1>
        <p class="page-subtitle">Exercícios graduados em níveis Fácil, Médio e Difícil, cenários fictícios de arquitetura para tomada de decisão e desafios práticos de código.</p>
      </div>

      <!-- Abas de Modalidade de Exercício -->
      <div class="exercise-mode-tabs" role="tablist" aria-label="Modalidades de Exercício">
        <button type="button" class="exercise-mode-tab ${activeTab === "questoes" ? "active" : ""}" data-mode="questoes">
          <span class="mode-tab-title">1. Questões de Fixação</span>
          <span class="mode-tab-count">${quizzesData.length} questões</span>
        </button>
        <button type="button" class="exercise-mode-tab ${activeTab === "cenarios" ? "active" : ""}" data-mode="cenarios">
          <span class="mode-tab-title">2. Cenários Fictícios (Qual Padrão Usar?)</span>
          <span class="mode-tab-count">${scenariosData.length} cenários</span>
        </button>
        <button type="button" class="exercise-mode-tab ${activeTab === "praticos" ? "active" : ""}" data-mode="praticos">
          <span class="mode-tab-title">3. Exercícios Práticos (Mão na Massa)</span>
          <span class="mode-tab-count">${practicalExercisesData.length} desafios livres</span>
        </button>
      </div>

      <div class="grid-2">
        <div class="quiz-score-card">
          <div class="score-trophy text-primary" style="display:flex; justify-content:center; align-items:center; margin-bottom: 0.4rem;">${icons.award}</div>
          <div class="score-number">${correctCount} / ${allEvaluated.length}</div>
          <div class="score-rank">
            ${percent >= 80 ? "Nível: Arquiteto de Software" : percent >= 50 ? "Nível: Engenheiro de Padrões" : "Nível: Aprendiz de Arquitetura"}
          </div>
          <p class="text-muted" style="font-size: 0.88rem;">
            Acertos em Questões + Cenários: <strong>${percent}%</strong> • Práticas concluídas: <strong>${completedPracticalCount}/${practicalExercisesData.length}</strong>
          </p>
          <div class="study-progress-bar-bg" style="height: 10px; margin-top: 0.75rem;">
            <div class="study-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>

        <div class="info-card">
          <h4>Filtrar por Dificuldade e Categoria</h4>
          <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 0.65rem;">Selecione o nível de complexidade e a família de padrões:</p>

          <div class="filter-group-label">Nível de Dificuldade:</div>
          <div class="factory-selector-tabs mb-3" id="difficulty-filter-tabs">
            <button type="button" class="btn btn-tab ${difficulty === "todos" ? "active" : ""}" data-diff="todos">Todos (${countByDiff("todos")})</button>
            <button type="button" class="btn btn-tab ${difficulty === "facil" ? "active" : ""}" data-diff="facil">Fácil (${countByDiff("facil")})</button>
            <button type="button" class="btn btn-tab ${difficulty === "medio" ? "active" : ""}" data-diff="medio">Médio (${countByDiff("medio")})</button>
            <button type="button" class="btn btn-tab ${difficulty === "dificil" ? "active" : ""}" data-diff="dificil">Difícil (${countByDiff("dificil")})</button>
          </div>

          <div class="filter-group-label">Categoria:</div>
          <div class="factory-selector-tabs" id="category-filter-tabs">
            <button type="button" class="btn btn-tab ${category === "todos" ? "active" : ""}" data-cat="todos">Todas</button>
            ${activeTab === "questoes" ? `
              <button type="button" class="btn btn-tab ${category === "principios" ? "active" : ""}" data-cat="principios">Princípios & POO</button>
            ` : ""}
            <button type="button" class="btn btn-tab ${category === "criacional" ? "active" : ""}" data-cat="criacional">Criacionais</button>
            <button type="button" class="btn btn-tab ${category === "estrutural" ? "active" : ""}" data-cat="estrutural">Estruturais</button>
            <button type="button" class="btn btn-tab ${category === "comportamental" ? "active" : ""}" data-cat="comportamental">Comportamentais</button>
            ${activeTab === "cenarios" ? `
              <button type="button" class="btn btn-tab ${category === "combinado" ? "active" : ""}" data-cat="combinado">Combinados</button>
            ` : ""}
          </div>

          <div class="quiz-reset-row mt-3">
            <button type="button" id="btn-reset-quiz" class="btn btn-sm btn-outline" style="display:inline-flex; align-items:center; gap:0.4rem;">
              ${icons.refresh} <span>Reiniciar Progresso</span>
            </button>
          </div>
        </div>
      </div>

      ${activeTab === "cenarios" ? `
        <div class="callout callout-info mt-4">
          <h5>Como funcionam os Cenários Fictícios</h5>
          <p>Analise o problema de arquitetura, os sintomas de acoplamento e as restrições da equipe. Em seguida, indique qual Padrão de Projeto (ou combinação de padrões) é o mais ideal para resolver o cenário.</p>
        </div>
      ` : ""}

      ${activeTab === "praticos" ? `
        <div class="callout callout-info mt-4">
          <h5>Como funcionam os Exercícios Práticos</h5>
          <p>Estes exercícios não possuem validação ou correção automática pelo sistema. Use a área de prática livre abaixo de cada desafio (ou sua própria IDE) para refatorar o código inicial, siga o roteiro de autoavaliação e compare sua construção com a solução de referência comentada.</p>
        </div>
      ` : ""}

      <div class="quiz-list-wrapper mt-4" id="questions-list"></div>
    </div>
  `;

  const questionsListEl = container.querySelector("#questions-list");

  if (filtered.length === 0) {
    questionsListEl.innerHTML = `
      <div class="quiz-empty-state">
        <h4>Nenhum exercício encontrado para esta combinação de filtros</h4>
        <p class="text-muted">Tente selecionar outra categoria ou alterar o nível de dificuldade para exibir os exercícios disponíveis.</p>
        <button type="button" class="btn btn-tab active mt-3" id="btn-clear-quiz-filters">Mostrar Todos desta Aba</button>
      </div>
    `;
    const clearBtn = questionsListEl.querySelector("#btn-clear-quiz-filters");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        renderQuizzesPage(container, { difficulty: "todos", category: "todos" });
      });
    }
  } else {
    filtered.forEach((item, index) => {
      const itemWrap = document.createElement("div");
      if (activeTab === "praticos") {
        renderPracticalExercise(itemWrap, item, {
          onStateChange: () => renderQuizzesPage(container)
        });
      } else {
        const prefix = activeTab === "cenarios" ? `Cenário ${index + 1} de ${filtered.length}` : `Questão ${index + 1} de ${filtered.length}`;
        renderSingleQuiz(itemWrap, item, {
          indexLabel: prefix,
          onAnswered: () => {
            // Atualiza o placar no topo sem perder a posição de scroll
            const updatedSaved = getSavedAnswers();
            let updatedCorrect = 0;
            allEvaluated.forEach(q => {
              if (updatedSaved[q.id] !== undefined && q.options[updatedSaved[q.id]]?.isCorrect) {
                updatedCorrect++;
              }
            });
            const updatedPercent = Math.round((updatedCorrect / allEvaluated.length) * 100);
            const scoreNumEl = container.querySelector(".score-number");
            const fillEl = container.querySelector(".study-progress-bar-fill");
            if (scoreNumEl) scoreNumEl.textContent = `${updatedCorrect} / ${allEvaluated.length}`;
            if (fillEl) fillEl.style.width = `${updatedPercent}%`;
          }
        });
      }
      questionsListEl.appendChild(itemWrap);
    });
  }

  // Eventos de troca de aba principal (Questões / Cenários / Práticos)
  container.querySelectorAll(".exercise-mode-tab").forEach(modeBtn => {
    modeBtn.addEventListener("click", () => {
      const nextMode = modeBtn.getAttribute("data-mode");
      renderQuizzesPage(container, { activeTab: nextMode, category: "todos" });
    });
  });

  // Eventos de filtro de dificuldade
  container.querySelectorAll("#difficulty-filter-tabs .btn-tab").forEach(diffBtn => {
    diffBtn.addEventListener("click", () => {
      renderQuizzesPage(container, { difficulty: diffBtn.getAttribute("data-diff") });
    });
  });

  // Eventos de filtro de categoria
  container.querySelectorAll("#category-filter-tabs .btn-tab").forEach(catBtn => {
    catBtn.addEventListener("click", () => {
      renderQuizzesPage(container, { category: catBtn.getAttribute("data-cat") });
    });
  });

  // Reiniciar progresso
  const resetBtn = container.querySelector("#btn-reset-quiz");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Deseja limpar todas as respostas salvas dos quizzes e cenários?")) {
        localStorage.removeItem(QUIZ_PROGRESS_KEY);
        renderQuizzesPage(container);
      }
    });
  }
}
