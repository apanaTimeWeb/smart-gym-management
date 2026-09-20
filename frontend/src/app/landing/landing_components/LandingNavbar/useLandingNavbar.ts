// RESPONSIBILITY: Owns Landing navbar scroll state and accessible mobile-drawer lifecycle.
// DATA FLOW: Browser scroll/menu events → useLandingNavbar → LandingNavbar view.
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { LandingNavbarController } from '@/app/landing/landing_types/landing_types';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/** Keeps navbar interaction local so unrelated landing sections never re-render from navigation state. */
export function useLandingNavbar(): LandingNavbarController {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((current) => !current), []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const firstFocusable = menuPanelRef.current ? getFocusableElements(menuPanelRef.current)[0] : undefined;
    window.setTimeout(() => firstFocusable?.focus(), 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [menuOpen]);

  const handleMenuKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== 'Tab' || !menuPanelRef.current) return;
    const focusable = getFocusableElements(menuPanelRef.current);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;

    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }, [closeMenu]);

  return { menuOpen, scrolled, menuPanelRef, closeMenu, toggleMenu, handleMenuKeyDown };
}
