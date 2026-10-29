/**
 * DIAPORAMAS PHOTOS (Centres d'intérêt)
 * Chaque .photo-slideshow fait défiler ses <img> en fondu enchaîné,
 * se met en pause au survol ou hors écran, et respecte prefers-reduced-motion.
 */

(function () {
  const INTERVAL = 3800;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup(show) {
    const slides = Array.from(show.querySelectorAll('img'));
    if (!slides.length) return;

    let index = 0;
    let timer = null;
    let hovered = false;
    let visible = false;

    slides[0].classList.add('is-active');
    if (slides.length < 2) return;

    const dots = document.createElement('div');
    dots.className = 'photo-slideshow-dots';
    const dotButtons = slides.map((img, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Photo ${i + 1} sur ${slides.length}`);
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dots.appendChild(dot);
      return dot;
    });
    show.appendChild(dots);

    function goTo(i) {
      slides[index].classList.remove('is-active');
      dotButtons[index].classList.remove('is-active');
      index = (i + slides.length) % slides.length;
      slides[index].classList.add('is-active');
      dotButtons[index].classList.add('is-active');
    }

    function restart() {
      clearInterval(timer);
      timer = null;
      if (prefersReduced || hovered || !visible) return;
      timer = setInterval(() => goTo(index + 1), INTERVAL);
    }

    dotButtons[0].classList.add('is-active');

    show.addEventListener('mouseenter', () => { hovered = true; restart(); });
    show.addEventListener('mouseleave', () => { hovered = false; restart(); });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        restart();
      }, { threshold: 0.3 }).observe(show);
    } else {
      visible = true;
      restart();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.photo-slideshow').forEach(setup);
  });
})();
