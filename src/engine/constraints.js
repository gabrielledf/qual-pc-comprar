/**
 * Constraints evaluation module.
 * Checks for non-negotiable hardware requirements and budget conflicts.
 */

import { constraints, evaluateBudgetCompatibility } from '../data/rules.js';

export function evaluateConstraints(answers = {}) {
  const activeConstraints = [];
  const enforcements = {
    minRamGb: 8,
    recommendedRamGb: 16,
    minStorageGb: 256,
    dedicatedGpu: false,
    minCpuTier: 'basic',
    minBatteryHours: 4,
    preferredFormFactor: null
  };

  constraints.forEach((rule) => {
    if (typeof rule.check === 'function' && rule.check(answers)) {
      activeConstraints.push(rule);
      if (rule.enforce) {
        if (rule.enforce.minRamGb && rule.enforce.minRamGb > enforcements.minRamGb) {
          enforcements.minRamGb = rule.enforce.minRamGb;
        }
        if (rule.enforce.recommendedRamGb && rule.enforce.recommendedRamGb > enforcements.recommendedRamGb) {
          enforcements.recommendedRamGb = rule.enforce.recommendedRamGb;
        }
        if (rule.enforce.minStorageGb && rule.enforce.minStorageGb > enforcements.minStorageGb) {
          enforcements.minStorageGb = rule.enforce.minStorageGb;
        }
        if (rule.enforce.dedicatedGpu) {
          enforcements.dedicatedGpu = true;
        }
        if (rule.enforce.preferredFormFactor) {
          enforcements.preferredFormFactor = rule.enforce.preferredFormFactor;
        }
        if (rule.enforce.minBatteryHours && rule.enforce.minBatteryHours > enforcements.minBatteryHours) {
          enforcements.minBatteryHours = rule.enforce.minBatteryHours;
        }
      }
    }
  });

  const budgetConflict = evaluateBudgetCompatibility(answers, activeConstraints);

  return {
    activeConstraints,
    enforcements,
    budgetConflict
  };
}
