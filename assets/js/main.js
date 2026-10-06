/**
 * PORTFOLIO AKINS ANRETAR - JAVASCRIPT LOGIC
 * Style Matthew Editorial Brutalist Luxe
 * Sans photos forcées, avec emplacements réservés pour personnalisation
 */

const projectsData = [
  {
    id: "ouigo",
    title: "Pilotage du Projet d'Assistant Virtuel IA",
    role: "Chargé de la Relation Client & Chef de Projet IA",
    company: "OUIGO (SNCF Voyageurs)",
    period: "Sept. 2025 – Aujourd'hui",
    contract: "Alternance (Master)",
    location: "Saint-Denis (93) · Sur site",
    sector: "Transport Ferroviaire Grande Vitesse & Low-cost",
    placeholderLabel: "Capture d'écran de l'Assistant Virtuel IA / Parcours Selfcare Voyageur",
    placeholderFormat: "16:9 ou 4:3 (ex: ouigo_ia_assistant.png)",
    summary: "Pilotage stratégique et opérationnel du projet d'Assistant Virtuel IA conversationnel pour moderniser le parcours voyageur et optimiser le selfcare à grande échelle.",
    star: {
      situation: "Chez OUIGO (des millions de billets vendus chaque année), le service relation client fait face à de très forts volumes de requêtes à faible valeur ajoutée (recherches d'horaires, règles bagages, billets, perturbations).",
      tache: "Cadrer, piloter et optimiser le déploiement continu d'un Assistant Virtuel (Chatbot IA) pour apporter des réponses immédiates 24/7, fluidifier le parcours voyageur et accroître le taux de selfcare.",
      action: [
        "Cadrage fonctionnel et formalisation des cas d'usage clients prioritaires.",
        "Collaboration étroite avec les équipes produit et tech pour l'entraînement et l'optimisation des flux conversationnels.",
        "Animation de la boucle d'amélioration continue basée sur les feedbacks réels et l'analyse de verbatims voyageurs.",
        "Suivi rigoureux des indicateurs clés (taux de résolution au premier contact, satisfaction CSAT, taux de transfert aux conseillers humains)."
      ],
      resultats: [
        "Amélioration sensible de la fluidité du parcours client digital en avant et après-vente.",
        "Disponibilité immédiate de l'assistance 24h/24 sans engorgement des canaux humains.",
        "Recentrage du temps des conseillers sur les dossiers sensibles à forte valeur émotionnelle."
      ]
    },
    deliverables: [
      "Arborescence & Scénarios conversationnels de l'Assistant Virtuel",
      "Tableau de bord de suivi des KPIs de selfcare et satisfaction",
      "Recommandations ergonomiques et parcours client"
    ],
    skills: ["Gestion de Projet IA", "Relation Client Digitale", "Méthode Agile", "Design Conversationnel", "Analyse de la Donnée Voyageur"]
  },
  {
    id: "sncf-optim",
    title: "Chatbot IA, PowerApps & Séminaire National",
    role: "Assistant Chef de Projets (CSP Déplacements Professionnels)",
    company: "SNCF Optim'Services",
    period: "Sept. 2024 – Sept. 2025 (1 an 1 mois)",
    contract: "Alternance (BUT GEA)",
    location: "Saint-Denis (93) · Sur site",
    sector: "Centre de Services Partagés · Groupe SNCF",
    placeholderLabel: "Photos de votre intervention sur scène lors du Séminaire National des Assistantes de Direction",
    placeholderFormat: "16:9 paysage (ex: seminaire_sncf_scene.jpg)",
    summary: "Supervision du projet ChatBot IA, refonte du portail SharePoint, kits d'adoption pour la suite PowerApps et organisation clé en main d'un séminaire d'envergure nationale pour les assistants de direction.",
    star: {
      situation: "Le CSP Déplacements gère 3 pôles vitaux (déplacements internationaux, titres tiers, parc automobile) pour des dizaines de milliers d'agents du Groupe SNCF, avec un fort besoin de digitalisation.",
      tache: "Superviser le projet Chatbot IA interne, moderniser les outils collaboratifs, concevoir les plans d'accompagnement au changement et fédérer l'ensemble de la filière d'assistance de direction.",
      action: [
        "Supervision du Chatbot IA : cadrage, tests, déploiement et accompagnement des équipes aux bonnes pratiques d'adoption.",
        "Refonte ergonomique du portail SharePoint CSP pour simplifier le parcours des agents du Groupe.",
        "Conception de plans de communication, supports visuels et tutoriels pas-à-pas pour le lancement de plusieurs solutions Microsoft PowerApps.",
        "Animation d'ateliers numériques immersifs pour les collaborateurs du CSP.",
        "Organisation complète et animation sur scène d'un séminaire national rassemblant les assistantes et assistants de direction du Groupe SNCF."
      ],
      resultats: [
        "Adoption réussie du Chatbot IA avec réduction des sollicitations de premier niveau.",
        "Montée en autonomie des équipes sur la suite PowerApps grâce aux tutoriels dédiés.",
        "Plébiscite du séminaire national et valorisation forte du CSP."
      ]
    },
    deliverables: [
      "Guide des bonnes pratiques et kit d'adoption ChatBot IA",
      "Nouveau portail SharePoint CSP Déplacements Professionnels",
      "Tutoriels vidéos et infographies pédagogiques PowerApps",
      "Scénographie, conducteur et animation du Séminaire National"
    ],
    skills: ["Supervision de Projet IA", "Microsoft PowerApps & SharePoint", "Conduite du Changement", "Organisation Événementielle", "Prise de parole en public"]
  },
  {
    id: "region-idf",
    title: "Instruction de Dossiers & JOP Paris 2024",
    role: "Stagiaire au Service des Sports",
    company: "Région Île-de-France (Conseil Régional)",
    period: "Mars – Juil. 2024 (5 mois)",
    contract: "Stage de BUT",
    location: "Saint-Ouen (93) · Siège de Région",
    sector: "Politiques Publiques Territoriales & Écosystème Olympique",
    placeholderLabel: "Visuel officiel Paris 2024 / Logo Conseil Régional Île-de-France",
    placeholderFormat: "16:9 paysage (ex: paris2024_region_idf.jpg)",
    summary: "Instruction des dossiers de subventions sportives du Conseil Régional, interface avec les mairies franciliennes, coordination de la Semaine Olympique et Paralympique et relations athlètes de haut niveau.",
    star: {
      situation: "À l'approche des Jeux Olympiques et Paralympiques de Paris 2024, la Région Île-de-France gérait des enjeux majeurs de mobilisation territoriale et de rayonnement sportif.",
      tache: "Instruire avec rigueur les dossiers de délibération soumis aux élus, coordonner les parties prenantes institutionnelles et participer aux temps forts régionaux de l'olympisme.",
      action: [
        "Instruction technique et financière des dossiers de subvention présentés au Conseil Régional.",
        "Interface quotidienne avec les cabinets de maires et directions des sports des communes franciliennes.",
        "Participation active au pilotage de la Semaine Olympique et Paralympique (SOP).",
        "Gestion logistique et protocolaire des échanges avec les athlètes de haut niveau soutenus par la Région."
      ],
      resultats: [
        "Traitement fluide et sécurisé des dossiers dans le respect strict des calendriers administratifs.",
        "Renforcement des liens de proximité avec les collectivités franciliennes.",
        "Contribution active à la dynamique populaire des Jeux de Paris 2024."
      ]
    },
    deliverables: [
      "Fiches de synthèse et notes d'arbitrage pour les commissions régionales",
      "Reporting du suivi des projets sportifs territoriaux",
      "Coordination terrain des délégations et athlètes"
    ],
    skills: ["Gouvernance Publique", "Instruction Budgétaire & Administrative", "Relations Institutionnelles", "Coordination d'Événements", "Écosystème Sportif"]
  },
  {
    id: "agorex",
    title: "Gestion Financière, Rapprochements & Bilan",
    role: "Stagiaire Comptable & Gestion Financière",
    company: "Agorex Expertise",
    period: "Avril – Mai 2023",
    contract: "Stage de BUT",
    location: "Île-de-France",
    sector: "Expertise Comptable, Fiscalité & Audit PME",
    placeholderLabel: "Visuel gestion comptable / Tableau de bord budgétaire ou attestation",
    placeholderFormat: "16:9 paysage (ex: agorex_comptabilite.jpg)",
    summary: "Tenue comptable, révision, analyse de la cohérence financière et participation aux travaux préparatoires de bilans d'entreprises.",
    star: {
      situation: "Au sein d'un cabinet d'expertise comptable, la rigueur absolue dans le traitement des flux et des comptes annuels est indispensable pour la conformité et le pilotage des dirigeants.",
      tache: "Assurer la tenue des dossiers clients, effectuer les contrôles de conformité et sécuriser la préparation des bilans.",
      action: [
        "Saisie comptable, lettrage des comptes et rapprochements bancaires exhaustifs.",
        "Vérification des pièces comptables et conformité avec les réglementations fiscales.",
        "Analyse des écarts de trésorerie et reporting financier.",
        "Participation aux écritures d'inventaire de clôture."
      ],
      resultats: [
        "Mise à jour irréprochable des dossiers clients dans le respect des échéances légales.",
        "Acquisition d'une solide culture financière indispensable pour le pilotage de budgets projets et du ROI."
      ]
    },
    deliverables: [
      "États de rapprochements bancaires certifiés",
      "Dossiers de révision préparatoires aux bilans",
      "Tableaux d'analyse de trésorerie"
    ],
    skills: ["Comptabilité Générale", "Analyse Financière", "Rapprochements Bancaires", "Rigueur Analytique", "Contrôle Budgétaire"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  setupModalListeners();
  setupCopyEmail();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

// Open Project Modal (STAR Breakdown with custom placeholder)
window.openProjectModal = function(projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-content");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <!-- Modal Header -->
    <div class="p-6 sm:p-8 border-b border-gray-200 bg-white">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-black text-white">${proj.period}</span>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">${proj.contract}</span>
        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">${proj.location}</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 font-display tracking-tight">${proj.title}</h2>
      <p class="text-gray-700 font-semibold text-base">${proj.role} · <span class="text-gray-900">${proj.company}</span></p>
      <p class="text-gray-400 text-xs mt-1 font-mono">${proj.sector}</p>
    </div>

    <!-- Modal Content -->
    <div class="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto bg-gray-50">
      
      <!-- Photo Placeholder in Modal -->
      <div class="photo-placeholder py-8 bg-white border border-dashed border-gray-300 rounded-2xl">
        <i data-lucide="image-plus" class="w-8 h-8 text-gray-400 mb-2"></i>
        <span class="text-xs font-bold uppercase tracking-wider text-gray-800">Emplacement Visuel / Photo</span>
        <p class="text-xs text-gray-500 mt-1 max-w-md">${proj.placeholderLabel}</p>
        <span class="text-[10px] font-mono text-gray-400 mt-1">Format recommandé : ${proj.placeholderFormat}</span>
      </div>

      <!-- Summary Box -->
      <div class="p-4 rounded-xl bg-white border border-gray-200">
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Résumé de la mission</h4>
        <p class="text-sm text-gray-800 leading-relaxed">${proj.summary}</p>
      </div>

      <!-- STAR Detailed Framework -->
      <div class="space-y-4">
        <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">DÉCOMPOSITION MÉTHODE STAR</h4>

        <!-- Situation -->
        <div class="p-4 rounded-xl bg-white border border-gray-200">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="star-tag bg-gray-100 text-gray-900 font-mono">S</span>
            <h5 class="text-sm font-bold text-gray-900">Situation & Contexte</h5>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed">${proj.star.situation}</p>
        </div>

        <!-- Tâche -->
        <div class="p-4 rounded-xl bg-white border border-gray-200">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="star-tag bg-gray-100 text-gray-900 font-mono">T</span>
            <h5 class="text-sm font-bold text-gray-900">Tâche & Enjeu Prioritaire</h5>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed">${proj.star.tache}</p>
        </div>

        <!-- Actions -->
        <div class="p-4 rounded-xl bg-white border border-gray-200">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="star-tag bg-gray-100 text-gray-900 font-mono">A</span>
            <h5 class="text-sm font-bold text-gray-900">Actions Clés Conduites</h5>
          </div>
          <ul class="space-y-2 mt-2">
            ${proj.star.action.map(act => `
              <li class="flex items-start gap-2 text-sm text-gray-700">
                <i data-lucide="check" class="w-4 h-4 text-black shrink-0 mt-0.5"></i>
                <span>${act}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Résultats -->
        <div class="p-4 rounded-xl bg-gray-900 text-white border border-gray-800">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="star-tag bg-white text-gray-900 font-mono font-bold">R</span>
            <h5 class="text-sm font-bold text-white">Résultats & Impact Mesurable</h5>
          </div>
          <ul class="space-y-2 mt-2">
            ${proj.star.resultats.map(res => `
              <li class="flex items-start gap-2 text-sm text-gray-200">
                <i data-lucide="trending-up" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span>${res}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      </div>

      <!-- Livrables Majeurs -->
      <div>
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">LIVRABLES MAJEURS</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${proj.deliverables.map(d => `
            <div class="p-2.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-800 flex items-center gap-2">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-gray-400 shrink-0"></i>
              <span>${d}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Skills Used -->
      <div>
        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-mono">COMPÉTENCES MOBILISÉES</h4>
        <div class="flex flex-wrap gap-1.5">
          ${proj.skills.map(s => `
            <span class="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
              ${s}
            </span>
          `).join("")}
        </div>
      </div>

    </div>

    <!-- Modal Footer -->
    <div class="p-4 sm:p-5 border-t border-gray-200 bg-white flex items-center justify-between flex-wrap gap-2">
      <span class="text-xs text-gray-500 font-mono italic">« Toute victoire s’élabore »</span>
      <div class="flex gap-2">
        <a href="mailto:akins.anretar@yahoo.com?subject=Contact suite à votre portfolio - ${encodeURIComponent(proj.title)}" class="px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-gray-800 transition flex items-center gap-1.5">
          <i data-lucide="mail" class="w-3.5 h-3.5"></i>
          <span>Échanger sur ce projet</span>
        </a>
        <button onclick="closeProjectModal()" class="px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition">
          Fermer
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";

  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeProjectModal = function() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
};

function setupModalListeners() {
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
    }
  });
}

function setupCopyEmail() {
  const copyBtn = document.getElementById("btn-copy-email");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = "akins.anretar@yahoo.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email copié : " + email);
    }).catch(() => {
      showToast("Email : " + email);
    });
  });
}

function showToast(msg) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-black text-white text-xs font-semibold shadow-2xl flex items-center gap-2 transform transition-all duration-300 translate-y-10 opacity-0 pointer-events-none";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> ${msg}`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove("translate-y-10", "opacity-0", "pointer-events-none");
  setTimeout(() => {
    toast.classList.add("translate-y-10", "opacity-0", "pointer-events-none");
  }, 3000);
}

// ✏️ Adapte les titres et chemins à tes fichiers
const MASTER_DOCS = [
  { titre: "Relevé de notes Master 1", fichier: "assets/docs/Relevé_des_Notes_AKINS_ANRETAR_M1.pdf" },
{ titre: "Plaquette formation Modules Master 1", fichier: "assets/docs/Plaquette_Formation_Modules_Master1.pdf" },
];

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const card = $('master-card'), modal = $('docs-modal'), list = $('docs-list'),
        frame = $('docs-frame'), empty = $('docs-empty'), link = $('docs-open'), closeBtn = $('docs-close');

  if (!card || !modal || !list) {
    console.error('Éléments manquants :', { card, modal, list });
    return;
  }

  const base = 'w-full text-left p-3 rounded-xl border text-sm transition ';
  const off = 'border-gray-200 bg-white hover:border-black', on = 'border-black bg-black text-white';

  MASTER_DOCS.forEach((d, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button" data-i="${i}" class="${base + off}">
      <span class="block font-semibold">${d.titre}</span>
      <span class="block text-[11px] opacity-70">${d.desc}</span></button>`;
    list.appendChild(li);
  });

  const open = () => { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
  const close = () => {
    modal.style.display = 'none'; document.body.style.overflow = '';
    frame.src = 'about:blank'; frame.style.display = 'none'; link.style.display = 'none'; empty.style.display = 'block';
    list.querySelectorAll('button').forEach(b => b.className = base + off);
  };

  card.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  list.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = MASTER_DOCS[+b.dataset.i];
    list.querySelectorAll('button').forEach(x => x.className = base + (x === b ? on : off));
    empty.style.display = 'none'; frame.style.display = 'block'; link.style.display = 'block';
    frame.src = link.href = d.fichier;
  });
});