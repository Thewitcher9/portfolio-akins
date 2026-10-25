/**
 * ============================================================================
 * Composant : LogoReveal.tsx
 * ============================================================================
 * 
 * 📁 EMPLACEMENT DES FICHIERS PUBLICS ATTENDUS :
 *  - Logo :  public/logo.svg (ou public/logo.png / chemin personnalisé via la prop `logoSrc`)
 *  - Son  :  public/reveal.mp3 (chemin personnalisé via la prop `soundSrc`)
 * 
 * 💡 FONCTIONNALITÉS :
 *  - Voile plein écran d'accueil (Overlay fixe z-9999, fond #0a0a0a).
 *  - Logo centré responsive (clamp(120px, 25vw, 220px)).
 *  - Animation d'apparition fade-in + scale 0.9 -> 1 au montage.
 *  - Texte d'invitation avec micro-animation pulse ("Cliquez pour découvrir").
 *  - Lecture audio immédiate au clic avec préchargement et fallback silencieux (anti-crash).
 *  - Transition de révélation fluide (translateY -100% avec cubic-bezier(0.77, 0, 0.175, 1)).
 *  - Gestion de l'accessibilité : role="button", tabIndex, aria-label, touches Entrée & Espace.
 *  - Respect de `prefers-reduced-motion` (révélation instantanée sans animation visuelle).
 *  - Démontage complet (unmount) après animation et réactivation propre du scroll.
 * 
 * ============================================================================
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface LogoRevealProps {
  /**
   * Contenu principal du portfolio enveloppé par le composant
   */
  children?: React.ReactNode;
  /**
   * Chemin vers le logo (par défaut : '/logo.svg')
   */
  logoSrc?: string;
  /**
   * Texte alternatif pour l'image du logo
   */
  logoAlt?: string;
  /**
   * Chemin vers l'effet sonore de révélation (par défaut : '/reveal.mp3')
   */
  soundSrc?: string;
  /**
   * Texte d'invite sous le logo
   */
  promptText?: string;
  /**
   * Callback optionnel déclenché lorsque le portfolio est révélé
   */
  onReveal?: () => void;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  children,
  logoSrc = '/logo.svg',
  logoAlt = 'Logo Akins ANRETAR',
  soundSrc = '/reveal.mp3',
  promptText = 'Cliquez pour découvrir',
  onReveal,
}) => {
  // isMounted contrôle l'animation d'apparition initiale du logo
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // isAnimating indique que l'animation de sortie (slide-up) est en cours
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  // isRevealed indique que l'overlay a terminé son animation et doit être retiré du DOM
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Préchargement de l'audio pour éliminer toute latence au clic
  useEffect(() => {
    try {
      const audio = new Audio(soundSrc);
      audio.preload = 'auto';
      // Fallback silencieux si le fichier n'existe pas ou ne peut pas être décodé
      audio.onerror = () => {
        audioRef.current = null;
      };
      audioRef.current = audio;
    } catch {
      audioRef.current = null;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundSrc]);

  // 2. Gestion de l'animation d'apparition et blocage du scroll du body
  useEffect(() => {
    // Activer l'animation d'apparition initiale dès le premier rendu
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    // Verrouiller le scroll tant que l'overlay est visible
    const initialOverflow = document.body.style.overflow;
    if (!isRevealed) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      clearTimeout(mountTimer);
      document.body.style.overflow = initialOverflow;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isRevealed]);

  // 3. Déclenchement de la révélation (clic ou clavier)
  const triggerReveal = useCallback(() => {
    if (isAnimating || isRevealed) return;

    // Déclenchement du son immédiat lors de l'action utilisateur
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Fallback silencieux : pas d'erreur dans la console si l'utilisateur a bloqué l'audio
          });
        }
      } catch {
        // Fallback silencieux anti-crash
      }
    }

    // Détection de prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsRevealed(true);
      document.body.style.overflow = '';
      if (onReveal) onReveal();
      return;
    }

    // Lancement de l'animation de translation
    setIsAnimating(true);

    timerRef.current = setTimeout(() => {
      setIsRevealed(true);
      setIsAnimating(false);
      document.body.style.overflow = '';
      if (onReveal) onReveal();
    }, 800);
  }, [isAnimating, isRevealed, onReveal]);

  // 4. Gestion de l'accessibilité au clavier (Entrée / Espace)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
      event.preventDefault();
      triggerReveal();
    }
  };

  return (
    <>
      {/* Overlay de révélation (démonté dès que isRevealed est true) */}
      {!isRevealed && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Révéler le portfolio"
          onClick={triggerReveal}
          onKeyDown={handleKeyDown}
          className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
            isAnimating ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{
            transitionProperty: 'transform',
            transitionDuration: '800ms',
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            willChange: 'transform',
          }}
        >
          {/* Conteneur Logo + Texte avec micro-animations */}
          <div
            className={`flex flex-col items-center justify-center gap-6 px-6 transition-all duration-700 ease-out ${
              !isMounted
                ? 'opacity-0 scale-90 translate-y-2'
                : isAnimating
                ? 'opacity-0 scale-90 -translate-y-4'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            {/* Logo adaptatif centré */}
            <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="w-[clamp(120px,25vw,220px)] h-auto object-contain filter invert contrast-125 drop-shadow-[0_10px_20px_rgba(255,255,255,0.08)]"
                loading="eager"
              />
            </div>

            {/* Texte d'invite avec pulsation subtile */}
            <p className="text-white/60 text-xs sm:text-sm uppercase tracking-widest font-mono animate-pulse pointer-events-none text-center">
              {promptText}
            </p>
          </div>
        </div>
      )}

      {/* Contenu du portfolio (toujours rendu, interactif dès la fin de l'overlay) */}
      <div
        className={`w-full transition-opacity duration-500 ${
          isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-100 pointer-events-none'
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default LogoReveal;
