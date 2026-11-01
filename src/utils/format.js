/**
 * Utility formatting functions for text, currency, and clipboard exports.
 */

export function formatCurrencyBRL(value) {
  if (typeof value !== 'number') return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
}

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Builds a clean, friendly text summary suitable for WhatsApp, email, or saving.
 */
export function buildClipboardSummary({ recommendations, summaryTags, warnings, referenceDate }) {
  const lines = [];
  lines.push('💻 QUAL PC COMPRAR? — RECOMENDAÇÃO PERSONALIZADA');
  lines.push(`📅 Data de referência: ${referenceDate || 'Novembro de 2026'}`);
  lines.push('');

  if (summaryTags && summaryTags.length > 0) {
    lines.push('📋 Meu perfil de uso:');
    summaryTags.forEach(tag => {
      lines.push(` • ${tag.label}: ${tag.value}`);
    });
    lines.push('');
  }

  if (warnings && warnings.length > 0) {
    lines.push('⚠️ ATENÇÃO COM O ORÇAMENTO:');
    warnings.forEach(w => lines.push(` • ${w.title}: ${w.message}`));
    lines.push('');
  }

  lines.push('⭐ ALTERNATIVAS SUGERIDAS:');
  lines.push('');

  const tiers = [
    { key: 'recommended', label: '1. RECOMENDADA (Melhor Custo-Benefício)' },
    { key: 'essential', label: '2. ESSENCIAL (Econômica)' },
    { key: 'durability', label: '3. MAIOR DURABILIDADE (Pronta para o Futuro)' }
  ];

  tiers.forEach(({ key, label }) => {
    const item = recommendations[key];
    if (!item) return;

    lines.push(`=========================================`);
    lines.push(`${label}`);
    lines.push(`Modelo: ${item.profileTitle}`);
    lines.push(`Faixa estimada: ${item.priceRange}`);
    lines.push(`Por que ela: ${item.justification}`);
    lines.push('');
    lines.push('Especificações para levar na loja:');
    lines.push(` - Processador: ${item.specs.cpu}`);
    lines.push(` - Memória: ${item.specs.ram}`);
    lines.push(` - Armazenamento: ${item.specs.storage}`);
    lines.push(` - Placa Gráfica: ${item.specs.gpu}`);
    lines.push(` - Tela / Monitor: ${item.specs.screen}`);
    if (item.specs.batteryAndMobility) {
      lines.push(` - Bateria e Peso: ${item.specs.batteryAndMobility}`);
    }
    lines.push(` - Sistema: ${item.specs.os}`);
    lines.push('');
  });

  lines.push('AVISO SOBRE ESTA RECOMENDAÇÃO');
  lines.push('Este conteúdo é exclusivamente informativo e orientativo. As configurações são sugestões automáticas baseadas nas respostas fornecidas e não garantem desempenho, compatibilidade, disponibilidade, preço, durabilidade ou adequação de um produto específico.');
  lines.push('Antes da compra, confirme as especificações, compatibilidade, preço, garantia, suporte e condições atuais diretamente com o fabricante e o vendedor. A decisão final de compra é responsabilidade do usuário.');
  lines.push('Gerado pelo Guia Inteligente de Computadores.');

  return lines.join('\n');
}
