/**
 * UI Renderer for Quiz Questions and Interactive Option Cards.
 * Supports auto-advance on single choice with micro-animation,
 * and multi-select with full keyboard accessibility (Enter/Space).
 */

import { icons } from './icons.js';
import { escapeHtml } from '../utils/format.js';

export function renderQuestionScreen({
  question,
  currentValue,
  onSelectOption,
  onMultiSubmit
}) {
  const container = document.createElement('div');
  container.className = 'question-container';

  const isMultiple = question.type === 'multiple';
  const selectedValues = isMultiple
    ? new Set(Array.isArray(currentValue) ? currentValue : [])
    : null;
  const singleSelectedId = !isMultiple ? currentValue : null;

  // Header markup
  const subtitleHtml = question.subtitle
    ? `<p class="question-subtitle">${escapeHtml(question.subtitle)}</p>`
    : '';

  const multiHintHtml = isMultiple
    ? `<span class="multi-hint">${icons.info({ size: 14 })} Escolha quantas opções desejar e clique em Continuar</span>`
    : '';

  // Options cards markup
  let optionsHtml = '';
  const gridClass = question.options.length % 3 === 0 ? 'options-grid grid-3' : 'options-grid';

  question.options.forEach((opt) => {
    const isSelected = isMultiple
      ? selectedValues.has(opt.id)
      : singleSelectedId === opt.id;

    const iconRenderer = icons[opt.icon] || icons.variety;
    const iconSvg = iconRenderer({ size: 26 });

    const role = isMultiple ? 'checkbox' : 'radio';
    const checkedAttr = isSelected ? 'true' : 'false';
    const indicatorClass = isMultiple ? 'option-checkbox-indicator checkbox-square' : 'option-checkbox-indicator';
    const checkmarkHtml = isSelected ? icons.check({ size: 14, strokeWidth: 3 }) : '';

    optionsHtml += `
      <div 
        class="option-card ${isSelected ? 'selected' : ''}" 
        role="${role}" 
        aria-checked="${checkedAttr}" 
        tabindex="0" 
        data-option-id="${opt.id}"
      >
        <div class="option-icon-box" aria-hidden="true">
          ${iconSvg}
        </div>
        <div class="option-body">
          <div class="option-title">
            <span>${escapeHtml(opt.label)}</span>
            <div class="${indicatorClass}" aria-hidden="true">
              ${checkmarkHtml}
            </div>
          </div>
          <p class="option-description">${escapeHtml(opt.description)}</p>
        </div>
      </div>
    `;
  });

  let footerHtml = '';
  if (isMultiple) {
    footerHtml = `
      <div class="quiz-footer">
        <button type="button" class="btn btn-primary" id="btn-multi-continue">
          Continuar
          ${icons.arrowRight({ size: 18 })}
        </button>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="question-header">
      <h2 class="question-title">${escapeHtml(question.title)}</h2>
      ${subtitleHtml}
      ${multiHintHtml}
    </div>

    <div 
      class="${gridClass}" 
      role="${isMultiple ? 'group' : 'radiogroup'}" 
      aria-label="${escapeHtml(question.title)}"
    >
      ${optionsHtml}
    </div>

    ${footerHtml}
  `;

  // Interaction Handling
  const cards = container.querySelectorAll('.option-card');

  if (!isMultiple) {
    // Single Choice Interaction
    let isAdvancing = false;

    cards.forEach((card) => {
      const optId = card.dataset.optionId;

      const triggerSelection = () => {
        if (isAdvancing) return;
        isAdvancing = true;

        // Visual feedback
        cards.forEach((c) => {
          c.classList.remove('selected', 'animate-pulse-select');
          c.setAttribute('aria-checked', 'false');
          const indicator = c.querySelector('.option-checkbox-indicator');
          if (indicator) indicator.innerHTML = '';
        });

        card.classList.add('selected', 'animate-pulse-select');
        card.setAttribute('aria-checked', 'true');
        const indicator = card.querySelector('.option-checkbox-indicator');
        if (indicator) indicator.innerHTML = icons.check({ size: 14, strokeWidth: 3 });

        // Auto-advance after 260ms confirmation
        setTimeout(() => {
          onSelectOption(optId);
        }, 260);
      };

      card.addEventListener('click', triggerSelection);

      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          triggerSelection();
        }
      });
    });
  } else {
    // Multi Choice Interaction
    const currentSelectedSet = new Set(selectedValues);

    const updateMultiCardUi = (card, optId) => {
      const isSelected = currentSelectedSet.has(optId);
      card.classList.toggle('selected', isSelected);
      card.setAttribute('aria-checked', isSelected ? 'true' : 'false');
      const indicator = card.querySelector('.option-checkbox-indicator');
      if (indicator) {
        indicator.innerHTML = isSelected ? icons.check({ size: 14, strokeWidth: 3 }) : '';
      }
    };

    cards.forEach((card) => {
      const optId = card.dataset.optionId;

      const toggleOption = () => {
        if (currentSelectedSet.has(optId)) {
          currentSelectedSet.delete(optId);
        } else {
          currentSelectedSet.add(optId);
        }
        updateMultiCardUi(card, optId);
      };

      card.addEventListener('click', toggleOption);

      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleOption();
        }
      });
    });

    const continueBtn = container.querySelector('#btn-multi-continue');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        onMultiSubmit(Array.from(currentSelectedSet));
      });
    }
  }

  return container;
}
