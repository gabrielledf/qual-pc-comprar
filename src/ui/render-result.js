/**
 * UI Renderer for the Recommendations Result Screen.
 * Renders the 3 alternatives (Essencial, Recomendada, Maior Durabilidade)
 * with the Recommended alternative visually highlighted.
 */

import { icons } from './icons.js';
import { escapeHtml, buildClipboardSummary } from '../utils/format.js';

export function renderResultScreen({
  recommendations,
  summaryTags,
  warnings,
  referenceDate,
  marketNotice,
  onRestart,
  onChangeAnswer
}) {
  const container = document.createElement('div');
  container.className = 'results-screen';

  // 1. Summary Chips
  let chipsHtml = '';
  if (summaryTags && summaryTags.length > 0) {
    chipsHtml = summaryTags
      .map(
        (tag) => `
        <button 
          type="button" 
          class="summary-chip" 
          data-question-id="${tag.questionId}" 
          title="Clique para alterar esta resposta"
        >
          <strong>${escapeHtml(tag.label)}:</strong> ${escapeHtml(tag.value)}
          <span class="summary-chip-edit" aria-hidden="true">✎</span>
        </button>
      `
      )
      .join('');
  }

  // 2. Budget Alert Warnings
  let warningsHtml = '';
  if (warnings && warnings.length > 0) {
    warningsHtml = warnings
      .map(
        (w) => `
        <div class="budget-warning-card" role="alert">
          <div class="budget-warning-icon">
            ${icons.alertTriangle({ size: 28 })}
          </div>
          <div>
            <div class="budget-warning-title">${escapeHtml(w.title)}</div>
            <p class="budget-warning-text">${escapeHtml(w.message)}</p>
          </div>
        </div>
      `
      )
      .join('');
  }

  // Helper for rendering one recommendation card
  const renderCard = (cardData, isFeatured = false) => {
    if (!cardData) return '';

    const tierClass =
      cardData.tier === 'essential'
        ? 'tier-essential'
        : cardData.tier === 'recommended'
        ? 'tier-recommended'
        : 'tier-durability';

    const ribbonHtml = isFeatured
      ? `<div class="featured-ribbon">${icons.star({ size: 16, fill: 'currentColor' })} Opção Mais Equilibrada para seu Perfil</div>`
      : '';

    // Advantages
    const advantagesHtml = (cardData.advantages || [])
      .map(
        (adv) => `
        <li class="pro-con-item">
          <span class="pro-con-bullet" style="color: var(--color-accent-600)">${icons.check({ size: 16, strokeWidth: 3 })}</span>
          <span>${escapeHtml(adv)}</span>
        </li>
      `
      )
      .join('');

    // Limitations
    const limitationsHtml = (cardData.limitations || [])
      .map(
        (lim) => `
        <li class="pro-con-item">
          <span class="pro-con-bullet" style="color: var(--color-slate-400)">${icons.info({ size: 16 })}</span>
          <span>${escapeHtml(lim)}</span>
        </li>
      `
      )
      .join('');

    // Battery / mobility spec line (if present)
    const mobilityHtml = cardData.specs.batteryAndMobility
      ? `
        <div class="spec-item">
          <div class="spec-icon">${icons.battery({ size: 18 })}</div>
          <div>
            <div class="spec-label">Bateria & Mobilidade</div>
            <div class="spec-value">${escapeHtml(cardData.specs.batteryAndMobility)}</div>
          </div>
        </div>
      `
      : '';

    return `
      <article class="rec-card ${isFeatured ? 'is-featured is-recommended' : ''}">
        ${ribbonHtml}

        <div class="rec-card-header">
          <span class="rec-tier-badge ${tierClass}">${escapeHtml(cardData.badge)}</span>
          <h3 class="rec-card-title">${escapeHtml(cardData.profileTitle)}</h3>
          
          <div class="rec-card-justification">
            <strong>Por que esta opção?</strong> ${escapeHtml(cardData.justification)}
          </div>
        </div>

        <div class="specs-section">
          <div class="specs-title">Configuração Recomendada</div>
          <div class="specs-grid">
            <div class="spec-item">
              <div class="spec-icon">${icons.cpu({ size: 18 })}</div>
              <div>
                <div class="spec-label">Processador (Cérebro do PC)</div>
                <div class="spec-value">${escapeHtml(cardData.specs.cpu)}</div>
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-icon">${icons.ram({ size: 18 })}</div>
              <div>
                <div class="spec-label">Memória RAM (Multitarefa sem travar)</div>
                <div class="spec-value">${escapeHtml(cardData.specs.ram)}</div>
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-icon">${icons.storage({ size: 18 })}</div>
              <div>
                <div class="spec-label">Armazenamento (Espaço interno)</div>
                <div class="spec-value">${escapeHtml(cardData.specs.storage)}</div>
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-icon">${icons.gpu({ size: 18 })}</div>
              <div>
                <div class="spec-label">Placa de Vídeo (Capacidade Gráfica)</div>
                <div class="spec-value">${escapeHtml(cardData.specs.gpu)}</div>
              </div>
            </div>

            <div class="spec-item">
              <div class="spec-icon">${icons.screen({ size: 18 })}</div>
              <div>
                <div class="spec-label">Tela / Monitor</div>
                <div class="spec-value">${escapeHtml(cardData.specs.screen)}</div>
              </div>
            </div>

            ${mobilityHtml}

            <div class="spec-item">
              <div class="spec-icon">${icons.os({ size: 18 })}</div>
              <div>
                <div class="spec-label">Sistema Operacional</div>
                <div class="spec-value">${escapeHtml(cardData.specs.os)}</div>
              </div>
            </div>
          </div>

          <div class="price-box">
            <div>
              <span class="price-label">Faixa estimada de investimento</span>
              <span class="price-caption">Valor meramente estimativo; confirme o preço atual com o vendedor.</span>
            </div>
            <span class="price-value">${escapeHtml(cardData.priceRange)}</span>
          </div>
        </div>

        <div class="pros-cons-section">
          <div class="pro-con-col">
            <div class="pro-con-header header-pros">
              ${icons.check({ size: 14, strokeWidth: 3 })} Principais Vantagens
            </div>
            <ul class="pro-con-list">
              ${advantagesHtml}
            </ul>
          </div>

          <div class="pro-con-col">
            <div class="pro-con-header header-cons">
              ${icons.info({ size: 14 })} O que considerar
            </div>
            <ul class="pro-con-list">
              ${limitationsHtml}
            </ul>
          </div>
        </div>

        <div class="tech-details-box">
          <details>
            <summary class="tech-accordion-summary">
              ${icons.sparkles({ size: 14 })}
              Ver resumo das especificações para levar à loja física ou online
            </summary>
            <div class="tech-details-content">
              <strong>Como pedir ao vendedor ou buscar em lojas:</strong><br/>
              <code>${escapeHtml(cardData.specs.shopSpecs || '')}</code>
            </div>
          </details>
        </div>
      </article>
    `;
  };

  container.innerHTML = `
    <div class="results-header">
      <div class="results-badge">
        ${icons.check({ size: 16, strokeWidth: 3 })}
        Avaliação concluída com sucesso
      </div>
      <h1 class="results-title">Configurações sugeridas para você</h1>
      <p class="results-subtitle">
        Com base nas suas respostas, reunimos três alternativas que podem atender ao seu perfil de uso.
      </p>
    </div>

    <div class="summary-box">
      <div class="summary-header">
        <span class="summary-title">Suas preferências registradas:</span>
      </div>
      <div class="summary-chips">
        ${chipsHtml}
      </div>
    </div>

    ${warningsHtml}

    <div class="recommendations-grid">
      ${renderCard(recommendations.recommended, true)}
      ${renderCard(recommendations.essential, false)}
      ${renderCard(recommendations.durability, false)}
    </div>

    <aside class="recommendation-disclaimer" aria-labelledby="recommendation-disclaimer-title">
      <div class="recommendation-disclaimer-icon">${icons.info({ size: 22 })}</div>
      <div>
        <h2 id="recommendation-disclaimer-title">Aviso sobre esta recomendação</h2>
        <p>
          Este relatório possui caráter exclusivamente informativo e orientativo. As configurações apresentadas
          são sugestões produzidas automaticamente a partir das respostas fornecidas e de critérios gerais de uso.
          Elas não constituem garantia de desempenho, compatibilidade, disponibilidade, preço, durabilidade ou
          adequação de um produto específico.
        </p>
        <p>
          Preços, tecnologias e requisitos de programas podem mudar. Antes da compra, confirme as especificações
          completas do equipamento, a compatibilidade com programas e acessórios, as condições de garantia e suporte
          e as políticas do fabricante e do vendedor. A decisão final de compra é responsabilidade do usuário.
        </p>
      </div>
    </aside>

    <div class="results-actions-bar">
      <button type="button" class="btn btn-primary" id="btn-copy-summary">
        ${icons.copy({ size: 18 })}
        Copiar recomendação
      </button>

      <button type="button" class="btn btn-secondary" id="btn-print-summary">
        ${icons.print({ size: 18 })}
        Imprimir ou Salvar em PDF
      </button>

      <button type="button" class="btn btn-outline" id="btn-restart-quiz">
        ${icons.refresh({ size: 18 })}
        Refazer avaliação
      </button>
    </div>

    <footer class="results-footer-notes">
      <p><strong>Data de referência:</strong> ${escapeHtml(referenceDate || 'Novembro de 2026')}</p>
      <p>${escapeHtml(marketNotice || 'Valores meramente estimativos, sujeitos a variações de mercado, região, disponibilidade e condições comerciais.')}</p>
    </footer>
  `;

  // Attach actions
  const copyBtn = container.querySelector('#btn-copy-summary');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = buildClipboardSummary({
        recommendations,
        summaryTags,
        warnings,
        referenceDate
      });

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Recomendações copiadas para a área de transferência!');
      }).catch(() => {
        showToast('Não foi possível copiar automaticamente.');
      });
    });
  }

  const printBtn = container.querySelector('#btn-print-summary');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const restartBtn = container.querySelector('#btn-restart-quiz');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      onRestart();
    });
  }

  // Answer change chips
  const chipButtons = container.querySelectorAll('.summary-chip');
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      const qId = chip.dataset.questionId;
      if (qId && typeof onChangeAnswer === 'function') {
        onChangeAnswer(qId);
      }
    });
  });

  return container;
}

/**
 * Toast notification micro-component
 */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${icons.check({ size: 16, strokeWidth: 3 })} <span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
