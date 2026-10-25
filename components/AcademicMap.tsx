/**
 * ============================================================================
 * Composant : AcademicMap.tsx
 * ============================================================================
 * 
 * 🗺️ CARTE INTERACTIVE DU PARCOURS ACADÉMIQUE EN ÎLE-DE-FRANCE
 * 
 * Établissements & Adresses géocodées :
 *  1. Master Management Stratégique & Changement (ISM-IAE / UVSQ)
 *     -> 47 Boulevard Vauban, 78047 Guyancourt cedex [48.780466, 2.044312]
 *  2. BUT Gestion des Entreprises & Administrations (IUT Meaux / Univ. Gustave Eiffel)
 *     -> 17 Rue Jablinot, 77100 Meaux [48.954686, 2.878153]
 *  3. Lycée Évariste Galois (Baccalauréat STMG - Mention Très Bien)
 *     -> 32 Av. Montaigne, 93160 Noisy-le-Grand [48.844976, 2.538934]
 * 
 * 🛠️ CONTEXTE TECHNIQUE & INTÉGRATION NEXT.JS (APP ROUTER) :
 *  - 'use client' activé.
 *  - Leaflet nécessite l'accès à l'objet `window`.
 *  - Dans votre page parente (ex: app/page.tsx ou components/Parcours.tsx) :
 *    ```tsx
 *    import dynamic from 'next/dynamic';
 *    const AcademicMap = dynamic(() => import('@/components/AcademicMap'), {
 *      ssr: false,
 *      loading: () => (
 *        <div className="h-[480px] w-full rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-xs text-gray-400">
 *          Chargement de la carte interactive...
 *        </div>
 *      )
 *    });
 *    ```
 * 
 * 💡 FONCTIONNALITÉS :
 *  - Tuiles modernes et épurées (CartoDB Positron style Apple clair).
 *  - Marqueurs personnalisés DivIcon HTML (évite les bugs d'icônes Leaflet par défaut de Webpack/Next.js).
 *  - Tracé chronologique en ligne brisée reliant les étapes d'études.
 *  - Barre latérale / onglets interactifs pour voler (flyTo) vers chaque étape.
 * ============================================================================
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Interface des étapes académiques
export interface AcademicStep {
  id: string;
  order: number;
  degree: string;
  level: string;
  badgeColor: string;
  institution: string;
  program: string;
  address: string;
  city: string;
  department: string;
  period: string;
  coords: [number, number]; // [lat, lng]
  description: string;
}

// Données du parcours d'Akins ANRETAR
export const ACADEMIC_STEPS: AcademicStep[] = [
  {
    id: 'master',
    order: 3,
    degree: 'Master Management Stratégique & Changement',
    level: 'Bac +5',
    badgeColor: 'bg-black text-white',
    institution: 'ISM-IAE · Université Paris-Saclay (UVSQ)',
    program: 'Diagnostic stratégique, conduite du changement & IA',
    address: '47 Boulevard Vauban',
    city: 'Guyancourt cedex',
    department: 'Yvelines (78)',
    period: '2025 – 2027',
    coords: [48.780466, 2.044312],
    description: 'Formation d’excellence au sein de la 1ère université de France (Paris-Saclay).',
  },
  {
    id: 'but-gea',
    order: 2,
    degree: 'BUT Gestion des Entreprises & Administrations',
    level: 'Bac +3',
    badgeColor: 'bg-sky-600 text-white',
    institution: 'Université Gustave Eiffel (IUT)',
    program: 'Parcours GEMA · Gestion, Entrepreneuriat & Management',
    address: '17 Rue Jablinot',
    city: 'Meaux',
    department: 'Seine-et-Marne (77)',
    period: '2022 – 2025',
    coords: [48.954686, 2.878153],
    description: 'Diplôme National conférant le Grade de Licence, gestion budgétaire & pilotage.',
  },
  {
    id: 'bac-stmg',
    order: 1,
    degree: 'Baccalauréat STMG (Gestion & Finance)',
    level: 'Mention Très Bien',
    badgeColor: 'bg-emerald-600 text-white',
    institution: 'Lycée Évariste Galois',
    program: 'Spécialité Gestion et Finance',
    address: '32 Av. Montaigne',
    city: 'Noisy-le-Grand',
    department: 'Seine-Saint-Denis (93)',
    period: '2022',
    coords: [48.844976, 2.538934],
    description: 'Mis à l’honneur lors de la cérémonie officielle des bacheliers noiséens.',
  },
];

// Contrôleur de centrage de carte avec transition fluide
function MapFlyController({
  activeCoords,
  zoom = 13,
}: {
  activeCoords: [number, number] | null;
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (activeCoords) {
      map.flyTo(activeCoords, zoom, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [activeCoords, zoom, map]);

  return null;
}

// Générateur de DivIcon HTML moderne et responsive
function createModernPinIcon(stepNumber: number, isSelected: boolean) {
  const bgColor = isSelected ? '#111215' : '#1e293b';
  const ringColor = isSelected ? '#38bdf8' : '#94a3b8';

  const html = `
    <div style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
      ${
        isSelected
          ? `<span style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${ringColor}; opacity: 0.35; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>`
          : ''
      }
      <div style="position: relative; width: 34px; height: 34px; border-radius: 9999px; background-color: ${bgColor}; border: 2.5px solid #ffffff; box-shadow: 0 4px 14px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 800; font-family: system-ui, sans-serif; font-size: 13px;">
        ${stepNumber}
      </div>
      <div style="position: absolute; bottom: -5px; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 6px solid ${bgColor};"></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-academic-pin',
    html,
    iconSize: [38, 42],
    iconAnchor: [19, 40],
    popupAnchor: [0, -38],
  });
}

export interface AcademicMapProps {
  className?: string;
}

export const AcademicMap: React.FC<AcademicMapProps> = ({ className = '' }) => {
  const [selectedId, setSelectedId] = useState<string>('master');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Coordonnées du tracé chronologique (Lycée -> BUT -> Master)
  const trajectoryCoordinates = useMemo<[number, number][]>(() => {
    return [
      ACADEMIC_STEPS[2].coords, // Noisy-le-Grand (Bac)
      ACADEMIC_STEPS[1].coords, // Meaux (BUT)
      ACADEMIC_STEPS[0].coords, // Guyancourt (Master)
    ];
  }, []);

  const selectedStep = useMemo(() => {
    return ACADEMIC_STEPS.find((s) => s.id === selectedId) || ACADEMIC_STEPS[0];
  }, [selectedId]);

  if (!isClient) {
    return (
      <div className="w-full h-[520px] rounded-3xl bg-neutral-100 flex flex-col items-center justify-center p-6 text-center animate-pulse border border-gray-200">
        <div className="w-10 h-10 rounded-full border-2 border-black border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-mono">
          Chargement de la carte interactive d'Île-de-France...
        </p>
      </div>
    );
  }

  // Centre d'Île-de-France pour vue d'ensemble
  const defaultCenter: [number, number] = [48.865, 2.46];

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-xl ${className}`}
    >
      {/* En-tête moderne Apple style */}
      <div className="p-5 sm:p-6 border-b border-gray-200/80 bg-gradient-to-b from-white to-[#FBFBFD] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Mobilité & Territoire
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#111215] font-sans tracking-tight">
            Trajectoire Académique en Île-de-France
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            De Noisy-le-Grand à Meaux puis Paris-Saclay · Cliquez sur une étape pour zoomer
          </p>
        </div>

        {/* Bouton Réinitialiser la vue */}
        <button
          type="button"
          onClick={() => setSelectedId('all')}
          className="self-start md:self-auto px-3.5 py-1.5 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-700 hover:text-black bg-white transition shadow-sm"
        >
          Vue panoramique ⤢
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Panneau de sélection des étapes (Gauche) */}
        <div className="lg:col-span-4 p-4 sm:p-5 bg-[#FBFBFD] border-b lg:border-b-0 lg:border-r border-gray-200/80 space-y-3 flex flex-col justify-center">
          {ACADEMIC_STEPS.map((step) => {
            const isActive = selectedId === step.id;
            return (
              <div
                key={step.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedId(step.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedId(step.id);
                  }
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left cursor-pointer transition-all duration-300 outline-none ${
                  isActive
                    ? 'bg-white border-black shadow-md ring-1 ring-black/5 translate-x-1'
                    : 'bg-white/80 border-gray-200 hover:bg-white hover:border-gray-400 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center font-mono">
                      {step.order}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${step.badgeColor}`}>
                      {step.level}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 font-mono">
                    {step.period}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-black font-sans leading-snug">
                  {step.degree}
                </h4>

                <p className="text-[11px] font-medium text-gray-600 mt-1">
                  {step.institution}
                </p>

                <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1.5 pt-1.5 border-t border-gray-100">
                  <svg className="w-3 h-3 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{step.address}, {step.city} ({step.department})</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conteneur Carte Leaflet (Droite) */}
        <div className="lg:col-span-8 h-[380px] sm:h-[460px] lg:h-auto relative z-0">
          <MapContainer
            center={selectedStep.coords}
            zoom={selectedId === 'all' ? 10 : 12}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            style={{ height: '100%', width: '100%' }}
          >
            {/* Contrôleur de déplacement fluide */}
            <MapFlyController
              activeCoords={selectedId === 'all' ? defaultCenter : selectedStep.coords}
              zoom={selectedId === 'all' ? 10 : 13}
            />

            {/* Tuiles cartographiques CartoDB Positron (Style Apple Clean & Light) */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />

            {/* Trajectoire chronologique en ligne brisée */}
            <Polyline
              positions={trajectoryCoordinates}
              pathOptions={{
                color: '#111215',
                weight: 3,
                dashArray: '6, 8',
                opacity: 0.65,
              }}
            />

            {/* Marqueurs pour chaque étape */}
            {ACADEMIC_STEPS.map((step) => {
              const isSelected = selectedId === step.id;
              const icon = createModernPinIcon(step.order, isSelected);

              return (
                <Marker
                  key={step.id}
                  position={step.coords}
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedId(step.id),
                  }}
                >
                  <Popup className="academic-custom-popup">
                    <div className="p-2 min-w-[210px] space-y-1.5 font-sans">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${step.badgeColor}`}>
                          {step.level}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400 font-bold">
                          {step.period}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 leading-snug">
                        {step.degree}
                      </h4>

                      <p className="text-[11px] font-semibold text-gray-700">
                        {step.institution}
                      </p>

                      <p className="text-[10px] text-gray-500 leading-tight">
                        📍 {step.address}, {step.city}
                      </p>

                      <p className="text-[10px] text-gray-600 italic pt-1 border-t border-gray-100">
                        {step.description}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default AcademicMap;
