/**
 * Recommendation Engine.
 * Integrates constraints, scoring, archetypes, and custom natural-language
 * justifications to output three distinct recommendation tiers.
 */

import { evaluateConstraints } from './constraints.js';
import { calculateScores, extractSummaryTags } from './scoring.js';
import { profiles, priceBands, referenceDate, marketNotice } from '../data/recommendations.js';

export function generateRecommendations(answers = {}) {
  const { activeConstraints, enforcements, budgetConflict } = evaluateConstraints(answers);
  const scores = calculateScores(answers);
  const summaryTags = extractSummaryTags(answers);

  const isDesktop = answers.device_type === 'desktop';
  const isDailyMobility = answers.mobility === 'daily_mobile';
  const isHeavyGaming = answers.primary_use === 'gaming' && answers.gaming_depth === 'heavy_games';
  const isVideo4k = answers.primary_use === 'content_creation' && answers.media_depth === 'video_4k_pro';
  const isProgramming = answers.primary_use === 'programming';
  const isBasicUse = answers.primary_use === 'study_browse' || answers.primary_use === 'general_daily';

  // Warnings array
  const warnings = [];
  if (budgetConflict) {
    warnings.push({
      type: 'budget_mismatch',
      title: budgetConflict.title,
      message: budgetConflict.text,
      userCap: budgetConflict.userCap,
      minRecommended: budgetConflict.minRecommended
    });
  }

  // Determine Tiers
  let essential = null;
  let recommended = null;
  let durability = null;

  if (isDesktop) {
    // DESKTOP BRANCH
    if (isHeavyGaming || isVideo4k) {
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: 'Desktop Gamer / Criador de Entrada',
        priceRange: priceBands.balanced_desktop,
        specs: {
          cpu: 'Processador de 6 núcleos veloz (Ryzen 5 ou Intel Core i5 recente)',
          ram: `${enforcements.minRamGb} GB de memória RAM`,
          storage: '512 GB em SSD NVMe rápido',
          gpu: 'Placa gráfica dedicada de entrada (ex: GeForce RTX 3050 ou similar)',
          screen: 'Monitor de 24 polegadas Full HD 75Hz com bom painel de cores',
          os: 'Windows 11 Home',
          shopSpecs: `Desktop com Core i5/Ryzen 5 | ${enforcements.minRamGb}GB RAM | SSD 512GB | Placa de vídeo dedicada`
        },
        justification: 'Atende aos jogos e edições pesadas mantendo o menor custo viável de entrada, permitindo melhorias no futuro.',
        advantages: [
          'Preço mais acessível para começar no mundo dos jogos/edição',
          'Gabinete que permite trocar placa de vídeo ou memória com facilidade'
        ],
        limitations: [
          'Pode ser necessário reduzir a qualidade gráfica nos lançamentos mais pesados'
        ]
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: 'Estação Desktop Potente para Alto Rendimento',
        priceRange: priceBands.gaming_desktop,
        specs: {
          cpu: 'Processador de alto desempenho (Ryzen 7 ou Core i7 de última geração)',
          ram: `${Math.max(enforcements.recommendedRamGb, 16)} GB de memória RAM rápida`,
          storage: '1 TB (1.000 GB) em SSD NVMe de alta velocidade',
          gpu: 'Placa de vídeo dedicada intermediária potente (série RTX 4060 / 4060 Ti)',
          screen: 'Monitor de 24 a 27 polegadas Full HD ou Quad HD IPS com 144Hz',
          os: 'Windows 11 Home ou Pro',
          shopSpecs: 'Desktop Ryzen 7/Core i7 | 16GB ou 32GB RAM | Placa RTX 4060 | SSD 1TB | Fonte 600W+'
        },
        justification: 'O ponto perfeito de equilíbrio: roda seus jogos com excelente fluidez visual e renderiza vídeos sem atrasar seu dia.',
        advantages: [
          'Fluidez absoluta nos principais jogos e aplicativos criativos',
          'Excelente ventilação e estabilidade mesmo em dias quentes',
          'Espaço de 1 TB para manter vários jogos e arquivos pesados'
        ],
        limitations: [
          'Exige mesa com espaço reservado para gabinete, teclado e monitor'
        ]
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: profiles.high_power_creator_desktop.title,
        priceRange: priceBands.workstation_desktop,
        specs: profiles.high_power_creator_desktop.specs,
        justification: 'Margem total de potência para encarar os próximos 5 a 7 anos sem nenhuma perda de fôlego.',
        advantages: profiles.high_power_creator_desktop.advantages,
        limitations: profiles.high_power_creator_desktop.limitations
      };
    } else {
      // General/Office Desktop
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: profiles.basic_home_desktop.title,
        priceRange: priceBands.entry_desktop,
        specs: profiles.basic_home_desktop.specs,
        justification: 'Ideal para quem deseja economizar e ter o conforto de uma tela ampla para ler, estudar e trabalhar em casa.',
        advantages: profiles.basic_home_desktop.advantages,
        limitations: profiles.basic_home_desktop.limitations
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: profiles.balanced_upgradeable_desktop.title,
        priceRange: priceBands.balanced_desktop,
        specs: profiles.balanced_upgradeable_desktop.specs,
        justification: 'Excelente resposta multitarefa para trabalhar com dezenas de páginas e planilhas, com portas e espaço para expansão.',
        advantages: profiles.balanced_upgradeable_desktop.advantages,
        limitations: profiles.balanced_upgradeable_desktop.limitations
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: 'Desktop Produtividade Avançada & Longevidade',
        priceRange: priceBands.gaming_desktop,
        specs: {
          cpu: 'Processador de 8 núcleos rápidos (Intel Core i7 ou AMD Ryzen 7)',
          ram: '32 GB de memória RAM',
          storage: '1 TB SSD NVMe ultraveloz',
          gpu: 'Placa gráfica moderna de suporte a múltiplos monitores 4K',
          screen: 'Monitor de 27 polegadas Quad HD IPS antirreflexo com ajuste de altura',
          os: 'Windows 11 Pro',
          shopSpecs: 'Desktop Core i7 / Ryzen 7 | 32GB RAM | SSD 1TB NVMe | Monitor 27" QHD'
        },
        justification: 'Configuração robusta pensada para atravessar muitos anos trabalhando sem nunca parecer lenta.',
        advantages: [
          'Capacidade multitarefa quase ilimitada',
          'Altíssimo conforto visual para jornadas longas de trabalho',
          'Componentes duráveis com fonte de energia certificada'
        ],
        limitations: [
          'Investimento maior que o estritamente necessário para uso básico'
        ]
      };
    }
  } else {
    // NOTEBOOK / PORTABLE BRANCH
    if (isHeavyGaming) {
      // Gaming Notebook Branch
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: 'Notebook Gamer de Entrada',
        priceRange: priceBands.gaming_entry_laptop,
        specs: {
          cpu: 'Processador veloz de alta performance (Intel Core i5 série H ou Ryzen 5 série H)',
          ram: '16 GB de memória RAM',
          storage: '512 GB em SSD veloz',
          gpu: 'Placa dedicada GeForce RTX 3050 ou RTX 4050 de entrada',
          screen: 'Tela de 15.6 polegadas Full HD 120Hz ou 144Hz antirreflexo',
          batteryAndMobility: 'Aproximadamente 2,2 kg; ventilação gamer ativa; bateria dura cerca de 2 a 3h fora da tomada',
          os: 'Windows 11 Home',
          shopSpecs: 'Notebook Gamer Core i5 série H | 16GB RAM | RTX 3050/4050 | SSD 512GB | Tela 144Hz'
        },
        justification: 'Permite ingressar em jogos modernos gastando o mínimo necessário para obter uma placa gráfica dedicada.',
        advantages: [
          'Preço acessível para a categoria gamer',
          'Tela fluida de 144Hz para jogos rápidos'
        ],
        limitations: [
          'Bateria de curta duração fora da tomada; requer carregador para jogar'
        ]
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: profiles.gaming_laptop.title,
        priceRange: priceBands.gaming_high_laptop,
        specs: profiles.gaming_laptop.specs,
        justification: 'Oferece o melhor desempenho gráfico para rodar lançamentos contemporâneos com qualidade de imagem impressionante.',
        advantages: profiles.gaming_laptop.advantages,
        limitations: profiles.gaming_laptop.limitations
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: 'Notebook Gamer Top de Linha & Render',
        priceRange: 'R$ 9.000 a R$ 13.000',
        specs: {
          cpu: 'Processador de topo (Intel Core i7/i9 série H ou AMD Ryzen 7/9)',
          ram: '32 GB de memória RAM DDR5',
          storage: '1 TB a 2 TB em SSD NVMe ultrarrápido',
          gpu: 'Placa dedicada de alto nível (GeForce RTX 4070 ou superior)',
          screen: 'Tela de 16 polegadas Quad HD (2560x1600) 165Hz ou 240Hz',
          batteryAndMobility: 'Chassi reforçado com refrigeração avançada por câmara de vapor',
          os: 'Windows 11 Home ou Pro',
          shopSpecs: 'Notebook Gamer Core i7/i9 | 32GB RAM | RTX 4070/4080 | SSD 1TB | Tela QHD 165Hz'
        },
        justification: 'Potência gráfica com folga para os próximos anos de novos jogos e softwares de ponta.',
        advantages: [
          'Roda qualquer jogo moderno nas qualidades máximas',
          'Tela nítida de padrão cinematográfico',
          '32 GB de memória garantem que nada engasgue'
        ],
        limitations: [
          'Preço premium e aparelho mais espesso'
        ]
      };
    } else if (isVideo4k) {
      // 4K Video Creator Branch
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: 'Notebook para Edição Intermediária',
        priceRange: priceBands.gaming_entry_laptop,
        specs: {
          cpu: 'Processador rápido de 8 núcleos (Core i7 ou Ryzen 7 recente)',
          ram: '16 GB de memória RAM',
          storage: '1 TB SSD veloz',
          gpu: 'Placa gráfica dedicada com 4GB a 6GB de memória gráfica',
          screen: 'Tela 15.6 polegadas Full HD com bom ângulo de visão',
          batteryAndMobility: 'Aproximadamente 2,1 kg; autonomia moderada',
          os: 'Windows 11 Home',
          shopSpecs: 'Core i7 / Ryzen 7 | 16GB RAM | SSD 1TB | Placa RTX 3050 ou similar'
        },
        justification: 'Atende às necessidades de edição audiovisual sem chegar aos custos das linhas estritamente corporativas.',
        advantages: [
          'Excelente relação de poder por real investido',
          '1 TB de armazenamento para guardar filmagens'
        ],
        limitations: [
          'Em linhas do tempo muito pesadas com muitos efeitos 4K simultâneos, pode exigir pré-renderização'
        ]
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: profiles.creator_pro_laptop.title,
        priceRange: priceBands.creator_pro_laptop,
        specs: profiles.creator_pro_laptop.specs,
        justification: 'Projetado exatamente para criadores: tela de cores reais, 32 GB de RAM para não travar a linha do tempo e exportações rápidas.',
        advantages: profiles.creator_pro_laptop.advantages,
        limitations: profiles.creator_pro_laptop.limitations
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: 'Workstation Móvel de Alta Fidelidade',
        priceRange: 'R$ 11.500 a R$ 16.000',
        specs: {
          cpu: 'Processador topo de linha profissional (Core i9, Ryzen 9 ou Apple M-Max)',
          ram: '32 GB a 64 GB de memória RAM unificada',
          storage: '2 TB em SSD NVMe ultrarrápido',
          gpu: 'Placa gráfica profissional de alta potência com 8GB+ de VRAM',
          screen: 'Tela calibrada de fábrica 4K ou Liquid Retina XDR de padrão broadcast',
          batteryAndMobility: 'Corpo usinado em alumínio com certificação de durabilidade militar',
          os: 'Windows 11 Pro ou macOS',
          shopSpecs: 'Workstation Mobile / MacBook Pro 16" | 32GB+ RAM | 2TB SSD | GPU Profissional'
        },
        justification: 'A máquina definitiva para quem vive da produção de conteúdo e precisa de confiabilidade industrial inegociável.',
        advantages: [
          'Exporta vídeos 4K e 8K com rapidez incomparável',
          'Espaço colossal de 2 TB para centenas de projetos',
          'Tela profissional que não mente nas cores da imagem'
        ],
        limitations: [
          'Custo de investimento profissional elevado'
        ]
      };
    } else if (isDailyMobility) {
      // Daily Mobility Branch (College, Commute, Backpack)
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: 'Notebook Compacto para o Dia a Dia',
        priceRange: priceBands.balanced_laptop,
        specs: {
          cpu: 'Processador eficiente de 4 a 6 núcleos (Intel Core i5 ou AMD Ryzen 5 série U)',
          ram: '16 GB de memória RAM',
          storage: '512 GB em SSD',
          gpu: 'Gráficos integrados eficientes',
          screen: 'Tela de 14 ou 15.6 polegadas antirreflexo',
          batteryAndMobility: 'Peso de aproximadamente 1,5 kg a 1,6 kg; bateria dura em média 6 a 7 horas',
          os: 'Windows 11 Home',
          shopSpecs: 'Notebook fino e leve (~1.5kg) | Core i5 / Ryzen 5 | 16GB RAM | SSD 512GB'
        },
        justification: 'Leve o suficiente para sua mochila diária, com bateria confiável para aulas ou reuniões sem estourar o orçamento.',
        advantages: [
          'Preço equilibrado com excelente agilidade',
          'Não cansa os ombros durante o deslocamento diário'
        ],
        limitations: [
          'Acabamento com algumas partes em plástico durável'
        ]
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: profiles.ultralight_travel_laptop.title,
        priceRange: priceBands.ultralight_laptop,
        specs: profiles.ultralight_travel_laptop.specs,
        justification: 'A combinação perfeita para transporte diário: pesa quase nada na mochila e a bateria aguenta um dia de trabalho completo.',
        advantages: profiles.ultralight_travel_laptop.advantages,
        limitations: profiles.ultralight_travel_laptop.limitations
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: 'Ultrabook Premium de Alumínio e Bateria Estendida',
        priceRange: priceBands.premium_laptop,
        specs: {
          cpu: 'Processador de alta eficiência e inteligência artificial (Intel Core Ultra 7 ou Apple M-series)',
          ram: '16 GB a 32 GB de memória RAM',
          storage: '1 TB SSD de leitura veloz',
          gpu: 'Gráficos modernos integrados de alta densidade',
          screen: 'Tela de 13.6 a 14.5 polegadas de alta resolução com brilho de 400 nits e vidro resistente',
          batteryAndMobility: 'Peso de 1,2 kg; bateria de até 14 a 18 horas de autonomia real; chassi 100% metálico',
          os: 'Windows 11 Home ou macOS',
          shopSpecs: 'Ultrabook Premium em Alumínio | Peso 1.2kg | Core Ultra 7 ou Apple Silicon | 1TB SSD | 16GB+'
        },
        justification: 'Chassi resistente em alumínio que aguenta anos de transporte diário sem ranger ou desgastar, com bateria lendária.',
        advantages: [
          'Você esquece o carregador em casa sem ansiedade',
          'Corpo em metal que suporta o atrito diário na mochila',
          'Resposta ágil e inicialização imediata ao abrir a tampa'
        ],
        limitations: [
          'Investimento maior pela portabilidade premium'
        ]
      };
    } else if (isProgramming) {
      // Developer / Programmer Branch
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: 'Notebook para Estudos de Programação',
        priceRange: priceBands.balanced_laptop,
        specs: {
          cpu: 'Processador moderno de 6 núcleos (Intel Core i5 ou AMD Ryzen 5)',
          ram: '16 GB de memória RAM (essencial para editores de código e navegadores simultâneos)',
          storage: '512 GB SSD veloz',
          gpu: 'Gráficos integrados modernos',
          screen: 'Tela de 15.6 polegadas Full HD IPS (conforto para leitura de código)',
          batteryAndMobility: 'Peso de 1,6 kg; autonomia de 5 a 7 horas',
          os: 'Windows 11 ou Linux Ubuntu',
          shopSpecs: 'Core i5 / Ryzen 5 | 16GB RAM | SSD 512GB | Tela IPS Full HD'
        },
        justification: 'Oferece os 16 GB de memória e o processador ágil que você precisa para compilar código sem gastar a mais.',
        advantages: [
          'Compilação rápida de projetos web e scripts',
          'Tela confortável para muitas horas de leitura'
        ],
        limitations: [
          'Se rodar muitas máquinas virtuais ou containers simultâneos, pode precisar de 32GB no futuro'
        ]
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: 'Notebook Desenvolvedor de Alta Produtividade',
        priceRange: priceBands.premium_laptop,
        specs: {
          cpu: 'Processador potente de 8 a 12 núcleos (Core i7, Ryzen 7 ou chip ARM de arquitetura moderna)',
          ram: '16 GB a 32 GB de memória RAM',
          storage: '1 TB SSD NVMe de altíssima velocidade',
          gpu: 'Gráficos integrados modernos ou placa dedicada de suporte',
          screen: 'Tela de 14 a 16 polegadas de alta resolução (16:10 para mais linhas de código visíveis)',
          batteryAndMobility: 'Peso de 1,4 kg a 1,7 kg; autonomia de 7 a 10 horas',
          os: 'Windows 11 Pro, Linux ou macOS',
          shopSpecs: 'Core i7 / Ryzen 7 ou Apple M | 16GB/32GB RAM | SSD 1TB | Tela 16:10'
        },
        justification: 'O ambiente ideal para desenvolvimento: tela com proporção 16:10 que mostra mais linhas de código e 1 TB de SSD rápido.',
        advantages: [
          'Abre em segundos ambientes como VS Code, Docker e bancos de dados locais',
          'Teclado ergonômico e tela com amplo campo vertical'
        ],
        limitations: [
          'Preço um pouco mais elevado que os modelos básicos de escritório'
        ]
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: profiles.future_proof_laptop.title,
        priceRange: priceBands.creator_pro_laptop,
        specs: profiles.future_proof_laptop.specs,
        justification: 'Com 32 GB de RAM e processador de alta gama, sua máquina lidará com qualquer stack ou tecnologia nova nos próximos 6 anos.',
        advantages: profiles.future_proof_laptop.advantages,
        limitations: profiles.future_proof_laptop.limitations
      };
    } else {
      // General / Study / Office Laptop (The most common mainstream user)
      essential = {
        tier: 'essential',
        badge: 'Essencial Econômica',
        profileTitle: profiles.basic_study_laptop.title,
        priceRange: priceBands.entry_laptop,
        specs: profiles.basic_study_laptop.specs,
        justification: 'Atende todas as suas necessidades diárias de navegação, aulas e vídeos com o menor gasto financeiro possível.',
        advantages: profiles.basic_study_laptop.advantages,
        limitations: profiles.basic_study_laptop.limitations
      };

      recommended = {
        tier: 'recommended',
        badge: 'Mais Recomendada',
        profileTitle: profiles.balanced_office_laptop.title,
        priceRange: priceBands.balanced_laptop,
        specs: profiles.balanced_office_laptop.specs,
        justification: 'O computador mais equilibrado do mercado: 16 GB de RAM para nunca travar com várias abas abertas e excelente tela.',
        advantages: profiles.balanced_office_laptop.advantages,
        limitations: profiles.balanced_office_laptop.limitations
      };

      durability = {
        tier: 'durability',
        badge: 'Máxima Durabilidade',
        profileTitle: profiles.future_proof_laptop.title,
        priceRange: priceBands.premium_laptop,
        specs: profiles.future_proof_laptop.specs,
        justification: 'Feito para durar anos a fio com velocidade imediata, sem necessidade de troca ou manutenção por muito tempo.',
        advantages: profiles.future_proof_laptop.advantages,
        limitations: profiles.future_proof_laptop.limitations
      };
    }
  }

  // Adjust justifications dynamically to weave in user-specific mentions
  const mentions = [];
  if (answers.multitasking === 'many_tasks') {
    mentions.push('como você costuma fazer muitas coisas ao mesmo tempo, a memória ampliada é fundamental para manter tudo fluido');
  }
  if (Array.isArray(answers.complements) && answers.complements.includes('video_calls')) {
    mentions.push('uma boa webcam e microfone integrados foram considerados para suas chamadas');
  }
  if (answers.storage_need === 'storage_heavy') {
    mentions.push('o armazenamento espaçoso garante que você não precisará apagar fotos ou vídeos antigos');
  }

  if (mentions.length > 0 && recommended) {
    recommended.justification += ` Além disso, ${mentions.join('; e ')}.`;
  }

  return {
    essential,
    recommended,
    durability,
    warnings,
    summaryTags,
    referenceDate,
    marketNotice
  };
}
