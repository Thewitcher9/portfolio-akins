/**
 * COUVERTURE ANIMÉE OUIGO
 * Lance l'arrivée du train quand la couverture devient visible, puis le travelling.
 * Utilisée sur la carte d'expérience et dans l'étude de cas (main.js).
 */

(function () {
  const ARRIVAL_MS = 1800;

  function launch(cover) {
    if (cover.classList.contains('is-live')) return;
    // Laisse le navigateur peindre l'état initial avant de lancer la transition
    requestAnimationFrame(() => requestAnimationFrame(() => {
      cover.classList.add('is-live');
      setTimeout(() => cover.classList.add('is-cruising'), ARRIVAL_MS);
    }));
  }

  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        launch(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.35 })
    : null;

  function watch(root = document) {
    root.querySelectorAll('.train-cover:not(.is-live)').forEach((cover) => {
      if (io) io.observe(cover);
      else launch(cover);
    });
  }

  // Filet de sécurité : si l'observateur ne se déclenche pas, on vérifie au défilement
  function checkInView() {
    document.querySelectorAll('.train-cover:not(.is-live)').forEach((cover) => {
      const r = cover.getBoundingClientRect();
      if (r.width && r.top < innerHeight * 0.9 && r.bottom > 0) launch(cover);
    });
  }

  window.trainCover = { watch, launch };
  document.addEventListener('DOMContentLoaded', () => { watch(); checkInView(); });
  addEventListener('scroll', checkInView, { passive: true });
  addEventListener('resize', checkInView);
})();
