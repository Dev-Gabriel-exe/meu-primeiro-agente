(() => {
  'use strict';
  const storageKey = 'meu-primeiro-agente:v1:checklist';
  const inputs = Array.from(document.querySelectorAll('[data-step]'));
  let state = {};
  try { state = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch { state = {}; }
  const progressTrack = document.getElementById('progress-track');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');
  const congrats = document.getElementById('congrats');
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function updateProgress() {
    const completed = inputs.filter(el => el.checked).length;
    progressFill.style.width = `${Math.round(100 * completed / inputs.length)}%`;
    progressLabel.textContent = `${completed} de ${inputs.length} passos`;
    progressTrack.setAttribute('aria-valuenow', String(completed));
    congrats.hidden = completed !== inputs.length;
  }

  inputs.forEach(input => {
    input.checked = state[input.dataset.step] === true;
    input.addEventListener('change', () => {
      state[input.dataset.step] = input.checked;
      try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* navegador sem armazenamento */ }
      updateProgress();
      if (inputs.every(el => el.checked)) showToast('🏆 Parabéns! Oficina concluída!');
    });
  });
  updateProgress();

  document.getElementById('reset-progress').addEventListener('click', () => {
    if (!confirm('Deseja desmarcar todos os passos?')) return;
    inputs.forEach(el => { el.checked = false; });
    state = {};
    try { localStorage.removeItem(storageKey); } catch { /* sem armazenamento */ }
    updateProgress();
    showToast('Seu progresso foi reiniciado.');
  });

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(value); return true; } catch { /* fallback */ }
    }
    const temp = document.createElement('textarea');
    temp.value = value;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    temp.setAttribute('aria-hidden', 'true');
    document.body.appendChild(temp);
    temp.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    temp.remove();
    return ok;
  }

  document.addEventListener('click', async event => {
    const copyButton = event.target.closest('[data-copy]');
    if (!copyButton) return;
    const target = document.getElementById(copyButton.dataset.copy);
    if (!target) return;
    const ok = await copyText(target.textContent.trim());
    if (ok) {
      const previous = copyButton.textContent;
      copyButton.textContent = '✓ Copiado!';
      showToast('Texto copiado! Agora cole no Gemini com Ctrl + V.');
      setTimeout(() => { copyButton.textContent = previous; }, 1800);
    } else {
      showToast('Selecione o texto e pressione Ctrl + C para copiar.');
    }
  });

  const options = {
    ingles: {
      defaultName: 'Amigo do Inglês',
      audience: 'pessoas que estão começando a aprender inglês',
      rule: 'Corrija os erros sem constranger o estudante.',
      purpose: 'ajudar a praticar conversação em inglês de forma simples e sem vergonha',
      steps: [
        'Descubra qual situação a pessoa quer praticar (viagem, escola, restaurante ou outra).',
        'Inicie um diálogo curto, com apenas uma pergunta de cada vez.',
        'Se a pessoa errar, ofereça uma correção gentil e a tradução se ela pedir.',
        'Aumente a dificuldade aos poucos, de acordo com as respostas.'
      ]
    },
    tarefas: {
      defaultName: 'Meu Organizador',
      audience: 'pessoas que desejam organizar melhor a rotina',
      rule: 'Nunca crie compromissos ou horários sem confirmar com a pessoa.',
      purpose: 'organizar tarefas do dia em etapas simples e realistas',
      steps: [
        'Pergunte quais tarefas precisam ser feitas e qual o prazo.',
        'Ajude a escolher até três prioridades mais importantes.',
        'Sugira uma ordem prática para começar e terminar.',
        'Ao final, apresente uma lista curta com caixas de seleção.'
      ]
    },
    historias: {
      defaultName: 'Fábrica de Histórias',
      audience: 'pessoas que gostam de inventar histórias originais',
      rule: 'Crie personagens e enredos originais, sem copiar histórias famosas.',
      purpose: 'criar histórias criativas com personagens e escolhas do usuário',
      steps: [
        'Pergunte o gênero da história e para qual faixa etária será escrita.',
        'Sugira um personagem principal e um desafio interessante.',
        'Escreva uma cena de cada vez e ofereça duas opções de continuação.',
        'Deixe a pessoa decidir o rumo da narrativa.'
      ]
    },
    estudos: {
      defaultName: 'Meu Plano de Estudos',
      audience: 'estudantes que querem organizar o tempo para aprender',
      rule: 'Não monte uma rotina impossível; respeite pausas e tempo livre.',
      purpose: 'criar um plano simples de estudos a partir do tempo disponível',
      steps: [
        'Pergunte o que a pessoa precisa estudar e quando será a avaliação.',
        'Pergunte quanto tempo ela tem disponível por dia.',
        'Sugira blocos curtos com pausas e revisão.',
        'Mostre uma tabela simples de dias, assuntos e tarefas.'
      ]
    },
    apresentacoes: {
      defaultName: 'Treinador de Apresentações',
      audience: 'pessoas que querem apresentar trabalhos com mais confiança',
      rule: 'Critique com respeito e mostre como melhorar, sem ridicularizar.',
      purpose: 'ajudar a preparar e ensaiar apresentações orais',
      steps: [
        'Pergunte o tema, o público e quanto tempo a apresentação deve durar.',
        'Ajude a organizar início, meio e fim.',
        'Crie perguntas que a plateia talvez faça.',
        'Faça um pequeno ensaio e ofereça sugestões práticas de melhoria.'
      ]
    },
    jogos: {
      defaultName: 'Laboratório de Jogos',
      audience: 'pessoas que querem inventar jogos originais',
      rule: 'Não copie personagens ou marcas de jogos conhecidos.',
      purpose: 'ajudar a criar ideias originais e simples de jogos',
      steps: [
        'Pergunte o estilo de jogo desejado (corrida, aventura, quebra-cabeça etc.).',
        'Sugira uma missão principal que possa ser completada.',
        'Defina como o jogador ganha, perde e avança.',
        'Dê uma primeira versão pequena do jogo para começar a criar.'
      ]
    }
  };

  const ideaButtons = document.querySelectorAll('[data-idea]');
  const nameInput = document.getElementById('custom-name');
  const audienceInput = document.getElementById('custom-audience');
  const toneInput = document.getElementById('custom-tone');
  const ruleInput = document.getElementById('custom-rule');
  let currentIdea = 'ingles';

  function selectIdea(idea) {
    const next = options[idea];
    if (!next) return;
    currentIdea = idea;
    ideaButtons.forEach(button => {
      const selected = button.dataset.idea === idea;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    nameInput.value = next.defaultName;
    audienceInput.value = next.audience;
    ruleInput.value = next.rule;
    const output = document.getElementById('builder-output');
    output.hidden = true;
  }

  ideaButtons.forEach(button => button.addEventListener('click', () => selectIdea(button.dataset.idea)));

  function toSkillName(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 65) || 'meu-agente';
  }

  document.getElementById('generate-btn').addEventListener('click', () => {
    const idea = options[currentIdea];
    const name = nameInput.value.trim() || idea.defaultName;
    const audience = audienceInput.value.trim() || idea.audience;
    const tone = toneInput.value;
    const rule = ruleInput.value.trim() || idea.rule;
    const description = `Assistente que ajuda ${audience} a ${idea.purpose}.`;
    const instructions = [
      `Você é ${name}, um assistente de inteligência artificial.`,
      '',
      `Sua função é ${idea.purpose}.`,
      `Você ajuda principalmente ${audience}.`,
      `Seu jeito de conversar deve ser ${tone}.`,
      '',
      'Siga este passo a passo:',
      ...idea.steps.map((step, index) => `${index + 1}. ${step}`),
      '',
      'Regras importantes:',
      `- ${rule}`,
      '- Use português brasileiro, exceto quando a atividade pedir outro idioma.',
      '- Se a pergunta estiver confusa, peça um esclarecimento curto.',
      '- Se não souber algo, diga claramente. Nunca invente fatos.',
      '- Evite textos muito longos: ajude a pessoa passo a passo.',
      '- Não solicite senhas ou dados pessoais sensíveis.'
    ].join('\n');
    document.getElementById('result-name').textContent = toSkillName(name);
    document.getElementById('result-description').textContent = description;
    document.getElementById('result-instructions').textContent = instructions;
    const output = document.getElementById('builder-output');
    output.hidden = false;
    output.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    showToast('Suas instruções estão prontas! Copie os três campos.');
  });

  document.getElementById('print-btn').addEventListener('click', () => window.print());
  // Experiência de laboratório: conteúdo fixo, sem chamadas de rede ou simulação enganosa de IA real.
  const scenarios = {
    fractions: {
      q: 'Não entendo frações. Pode explicar?',
      a: 'Imagine uma pizza cortada em 4 pedaços iguais. Se você come 1 pedaço, comeu <strong>1/4 da pizza</strong>. O número de baixo mostra em quantas partes dividimos; o de cima, quantas pegamos.',
      follow: 'Vamos tentar? Se eu comer 2 pedaços de uma pizza com 4, que fração comi?'
    },
    photosynthesis: {
      q: 'O que é fotossíntese? Pode explicar?',
      a: 'Pense na planta como uma pequena fábrica. Ela usa <strong>luz do Sol, água e gás carbônico</strong> para produzir alimento. Nesse processo, também libera oxigênio.',
      follow: 'Sua vez: qual é a fonte de energia usada pela planta?'
    },
    study: {
      q: 'Como posso estudar melhor para uma prova?',
      a: 'Você pode começar com <strong>20 minutos em um assunto</strong>, fazer uma pausa curta e tentar explicar o que aprendeu com suas palavras. Assim fica mais fácil perceber as dúvidas.',
      follow: 'Qual assunto você quer revisar primeiro? Vamos começar por ele.'
    }
  };
  const chatScreen = document.getElementById('chat-screen');
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    const item = scenarios[button.dataset.scenario];
    if (!item) return;
    document.querySelectorAll('[data-scenario]').forEach(el => { const chosen = el === button; el.classList.toggle('active', chosen); el.setAttribute('aria-pressed', String(chosen)); });
    document.getElementById('demo-question').textContent = item.q;
    document.getElementById('demo-answer').innerHTML = item.a; // conteúdo constante e controlado no código do site
    document.getElementById('demo-followup').textContent = item.follow;
    chatScreen.classList.remove('changing'); void chatScreen.offsetWidth; chatScreen.classList.add('changing');
  }));

  const walkthrough = [
    ['◫','Clique em Personalizar','Olhe na lateral esquerda do Gemini. Se não aparecer, abra Mais antes de continuar.'],
    ['▦','Abra Habilidades','Na parte de cima da página Personalizar, escolha Habilidades (Skills).'],
    ['✚','Clique em Criar','Escolha Criar manualmente. Você verá os campos nome, descrição e instruções.'],
    ['✓','Salve e teste','Cole os textos, clique em Criar, depois abra uma conversa e use / para escolher sua habilidade.']
  ];
  document.querySelectorAll('[data-walk]').forEach(button => button.addEventListener('click', () => {
    const item = walkthrough[Number(button.dataset.walk)];
    if (!item) return;
    document.querySelectorAll('[data-walk]').forEach(el => { const chosen = el === button; el.classList.toggle('selected', chosen); el.setAttribute('aria-pressed', String(chosen)); });
    document.getElementById('walk-icon').textContent = item[0];
    document.getElementById('walk-title').textContent = item[1];
    document.getElementById('walk-description').textContent = item[2];
  }));

  function updateBuilderPreview() {
    const idea = options[currentIdea];
    const name = nameInput.value.trim();
    const audience = audienceInput.value.trim();
    const rule = ruleInput.value.trim();
    document.getElementById('preview-name').textContent = name || 'Seu agente sem nome';
    document.getElementById('preview-purpose').textContent = `Uma habilidade para ${audience || 'o público que você escolher'}: ${idea.purpose}.`;
    let score = 20;
    if (name.length >= 4) score += 25;
    if (audience.length >= 12) score += 25;
    if (rule.length >= 18) score += 30;
    document.getElementById('quality-fill').style.width = score + '%';
    document.getElementById('quality-tip').textContent = score === 100 ? 'Boa base! Agora gere, teste e melhore as instruções com perguntas reais.' : 'Preencha nome, público e uma regra clara. Este indicador é apenas uma dica, não uma nota.';
  }
  for (const el of [nameInput, audienceInput, ruleInput, toneInput]) el.addEventListener('input', updateBuilderPreview);
  // Atualiza quando o aluno troca a ideia, sem reimplementar o seletor existente.
  ideaButtons.forEach(button => button.addEventListener('click', updateBuilderPreview));
  updateBuilderPreview();

  document.querySelectorAll('[data-quiz]').forEach(button => button.addEventListener('click', () => {
    const correct = button.dataset.quiz === 'specific';
    document.querySelectorAll('[data-quiz]').forEach(el => {el.classList.remove('correct','incorrect'); el.setAttribute('aria-pressed', String(el === button));});
    button.classList.add(correct ? 'correct' : 'incorrect');
    document.getElementById('quiz-feedback').textContent = correct ? '✓ Exatamente! Ela diz como explicar, o que incluir e como conferir o aprendizado.' : 'Quase! “Bem” pode significar coisas diferentes. Escolha a instrução com ações concretas.';
  }));

  const dock = document.getElementById('mission-dock');
  let dockClosed = false;
  const dockLinks = [
    ['#preparacao','Preparação','Abra o Gemini e encontre o menu'],
    ['#missao-1','Missão 01','Crie o tutor com a turma'],
    ['#missao-2','Missão 02','Personalize seu próprio agente'],
    ['#conclusao','Desafio final','Mostre o resultado e conclua']
  ];
  const linkTarget = document.getElementById('dock-link');
  function currentMission() {
    const count = inputs.filter(el => el.checked).length;
    if (count < 3) return dockLinks[0];
    if (count < 5) return dockLinks[1];
    if (count < 7) return dockLinks[2];
    return dockLinks[3];
  }
  function updateChrome() {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? Math.min(100, Math.max(0, 100 * scrollY / height)) : 0;
    document.getElementById('read-progress-fill').style.width = pct + '%';
    const m = currentMission();
    document.getElementById('dock-title').textContent = m[1];
    document.getElementById('dock-subtitle').textContent = m[2];
    linkTarget.href = m[0];
    const started = scrollY > 550 && scrollY < document.documentElement.scrollHeight - window.innerHeight - 230;
    dock.classList.toggle('visible', started && !dockClosed);
    const sections = ['preparacao','missao-1','missao-2','conclusao','ajuda'];
    let visible = sections[0];
    for (const id of sections) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < 170) visible = id; }
    document.querySelectorAll('.sidebar-link').forEach(a => { const active = a.hash === '#' + visible; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(() => {updateChrome(); ticking = false;}); }, {passive:true});
  window.addEventListener('resize', updateChrome);
  inputs.forEach(el => el.addEventListener('change', () => {updateChrome(); if (inputs.every(x => x.checked)) celebrate();}));
  document.getElementById('reset-progress').addEventListener('click', updateChrome);
  document.getElementById('dock-close').addEventListener('click', () => {dockClosed = true;dock.classList.remove('visible');});
  document.getElementById('focus-mode').addEventListener('click', (e) => { const active = document.body.classList.toggle('focus-on'); e.currentTarget.setAttribute('aria-pressed', String(active)); e.currentTarget.querySelector('span').textContent = active ? 'Sair do foco' : 'Modo foco'; updateChrome(); });
  updateChrome();

  function celebrate() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = document.getElementById('celebrate');
    container.replaceChildren();
    const colors = ['#8d6af9','#95eacb','#f5c76d','#8ad1ef','#f99cb8'];
    for (let i = 0; i < 32; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti';
      piece.style.left = (3 + Math.random() * 94) + '%';
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDelay = (Math.random() * .55) + 's';
      piece.style.setProperty('--drift', ((Math.random() - .5) * 230) + 'px');
      container.appendChild(piece);
    }
    setTimeout(() => container.replaceChildren(), 3400);
  }
})();
