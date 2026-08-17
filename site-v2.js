const calendlyUrl = 'https://calendly.com/growth_agency/appel-strategique';
const contactEmail = 'contact@growthagency-management.com';

function initializeNavigation() {
  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const page = document.body.dataset.page;

  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === page) link.setAttribute('aria-current', 'page');
  });

  if (!toggle || !navigation) return;

  const closeMenu = (returnFocus = false) => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    navigation.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willOpen));
    toggle.setAttribute('aria-label', willOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    navigation.classList.toggle('is-open', willOpen);
    document.body.classList.toggle('menu-open', willOpen);
  });

  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
}

function initializeRail() {
  const progress = document.querySelector('.rail-progress');
  if (!progress) return;

  let ticking = false;
  const update = () => {
    const maximum = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maximum > 0 ? Math.min(window.scrollY / maximum, 1) : 0;
    progress.style.transform = `scaleY(${ratio})`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initializeReveals() {
  const items = [...document.querySelectorAll('.reveal')];
  if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }

  items.forEach(item => item.classList.add('reveal-ready'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });

  items.forEach(item => observer.observe(item));
}

function initializeDemoTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const selectTab = selected => {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) panel.hidden = !active;
    });
    selected.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      selectTab(tabs[nextIndex]);
    });
  });
}

const diagnosticAnswers = {
  'compte-rendu': "À partir d'un vocal ou d'une transcription, Serge peut relever les décisions, responsables, échéances et points bloquants. Il prépare le compte rendu dans votre structure. Vous le relisez avant tout envoi.",
  dossier: "Serge peut parcourir les pièces d'un dossier, extraire les exigences, relever les dates et signaler ce qui manque. La décision de répondre et le contenu final restent sous votre contrôle.",
  planning: "Serge peut croiser l'agenda, les tâches et les documents disponibles pour préparer un briefing unique avec les urgences, pièces attendues et décisions du jour.",
  relance: "Serge peut repérer un devis ou une demande sans réponse et préparer une relance adaptée au contexte. Le message ne part qu'après votre validation.",
  securite: "Le serveur et les comptes restent au nom du client. Les accès sont limités aux outils autorisés. Envoyer, publier, supprimer ou dépenser demande une validation explicite."
};

function initializeDiagnostic() {
  const template = `
    <button class="diagnostic-launcher" type="button" data-open-diagnostic aria-label="S/01 — Tester une mission">
      <span aria-hidden="true">S/01</span><strong>Tester une mission</strong>
    </button>
    <dialog class="serge-dialog" id="serge-dialog" aria-labelledby="dialog-title">
      <div class="dialog-head">
        <div class="dialog-identity"><span class="dialog-avatar" aria-hidden="true">S/01</span><div><strong id="dialog-title">Diagnostic Serge</strong><small>Simulation locale, aucune donnée envoyée</small></div></div>
        <button class="dialog-close" type="button" data-close-diagnostic aria-label="Fermer le diagnostic">×</button>
      </div>
      <div class="dialog-body" id="dialog-body" aria-live="polite">
        <div class="chat-bubble">Décrivez une tâche qui vous prend du temps, ou choisissez un scénario. Je vous montrerai ce qu'un Serge configuré pour votre entreprise pourrait préparer.</div>
        <div class="quick-actions" aria-label="Scénarios de démonstration">
          <button type="button" data-diagnostic="compte-rendu">Préparer un compte rendu</button>
          <button type="button" data-diagnostic="dossier">Lire un dossier</button>
          <button type="button" data-diagnostic="planning">Préparer ma journée</button>
          <button type="button" data-diagnostic="relance">Relancer un devis</button>
          <button type="button" data-diagnostic="securite">Comprendre la sécurité</button>
        </div>
      </div>
      <form class="dialog-form" id="diagnostic-form">
        <label class="sr-only" for="diagnostic-input">Votre tâche</label>
        <input id="diagnostic-input" type="text" autocomplete="off" placeholder="Ex. mes rapports de chantier">
        <button class="voice-button" id="voice-button" type="button" aria-label="Dicter une tâche">●</button>
        <button type="submit" aria-label="Envoyer la tâche">→</button>
      </form>
      <p class="dialog-note">Aucun message n'est envoyé à Hermes. La dictée peut utiliser le service vocal de votre navigateur.</p>
    </dialog>`;

  document.body.insertAdjacentHTML('beforeend', template);
  const dialog = document.getElementById('serge-dialog');
  const body = document.getElementById('dialog-body');
  const input = document.getElementById('diagnostic-input');
  const form = document.getElementById('diagnostic-form');
  const voiceButton = document.getElementById('voice-button');
  let lastTrigger = null;

  const openDialog = trigger => {
    lastTrigger = trigger;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    window.setTimeout(() => input.focus(), 60);
  };

  const closeDialog = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    if (lastTrigger) lastTrigger.focus();
  };

  const addBubble = (message, type = 'bot') => {
    const bubble = document.createElement('div');
    bubble.className = type === 'user' ? 'chat-bubble user' : 'chat-bubble';
    bubble.textContent = message;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  };

  const addBooking = () => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.append('Pour vérifier les outils et le périmètre réel, ');
    const link = document.createElement('a');
    link.href = calendlyUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'réservez un diagnostic de 30 minutes';
    bubble.append(link, '.');
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  };

  const answerFor = message => {
    const value = message.toLowerCase();
    if (value.includes('compte') || value.includes('rapport') || value.includes('réunion') || value.includes('reunion')) return diagnosticAnswers['compte-rendu'];
    if (value.includes('dossier') || value.includes('offre') || value.includes('soumission')) return diagnosticAnswers.dossier;
    if (value.includes('agenda') || value.includes('planning') || value.includes('journée') || value.includes('journee')) return diagnosticAnswers.planning;
    if (value.includes('devis') || value.includes('relance')) return diagnosticAnswers.relance;
    if (value.includes('donnée') || value.includes('donnee') || value.includes('sécurité') || value.includes('securite') || value.includes('serveur')) return diagnosticAnswers.securite;
    return "Cette mission mérite d'être étudiée. Le point décisif est de savoir où se trouvent les informations, quelle sortie vous attendez et quelle action doit rester sous validation humaine.";
  };

  document.querySelectorAll('[data-open-diagnostic]').forEach(trigger => trigger.addEventListener('click', () => openDialog(trigger)));
  dialog.querySelector('[data-close-diagnostic]').addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });

  dialog.querySelectorAll('[data-diagnostic]').forEach(button => {
    button.addEventListener('click', () => {
      addBubble(button.textContent, 'user');
      addBubble(diagnosticAnswers[button.dataset.diagnostic]);
      addBooking();
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;
    addBubble(message, 'user');
    input.value = '';
    addBubble(answerFor(message));
    addBooking();
  });

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-CH';
    recognition.interimResults = false;
    recognition.addEventListener('start', () => voiceButton.classList.add('listening'));
    recognition.addEventListener('end', () => voiceButton.classList.remove('listening'));
    recognition.addEventListener('result', event => {
      input.value = event.results[0][0].transcript;
      input.focus();
    });
    voiceButton.addEventListener('click', () => recognition.start());
  } else {
    voiceButton.hidden = true;
    form.style.gridTemplateColumns = '1fr 46px';
  }
}

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Diagnostic BonjourSerge, ${data.get('entreprise') || 'nouvelle demande'}`;
    const body = [
      `Nom : ${data.get('nom') || ''}`,
      `Email : ${data.get('email') || ''}`,
      `Entreprise : ${data.get('entreprise') || ''}`,
      `Rôle : ${data.get('role') || ''}`,
      '',
      'Mission à étudier :',
      data.get('mission') || ''
    ].join('\n');

    status.textContent = 'Votre messagerie va s’ouvrir. Aucun contenu n’est envoyé par ce site.';
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
initializeNavigation();
initializeRail();
initializeReveals();
initializeDemoTabs();
initializeDiagnostic();
initializeContactForm();
