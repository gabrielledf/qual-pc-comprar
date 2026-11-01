/**
 * UI Renderer for the Progress Bar and Quiz Navigation Header.
 */

import { icons } from './icons.js';

export function renderProgressBar({ currentStep, totalSteps, canGoBack, onBack }) {
  const container = document.createElement('div');
  container.className = 'quiz-nav-container';

  const percentage = Math.round((currentStep / totalSteps) * 100);

  container.innerHTML = `
    <div class="quiz-nav-header">
      <button 
        type="button" 
        class="btn-back" 
        id="btn-nav-back" 
        ${canGoBack ? '' : 'disabled aria-disabled="true"'}
        aria-label="Voltar para a pergunta anterior"
      >
        ${icons.arrowLeft({ size: 18 })}
        Voltar
      </button>

      <span class="progress-info" aria-live="polite">
        Pergunta ${currentStep} de ${totalSteps}
      </span>
    </div>

    <div 
      class="progress-bar-container" 
      role="progressbar" 
      aria-valuenow="${percentage}" 
      aria-valuemin="0" 
      aria-valuemax="100"
      aria-label="Progresso da avaliação: ${percentage}% concluído"
    >
      <div class="progress-bar-fill" style="width: ${percentage}%"></div>
    </div>
  `;

  const backBtn = container.querySelector('#btn-nav-back');
  if (backBtn && canGoBack) {
    backBtn.addEventListener('click', () => onBack());
  }

  return container;
}
