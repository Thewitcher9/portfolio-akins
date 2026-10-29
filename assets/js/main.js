/**
 * PORTFOLIO AKINS ANRETAR - JAVASCRIPT LOGIC
 * Thème inspiré d'Apple
 * Visuel optionnel par projet via le champ `image` (aucun bloc affiché si absent)
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
    image: "assets/images/LogoOptimService.jpg",
    title: "Chatbot IA, PowerApps & Séminaire National",
    role: "Assistant Chef de Projets (CSP Déplacements Professionnels)",
    company: "SNCF Optim'Services",
    period: "Sept. 2024 – Sept. 2025 (1 an 1 mois)",
    contract: "Alternance (BUT GEA)",
    location: "Saint-Denis (93) · Sur site",
    sector: "Centre de Services Partagés · Groupe SNCF",
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
    image: "assets/images/conseil_regional_idf.jpg",
    title: "Instruction de Dossiers & JOP Paris 2024",
    role: "Stagiaire au Service des Sports",
    company: "Région Île-de-France (Conseil Régional)",
    period: "Mars – Juil. 2024 (5 mois)",
    contract: "Stage de BUT",
    location: "Saint-Ouen (93) · Siège de Région",
    sector: "Politiques Publiques Territoriales & Écosystème Olympique",
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
    image: "assets/images/LogoAgorexExpertise.jpg",
    title: "Gestion Financière, Rapprochements & Bilan",
    role: "Stagiaire Comptable & Gestion Financière",
    company: "Agorex Expertise",
    period: "Avril – Mai 2023",
    contract: "Stage de BUT",
    location: "Île-de-France",
    sector: "Expertise Comptable, Fiscalité & Audit PME",
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

// Open Project Modal (STAR Breakdown)
window.openProjectModal = function (projectId) {
  const proj = projectsData.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("project-modal-content");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="max-h-[85vh] overflow-y-auto">
      <!-- En-tête -->
      <div class="px-6 sm:px-10 pt-10 pb-8">
        <div class="meta-row pr-10"><span>${proj.company}</span><span>${proj.period}</span></div>
        <h2 class="title-3 mb-2 pr-10">${proj.title}</h2>
        <p class="body-sm">${proj.role} · ${proj.contract} · ${proj.location}</p>
      </div>

      ${proj.image ? `
      <div class="mx-6 sm:mx-10 mb-8 h-40 rounded-[18px] bg-[#F5F5F7] flex items-center justify-center p-6">
        <img src="${proj.image}" alt="${proj.company}" class="max-w-full max-h-full object-contain">
      </div>` : ""}

      <div class="px-6 sm:px-10 pb-10 space-y-8">
        <p class="lead">${proj.summary}</p>

        <!-- Méthode STAR -->
        <div class="space-y-6">
          <div class="flex gap-4">
            <span class="star-tag shrink-0">S</span>
            <div>
              <h4 class="text-[17px] font-semibold mb-1">Situation</h4>
              <p class="body-sm" style="font-size:17px">${proj.star.situation}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <span class="star-tag shrink-0">T</span>
            <div>
              <h4 class="text-[17px] font-semibold mb-1">Tâche</h4>
              <p class="body-sm" style="font-size:17px">${proj.star.tache}</p>
            </div>
          </div>

          <div class="flex gap-4">
            <span class="star-tag shrink-0">A</span>
            <div class="min-w-0">
              <h4 class="text-[17px] font-semibold mb-1">Actions</h4>
              <ul class="list-plain">
                ${proj.star.action.map(act => `<li class="!text-[15px] !py-2.5" style="color:var(--text-2)">${act}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="flex gap-4">
            <span class="star-tag shrink-0" style="background:var(--blue);color:#fff">R</span>
            <div class="min-w-0">
              <h4 class="text-[17px] font-semibold mb-1">Résultats</h4>
              <ul class="list-plain">
                ${proj.star.resultats.map(res => `<li class="!text-[15px] !py-2.5">${res}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <!-- Livrables -->
        <div class="rounded-[18px] bg-[#F5F5F7] p-6">
          <h4 class="text-[17px] font-semibold mb-2">Livrables</h4>
          <ul class="list-plain">
            ${proj.deliverables.map(d => `<li class="!text-[15px] !py-2.5 !border-[#E8E8ED]">${d}</li>`).join("")}
          </ul>
        </div>

        <!-- Compétences -->
        <div>
          <h4 class="text-[17px] font-semibold mb-3">Compétences mobilisées</h4>
          <div class="flex flex-wrap gap-2">
            ${proj.skills.map(s => `<span class="chip">${s}</span>`).join("")}
          </div>
        </div>
      </div>

      <!-- Pied -->
      <div class="px-6 sm:px-10 py-5 border-t border-[#E8E8ED] flex items-center justify-end flex-wrap gap-3">
        <button onclick="closeProjectModal()" class="btn btn-secondary btn-sm !min-h-[36px] !text-[14px]">Fermer</button>
        <a href="mailto:akins.anretar@yahoo.com?subject=${encodeURIComponent("Contact suite à votre portfolio - " + proj.title)}" class="btn btn-primary btn-sm !min-h-[36px] !text-[14px]">Échanger sur ce projet</a>
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

window.closeProjectModal = function () {
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
    toast.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1D1D1F]/90 backdrop-blur text-white text-sm shadow-xl flex items-center gap-2 transition-all duration-300 translate-y-10 opacity-0 pointer-events-none";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-[#30D158]"></i> ${msg}`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove("translate-y-10", "opacity-0", "pointer-events-none");
  setTimeout(() => {
    toast.classList.add("translate-y-10", "opacity-0", "pointer-events-none");
  }, 3000);
}

// ✏️ Adapte les titres et chemins à tes fichiers
const MASTER_DOCS = [
  { titre: "Relevé de notes Master 1", fichier: "assets/docs/Relevé_des_Notes_AKINS_ANRETAR_M1.pdf", desc : "Résultats académiques 2025/2026" },
  { titre: "Plaquette formation Modules Master 1", fichier: "assets/docs/Plaquette_Formation_Modules_Master1.pdf", desc : "Programme et modules M1" }
];

document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);
  const card = $('master-card'), modal = $('docs-modal'), list = $('docs-list'),
    frame = $('docs-frame'), empty = $('docs-empty'), link = $('docs-open'), closeBtn = $('docs-close');

  if (!card || !modal || !list) {
    console.error('Éléments manquants :', { card, modal, list });
    return;
  }

  const base = 'w-full text-left p-3 rounded-[14px] border text-sm transition ';
  const off = 'border-[#E8E8ED] bg-white hover:border-[#0071E3]', on = 'border-[#0071E3] bg-[#0071E3] text-white';

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
