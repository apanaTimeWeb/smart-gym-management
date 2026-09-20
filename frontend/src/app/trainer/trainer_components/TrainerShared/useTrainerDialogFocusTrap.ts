'use client';
// RESPONSIBILITY: Provides zero-business dialog focus trapping, initial focus, Escape handling, and focus restoration for Trainer UI dialogs.
// DATA FLOW: dialog open state + dialog ref → focus trap → keyboard dismissal → previous trigger focus restore.
import { useEffect } from 'react';
import type { TrainerDialogFocusTrapOptions } from '@/app/trainer/trainer_components/TrainerShared/TrainerDialogFocusTrapOptions';

const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Traps keyboard focus inside an open dialog and restores focus when the dialog closes. */
export function useTrainerDialogFocusTrap({ isOpen, dialogRef, onEscape }: TrainerDialogFocusTrapOptions) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable?.[0] ?? dialogRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape?.();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (elements.length === 0) return;
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;
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
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [dialogRef, isOpen, onEscape]);
}
