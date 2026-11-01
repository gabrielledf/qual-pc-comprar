/**
 * Bank of Visual Questions for lay users.
 * All questions are in everyday Brazilian Portuguese, completely free of technical jargon.
 * Points and metadata are attached directly to options for the scoring engine.
 */

export const questions = [
  {
    id: 'device_type',
    stepNumber: 1,
    title: 'Qual tipo de computador você prefere?',
    subtitle: 'Escolha se precisa de praticidade para levar com você ou prefere uma tela fixa em uma mesa.',
    type: 'single',
    options: [
      {
        id: 'laptop',
        label: 'Notebook portátil',
        description: 'Fácil de fechar e levar na mochila para qualquer lugar.',
        icon: 'laptop',
        scores: { mobility: 4, battery: 4, economy: 1 },
        tags: { formFactor: 'laptop' }
      },
      {
        id: 'desktop',
        label: 'Computador de mesa (Desktop)',
        description: 'Fica fixo na mesa. Permite trocar peças com facilidade e telas maiores.',
        icon: 'desktop',
        scores: { cpu: 2, gpu: 2, upgradability: 5, economy: 2 },
        tags: { formFactor: 'desktop' }
      },
      {
        id: 'undecided',
        label: 'Ainda não tenho certeza',
        description: 'Vamos analisar suas tarefas para sugerir a opção mais vantajosa.',
        icon: 'undecided',
        scores: { mobility: 2, economy: 2 },
        tags: { formFactor: 'flexible' }
      }
    ]
  },
  {
    id: 'primary_use',
    stepNumber: 2,
    title: 'Qual será o uso principal do computador?',
    subtitle: 'Pense na tarefa mais importante que você fará toda semana.',
    type: 'single',
    options: [
      {
        id: 'study_browse',
        label: 'Estudo e navegação',
        description: 'Aulas online, pesquisas na web, leituras em PDF e assistir a vídeos.',
        icon: 'study',
        scores: { cpu: 1, ram: 1, storage: 1, economy: 4, durability: 2 },
        tags: { workload: 'basic' }
      },
      {
        id: 'office_work',
        label: 'Trabalho de escritório',
        description: 'Planilhas, redação de documentos, e-mails e reuniões virtuais.',
        icon: 'work',
        scores: { cpu: 2, ram: 2, storage: 2, economy: 3, durability: 3 },
        tags: { workload: 'office' }
      },
      {
        id: 'programming',
        label: 'Programação e tecnologia',
        description: 'Criação de sites, aplicativos, estudos de programação e softwares de desenvolvimento.',
        icon: 'code',
        scores: { cpu: 4, ram: 4, storage: 3, upgradability: 3, durability: 4 },
        tags: { workload: 'dev' }
      },
      {
        id: 'content_creation',
        label: 'Criação de fotos ou vídeos',
        description: 'Edição de imagens, produção de vídeos para redes sociais ou canais.',
        icon: 'videoCamera',
        scores: { cpu: 4, ram: 4, gpu: 4, storage: 4, screen: 4, durability: 4 },
        tags: { workload: 'creator' }
      },
      {
        id: 'gaming',
        label: 'Jogos no computador',
        description: 'Para se divertir com jogos casuais ou títulos modernos e detalhados.',
        icon: 'gamepad',
        scores: { cpu: 4, ram: 4, gpu: 5, screen: 3, durability: 4 },
        tags: { workload: 'gaming' }
      },
      {
        id: 'general_daily',
        label: 'Uso variado no dia a dia',
        description: 'Um pouco de tudo: compras, streaming, organização pessoal e tarefas da família.',
        icon: 'variety',
        scores: { cpu: 2, ram: 2, storage: 2, economy: 3, durability: 3 },
        tags: { workload: 'general' }
      }
    ]
  },
  {
    id: 'complements',
    stepNumber: 3,
    title: 'Quais outras atividades você também costuma fazer?',
    subtitle: 'Pode selecionar mais de uma opção se fizer sentido para você.',
    type: 'multiple',
    options: [
      {
        id: 'video_calls',
        label: 'Reuniões e videochamadas',
        description: 'Câmera e microfone com boa nitidez para chamadas de trabalho ou aula.',
        icon: 'videoCall',
        scores: { cpu: 1, ram: 1 }
      },
      {
        id: 'streaming_media',
        label: 'Assistir a filmes e séries',
        description: 'Valoriza uma tela nítida, com boas cores e som agradável.',
        icon: 'streamMovies',
        scores: { screen: 3 }
      },
      {
        id: 'photo_edit_casual',
        label: 'Ajustar fotos e imagens',
        description: 'Tratar fotos de família, pequenos designs no Canva ou redes.',
        icon: 'photoEdit',
        scores: { ram: 2, screen: 2 }
      },
      {
        id: 'heavy_browsing',
        label: 'Muitas abas abertas ao mesmo tempo',
        description: 'Dezenas de páginas abertas no navegador sem engasgar.',
        icon: 'browserTabs',
        scores: { ram: 3 }
      },
      {
        id: 'listen_music',
        label: 'Ouvir músicas enquanto faz outras coisas',
        description: 'Aplicativo de música ou rádio tocando em segundo plano o dia todo.',
        icon: 'music',
        scores: { ram: 1 }
      }
    ]
  },
  {
    id: 'multitasking',
    stepNumber: 4,
    title: 'Quantas coisas você costuma fazer ao mesmo tempo?',
    subtitle: 'Isso determina a facilidade com que o computador alterna entre programas sem travar.',
    type: 'single',
    options: [
      {
        id: 'single_task',
        label: 'Uma tarefa por vez',
        description: 'Foco em um único programa ou site aberto sem pressa.',
        icon: 'taskSingle',
        scores: { ram: 1, cpu: 1, economy: 4 },
        tags: { minRamGb: 8 }
      },
      {
        id: 'some_tasks',
        label: 'Algumas tarefas juntas',
        description: 'Navegador com várias páginas, documento de texto e música de fundo.',
        icon: 'taskSome',
        scores: { ram: 3, cpu: 2, economy: 2 },
        tags: { minRamGb: 16 }
      },
      {
        id: 'many_tasks',
        label: 'Muitas tarefas pesadas simultâneas',
        description: 'Vários programas grandes abertos, planilhas pesadas e dezenas de abas.',
        icon: 'taskMany',
        scores: { ram: 5, cpu: 4, durability: 4 },
        tags: { minRamGb: 16, recommendRamGb: 32 }
      }
    ]
  },
  {
    id: 'mobility',
    stepNumber: 5,
    title: 'Com que frequência você pretende transportar o computador?',
    subtitle: 'Essa informação nos ajuda a equilibrar o peso, tamanho e robustez da carcaça.',
    type: 'single',
    // Decision Tree condition: Only shown if user chose laptop or is undecided
    condition: (answers) => answers.device_type !== 'desktop',
    options: [
      {
        id: 'rarely_mobile',
        label: 'Quase nunca sai de casa',
        description: 'Fica a maior parte do tempo no mesmo cômodo ou na mesa.',
        icon: 'home',
        scores: { mobility: 1, battery: 1, screen: 2 }
      },
      {
        id: 'sometimes_mobile',
        label: 'Algumas vezes na semana',
        description: 'Levo eventualmente para viagens, reuniões ou fins de semana.',
        icon: 'briefcase',
        scores: { mobility: 3, battery: 3 }
      },
      {
        id: 'daily_mobile',
        label: 'Todos os dias na mochila',
        description: 'Vou para faculdade, escritório ou cafés diariamente com ele nas costas.',
        icon: 'backpack',
        scores: { mobility: 5, battery: 4, durability: 3 },
        tags: { dailyMobility: true }
      }
    ]
  },
  {
    id: 'battery',
    stepNumber: 6,
    title: 'Qual a importância da bateria fora da tomada?',
    subtitle: 'Isso define a necessidade de processadores super econômicos e baterias de longa duração.',
    type: 'single',
    // Condition: Only relevant for notebooks transported with some frequency
    condition: (answers) => answers.device_type !== 'desktop' && answers.mobility !== 'rarely_mobile',
    options: [
      {
        id: 'battery_low',
        label: 'Pouco importante',
        description: 'Geralmente tenho uma tomada próxima onde quer que eu esteja.',
        icon: 'batteryLow',
        scores: { battery: 1, economy: 3 }
      },
      {
        id: 'battery_medium',
        label: 'Importância moderada',
        description: 'Preciso de algumas horas de autonomia para reuniões e aulas.',
        icon: 'batteryMedium',
        scores: { battery: 3 }
      },
      {
        id: 'battery_high',
        label: 'Muito importante',
        description: 'Quero passar o dia longe da tomada sem me preocupar com carregador.',
        icon: 'batteryHigh',
        scores: { battery: 5, mobility: 3 },
        tags: { highBatteryNeed: true }
      }
    ]
  },
  {
    id: 'gaming_depth',
    stepNumber: 7,
    title: 'Quais estilos de jogos você pretende jogar?',
    subtitle: 'Diferentes jogos exigem capacidades visuais e processamento muito distintos.',
    type: 'single',
    // Condition: Only shown if gaming is the primary use
    condition: (answers) => answers.primary_use === 'gaming',
    options: [
      {
        id: 'casual_games',
        label: 'Jogos leves e casuais',
        description: 'Jogos de cartas, estratégia simples, The Sims, Minecraft ou Roblox.',
        icon: 'gamepad',
        scores: { gpu: 2, cpu: 2, economy: 4 },
        tags: { gamingCategory: 'casual' }
      },
      {
        id: 'competitive_games',
        label: 'Jogos online competitivos',
        description: 'League of Legends, Counter-Strike 2, Valorant, Fortnite e similares.',
        icon: 'rocket',
        scores: { gpu: 4, cpu: 4, screen: 3 },
        tags: { gamingCategory: 'competitive', dedicatedGpuPreferred: true }
      },
      {
        id: 'heavy_games',
        label: 'Jogos modernos e pesados',
        description: 'Títulos cinematográficos recentes com gráficos ultrarrealistas em alta qualidade.',
        icon: 'sparkles',
        scores: { gpu: 5, cpu: 5, ram: 4, durability: 4 },
        tags: { gamingCategory: 'heavy', dedicatedGpuMandatory: true }
      }
    ]
  },
  {
    id: 'media_depth',
    stepNumber: 8,
    title: 'Qual a complexidade das suas fotos ou vídeos?',
    subtitle: 'Vídeos em alta definição e efeitos especiais demandam componentes profissionais.',
    type: 'single',
    // Condition: Only shown if primary use is content creation
    condition: (answers) => answers.primary_use === 'content_creation',
    options: [
      {
        id: 'photo_only',
        label: 'Fotografia e ilustrações',
        description: 'Tratamento de fotos em alta resolução, peças gráficas e ilustrações digitais.',
        icon: 'photoEdit',
        scores: { screen: 4, ram: 3, cpu: 3 },
        tags: { mediaCategory: 'photos' }
      },
      {
        id: 'video_social',
        label: 'Vídeos curtos para redes sociais',
        description: 'Cortes rápidos, reels, vídeos do YouTube em resolução Full HD padrão.',
        icon: 'videoCamera',
        scores: { cpu: 3, ram: 3, gpu: 3, storage: 3 },
        tags: { mediaCategory: 'social_video' }
      },
      {
        id: 'video_4k_pro',
        label: 'Vídeos profissionais ou em 4K',
        description: 'Arquivos pesados, correção de cor detalhada, animações e exportações rápidas.',
        icon: 'sparkles',
        scores: { cpu: 5, ram: 5, gpu: 5, storage: 5, screen: 4 },
        tags: { mediaCategory: 'video_4k', is4kVideo: true }
      }
    ]
  },
  {
    id: 'storage_need',
    stepNumber: 9,
    title: 'Quantos arquivos você pretende guardar nele?',
    subtitle: 'Isso determina o espaço interno para salvar suas fotos, vídeos e documentos.',
    type: 'single',
    options: [
      {
        id: 'storage_light',
        label: 'Poucos arquivos',
        description: 'Costumo usar a nuvem (Google Drive/OneDrive) e guardo apenas documentos leves.',
        icon: 'folderFew',
        scores: { storage: 1, economy: 4 },
        tags: { minStorageGb: 256 }
      },
      {
        id: 'storage_moderate',
        label: 'Quantidade moderada',
        description: 'Alguns álbuns de fotos, músicas, programas do dia a dia e trabalhos.',
        icon: 'folderMedium',
        scores: { storage: 3, economy: 2 },
        tags: { minStorageGb: 512 }
      },
      {
        id: 'storage_heavy',
        label: 'Muitos arquivos e vídeos pesados',
        description: 'Coleções grandes de fotos, vários jogos instalados ou vídeos gravados.',
        icon: 'folderMany',
        scores: { storage: 5, durability: 3 },
        tags: { minStorageGb: 1000 }
      }
    ]
  },
  {
    id: 'priority',
    stepNumber: 10,
    title: 'O que é mais importante para a sua escolha?',
    subtitle: 'Qual critério fala mais alto quando você pensa na compra?',
    type: 'single',
    options: [
      {
        id: 'lowest_price',
        label: 'Menor preço possível',
        description: 'Quero gastar o mínimo necessário para resolver minhas tarefas sem dor de cabeça.',
        icon: 'piggyBank',
        scores: { economy: 5, cpu: -1, gpu: -1 }
      },
      {
        id: 'balanced',
        label: 'Equilíbrio e custo-benefício',
        description: 'Um bom computador por um preço justo, sem excessos e sem frustrações.',
        icon: 'scale',
        scores: { economy: 3, durability: 3, cpu: 2 }
      },
      {
        id: 'max_performance',
        label: 'Velocidade e máximo desempenho',
        description: 'Quero que tudo abra instantaneamente, sem esperar nada carregar.',
        icon: 'rocket',
        scores: { cpu: 4, ram: 4, gpu: 3, durability: 4 }
      },
      {
        id: 'max_durability',
        label: 'Maior durabilidade no tempo',
        description: 'Quero comprar hoje e ficar anos sem precisar trocar ou me preocupar com lentidão.',
        icon: 'shield',
        scores: { durability: 5, ram: 3, upgradability: 3 }
      }
    ]
  },
  {
    id: 'budget',
    stepNumber: 11,
    title: 'Qual faixa de investimento você planeja?',
    subtitle: 'Valores demonstrativos de mercado no Brasil para orientar o equilíbrio da recomendação.',
    type: 'single',
    options: [
      {
        id: 'tier_1',
        label: 'Até R$ 2.500',
        description: 'Faixa econômica de entrada, voltada para tarefas essenciais do cotidiano.',
        icon: 'piggyBank',
        tags: { maxBudget: 2500 }
      },
      {
        id: 'tier_2',
        label: 'De R$ 2.500 a R$ 4.500',
        description: 'Faixa mais popular e versátil: excelente equilíbrio para estudos e trabalho.',
        icon: 'scale',
        tags: { maxBudget: 4500 }
      },
      {
        id: 'tier_3',
        label: 'De R$ 4.500 a R$ 7.500',
        description: 'Faixa intermediária avançada: boa para jogos modernos, programação e edição.',
        icon: 'rocket',
        tags: { maxBudget: 7500 }
      },
      {
        id: 'tier_4',
        label: 'Acima de R$ 7.500',
        description: 'Faixa premium de alta performance, sem concessões de velocidade e durabilidade.',
        icon: 'sparkles',
        tags: { maxBudget: 99999 }
      },
      {
        id: 'tier_open',
        label: 'Ainda não defini um limite',
        description: 'Gostaria de ver o que é recomendado para as minhas necessidades primeiro.',
        icon: 'undecided',
        tags: { maxBudget: null }
      }
    ]
  }
];
