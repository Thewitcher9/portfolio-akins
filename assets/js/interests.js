/**
 * CENTRES D'INTÉRÊT — chaque carte ouvre son propre « univers »
 * Sport (stade de nuit), Voyage (carnet + carte du monde), Lecture (papier, serif).
 * Les textes reprennent ceux de l'ancien portfolio Weebly.
 */

(function () {
  const IMG = 'assets/images/interets/';

  // ---------- Destinations de la carte du monde ----------
  // coords : [longitude, latitude] ; labelDx/labelDy : décalage de l'étiquette
  const DESTINATIONS = [
    {
      id: 'martinique',
      name: 'Martinique',
      country: 'France · Antilles',
      coords: [-61.02, 14.64],
      label: { dx: 18, dy: 8, anchor: 'start' },
      caption: "Mon île d'origine, l'endroit où je me ressource le plus souvent.",
      photos: ['voyage_8.jpg', 'voyage_2.jpg', 'voyage_6.jpg', 'voyage_1.jpg', 'voyage_7.jpg']
    },
    {
      id: 'madrid',
      name: 'Madrid',
      country: 'Espagne',
      coords: [-3.70, 40.42],
      label: { dx: -18, dy: 8, anchor: 'end' },
      caption: 'La capitale espagnole.',
      photos: []
    },
    {
      id: 'londres',
      name: 'Londres',
      country: 'Royaume-Uni',
      coords: [-0.13, 51.51],
      label: { dx: -18, dy: 8, anchor: 'end' },
      caption: 'Balade au bord de la Tamise, face au London Eye (2019).',
      photos: ['voyage_3.jpg']
    },
    {
      id: 'goteborg',
      name: 'Göteborg',
      country: 'Suède',
      coords: [11.97, 57.71],
      label: { dx: 18, dy: 8, anchor: 'start' },
      caption: 'Séjour sportif autour des stades de la ville, dont la Bravida Arena (2019).',
      photos: ['voyage_4.jpg', 'voyage_5.jpg']
    }
  ];

  // Codes ISO numériques des pays visités / de résidence (world-atlas)
  const VISITED = new Set(['724', '826', '752']); // Espagne, Royaume-Uni, Suède
  const HOME = new Set(['250']);                   // France

  const icon = (name, cls = 'w-5 h-5') => `<i data-lucide="${name}" class="${cls}"></i>`;

  const gallery = (files, alt) => `
    <div class="universe-gallery">
      ${files.map((f, i) => `
        <a href="${IMG}${f}" target="_blank" rel="noopener noreferrer">
          <img src="${IMG}${f}" alt="${alt} — photo ${i + 1}" loading="lazy">
        </a>`).join('')}
    </div>`;

  // ---------- Univers ----------
  const UNIVERSES = {
    sport: () => `
      <div class="universe-panel universe-sport" role="document">
        <button type="button" class="universe-close" aria-label="Fermer">${icon('x')}</button>

        <svg class="pitch-lines" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="none" stroke="#FFFFFF" stroke-width="2">
            <rect x="40" y="40" width="920" height="520"/>
            <line x1="500" y1="40" x2="500" y2="560"/>
            <circle cx="500" cy="300" r="90"/>
            <rect x="40" y="170" width="140" height="260"/>
            <rect x="820" y="170" width="140" height="260"/>
            <rect x="40" y="235" width="50" height="130"/>
            <rect x="910" y="235" width="50" height="130"/>
          </g>
        </svg>

        <div class="universe-hero">
          <span class="sport-kicker text-xs font-bold uppercase block mb-4">Centre d'intérêt · 01</span>
          <h2 class="sport-title">Sport</h2>
          <p class="mt-4 text-base sm:text-lg max-w-xl">L'école de la vie, sur le terrain depuis l'âge de 6 ans.</p>
        </div>

        <div class="universe-body relative">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div class="lg:col-span-7 space-y-4 text-[15px] leading-relaxed">
              <p>Le sport est essentiel dans ma vie. Sans ma dose d'adrénaline, de compétition et de surpassement, je me
                sens perdu. C'est pour cela qu'il occupe une place centrale dans mon existence.</p>
              <p>Je pratique le sport depuis l'âge de 6 ans, notamment le football. Pour moi, le sport est l'école de la
                vie : c'est en le pratiquant que l'on se développe, que l'on se trouve et que l'on crée du lien social.</p>
              <p>Le football m'a permis de me forger une détermination, une discipline et un esprit de compétiteur.</p>
            </div>
            <div class="lg:col-span-5 grid grid-cols-2 gap-3 content-start">
              <div class="sport-stat"><strong>6 ans</strong><span class="text-xs text-white/60">mes débuts au football</span></div>
              <div class="sport-stat"><strong>3</strong><span class="text-xs text-white/60">valeurs : détermination, discipline, compétition</span></div>
            </div>
          </div>

          <blockquote class="sport-quote mb-10">
            « Le sport va chercher la peur pour la dominer, la fatigue pour en triompher, la difficulté pour la vaincre. »
            <span class="block mt-2 text-sm font-sans tracking-normal text-white/50">— Pierre de Coubertin</span>
          </blockquote>

          ${gallery(['sport_1.jpg', 'sport_6.jpg', 'sport_3.jpg', 'sport_4.jpg', 'sport_5.jpg', 'sport_2.jpg'], 'Sport')}
        </div>
      </div>`,

    voyage: () => `
      <div class="universe-panel universe-voyage" role="document">
        <button type="button" class="universe-close" aria-label="Fermer">${icon('x')}</button>

        <div class="universe-hero">
          <span class="voyage-kicker text-xs font-bold uppercase block mb-4">Centre d'intérêt · 02</span>
          <h2 class="voyage-title">Carnet de voyage</h2>
          <p class="mt-4 text-base sm:text-lg max-w-xl">Découvrir de nouveaux paysages et de nouvelles mœurs pour
            enrichir ma culture et me ressourcer.</p>
        </div>

        <div class="universe-body">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            <div class="lg:col-span-8">
              <div class="world-map" id="world-map">
                <div class="map-fallback">Chargement de la carte…</div>
              </div>
              <p class="text-xs mt-3 flex flex-wrap gap-x-5 gap-y-1">
                <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-sm bg-[#F2B45C] border border-[#D9822B]"></span>Pays visités</span>
                <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-sm bg-[#F9DDB0] border border-[#E3B26A]"></span>France, où je vis</span>
                <span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-[#D9482B]"></span>Destinations</span>
              </p>
            </div>

            <div class="lg:col-span-4 flex flex-col gap-4">
              <div class="destination-list space-y-2">
                ${DESTINATIONS.map((d, i) => `
                  <button type="button" data-destination="${d.id}">
                    <span class="dest-num">${i + 1}</span>
                    <span class="min-w-0">
                      <span class="block text-sm font-bold">${d.name}</span>
                      <span class="block text-xs opacity-60">${d.country}</span>
                    </span>
                  </button>`).join('')}
              </div>
              <div class="destination-card" id="destination-card"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            <div class="lg:col-span-7 space-y-4 text-[15px] leading-relaxed">
              <p>Voyager est quelque chose que j'affectionne particulièrement. Découvrir de nouveaux paysages et de
                nouvelles mœurs enrichit ma culture et me permet de me ressourcer.</p>
              <p>L'endroit où je me ressource le plus souvent est la <strong>Martinique</strong>. Originaire de cette
                île, je ne peux qu'être ébloui par ce territoire que j'aime profondément : ses paysages sauvages,
                paradisiaques et montagneux en font l'une des plus belles îles au monde. Et je n'exagère pas !
                Malgré ses défauts, je ne cesse de l'aimer.</p>
            </div>
            <div class="lg:col-span-5 flex items-center">
              <p class="voyage-title !text-4xl !leading-tight">« Quelle magnifique île ! »</p>
            </div>
          </div>

          ${gallery(['voyage_2.jpg', 'voyage_8.jpg', 'voyage_6.jpg', 'voyage_1.jpg', 'voyage_7.jpg', 'voyage_3.jpg'], 'Voyage')}
        </div>
      </div>`,

    lecture: () => `
      <div class="universe-panel universe-lecture" role="document">
        <button type="button" class="universe-close" aria-label="Fermer">${icon('x')}</button>

        <div class="universe-hero text-center">
          <span class="lecture-kicker text-xs font-bold uppercase block mb-4">Centre d'intérêt · 03</span>
          <h2 class="lecture-title">Lecture</h2>
        </div>

        <div class="universe-body">
          <div class="max-w-2xl mx-auto mb-12">
            <div class="lecture-rule mb-8"></div>
            <p class="lecture-quote">« La lecture nourrit l'âme, comme le pain nourrit le corps. »</p>
            <p class="text-center text-sm mt-3 opacity-60">— Antoine Albalat</p>
            <div class="lecture-rule mt-8"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-center max-w-4xl mx-auto">
            <div class="md:col-span-7 lecture-text space-y-5">
              <p>Lire me permet de m'évader et de réfléchir à la vie. La réflexion est un processus qui invite à se
                remettre en question et à porter un nouveau regard sur le monde.</p>
              <p>La lecture apaise mon âme, me détend et enrichit mes connaissances, dans un monde où la connaissance
                est parfois jugée inutile. Pour moi, c'est tout le contraire !</p>
            </div>
            <figure class="md:col-span-5 max-w-[280px] mx-auto">
              <div class="book">
                <img src="${IMG}lecture_1.jpg" alt="Le roman « Rompre » de Yann Moix" loading="lazy">
              </div>
              <figcaption class="text-center text-sm mt-6 opacity-70"><em>Rompre</em>, Yann Moix</figcaption>
            </figure>
          </div>
        </div>
      </div>`
  };

  // ---------- Carte du monde ----------
  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  let worldData = null;

  async function drawMap(container, onSelect) {
    try {
      await loadScript('https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js');
      await loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js');
      if (!worldData) {
        worldData = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json').then((r) => r.json());
      }
    } catch (e) {
      container.querySelector('.map-fallback').textContent = 'Carte indisponible hors connexion.';
      return null;
    }

    const { d3, topojson } = window;
    const width = 960;
    const height = 600;
    const countries = topojson.feature(worldData, worldData.objects.countries);

    // Cadrage sur l'Atlantique : des Antilles à la Scandinavie
    const projection = d3.geoNaturalEarth1().fitExtent(
      [[20, 20], [width - 20, height - 20]],
      { type: 'MultiPoint', coordinates: [[-80, 8], [32, 66], [-80, 66], [32, 8]] }
    );
    const path = d3.geoPath(projection);

    const svg = d3.create('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('role', 'img')
      .attr('aria-label', 'Carte des destinations : Martinique, Madrid, Londres et Göteborg');

    svg.append('path').attr('class', 'graticule').attr('d', path(d3.geoGraticule10()));

    svg.append('g').selectAll('path')
      .data(countries.features)
      .join('path')
      .attr('class', (d) => `land${VISITED.has(d.id) ? ' is-visited' : ''}${HOME.has(d.id) ? ' is-home' : ''}`)
      .attr('d', path);

    const pins = svg.append('g').selectAll('g')
      .data(DESTINATIONS)
      .join('g')
      .attr('class', 'pin')
      .attr('data-destination', (d) => d.id)
      .attr('transform', (d) => `translate(${projection(d.coords).join(',')})`)
      .on('click', (event, d) => onSelect(d.id));

    pins.append('circle').attr('class', 'pin-pulse').attr('r', 12);
    pins.append('circle').attr('class', 'pin-dot').attr('r', 10);
    pins.append('text')
      .attr('class', 'pin-label')
      .attr('x', (d) => d.label.dx)
      .attr('y', (d) => d.label.dy)
      .attr('text-anchor', (d) => d.label.anchor)
      .text((d) => d.name);

    container.innerHTML = '';
    container.appendChild(svg.node());
    return svg.node();
  }

  function renderDestination(id, root) {
    const d = DESTINATIONS.find((x) => x.id === id);
    const card = root.querySelector('#destination-card');
    if (!d || !card) return;

    const photo = d.photos[0]
      ? `<div class="dest-photo"><img src="${IMG}${d.photos[0]}" alt="${d.name}"></div>`
      : `<div class="dest-photo is-empty">Photo à venir</div>`;
    card.innerHTML = `
      ${photo}
      <div class="p-4">
        <span class="block text-xs font-bold uppercase tracking-widest opacity-50">${d.country}</span>
        <span class="block text-lg font-bold mb-1">${d.name}</span>
        <span class="block text-sm opacity-75">${d.caption}</span>
      </div>`;

    root.querySelectorAll('[data-destination]').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.destination === id);
    });
  }

  // ---------- Ouverture / fermeture ----------
  let overlay = null;
  let lastFocus = null;

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    const el = overlay;
    overlay = null;
    setTimeout(() => el.remove(), 300);
    if (lastFocus) lastFocus.focus();
  }

  function open(name) {
    const build = UNIVERSES[name];
    if (!build) return;
    lastFocus = document.activeElement;

    overlay = document.createElement('div');
    overlay.className = 'universe';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', `Centre d'intérêt : ${name}`);
    overlay.innerHTML = build();
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay || e.target.closest('.universe-close')) close();
    });

    if (window.lucide) window.lucide.createIcons();
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    overlay.querySelector('.universe-close').focus();

    if (name === 'voyage') {
      const root = overlay;
      const select = (id) => renderDestination(id, root);
      root.querySelectorAll('.destination-list [data-destination]').forEach((btn) => {
        btn.addEventListener('click', () => select(btn.dataset.destination));
      });
      select('martinique');
      drawMap(root.querySelector('#world-map'), select).then(() => select(
        (root.querySelector('.destination-list .is-active') || {}).dataset?.destination || 'martinique'
      ));
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay) close();
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-interest]').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.photo-slideshow-dots')) return; // les points du diaporama restent indépendants
        open(card.dataset.interest);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(card.dataset.interest);
        }
      });
    });
  });
})();
