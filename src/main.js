/**
 * Main Application Orchestrator & State Controller.
 * Pure Vanilla JavaScript ES Module.
 */

import { icons } from './ui/icons.js';
import { renderStartScreen } from './ui/render-start.js';
import { renderProgressBar } from './ui/render-progress.js';
import { renderQuestionScreen } from './ui/render-question.js';
import { renderResultScreen } from './ui/render-result.js';

import {
  getActiveQuestions,
  findActiveQuestion,
  getFirstQuestion,
  getNextQuestion
} from './engine/decision-tree.js';
import { generateRecommendations } from './engine/recommendation-engine.js';
import {
  saveAssessmentState,
  loadAssessmentState,
  clearAssessmentState
} from './utils/storage.js';

// Application State
const state = {
  view: 'start', // 'start' | 'question' | 'result'
  currentQuestionId: null,
  answers: {},
  history: [] // Stack of question IDs traversed
};

const appRoot = document.getElementById('app');

/**
 * Initializes the application on boot
 */
function init() {
  renderAppShell();

  const saved = loadAssessmentState();
  if (saved && Object.keys(saved.answers || {}).length > 0) {
    // If the user already finished, or was in-progress:
    render({ hasSavedSession: true });
  } else {
    render({ hasSavedSession: false });
  }
}

/**
 * Renders the persistent header container
 */
function renderAppShell() {
  if (!appRoot) return;

  appRoot.innerHTML = `
    <header class="app-header">
      <div class="header-container">
        <div class="brand" id="brand-logo" role="button" tabindex="0" aria-label="Voltar para a página inicial">
          <div class="brand-icon">
            ${icons.laptop({ size: 22 })}
          </div>
          <div>
            <span class="brand-title">Qual PC Comprar?</span>
            <span class="brand-badge">Guia Visual</span>
          </div>
        </div>
      </div>
    </header>
    <main class="main-content" id="main-content"></main>
  `;

  const brand = document.getElementById('brand-logo');
  if (brand) {
    const handleHomeClick = () => {
      if (state.view !== 'start') {
        const confirmGoHome =
          Object.keys(state.answers).length === 0 ||
          state.view === 'result' ||
          confirm('Deseja voltar para a tela inicial? Seu progresso continuará salvo.');
        if (confirmGoHome) {
          state.view = 'start';
          render({ hasSavedSession: Boolean(loadAssessmentState()) });
        }
      }
    };

    brand.addEventListener('click', handleHomeClick);
    brand.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleHomeClick();
      }
    });
  }
}

/**
 * Main render function based on active view state
 */
function render(options = {}) {
  const main = document.getElementById('main-content');
  if (!main) return;
  main.innerHTML = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (state.view === 'start') {
    const startView = renderStartScreen({
      hasSavedSession: options.hasSavedSession,
      onStart: handleStartQuiz,
      onResume: handleResumeQuiz,
      onResetSession: handleResetSession
    });
    main.appendChild(startView);
  } else if (state.view === 'question') {
    renderActiveQuestionView(main);
  } else if (state.view === 'result') {
    renderActiveResultView(main);
  }
}

/**
 * Renders the Question Screen and its Navigation Progress Header
 */
function renderActiveQuestionView(container) {
  const activeQuestions = getActiveQuestions(state.answers);
  const { index, question, total } = findActiveQuestion(state.currentQuestionId, state.answers);

  if (!question) {
    // If somehow question id isn't in active list, show first or finish
    const first = getFirstQuestion(state.answers);
    if (first) {
      state.currentQuestionId = first.id;
      return renderActiveQuestionView(container);
    } else {
      state.view = 'result';
      return render();
    }
  }

  // 1. Progress Navigation Bar
  const navBar = renderProgressBar({
    currentStep: index + 1,
    totalSteps: total,
    canGoBack: state.history.length > 0,
    onBack: handleGoBack
  });
  container.appendChild(navBar);

  // 2. Question Content
  const questionScreen = renderQuestionScreen({
    question,
    currentValue: state.answers[question.id],
    onSelectOption: (optionId) => handleAnswerQuestion(question.id, optionId),
    onMultiSubmit: (selectedIds) => handleAnswerQuestion(question.id, selectedIds)
  });
  container.appendChild(questionScreen);
}

/**
 * Renders the Final Recommendations Screen
 */
function renderActiveResultView(container) {
  const resultData = generateRecommendations(state.answers);

  const resultView = renderResultScreen({
    recommendations: {
      essential: resultData.essential,
      recommended: resultData.recommended,
      durability: resultData.durability
    },
    summaryTags: resultData.summaryTags,
    warnings: resultData.warnings,
    referenceDate: resultData.referenceDate,
    marketNotice: resultData.marketNotice,
    onRestart: handleResetSession,
    onChangeAnswer: handleChangeAnswer
  });

  container.appendChild(resultView);
}

// --- Interaction Handlers ---

function handleStartQuiz() {
  clearAssessmentState();
  state.answers = {};
  state.history = [];
  const first = getFirstQuestion(state.answers);
  state.currentQuestionId = first ? first.id : null;
  state.view = 'question';
  saveAssessmentState(state);
  render();
}

function handleResumeQuiz() {
  const saved = loadAssessmentState();
  if (saved) {
    state.answers = saved.answers || {};
    state.history = saved.history || [];
    const activeQuestions = getActiveQuestions(state.answers);

    // If all questions answered, go straight to result
    const nextQ = getNextQuestion(saved.currentStepId, state.answers);
    if (!nextQ && Object.keys(state.answers).length >= activeQuestions.length) {
      state.view = 'result';
    } else {
      state.currentQuestionId = saved.currentStepId || (activeQuestions[0] ? activeQuestions[0].id : null);
      state.view = 'question';
    }
    render();
  } else {
    handleStartQuiz();
  }
}

function handleResetSession() {
  clearAssessmentState();
  state.answers = {};
  state.history = [];
  state.currentQuestionId = null;
  state.view = 'start';
  render({ hasSavedSession: false });
}

function handleAnswerQuestion(questionId, value) {
  state.answers[questionId] = value;

  // Add to navigation history
  if (!state.history.includes(questionId)) {
    state.history.push(questionId);
  }

  // Find next question in decision tree
  const nextQ = getNextQuestion(questionId, state.answers);

  if (nextQ) {
    state.currentQuestionId = nextQ.id;
    state.view = 'question';
  } else {
    // All questions finished!
    state.view = 'result';
  }

  saveAssessmentState(state);
  render();
}

function handleGoBack() {
  if (state.history.length > 0) {
    const prevQuestionId = state.history.pop();
    state.currentQuestionId = prevQuestionId;
    state.view = 'question';
    saveAssessmentState(state);
    render();
  } else {
    state.view = 'start';
    render();
  }
}

function handleChangeAnswer(questionId) {
  state.currentQuestionId = questionId;
  state.view = 'question';
  saveAssessmentState(state);
  render();
}

// Start application
init();
