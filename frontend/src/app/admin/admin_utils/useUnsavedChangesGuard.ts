'use client';
// RESPONSIBILITY: Provides a generic dirty-state guard for forms to prevent accidental data loss on navigation or tab close.
import { useEffect } from 'react';

export function useUnsavedChangesGuard(isDirty: boolean) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Note: Next.js App Router does not currently natively support route interception for unsaved changes without experimental hooks.
  // The beforeunload event covers tab closes and external navigations.
}
