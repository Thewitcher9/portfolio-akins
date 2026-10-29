/**
 * FIL D'ACTUALITÉ LINKEDIN (brouillon)
 *
 * LinkedIn ne permet pas de lire automatiquement les posts d'un profil depuis un site
 * statique. On utilise donc l'intégration officielle, post par post.
 *
 * ✏️ Pour ajouter un post : sur LinkedIn, ouvre le post → « … » → « Copier le lien du post »,
 * puis colle le lien ci-dessous (le plus récent en premier). Le code « Intégrer ce post »
 * ou l'adresse de son iframe fonctionnent aussi.
 */
const LINKEDIN_POSTS = [
  "https://www.linkedin.com/feed/update/urn:li:activity:7516022702487302146/",
  "https://www.linkedin.com/feed/update/urn:li:activity:7480992320528560128/",
  "https://www.linkedin.com/feed/update/urn:li:activity:7376869337187639296/",
  "https://www.linkedin.com/feed/update/urn:li:activity:7376705857847345152/",
];

const LINKEDIN_PROFILE = "https://www.linkedin.com/in/akins-anretar/recent-activity/all/";

(function () {
  // Transforme un lien de post (ou un code d'intégration) en adresse d'iframe LinkedIn
  function toEmbedUrl(link) {
    const src = (link.match(/src="([^"]+)"/) || [])[1] || link;
    if (src.includes('/embed/feed/update/')) return src.split('?')[0];

    const urn = src.match(/urn:li:(activity|share|ugcPost):(\d+)/);
    if (urn) return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1]}:${urn[2]}`;

    const activity = src.match(/activity[-:](\d{15,})/);
    if (activity) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity[1]}`;

    return null;
  }

  function placeholderCard(i) {
    return `
      <div class="linkedin-slide linkedin-placeholder">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 rounded-full bg-gray-200"></div>
          <div class="flex-1 space-y-2">
            <div class="h-2.5 w-2/3 rounded-full bg-gray-200"></div>
            <div class="h-2 w-1/3 rounded-full bg-gray-100"></div>
          </div>
        </div>
        <div class="space-y-2 mb-5">
          <div class="h-2 rounded-full bg-gray-100"></div>
          <div class="h-2 rounded-full bg-gray-100"></div>
          <div class="h-2 w-4/5 rounded-full bg-gray-100"></div>
        </div>
        <div class="flex-1 rounded-xl bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6">
          <i data-lucide="linkedin" class="w-6 h-6 text-gray-400 mb-2"></i>
          <span class="text-xs font-semibold text-gray-700">Emplacement post LinkedIn n°${i + 1}</span>
          <span class="text-[11px] text-gray-500 mt-1 max-w-[220px]">Colle le lien du post dans <code>assets/js/linkedin-feed.js</code></span>
        </div>
      </div>`;
  }

  function postCard(embedUrl, i) {
    return `
      <div class="linkedin-slide">
        <iframe src="${embedUrl}" title="Post LinkedIn d'Akins Anretar n°${i + 1}"
          loading="lazy" frameborder="0" allowfullscreen></iframe>
      </div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('linkedin-track');
    if (!track) return;

    const embeds = LINKEDIN_POSTS.map(toEmbedUrl).filter(Boolean);
    track.innerHTML = embeds.length
      ? embeds.map(postCard).join('')
      : [0, 1, 2].map(placeholderCard).join('');

    track.insertAdjacentHTML('beforeend', `
      <a href="${LINKEDIN_PROFILE}" target="_blank" rel="noopener noreferrer" class="linkedin-slide linkedin-more group">
        <div class="w-14 h-14 rounded-2xl bg-[#0A66C2] flex items-center justify-center mb-5 shadow-md group-hover:scale-105 transition-transform">
          <i data-lucide="linkedin" class="w-7 h-7 text-white"></i>
        </div>
        <span class="text-lg font-bold text-black mb-1">Toute mon activité</span>
        <span class="text-sm text-gray-500 mb-6 max-w-[220px]">Posts, partages et recommandations sur mon profil LinkedIn.</span>
        <span class="px-5 py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">Voir sur LinkedIn</span>
      </a>`);

    if (window.lucide) window.lucide.createIcons();

    // Flèches de défilement
    const scrollBy = (dir) => {
      const slide = track.querySelector('.linkedin-slide');
      const step = slide ? slide.getBoundingClientRect().width + 24 : 360;
      track.scrollBy({ left: dir * step, behavior: 'smooth' });
    };
    document.querySelectorAll('[data-linkedin-nav]').forEach((btn) => {
      btn.addEventListener('click', () => scrollBy(Number(btn.dataset.linkedinNav)));
    });
  });
})();
