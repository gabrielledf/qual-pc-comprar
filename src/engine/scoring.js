/**
 * Scoring module.
 * Aggregates points for each architectural dimension from user answers,
 * and extracts human-readable summary tags of the user's responses.
 */

import { questions } from '../data/questions.js';

export function calculateScores(answers = {}) {
  const scores = {
    cpu: 0,
    ram: 0,
    storage: 0,
    gpu: 0,
    mobility: 0,
    battery: 0,
    screen: 0,
    upgradability: 0,
    economy: 0,
    durability: 0
  };

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  Object.entries(answers).forEach(([questionId, value]) => {
    const question = questionMap.get(questionId);
    if (!question) return;

    if (question.type === 'single') {
      const option = question.options.find((opt) => opt.id === value);
      if (option && option.scores) {
        Object.entries(option.scores).forEach(([dimension, pts]) => {
          if (scores[dimension] !== undefined) {
            scores[dimension] += pts;
          }
        });
      }
    } else if (question.type === 'multiple' && Array.isArray(value)) {
      value.forEach((optId) => {
        const option = question.options.find((opt) => opt.id === optId);
        if (option && option.scores) {
          Object.entries(option.scores).forEach(([dimension, pts]) => {
            if (scores[dimension] !== undefined) {
              scores[dimension] += pts;
            }
          });
        }
      });
    }
  });

  return scores;
}

/**
 * Extracts scannable summary tags for the user profile.
 */
export function extractSummaryTags(answers = {}) {
  const tags = [];
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  // 1. Device form factor
  if (answers.device_type) {
    const q = questionMap.get('device_type');
    const opt = q?.options.find((o) => o.id === answers.device_type);
    if (opt) tags.push({ questionId: 'device_type', label: 'Equipamento', value: opt.label });
  }

  // 2. Primary use
  if (answers.primary_use) {
    const q = questionMap.get('primary_use');
    const opt = q?.options.find((o) => o.id === answers.primary_use);
    if (opt) tags.push({ questionId: 'primary_use', label: 'Uso principal', value: opt.label });
  }

  // 3. Complements
  if (Array.isArray(answers.complements) && answers.complements.length > 0) {
    const q = questionMap.get('complements');
    const labels = answers.complements
      .map((id) => q?.options.find((o) => o.id === id)?.label)
      .filter(Boolean);
    if (labels.length > 0) {
      tags.push({ questionId: 'complements', label: 'Outras tarefas', value: labels.join(', ') });
    }
  }

  // 4. Multitasking
  if (answers.multitasking) {
    const q = questionMap.get('multitasking');
    const opt = q?.options.find((o) => o.id === answers.multitasking);
    if (opt) tags.push({ questionId: 'multitasking', label: 'Multitarefas', value: opt.label });
  }

  // 5. Mobility
  if (answers.mobility) {
    const q = questionMap.get('mobility');
    const opt = q?.options.find((o) => o.id === answers.mobility);
    if (opt) tags.push({ questionId: 'mobility', label: 'Transporte', value: opt.label });
  }

  // 6. Games depth
  if (answers.gaming_depth) {
    const q = questionMap.get('gaming_depth');
    const opt = q?.options.find((o) => o.id === answers.gaming_depth);
    if (opt) tags.push({ questionId: 'gaming_depth', label: 'Jogos', value: opt.label });
  }

  // 7. Media depth
  if (answers.media_depth) {
    const q = questionMap.get('media_depth');
    const opt = q?.options.find((o) => o.id === answers.media_depth);
    if (opt) tags.push({ questionId: 'media_depth', label: 'Edição', value: opt.label });
  }

  // 8. Storage
  if (answers.storage_need) {
    const q = questionMap.get('storage_need');
    const opt = q?.options.find((o) => o.id === answers.storage_need);
    if (opt) tags.push({ questionId: 'storage_need', label: 'Armazenamento', value: opt.label });
  }

  // 9. Budget
  if (answers.budget) {
    const q = questionMap.get('budget');
    const opt = q?.options.find((o) => o.id === answers.budget);
    if (opt) tags.push({ questionId: 'budget', label: 'Orçamento', value: opt.label });
  }

  return tags;
}
