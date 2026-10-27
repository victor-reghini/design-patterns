/**
 * Mecanismo de Quizzes para Fixação de Conteúdo
 * Suporta quiz inline (na página do padrão) e página central de Quizzes
 */

import { quizzesData } from "../data/quizzes-data.js";

const QUIZ_PROGRESS_KEY = "gof_quiz_answers";

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
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(answers));
}

/**
 * Renderiza um quiz específico em um elemento container
 */
export function renderSingleQuiz(container, question) {
  if (!container || !question) return;

  const savedAnswers = getSavedAnswers();
  const previouslySelected = savedAnswers[question.id];

  container.innerHTML = `
    <div class="quiz-container" id="quiz-${question.id}">
      <div class="quiz-header">
        <span class="quiz-badge">🧠 Quiz de Fixação</span>
        <span class="text-muted" style="font-size: 0.8rem">1 Pergunta</span>
      </div>
      <div class="quiz-question-text">${question.question}</div>
      <div class="quiz-options-list">
        ${question.options.map((opt, idx) => `
          <div class="quiz-option-item ${previouslySelected !== undefined ? (opt.isCorrect ? 'correct' : (previouslySelected === idx ? 'wrong' : '')) : ''}" data-idx="${idx}">
            <div class="option-marker">${String.fromCharCode(65 + idx)}</div>
            <div class="option-text">${opt.text}</div>
          </div>
        `).join("")}
      </div>
      <div class="quiz-feedback-box" style="display: ${previouslySelected !== undefined ? 'block' : 'none'}">
        ${previouslySelected !== undefined ? `
          <div class="${question.options[previouslySelected]?.isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
            <strong>${question.options[previouslySelected]?.isCorrect ? '🎉 Correto!' : '❌ Incorreto!'}</strong>
            <p>${question.explanation}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  const optionElements = container.querySelectorAll(".quiz-option-item");
  const feedbackBox = container.querySelector(".quiz-feedback-box");

  optionElements.forEach(item => {
    item.addEventListener("click", () => {
      const selectedIdx = parseInt(item.getAttribute("data-idx"), 10);
      saveAnswer(question.id, selectedIdx);

      // Marca estados visuais
      optionElements.forEach((el, idx) => {
        el.classList.add("answered");
        if (question.options[idx].isCorrect) {
          el.classList.add("correct");
        } else if (idx === selectedIdx) {
          el.classList.add("wrong");
        }
      });

      const isRight = question.options[selectedIdx].isCorrect;
      feedbackBox.style.display = "block";
      feedbackBox.innerHTML = `
        <div class="${isRight ? 'feedback-correct' : 'feedback-wrong'}">
          <strong>${isRight ? '🎉 Parabéns, resposta correta!' : '❌ Não exatamente.'}</strong>
          <p>${question.explanation}</p>
        </div>
      `;
    });
  });
}

/**
 * Renderiza a página completa de Quizzes & Desafios
 */
export function renderQuizzesPage(container, selectedCategory = "todos") {
  const filtered = selectedCategory === "todos"
    ? quizzesData
    : quizzesData.filter(q => q.category === selectedCategory);

  const saved = getSavedAnswers();
  let correctCount = 0;
  quizzesData.forEach(q => {
    if (saved[q.id] !== undefined && q.options[saved[q.id]]?.isCorrect) {
      correctCount++;
    }
  });

  const percent = Math.round((correctCount / quizzesData.length) * 100);

  container.innerHTML = `
    <div class="quizzes-hub">
      <div class="quizzes-hero">
        <h1 class="page-title">🎯 Quizzes & Desafios GoF</h1>
        <p class="page-subtitle">Teste e consolide seus conhecimentos sobre os 23 padrões de projeto e princípios fundamentais do livro.</p>
      </div>

      <div class="grid-2">
        <div class="quiz-score-card">
          <div class="score-trophy">🏆</div>
          <div class="score-number">${correctCount} / ${quizzesData.length}</div>
          <div class="score-rank">
            ${percent >= 80 ? "🥇 Arquiteto de Software GoF" : percent >= 50 ? "🥈 Desenvolvedor Pleno" : "🥉 Aprendiz de Padrões"}
          </div>
          <p class="text-muted">Progresso geral de acertos: <strong>${percent}%</strong></p>
          <div class="study-progress-bar-bg" style="height: 10px; margin-top: 0.75rem;">
            <div class="study-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>

        <div class="info-card">
          <h4>Filtrar por Categoria</h4>
          <p class="text-muted">Foque seus estudos na área de interesse:</p>
          <div class="factory-selector-tabs mt-3">
            <button class="btn btn-tab ${selectedCategory === 'todos' ? 'active' : ''}" data-cat="todos">Todos (${quizzesData.length})</button>
            <button class="btn btn-tab ${selectedCategory === 'principios' ? 'active' : ''}" data-cat="principios">Princípios & POO</button>
            <button class="btn btn-tab ${selectedCategory === 'criacional' ? 'active' : ''}" data-cat="criacional">Criacionais</button>
            <button class="btn btn-tab ${selectedCategory === 'estrutural' ? 'active' : ''}" data-cat="estrutural">Estruturais</button>
            <button class="btn btn-tab ${selectedCategory === 'comportamental' ? 'active' : ''}" data-cat="comportamental">Comportamentais</button>
          </div>
          <button id="btn-reset-quiz" class="btn btn-sm btn-outline mt-4">🔄 Reiniciar Respostas</button>
        </div>
      </div>

      <div class="quiz-list-wrapper mt-4" id="questions-list"></div>
    </div>
  `;

  // Renderiza perguntas
  const questionsListEl = container.querySelector("#questions-list");
  filtered.forEach(q => {
    const qDiv = document.createElement("div");
    renderSingleQuiz(qDiv, q);
    questionsListEl.appendChild(qDiv);
  });

  // Filtro
  container.querySelectorAll(".btn-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      renderQuizzesPage(container, tab.getAttribute("data-cat"));
    });
  });

  // Reset
  container.querySelector("#btn-reset-quiz").addEventListener("click", () => {
    if (confirm("Deseja realmente limpar todas as respostas salvas do quiz?")) {
      localStorage.removeItem(QUIZ_PROGRESS_KEY);
      renderQuizzesPage(container, selectedCategory);
    }
  });
}
