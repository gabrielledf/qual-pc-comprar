/**
 * Mandatory rules, constraints, and validation logic.
 * These ensure that demanding workloads enforce adequate hardware minimums,
 * and detect unrealistic budget combinations with gentle, educational alerts.
 */

export const constraints = [
  {
    id: 'rule_video_4k',
    name: 'Edição de Vídeo 4K / Pesada',
    check: (answers) => answers.primary_use === 'content_creation' && answers.media_depth === 'video_4k_pro',
    enforce: {
      minRamGb: 16,
      recommendedRamGb: 32,
      minStorageGb: 1000,
      dedicatedGpu: true,
      minCpuTier: 'high',
      minBudgetNeeded: 6500
    },
    warningMessage: {
      title: 'Atenção com o orçamento para Edição 4K',
      text: 'Trabalhar com vídeos profissionais em 4K exige muito poder gráfico e de memória. Com orçamentos inferiores a R$ 6.500, a exportação de vídeos pode ser bastante lenta ou apresentar travamentos. Recomendamos priorizar computadores de mesa ou investir em modelos com placa de vídeo dedicada.'
    }
  },
  {
    id: 'rule_heavy_gaming',
    name: 'Jogos Modernos e Pesados',
    check: (answers) => answers.primary_use === 'gaming' && answers.gaming_depth === 'heavy_games',
    enforce: {
      minRamGb: 16,
      recommendedRamGb: 16,
      minStorageGb: 512,
      dedicatedGpu: true,
      minCpuTier: 'mid_high',
      minBudgetNeeded: 4800
    },
    warningMessage: {
      title: 'Atenção com o orçamento para Jogos Pesados',
      text: 'Jogos contemporâneos exigem uma placa de vídeo dedicada (como GeForce RTX ou Radeon). No mercado brasileiro, notebooks e desktops com essas placas costumam iniciar acima de R$ 4.800. Um valor menor pode obrigar a jogar em qualidades gráficas muito baixas.'
    }
  },
  {
    id: 'rule_daily_mobility',
    name: 'Mobilidade Diária',
    check: (answers) => answers.mobility === 'daily_mobile' && answers.device_type !== 'desktop',
    enforce: {
      preferredFormFactor: 'ultrabook',
      maxWeightKg: 1.6,
      minBatteryHours: 7
    }
  },
  {
    id: 'rule_heavy_multitasking',
    name: 'Multitarefas Intenso',
    check: (answers) => answers.multitasking === 'many_tasks',
    enforce: {
      minRamGb: 16,
      recommendedRamGb: 32
    }
  },
  {
    id: 'rule_heavy_storage',
    name: 'Armazenamento de Grande Porte',
    check: (answers) => answers.storage_need === 'storage_heavy',
    enforce: {
      minStorageGb: 1000
    }
  },
  {
    id: 'rule_programming',
    name: 'Desenvolvimento de Software',
    check: (answers) => answers.primary_use === 'programming',
    enforce: {
      minRamGb: 16,
      minCpuTier: 'mid_high',
      minStorageGb: 512
    }
  }
];

/**
 * Checks whether user's selected budget is realistically sufficient
 * for their required workload.
 */
export function evaluateBudgetCompatibility(answers, activeConstraints) {
  const budgetOption = answers.budget;
  if (!budgetOption || budgetOption === 'tier_open') {
    return null;
  }

  // Find highest required budget among triggered constraints
  let maxRequired = 0;
  let triggeredRule = null;

  activeConstraints.forEach((rule) => {
    if (rule.enforce && rule.enforce.minBudgetNeeded && rule.enforce.minBudgetNeeded > maxRequired) {
      maxRequired = rule.enforce.minBudgetNeeded;
      triggeredRule = rule;
    }
  });

  if (maxRequired === 0) return null;

  const budgetMaxMap = {
    tier_1: 2500,
    tier_2: 4500,
    tier_3: 7500,
    tier_4: 99999
  };

  const userCap = budgetMaxMap[budgetOption];
  if (userCap && userCap < maxRequired) {
    return {
      isConflict: true,
      userCap,
      minRecommended: maxRequired,
      title: triggeredRule.warningMessage.title,
      text: triggeredRule.warningMessage.text
    };
  }

  return null;
}
