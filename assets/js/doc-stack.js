/**
 * PILE DE DOCUMENTS ANIMÉE + VISIONNEUSE
 * Chaque .doc-stack contient des .doc-sheet (data-img, data-pdf, data-title, data-meta).
 * La pile fait défiler ses documents, se met en pause au survol et ouvre la visionneuse au clic.
 */

(function () {
  const INTERVAL = 4500;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Visionneuse ----------
  let viewer, viewerImg, viewerTitle, viewerMeta, viewerOrg, viewerOpen, viewerDownload, viewerCount, viewerNavs;
  let viewerDocs = [];
  let viewerIndex = 0;
  let lastFocus = null;

  function buildViewer() {
    viewer = document.createElement('div');
    viewer.className = 'doc-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Aperçu du document');
    viewer.innerHTML = `
      <div class="doc-viewer-panel">
        <div class="doc-viewer-head">
          <div class="min-w-0">
            <span class="doc-viewer-org caption block"></span>
            <h3 class="doc-viewer-title title-4"></h3>
            <p class="doc-viewer-meta body-sm mt-0.5"></p>
          </div>
          <button type="button" class="doc-viewer-close w-9 h-9 shrink-0 rounded-full bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#1D1D1F] flex items-center justify-center transition" aria-label="Fermer">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="doc-viewer-body">
          <button type="button" class="doc-viewer-nav" data-dir="-1" aria-label="Document précédent"><i data-lucide="chevron-left" class="w-5 h-5"></i></button>
          <img alt="">
          <button type="button" class="doc-viewer-nav" data-dir="1" aria-label="Document suivant"><i data-lucide="chevron-right" class="w-5 h-5"></i></button>
        </div>
        <div class="doc-viewer-foot">
          <span class="doc-viewer-count caption"></span>
          <div class="flex gap-2">
            <a class="doc-viewer-download btn btn-secondary btn-sm !min-h-[36px] !text-[14px]" download>Télécharger</a>
            <a class="doc-viewer-open btn btn-primary btn-sm !min-h-[36px] !text-[14px]" target="_blank" rel="noopener noreferrer">Ouvrir le PDF</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(viewer);

    viewerImg = viewer.querySelector('.doc-viewer-body img');
    viewerTitle = viewer.querySelector('.doc-viewer-title');
    viewerMeta = viewer.querySelector('.doc-viewer-meta');
    viewerOrg = viewer.querySelector('.doc-viewer-org');
    viewerOpen = viewer.querySelector('.doc-viewer-open');
    viewerDownload = viewer.querySelector('.doc-viewer-download');
    viewerCount = viewer.querySelector('.doc-viewer-count');
    viewerNavs = viewer.querySelectorAll('.doc-viewer-nav');

    viewer.querySelector('.doc-viewer-close').addEventListener('click', closeViewer);
    viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });
    viewerNavs.forEach((btn) => btn.addEventListener('click', () => showDoc(viewerIndex + Number(btn.dataset.dir))));

    document.addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') showDoc(viewerIndex + 1);
      if (e.key === 'ArrowLeft') showDoc(viewerIndex - 1);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function showDoc(index) {
    const n = viewerDocs.length;
    viewerIndex = (index + n) % n;
    const d = viewerDocs[viewerIndex];
    viewerImg.src = d.img;
    viewerImg.alt = d.title + ' — ' + d.org;
    viewerTitle.textContent = d.title;
    viewerMeta.textContent = d.meta;
    viewerOrg.textContent = d.org;
    viewerOpen.href = d.pdf;
    viewerDownload.href = d.pdf;
    viewerCount.textContent = n > 1 ? `Document ${viewerIndex + 1} / ${n}` : '';
    viewerNavs.forEach((btn) => { btn.hidden = n < 2; });
  }

  function openViewer(docs, index) {
    if (!viewer) buildViewer();
    lastFocus = document.activeElement;
    viewerDocs = docs;
    showDoc(index);
    viewer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    viewer.querySelector('.doc-viewer-close').focus();
  }

  function closeViewer() {
    viewer.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  // ---------- Pile animée ----------
  function setupStack(stack) {
    const sheets = Array.from(stack.querySelectorAll('.doc-sheet'));
    if (!sheets.length) return;

    const org = stack.dataset.org || '';
    const docs = sheets.map((s) => ({
      img: s.dataset.img,
      pdf: s.dataset.pdf,
      title: s.dataset.title,
      meta: s.dataset.meta,
      org,
    }));

    stack.dataset.count = String(sheets.length);
    stack.style.setProperty('--doc-stack-interval', INTERVAL + 'ms');

    const caption = document.createElement('div');
    caption.className = 'doc-stack-caption';
    caption.innerHTML = '<span class="doc-stack-label"></span><span class="doc-stack-dots"></span>';
    stack.appendChild(caption);
    const label = caption.querySelector('.doc-stack-label');
    const dotsWrap = caption.querySelector('.doc-stack-dots');

    const dots = sheets.length > 1 ? sheets.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'doc-stack-dot';
      dot.setAttribute('aria-label', 'Afficher ' + docs[i].title);
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    }) : [];

    let front = 0;
    let timer = null;
    let hovered = false;
    let visible = false;

    function layout() {
      sheets.forEach((sheet, i) => {
        const pos = (i - front + sheets.length) % sheets.length;
        sheet.dataset.pos = String(Math.min(pos, 2));
        sheet.tabIndex = pos === 0 ? 0 : -1;
        sheet.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
      });
      label.textContent = docs[front].title;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === front));
    }

    function goTo(index) {
      if (index === front) return;
      const leaving = sheets[front];
      leaving.classList.add('is-leaving');
      setTimeout(() => leaving.classList.remove('is-leaving'), 450);
      front = (index + sheets.length) % sheets.length;
      // Relance l'animation de la barre de progression
      dots.forEach((dot) => { dot.classList.remove('is-active'); void dot.offsetWidth; });
      layout();
    }

    function canPlay() {
      return sheets.length > 1 && !prefersReduced && visible && !hovered;
    }

    function stop() {
      clearInterval(timer);
      timer = null;
      stack.classList.remove('is-playing');
      stack.classList.toggle('is-paused', sheets.length > 1);
    }

    function restart() {
      clearInterval(timer);
      timer = null;
      if (!canPlay()) { stop(); return; }
      stack.classList.add('is-playing');
      stack.classList.remove('is-paused');
      timer = setInterval(() => goTo(front + 1), INTERVAL);
    }

    sheets.forEach((sheet, i) => {
      sheet.addEventListener('click', () => openViewer(docs, i));
    });

    stack.addEventListener('mouseenter', () => { hovered = true; stop(); });
    stack.addEventListener('mouseleave', () => { hovered = false; restart(); });
    stack.addEventListener('focusin', () => { hovered = true; stop(); });
    stack.addEventListener('focusout', () => { hovered = false; restart(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        restart();
      }, { threshold: 0.4 }).observe(stack);
    } else {
      visible = true;
    }

    layout();
    restart();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.doc-stack').forEach(setupStack);
  });
})();
