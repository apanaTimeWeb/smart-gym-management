'use client';
// RESPONSIBILITY: Provides keyboard focus management for a single open Superadmin dialog.
// DATA FLOW: dialog open state → useSuperadminDialogAccessibility → focus trap/restore → dialog UI.
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

const SUPERADMIN_FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Traps keyboard focus inside one dialog and restores focus to the element that opened it. */
export function useSuperadminDialogAccessibility<T extends HTMLElement = HTMLDivElement>(
  isOpen: boolean,
  onEscape?: () => void,
): RefObject<T | null> {
  const dialogRef = useRef<T | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    // EFFECT PURPOSE: Enter the dialog on open, contain Tab focus while open, and restore the opener on cleanup.
    // EFFECT DEPENDENCIES: isOpen is sufficient because the DOM ref and event handler are recreated for each open lifecycle.
    if (!isOpen || !dialogRef.current) return;

    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(SUPERADMIN_FOCUSABLE_SELECTOR));
    const firstFocusable = focusable[0] ?? dialog;
    firstFocusable.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key === 'Tab') {
        const currentFocusable = Array.from(dialog.querySelectorAll<HTMLElement>(SUPERADMIN_FOCUSABLE_SELECTOR));
        if (currentFocusable.length === 0) {
          event.preventDefault();
          dialog.focus();
          return;
        }
        const first = currentFocusable[0];
        const last = currentFocusable[currentFocusable.length - 1];
        if (!first || !last) return;
        
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return dialogRef;
}
