/**
 * Decision Tree module.
 * Evaluates dynamic step sequences based on previous answers.
 */

import { questions } from '../data/questions.js';

/**
 * Returns the array of questions that are currently active/visible
 * given the user's current answers.
 */
export function getActiveQuestions(answers = {}) {
  return questions.filter((q) => {
    if (typeof q.condition === 'function') {
      return Boolean(q.condition(answers));
    }
    return true;
  });
}

/**
 * Finds the index and question object for a given questionId
 * within the active questions sequence.
 */
export function findActiveQuestion(questionId, answers = {}) {
  const activeList = getActiveQuestions(answers);
  const index = activeList.findIndex((q) => q.id === questionId);
  return {
    index,
    question: index !== -1 ? activeList[index] : null,
    total: activeList.length
  };
}

/**
 * Returns the first active question to start the quiz.
 */
export function getFirstQuestion(answers = {}) {
  const activeList = getActiveQuestions(answers);
  return activeList[0] || null;
}

/**
 * Returns the next question to show, or null if the quiz is completed.
 */
export function getNextQuestion(currentQuestionId, answers = {}) {
  const activeList = getActiveQuestions(answers);
  const currentIndex = activeList.findIndex((q) => q.id === currentQuestionId);

  if (currentIndex === -1) {
    return activeList[0] || null;
  }

  if (currentIndex + 1 < activeList.length) {
    return activeList[currentIndex + 1];
  }

  return null; // All questions answered
}
