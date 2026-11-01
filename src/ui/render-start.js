/**
 * UI Renderer for the Welcome / Start Screen.
 */

import { icons } from './icons.js';

export function renderStartScreen({ hasSavedSession, onStart, onResume, onResetSession }) {
  const container = document.createElement('div');
  container.className = 'start-screen';

  let resumeHtml = '';
  if (hasSavedSession) {
    resumeHtml = `
      <div class="resume-banner" role="alert">
        <div class="resume-info">
          <div class="resume-icon">${icons.clock({ size: 24 })}</div>
          <div>
            <div class="resume-title">Encontramos uma avaliação em andamento</div>
            <div class="resume-desc">Você pode continuar de onde parou ou recomeçar do início.</div>
          </div>
        </div>
        <div class="resume-buttons">
          <button type="button" class="btn btn-secondary btn-sm" id="btn-reset-saved">
            Começar do zero
          </button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-resume-saved">
            Continuar avaliação
          </button>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    ${resumeHtml}

    <div class="start-hero-badge">
      ${icons.sparkles({ size: 16 })}
      Guia Descomplicado de Computadores
    </div>

    <h1 class="start-title">Descubra uma configuração de computador adequada para você, sem complicação</h1>
    
    <p class="start-description">
      Em apenas 2 minutos, responda perguntas simples sobre o seu dia a dia. 
      Sem palavras difíceis ou termos técnicos: nós calculamos tudo o que você precisa.
    </p>

    <div class="start-pillars">
      <div class="pillar-card">
        <div class="pillar-icon-box">${icons.sparkles({ size: 22 })}</div>
        <h2 class="pillar-title">Zero jargões técnicos</h2>
        <p class="pillar-text">Você não precisa saber o que é clock, GHz ou placa mãe. Focamos apenas nas tarefas que você vai realizar.</p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon-box">${icons.variety({ size: 22 })}</div>
        <h2 class="pillar-title">Sob medida para você</h2>
        <p class="pillar-text">Perguntas dinâmicas e inteligentes que se adaptam às suas respostas e ao seu estilo de rotina.</p>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon-box">${icons.scale({ size: 22 })}</div>
        <h2 class="pillar-title">Três opções claras</h2>
        <p class="pillar-text">Receba uma opção econômica, a mais equilibrada e uma feita para durar muitos anos sem travamentos.</p>
      </div>
    </div>

    <div class="start-actions">
      <button type="button" class="btn btn-primary" id="btn-start-quiz">
        Começar avaliação agora
        ${icons.arrowRight({ size: 18 })}
      </button>
    </div>

    <aside class="start-guidance-note" aria-label="Aviso sobre as recomendações">
      ${icons.info({ size: 18 })}
      <p>
        <strong>Resultado orientativo:</strong> as recomendações são sugestões baseadas nas suas respostas.
        Sempre confirme as especificações e condições do produto antes da compra.
      </p>
    </aside>
  `;

  // Attach event handlers
  const startBtn = container.querySelector('#btn-start-quiz');
  if (startBtn) {
    startBtn.addEventListener('click', () => onStart());
  }

  const resumeBtn = container.querySelector('#btn-resume-saved');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => onResume());
  }

  const resetBtn = container.querySelector('#btn-reset-saved');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => onResetSession());
  }

  return container;
}
