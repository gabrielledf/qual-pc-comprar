/**
 * LocalStorage utilities for temporary session persistence.
 * Does not store any personally identifiable information.
 */

const STORAGE_KEY = 'qual_pc_assessment_state_v1';

export function saveAssessmentState(state) {
  try {
    const payload = {
      answers: state.answers || {},
      currentStepId: state.currentStepId || null,
      history: state.history || [],
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn('Unable to persist assessment to localStorage', err);
  }
}

export function loadAssessmentState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.answers) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('Unable to parse saved assessment state', err);
    return null;
  }
}

export function clearAssessmentState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Unable to clear assessment state', err);
  }
}
