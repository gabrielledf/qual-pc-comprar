# Qual PC Comprar? — Guia Inteligente e Descomplicado

Aplicação web estática voltada para pessoas leigas que desejam descobrir a configuração de computador mais adequada para as suas necessidades cotidianas, sem jargões técnicos, sem complicação e com total respeito ao seu orçamento.

Desenvolvido em **HTML5**, **CSS3 (Design Tokens + Print Stylesheet)** e **JavaScript Moderno Modular (ES6+)**, utilizando **Vite** para build e testes nativos automatizados com `node --test`.

---

## 1. Visão Geral da Solução

- **Experiência Visual e Acolhedora:** Uma pergunta por tela estilo "passo a passo", com cartões grandes, áreas de clique amplas e ilustrações em SVG inline criadas no próprio projeto (sem emojis como ícones e sem dependência de imagens externas).
- **Sem Jargões Técnicos:** O usuário responde sobre suas atividades reais (estudar, trabalhar com planilhas, editar vídeos, jogar, transportar na mochila, abrir muitas abas), enquanto o sistema traduz isso em especificações adequadas de hardware.
- **Motor Híbrido de Recomendação:**
  1. *Árvore de Decisão:* Omite perguntas irrelevantes (por exemplo, não pergunta sobre bateria se o usuário escolher computador de mesa; só pergunta sobre tipos de jogos se o usuário tiver interesse em jogos).
  2. *Regras Obrigatórias e Validações:* Garante requisitos essenciais mínimos (ex.: edição 4K exige no mínimo 16GB RAM e SSD veloz; jogos pesados exigem placa de vídeo dedicada) e alerta incompatibilidades com o orçamento pretendido.
  3. *Sistema de Pontuação Multidimensional:* Pondera CPU, RAM, GPU, Armazenamento, Mobilidade, Bateria, Tela, Capacidade de Expansão e Economia.
- **Três Alternativas Claras:**
  - **Essencial:** Atende às necessidades com foco na economia financeira.
  - **Recomendada (Em destaque):** O melhor equilíbrio entre preço, desempenho e durabilidade.
  - **Maior Durabilidade:** Com margem para futuros anos sem perda de fôlego.
- **Recursos Práticos:**
  - Resumo das preferências com atalho para alterar qualquer resposta.
  - Copiar resumo formatado para a área de transferência (ótimo para enviar por WhatsApp ou e-mail).
  - Imprimir ou Salvar em PDF via `window.print()` com folha de estilo dedicada (`print.css`).
  - Gaveta expansível com especificações prontas para levar ao vendedor da loja.
  - Salvamento automático temporário no `localStorage` para retomar de onde parou.

---

## 2. Estrutura de Arquivos

```
.
├── index.html                  # Ponto de entrada HTML semântico com meta tags e acessibilidade
├── package.json                # Configuração de scripts, build e dependências
├── tsconfig.json               # Configurações de tipagem e resolução de módulos
├── vite.config.ts              # Configuração do Vite para desenvolvimento e empacotamento estático
├── vercel.json                 # Configuração para implantação estática contínua na Vercel
├── README.md                   # Documentação completa do projeto
├── test/
│   └── engine.test.js          # Testes automatizados cobrindo os 7 perfis obrigatórios
└── src/
    ├── main.js                 # Controlador principal de estado, fluxo e casca da aplicação
    ├── styles/
    │   ├── reset.css           # Reset CSS moderno e suporte a prefers-reduced-motion
    │   ├── tokens.css          # Design tokens (cores, tipografia, sombras, raios, espaçamentos)
    │   ├── app.css             # Estilização completa e responsiva do aplicativo
    │   └── print.css           # Estilos dedicados para impressão em folha A4 e exportação em PDF
    ├── data/
    │   ├── questions.js        # Banco de perguntas visuais, opções, pontuações e tags
    │   ├── recommendations.js  # Catálogo de perfis, especificações amigáveis e faixas de preço
    │   └── rules.js            # Regras obrigatórias, restrições e verificação de orçamento
    ├── engine/
    │   ├── decision-tree.js    # Lógica de árvore de decisão e perguntas ativas
    │   ├── constraints.js      # Validação de requisitos mínimos e conflitos de orçamento
    │   ├── scoring.js          # Agregação de pontuação por dimensão e tags de resumo
    │   └── recommendation-engine.js # Motor que sintetiza as 3 alternativas e justificativas
    ├── ui/
    │   ├── icons.js            # Biblioteca interna de ícones SVG semânticos inline
    │   ├── render-start.js     # Tela inicial acolhedora e banner de retomada de sessão
    │   ├── render-progress.js  # Barra de progresso visual e botão de retorno
    │   ├── render-question.js  # Renderização de cartões interativos (escolha única e múltipla)
    │   └── render-result.js    # Tela de resultado com os 3 cards, alertas e ferramentas
    └── utils/
        ├── storage.js          # Persistência no localStorage sem dados sensíveis
        └── format.js           # Formatação de texto, valores em Real e texto para cópia
```

---

## 3. Como Executar Localmente

### Pré-requisitos
- Node.js instalado (versão 18, 20 ou 22 recomendada).
- Gerenciador de pacotes npm.

### Passo a passo

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra o endereço exibido no terminal (geralmente `http://localhost:3000`).

3. **Executar os testes automatizados:**
   ```bash
   npm run test
   ```
   Roda a suíte completa de testes nativos cobrindo todos os perfis obrigatórios.

4. **Gerar a versão estática de produção:**
   ```bash
   npm run build
   ```
   Os arquivos finais otimizados serão gerados na pasta `dist/`.

5. **Visualizar a versão de produção localmente:**
   ```bash
   npm run preview
   ```

---

## 4. Instruções para Publicar na Vercel

A aplicação está 100% pronta para ser publicada na **Vercel** como projeto estático:

1. Suba o repositório para o seu GitHub/GitLab/Bitbucket.
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta.
3. Clique em **Add New...** → **Project** e selecione o repositório.
4. Nas configurações do projeto:
   - **Framework Preset:** Vite (ou Other).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**.
6. O arquivo `vercel.json` incluso na raiz já configura as regras de roteamento e redirecionamento de páginas estáticas automaticamente.

---

## 5. Onde Editar e Personalizar o Projeto

Todas as regras de negócio, perguntas e valores estão desacoplados da interface visual:

| O que você deseja alterar | Arquivo a editar | Descrição |
| :--- | :--- | :--- |
| **Perguntas e Opções** | `src/data/questions.js` | Edite textos, títulos, subtítulos, ícones e atribua novas pontuações ou tags. |
| **Regras Obrigatórias e Restrições** | `src/data/rules.js` | Adicione ou ajuste requisitos mínimos de hardware (como memória mínima para edição ou jogos). |
| **Catálogo de Perfis e Textos** | `src/data/recommendations.js` | Modifique os textos descritivos das máquinas, vantagens, limitações e termos para a loja. |
| **Faixas de Preço e Orçamento** | `src/data/recommendations.js` (`priceBands`) e `src/data/questions.js` (pergunta `budget`) | Atualize os valores de referência em Reais (`R$`) conforme a inflação e variações de mercado. |
| **Cálculo de Pontuação e Pesos** | `src/engine/scoring.js` e `src/data/questions.js` | Modifique a pontuação distribuída por cada resposta nas 10 dimensões avaliadas. |
| **Cores, Fontes e Estilo Visual** | `src/styles/tokens.css` | Personalize a paleta de cores, tipografia, bordas, sombras e espaçamentos. |

---

## 6. Decisões Técnicas e de UX Assumidas

1. **JavaScript Moderno Modular em vez de Frameworks:** Optou-se por Vanilla JS com ES Modules para garantir carregamento instantâneo, zero overhead de frameworks, extrema facilidade de manutenção e total conformidade com a especificação do projeto.
2. **Biblioteca Própria de SVGs Inline (`icons.js`):** Sem dependência de fontes externas pesadas ou emojis que variam entre sistemas operacionais (Android, iOS, Windows). SVGs leves, escaláveis e estilizáveis via CSS.
3. **Persistência Não Intrusiva (`storage.js`):** O progresso é mantido no `localStorage` do navegador. Se o usuário fechar a aba e voltar, um banner acolhedor permite continuar de onde parou ou recomeçar com 1 clique, sem coletar qualquer dado pessoal.
4. **Alerta Educativo de Orçamento:** Se o usuário escolher tarefas pesadas (como edição em 4K ou jogos modernos) e indicar uma faixa de preço baixa (ex.: até R$ 2.500), o sistema não quebra: ele exibe um aviso educativo explicando que essas tarefas exigem componentes dedicados e sugere como equilibrar a escolha.
5. **Acessibilidade WCAG 2.2 Nível AA:** Foco visível com anéis destacados, suporte completo para teclado (`Tab`, `Enter`, `Espaço`), papéis semânticos ARIA (`role="radio"`, `role="checkbox"`, `progressbar`), respeito a `prefers-reduced-motion` e áreas de toque com no mínimo 48px.
6. **Suporte a Impressão e PDF:** A folha `print.css` remove barras de progresso e botões, reorganizando as 3 alternativas e o resumo das respostas em um layout limpo de alta legibilidade para salvar em PDF ou imprimir.
