/**
 * Recommendation Catalog and Templates.
 * Focuses on hardware categories and classes without commercial brand promotion.
 * All specifications and price references are clearly defined here for easy updates.
 */

export const referenceDate = 'Novembro de 2026';
export const marketNotice = 'Valores meramente estimativos, sujeitos a variações de mercado, região, disponibilidade e condições comerciais. Consulte o preço e as condições atuais diretamente com o vendedor.';

/**
 * Baseline price bands for market estimations (Demonstrative data in BRL).
 * Can be tuned at any time.
 */
export const priceBands = {
  entry_laptop: 'R$ 1.800 a R$ 2.600',
  balanced_laptop: 'R$ 2.800 a R$ 4.200',
  premium_laptop: 'R$ 4.500 a R$ 6.800',
  ultralight_laptop: 'R$ 4.200 a R$ 7.200',
  gaming_entry_laptop: 'R$ 4.600 a R$ 6.200',
  gaming_high_laptop: 'R$ 6.500 a R$ 9.500',
  creator_pro_laptop: 'R$ 7.000 a R$ 11.500',

  entry_desktop: 'R$ 1.600 a R$ 2.400 (sem monitor)',
  balanced_desktop: 'R$ 2.600 a R$ 3.800 (sem monitor)',
  gaming_desktop: 'R$ 4.500 a R$ 7.000 (sem monitor)',
  workstation_desktop: 'R$ 6.500 a R$ 10.000 (sem monitor)'
};

/**
 * Pre-configured hardware profiles and descriptive copy in accessible Portuguese.
 */
export const profiles = {
  // --- LAPTOPS ---
  basic_study_laptop: {
    title: 'Notebook Essencial para Estudos e Dia a Dia',
    target: 'Para quem busca economia máxima navegando na web, assistindo a aulas e editando documentos simples.',
    specs: {
      cpu: 'Processador de entrada moderno (Intel Core i3, AMD Ryzen 3 ou similar com pelo menos 4 núcleos)',
      ram: '8 GB de memória RAM (garante navegação sem engasgos em tarefas cotidianas)',
      storage: '256 GB em SSD (garante inicialização do sistema em menos de 15 segundos)',
      gpu: 'Placa gráfica integrada ao processador (suficiente para vídeos em alta definição e tarefas comuns)',
      screen: 'Tela de 14 ou 15.6 polegadas com acabamento antirreflexo e resolução Full HD',
      batteryAndMobility: 'Peso médio entre 1,5 kg e 1,8 kg; autonomia de 4 a 6 horas longe da tomada',
      os: 'Windows 11 Home ou distribuição Linux amigável',
      shopSpecs: 'Intel Core i3 / Ryzen 3 recente | 8GB RAM | SSD 256GB | Tela Full HD'
    },
    advantages: [
      'Menor custo inicial de investimento',
      'Extremamente silencioso e esquenta pouco',
      'Liga e abre programas básicos com agilidade graças ao SSD'
    ],
    limitations: [
      'Não é indicado para jogos pesados ou edição de vídeo complexa',
      'Se abrir dezenas de programas pesados simultaneamente, pode perder velocidade'
    ]
  },

  balanced_office_laptop: {
    title: 'Notebook Intermediário Produtivo',
    target: 'O padrão de ouro para trabalho de escritório, estudos avançados e multitarefas do dia a dia.',
    specs: {
      cpu: 'Processador intermediário moderno (Intel Core i5 ou AMD Ryzen 5 de geração atual)',
      ram: '16 GB de memória RAM (espaço de sobra para dezenas de abas e programas abertos)',
      storage: '512 GB em SSD NVMe rápido (espaço seguro para muitos documentos e programas)',
      gpu: 'Placa gráfica integrada moderna (Intel Iris Xe ou AMD Radeon Graphics)',
      screen: 'Tela de 14 ou 15.6 polegadas Full HD IPS (ótimos ângulos de visão e conforto para os olhos)',
      batteryAndMobility: 'Peso em torno de 1,5 kg a 1,7 kg; autonomia de 6 a 8 horas',
      os: 'Windows 11 Home',
      shopSpecs: 'Intel Core i5 / Ryzen 5 recente | 16GB RAM | SSD 512GB | Tela 15.6" IPS Full HD'
    },
    advantages: [
      'Equilíbrio impecável entre velocidade e valor investido',
      'Conforto absoluto para trabalhar com reuniões e dezenas de abas abertas',
      'Boa durabilidade planejada para 4 a 5 anos de uso tranquilo'
    ],
    limitations: [
      'Roda jogos leves e casuais, mas não suporta os lançamentos 3D mais exigentes no máximo'
    ]
  },

  future_proof_laptop: {
    title: 'Notebook Avançado de Alta Durabilidade',
    target: 'Para quem deseja comprar um computador hoje e ficar muitos anos sem qualquer preocupação de lentidão.',
    specs: {
      cpu: 'Processador potente e eficiente (Intel Core i7, AMD Ryzen 7 ou processadores com arquitetura para IA)',
      ram: '16 GB a 32 GB de memória RAM rápida',
      storage: '1 TB (1.000 GB) em SSD de alta velocidade',
      gpu: 'Gráficos integrados de nova geração de alto desempenho ou placa gráfica de suporte',
      screen: 'Tela 14 a 16 polegadas de alta definição (Full HD+ ou 2.5K), cores vivas e antirreflexo',
      batteryAndMobility: 'Bateria de longa duração (7 a 10 horas) e chassi com materiais reforçados',
      os: 'Windows 11 Pro ou Home',
      shopSpecs: 'Intel Core i7 / Ryzen 7 | 16GB ou 32GB RAM | SSD 1TB | Tela IPS Alta Resolução'
    },
    advantages: [
      'Margem de sobra para futuras atualizações de softwares',
      'Espaço farto para armazenar anos de fotos, documentos e mídias',
      'Excelente construção e resposta instantânea em qualquer tarefa'
    ],
    limitations: [
      'Investimento inicial mais elevado'
    ]
  },

  ultralight_travel_laptop: {
    title: 'Notebook Ultrafino de Máxima Mobilidade',
    target: 'Projetado para quem vive em movimento diário, valorizando bateria que dura o dia inteiro e peso mínimo na mochila.',
    specs: {
      cpu: 'Processador ultracompacto de altíssima eficiência energética (Intel Core Ultra, AMD Ryzen série U ou chip ARM moderno)',
      ram: '16 GB de memória RAM',
      storage: '512 GB ou 1 TB em SSD veloz',
      gpu: 'Gráficos modernos integrados de baixo consumo de energia',
      screen: 'Tela de 13.3 a 14 polegadas com bordas ultrafinas e alto brilho (350+ nits)',
      batteryAndMobility: 'Peso ultraleve (1,1 kg a 1,4 kg); bateria projetada para 9 a 14 horas de autonomia real',
      os: 'Windows 11 ou macOS',
      shopSpecs: 'Notebook Ultrafino (peso < 1.4kg) | Core i5/i7 série U ou Apple Silicon | 16GB RAM | SSD 512GB/1TB'
    },
    advantages: [
      'Você mal sente o peso na mochila durante o dia todo',
      'Pode passar um dia inteiro fora de casa sem levar a fonte de carregador',
      'Acabamento premium em liga de alumínio ou magnésio'
    ],
    limitations: [
      'Menor número de portas de conexão e preço por componente um pouco mais alto pelo formato compacto'
    ]
  },

  gaming_laptop: {
    title: 'Notebook Gamer com Placa Gráfica Dedicada',
    target: 'Feito para quem ama jogos no computador e precisa da mobilidade de transportar seu setup quando necessário.',
    specs: {
      cpu: 'Processador de alto desempenho (Intel Core i5/i7 série H ou AMD Ryzen 5/7 série H)',
      ram: '16 GB de memória RAM (com possibilidade de expansão para 32 GB)',
      storage: '512 GB ou 1 TB SSD veloz (jogos modernos ocupam entre 60GB e 120GB cada)',
      gpu: 'Placa de vídeo dedicada (NVIDIA GeForce RTX 3050, 4050, 4060 ou superior)',
      screen: 'Tela de 15.6 polegadas com taxa de atualização de 120Hz ou 144Hz (jogos ultrafluidos)',
      batteryAndMobility: 'Peso entre 2,1 kg e 2,4 kg; carregador de maior potência; ventilação reforçada',
      os: 'Windows 11 Home',
      shopSpecs: 'Intel Core i5/i7 série H ou Ryzen 7 | 16GB RAM | Placa RTX 4050/4060 | SSD 1TB | Tela 144Hz'
    },
    advantages: [
      'Capacidade de rodar todos os jogos modernos com ótima fluidez e detalhes visuais',
      'Excelente também para renderização de projetos e vídeos pesados',
      'Sistema de refrigeração ativo robusto com ventoinhas duplas'
    ],
    limitations: [
      'Aparelho mais pesado e fonte de energia volumosa',
      'Autonomia de bateria curta quando fora da tomada (costuma exigir tomada para jogar em alto desempenho)'
    ]
  },

  creator_pro_laptop: {
    title: 'Notebook Profissional para Criadores de Mídia e 4K',
    target: 'Para quem edita vídeos em alta definição, produz artes digitais profissionais e trabalha com projetos audiovisuais complexos.',
    specs: {
      cpu: 'Processador multinúcleos de alta potência (Intel Core i7/i9 série H, AMD Ryzen 7/9 ou Apple série Pro/Max)',
      ram: '32 GB de memória RAM (essencial para edições fluidas em 4K sem travar a linha do tempo)',
      storage: '1 TB a 2 TB em SSD NVMe ultrarrápido',
      gpu: 'Placa gráfica potente dedicada com suporte a aceleração por hardware (série RTX com drivers Studio)',
      screen: 'Tela calibrada de alta fidelidade cromática (100% sRGB ou DCI-P3), resolução QHD/4K ou OLED',
      batteryAndMobility: 'Construção reforçada, peso de aproximadamente 1,8 kg a 2,2 kg',
      os: 'Windows 11 Pro ou macOS',
      shopSpecs: 'Core i7/Ryzen 7 ou chip M-Pro | 32GB RAM | Placa RTX com 6GB+ VRAM | SSD 1TB | Tela 100% sRGB'
    },
    advantages: [
      'Renderização e exportação de vídeos em frações de tempo',
      'Fidelidade absoluta nas cores das fotos e vídeos para impressão ou publicação',
      'Suporta projetos pesados sem travamento ou fechamento de programas'
    ],
    limitations: [
      'Categoria de investimento profissional mais alto'
    ]
  },

  // --- DESKTOPS ---
  basic_home_desktop: {
    title: 'Computador de Mesa Essencial para Família e Estudos',
    target: 'Solução confortável para manter na mesa de casa com tela grande e facilidade de manutenção econômica.',
    specs: {
      cpu: 'Processador de 4 ou 6 núcleos modernos (Intel Core i3/i5 ou AMD Ryzen 3/5 com vídeo integrado)',
      ram: '8 GB a 16 GB de memória RAM',
      storage: '512 GB em SSD',
      gpu: 'Vídeo integrado veloz ao processador',
      screen: 'Monitor de 21.5 a 24 polegadas Full HD com tecnologia antipiscante',
      batteryAndMobility: 'Fixo na tomada; não possui bateria. Espaço organizado com gabinete compacto',
      os: 'Windows 11 Home ou Linux',
      shopSpecs: 'Gabinete Desktop | Core i3/i5 ou Ryzen 5 | 16GB RAM | SSD 512GB | Monitor 24" IPS'
    },
    advantages: [
      'Excelente postura e conforto ergonômico com monitor na altura correta',
      'Muito fácil de consertar, limpar ou melhorar com os anos',
      'Custo por desempenho superior ao de um notebook'
    ],
    limitations: [
      'Não pode ser transportado com facilidade'
    ]
  },

  balanced_upgradeable_desktop: {
    title: 'Desktop Intermediário com Grande Capacidade de Expansão',
    target: 'Para quem trabalha horas seguidas em casa e quer uma máquina sólida que pode receber upgrades no futuro.',
    specs: {
      cpu: 'Processador moderno de 6 a 8 núcleos (AMD Ryzen 5 / Intel Core i5 de última geração)',
      ram: '16 GB de memória RAM (com slots livres para expandir até 32 GB ou 64 GB)',
      storage: '1 TB SSD NVMe de rápida leitura',
      gpu: 'Placa gráfica integrada moderna ou placa dedicada básica/intermediária',
      screen: 'Monitor de 24 a 27 polegadas Full HD ou Quad HD IPS',
      batteryAndMobility: 'Equipamento fixo em mesa de trabalho com fonte de energia confiável',
      os: 'Windows 11 Home ou Pro',
      shopSpecs: 'Desktop Ryzen 5/Core i5 | 16GB RAM (expansível) | SSD 1TB | Fonte 500W com certificação 80 Plus'
    },
    advantages: [
      'Pode trocar peças facilmente daqui a 3, 5 ou 7 anos sem descartar o computador',
      'Temperaturas sempre baixas e operação silenciosa',
      'Conexão para múltiplos monitores simultâneos'
    ],
    limitations: [
      'Ocupa espaço físico dedicado na bancada'
    ]
  },

  high_power_creator_desktop: {
    title: 'Estação de Alta Performance para Jogos e Produção Audiovisual',
    target: 'Máxima potência bruta para jogos pesados no máximo, renderização 3D, programação pesada e edição em 4K.',
    specs: {
      cpu: 'Processador de altíssimo desempenho com 8 a 16 núcleos (Intel Core i7/i9 ou AMD Ryzen 7/9)',
      ram: '32 GB de memória RAM veloz',
      storage: '1 TB a 2 TB em SSD NVMe de alta velocidade de leitura',
      gpu: 'Placa de vídeo dedicada robusta (GeForce RTX 4060 Ti, 4070 ou superior)',
      screen: 'Monitor de 27 polegadas Quad HD (1440p) ou 4K com alta precisão de cores',
      batteryAndMobility: 'Fixo em mesa com sistema de refrigeração a ar de alto fluxo ou water cooler',
      os: 'Windows 11 Pro',
      shopSpecs: 'Desktop Core i7 / Ryzen 7 | 32GB RAM | Placa RTX 4070 | SSD 2TB | Fonte 650W+ 80 Plus Gold'
    },
    advantages: [
      'Desempenho máximo sem nenhum engasgo em qualquer aplicativo contemporâneo',
      'Renderiza e processa tarefas pesadas enquanto você continua usando outras funções',
      'Vida útil projetada para muitos anos com upgrades graduais'
    ],
    limitations: [
      'Investimento inicial elevado e maior consumo elétrico sob carga pesada'
    ]
  }
};
