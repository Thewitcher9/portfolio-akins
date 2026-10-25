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
 *  - Voile d'accueil épuré style Apple (Overlay fixe z-9999, fond blanc minimaliste #FBFBFD).
 *  - Logo centré responsive (clamp(110px, 20vw, 170px)).
 *  - Animation d'apparition fade-in + scale 0.95 -> 1 au montage.
 *  - Typographie moderne et humaine ("Cliquer pour découvrir" avec point de pulsation).
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
  promptText = 'Cliquer pour découvrir',
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
          className={`fixed inset-0 z-[9999] bg-[#FBFBFD] flex flex-col items-center justify-center cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-black/10 ${
            isAnimating ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{
            transitionProperty: 'transform',
            transitionDuration: '800ms',
            transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
            willChange: 'transform',
          }}
        >
          {/* Halot subtil d'ambiance Apple */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0.015),transparent_70%)] pointer-events-none" />

          {/* Conteneur Logo + Texte */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center gap-7 px-6 transition-all duration-700 ease-out ${
              !isMounted
                ? 'opacity-0 scale-95 translate-y-2'
                : isAnimating
                ? 'opacity-0 scale-95 -translate-y-4'
                : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            {/* Logo centré dans une carte épurée Apple */}
            <div className="relative flex items-center justify-center p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
              <img
                src={logoSrc}
                alt={logoAlt}
                className="w-[clamp(110px,20vw,170px)] h-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                loading="eager"
              />
            </div>

            {/* Texte d'invite épuré, typographie moderne Apple (sans monospace ni effet robot) */}
            <div className="flex items-center gap-2.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
              <p className="text-xs sm:text-[13px] font-medium tracking-normal text-neutral-500 font-sans">
                {promptText}
              </p>
            </div>
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
