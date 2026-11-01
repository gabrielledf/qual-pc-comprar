/**
 * Recommendation Engine and Decision Tree Automated Tests.
 * Uses native Node.js test runner and assertions.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { getActiveQuestions, getNextQuestion } from '../src/engine/decision-tree.js';
import { generateRecommendations } from '../src/engine/recommendation-engine.js';
import { evaluateConstraints } from '../src/engine/constraints.js';

describe('Decision Tree Dynamic Sequences', () => {
  test('Skips mobility and battery questions when desktop is chosen', () => {
    const answers = { device_type: 'desktop' };
    const active = getActiveQuestions(answers);
    const hasMobility = active.some((q) => q.id === 'mobility');
    const hasBattery = active.some((q) => q.id === 'battery');
    assert.equal(hasMobility, false, 'Desktop should not ask mobility questions');
    assert.equal(hasBattery, false, 'Desktop should not ask battery questions');
  });

  test('Shows mobility and battery when laptop is chosen with frequent transit', () => {
    const answers = { device_type: 'laptop', mobility: 'daily_mobile' };
    const active = getActiveQuestions(answers);
    const hasMobility = active.some((q) => q.id === 'mobility');
    const hasBattery = active.some((q) => q.id === 'battery');
    assert.equal(hasMobility, true, 'Laptop should ask mobility');
    assert.equal(hasBattery, true, 'Daily mobile laptop should ask battery importance');
  });

  test('Only shows gaming depth if gaming is primary use', () => {
    const answersWithoutGame = { primary_use: 'study_browse' };
    const activeWithout = getActiveQuestions(answersWithoutGame);
    assert.equal(activeWithout.some((q) => q.id === 'gaming_depth'), false);

    const answersWithGame = { primary_use: 'gaming' };
    const activeWith = getActiveQuestions(answersWithGame);
    assert.equal(activeWith.some((q) => q.id === 'gaming_depth'), true);
  });
});

describe('Recommendation Engine Profiles (7 Mandatory Test Cases)', () => {
  // Test Case 1: Usuário básico com orçamento reduzido
  test('Profile 1: Usuário básico com orçamento reduzido', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'study_browse',
      complements: ['video_calls'],
      multitasking: 'single_task',
      mobility: 'rarely_mobile',
      storage_need: 'storage_light',
      priority: 'lowest_price',
      budget: 'tier_1' // Até R$ 2.500
    };

    const result = generateRecommendations(answers);

    assert.ok(result.essential, 'Should output essential recommendation');
    assert.ok(result.recommended, 'Should output recommended option');
    assert.ok(result.durability, 'Should output durability option');
    assert.equal(result.warnings.length, 0, 'Should not trigger budget warning for basic tasks in tier_1');
    assert.match(result.essential.specs.ram, /8\s*GB/, 'Essential must have at least 8 GB RAM');
    assert.match(result.essential.specs.storage, /SSD/, 'Must recommend SSD instead of mechanical HDD');
  });

  // Test Case 2: Profissional de escritório multitarefa
  test('Profile 2: Profissional de escritório multitarefa', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'office_work',
      complements: ['video_calls', 'heavy_browsing'],
      multitasking: 'many_tasks',
      mobility: 'sometimes_mobile',
      battery: 'battery_medium',
      storage_need: 'storage_moderate',
      priority: 'balanced',
      budget: 'tier_2'
    };

    const result = generateRecommendations(answers);

    assert.ok(result.recommended);
    assert.match(result.recommended.specs.ram, /16\s*GB/, 'Office multitasking should recommend 16 GB RAM');
    assert.match(result.recommended.justification, /memória/i, 'Justification should cite memory or responsiveness');
  });

  // Test Case 3: Programador / Desenvolvedor
  test('Profile 3: Programador', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'programming',
      complements: ['heavy_browsing'],
      multitasking: 'many_tasks',
      mobility: 'sometimes_mobile',
      battery: 'battery_medium',
      storage_need: 'storage_moderate',
      priority: 'max_performance',
      budget: 'tier_3'
    };

    const result = generateRecommendations(answers);

    assert.ok(result.recommended);
    assert.match(result.recommended.specs.cpu, /Core i7|Ryzen 7|núcleos|arquitetura/i);
    assert.match(result.recommended.specs.storage, /SSD/i);
  });

  // Test Case 4: Jogador (Gamer)
  test('Profile 4: Jogador que busca jogos modernos', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'gaming',
      gaming_depth: 'heavy_games',
      multitasking: 'some_tasks',
      storage_need: 'storage_heavy',
      priority: 'max_performance',
      budget: 'tier_3'
    };

    const result = generateRecommendations(answers);

    assert.ok(result.recommended);
    assert.match(result.recommended.specs.gpu, /GeForce|RTX|Dedicada/i, 'Must have dedicated GPU');
    assert.match(result.recommended.specs.screen, /120Hz|144Hz/, 'Must feature high refresh rate screen');
  });

  // Test Case 5: Editor de vídeo (4K / Criação de Conteúdo)
  test('Profile 5: Editor de vídeo 4K profissional', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'content_creation',
      media_depth: 'video_4k_pro',
      multitasking: 'many_tasks',
      storage_need: 'storage_heavy',
      priority: 'max_performance',
      budget: 'tier_4'
    };

    const result = generateRecommendations(answers);

    assert.ok(result.recommended);
    assert.match(result.recommended.specs.ram, /32\s*GB/, '4K video creation should recommend 32 GB RAM');
    assert.match(result.recommended.specs.storage, /1\s*TB|2\s*TB/, '4K editing requires 1TB+ SSD');
    assert.match(result.recommended.specs.gpu, /Dedicada|RTX|VRAM/i);
  });

  // Test Case 6: Usuário com mobilidade diária na mochila
  test('Profile 6: Usuário que precisa de mobilidade diária', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'study_browse',
      complements: ['video_calls'],
      multitasking: 'some_tasks',
      mobility: 'daily_mobile',
      battery: 'battery_high',
      storage_need: 'storage_moderate',
      priority: 'balanced',
      budget: 'tier_3'
    };

    const result = generateRecommendations(answers);

    assert.ok(result.recommended);
    assert.match(result.recommended.specs.batteryAndMobility, /1,[1-5]\s*kg|horas|autonomia/i);
  });

  // Test Case 7: Combinação incompatível com o orçamento
  test('Profile 7: Combinação incompatível com o orçamento', () => {
    const answers = {
      device_type: 'laptop',
      primary_use: 'content_creation',
      media_depth: 'video_4k_pro',
      multitasking: 'many_tasks',
      storage_need: 'storage_heavy',
      priority: 'lowest_price',
      budget: 'tier_1' // Até R$ 2.500 para edição 4K!
    };

    const result = generateRecommendations(answers);

    assert.ok(result.warnings.length > 0, 'Should trigger budget mismatch warning');
    assert.equal(result.warnings[0].type, 'budget_mismatch');
    assert.match(result.warnings[0].title, /orçamento/i);
  });
});
