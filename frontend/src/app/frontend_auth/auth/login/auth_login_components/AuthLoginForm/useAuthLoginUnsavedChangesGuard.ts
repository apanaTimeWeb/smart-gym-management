'use client';
/**
 * RESPONSIBILITY: Guards the simple Login form against browser-level navigation while user-entered credentials remain unsaved.
 * DATA FLOW: React Hook Form isDirty -> beforeunload listener -> browser leave warning.
 * @description Implements the documented Auth form data-loss safeguard without creating a client-navigation routing abstraction.
 * @dependencies React useEffect only.
 * @edge-case The listener is removed immediately when the form becomes clean or the component unmounts.
 */
import { useEffect } from 'react';

/**
 * Prevents accidental browser-level loss of entered Login credentials after the form becomes dirty.
 * @param isDirty Whether the Login form currently contains unsaved user input.
 */
export function useAuthLoginUnsavedChangesGuard(isDirty: boolean): void {
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);
}
