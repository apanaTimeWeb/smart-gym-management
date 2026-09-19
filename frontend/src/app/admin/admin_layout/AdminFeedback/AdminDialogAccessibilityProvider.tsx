"use client";
// RESPONSIBILITY: Provides consistent keyboard/focus behavior for Admin dialogs and drawers without owning any feature business logic.

import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getDialog(): HTMLElement | null {
  const dialogs = Array.from(document.querySelectorAll<HTMLElement>('[data-admin-dialog="true"]'));
  return dialogs.at(-1) ?? null;
}

function getFocusable(dialog: HTMLElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}

function closeDialog(dialog: HTMLElement): void {
  const closeControl = Array.from(dialog.querySelectorAll<HTMLButtonElement>('button')).find((button) => {
    const label = `${button.getAttribute('aria-label') ?? ''} ${button.textContent ?? ''}`.toLowerCase();
    return label.includes('close') || label.includes('cancel');
  });
  closeControl?.click();
}

export default function AdminDialogAccessibilityProvider() {
  useEffect(() => {
    const previousFocusStack: HTMLElement[] = [];
    let activeDialog: HTMLElement | null = null;

    const syncDialog = () => {
      const nextDialog = getDialog();
      if (nextDialog === activeDialog) return;

      if (nextDialog) {
        const active = document.activeElement;
        previousFocusStack.push(active instanceof HTMLElement ? active : document.body);
        activeDialog = nextDialog;
        window.requestAnimationFrame(() => {
          const focusable = getFocusable(nextDialog);
          (focusable[0] ?? nextDialog).focus();
        });
      } else if (activeDialog) {
        activeDialog = null;
        const trigger = previousFocusStack.pop();
        trigger?.focus?.();
      }
    };

    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { childList: true, subtree: true });
    syncDialog();

    const handleKeyDown = (event: KeyboardEvent) => {
      const dialog = getDialog();
      if (!dialog) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog(dialog);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}
