/* Effets de défilement façon Apple — aucun changement de HTML requis */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* 1. Barre de progression ------------------------------------------- */
  const bar = document.createElement('div');
  bar.className = 'fx-progress';
  document.body.appendChild(bar);

  /* 2. Apparitions (cibles ajoutées automatiquement) ------------------- */
  const tag = (sel, mode, stagger = 0) =>
    $$(sel).forEach((el, i) => {
      el.dataset.fx = mode || '';
      if (stagger) el.style.setProperty('--fx-delay', `${i * stagger}ms`);
    });

  tag('#about .grid.grid-cols-2 > div', '', 90);          // métriques
  tag('#about .lg\\:col-span-7', 'left');
  tag('#about .lg\\:col-span-5', 'right');
  tag('#experiences .editorial-card', '', 120);
  tag('#methodes .grid > div', '', 120);
  tag('#formations .editorial-card', '', 120);
  tag('#experiences > div:first-child', '');
  tag('#methodes .max-w-2xl, #formations .max-w-2xl', '');
  tag('#contact .max-w-4xl > *', '', 100);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  $$('[data-fx]').forEach((el) => io.observe(el));

  /* 3. Compteurs animés ------------------------------------------------ */
  const counters = $$('#about .grid.grid-cols-2 .font-display')
    .filter((el) => /^\d+$/.test(el.textContent.trim()));
  const co = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      co.unobserve(e.target);
      const end = parseInt(e.target.textContent, 10);
      if (reduce) return;
      const t0 = performance.now(), d = 1200;
      const tick = (t) => {
        const p = clamp((t - t0) / d);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      e.target.textContent = '0';
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => co.observe(c));

  /* 4. Titre « scrub » : mots allumés au fil du scroll ------------------ */
  const scrub = $('#about h2');
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

  /* 5. Boucle scroll (une seule, via rAF) ------------------------------ */
  const nav = $('.floating-navbar');
  const hero = $('#profil');
  const root = document.documentElement;
  let lastY = scrollY, ticking = false;

  const update = () => {
    ticking = false;
    const y = scrollY;
    const max = root.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    // Navbar : verre dépoli, se cache en descendant, revient en remontant
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 24);
      const down = y > lastY && y > 240;
      nav.classList.toggle('is-hidden', down);
    }
    lastY = y;

    // Hero : le nom grossit et s'efface, le portrait monte plus lentement
    if (hero && !reduce) {
      const p = clamp(y / (hero.offsetHeight * 0.9));
      root.style.setProperty('--hero-name-scale', (1 + p * 0.35).toFixed(3));
      root.style.setProperty('--hero-name-opacity', (0.95 - p * 0.95).toFixed(3));
      root.style.setProperty('--hero-img-y', `${(p * 70).toFixed(1)}px`);
      root.style.setProperty('--hero-img-scale', (1 - p * 0.08).toFixed(3));
    }

    // Titre scrub
    if (words.length) {
      const r = scrub.getBoundingClientRect();
      const p = clamp((innerHeight * 0.85 - r.top) / (innerHeight * 0.45));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    }
  };

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  addEventListener('resize', update);
  update();

  /* 6. Défilement doux vers les ancres (sans saut brutal) --------------- */
  $$('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    })
  );
})();

/* ==========================================================
   V2 — effets plus modernes
   ========================================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* 1. Nom du hero : lettres animées au chargement */
  const name = $('.giant-name');
  if (name && !reduce) {
    const txt = name.textContent.trim();
    name.setAttribute('aria-label', txt);
    name.textContent = '';
    [...txt].forEach((c, i) => {
      if (c === ' ') { const s = document.createElement('span'); s.className = 'fx-sp'; name.appendChild(s); return; }
      const w = document.createElement('span'); w.className = 'fx-chw'; w.setAttribute('aria-hidden', 'true');
      const l = document.createElement('span'); l.className = 'fx-ch'; l.style.setProperty('--i', i); l.textContent = c;
      w.appendChild(l); name.appendChild(w);
    });
  }

  /* 2. Bandeau défilant entre le hero et « À propos » */
  const about = $('#about');
  if (about) {
    const items = ['Gouvernance de projet', 'IA conversationnelle', 'Conduite du changement', 'Prise de parole', 'Analyse budgétaire', 'PowerApps'];
    const row = [...items, ...items].map((t) => `<span>${t}</span><span>✦</span>`).join('');
    const m = document.createElement('div');
    m.className = 'fx-marquee'; m.setAttribute('aria-hidden', 'true');
    m.innerHTML = `<div class="fx-track">${row}${row}</div>`;
    about.parentNode.insertBefore(m, about);
  }

  if (!fine || reduce) return;

  /* 3. Halo qui suit la souris dans le hero (avec inertie) */
  const hero = $('#profil');
  if (hero) {
    const g = document.createElement('div'); g.className = 'fx-glow'; hero.appendChild(g);
    let tx = innerWidth / 2, ty = innerHeight * .4, x = tx, y = ty;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top;
    });
    const loop = () => {
      x += (tx - x) * .08; y += (ty - y) * .08;
      g.style.setProperty('--gx', x + 'px'); g.style.setProperty('--gy', y + 'px');
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* 4. Cartes : projecteur + inclinaison 3D */
  $$('.editorial-card').forEach((c) => {
    c.classList.add('tilt');
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      c.style.setProperty('--mx', px * r.width + 'px'); c.style.setProperty('--my', py * r.height + 'px');
      c.style.setProperty('--rx', ((.5 - py) * 7).toFixed(2) + 'deg');
      c.style.setProperty('--ry', ((px - .5) * 7).toFixed(2) + 'deg');
    });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
  });

  /* 5. Boutons magnétiques */
  $$('#contact a, #contact button, .floating-navbar a[href="#contact"]').forEach((b) => {
    b.classList.add('fx-mag');
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
})();

/* Compteurs génériques : <span data-count="500" data-suffix=" €">500 €</span> */
(() => {
  const els = [...document.querySelectorAll('[data-count]')];
  if (!els.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, sfx = el.dataset.suffix || '', t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 1200);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + sfx;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  els.forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); io.observe(el); });
})();
