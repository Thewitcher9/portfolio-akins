/* Effets discrets façon Apple : apparitions, barre de navigation, parallaxe du portrait */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* 1. Apparitions : éléments marqués data-fx, décalage via data-fx-stagger sur le parent */
  $$('[data-fx-stagger]').forEach((group) => {
    const step = Number(group.dataset.fxStagger) || 100;
    [...group.children].forEach((el, i) => {
      el.dataset.fx = '';
      el.style.setProperty('--fx-delay', `${i * step}ms`);
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('[data-fx]').forEach((el) => io.observe(el));

  /* 2. Titre « scrub » : les mots s'allument au fil du scroll */
  const scrub = $('[data-scrub]');
  let words = [];
  if (scrub && !reduce) {
    words = scrub.textContent.trim().split(/\s+/).map((w) => {
      const s = document.createElement('span');
      s.className = 'fx-word';
      s.textContent = w;
      return s;
    });
    scrub.textContent = '';
    words.forEach((s, i) => {
      scrub.appendChild(s);
      if (i < words.length - 1) scrub.appendChild(document.createTextNode(' '));
    });
  }

  /* 3. Boucle de scroll (une seule, via rAF) */
  const nav = $('.global-nav');
  const hero = $('.hero');
  const root = document.documentElement;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = scrollY;

    if (nav) nav.classList.toggle('is-scrolled', y > 8);

    if (hero && !reduce) {
      const p = clamp(y / hero.offsetHeight);
      root.style.setProperty('--hero-img-y', `${(p * 60).toFixed(1)}px`);
    }

    if (words.length) {
      const r = scrub.getBoundingClientRect();
      const p = clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.5));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    }
  };

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update);
  update();

  /* 4. Défilement doux vers les ancres */
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    })
  );
})();
