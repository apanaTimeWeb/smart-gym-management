import { useEffect } from 'react';

/**
 * Hook to guard against accidental navigation or tab close when a form has unsaved changes.
 * Primarily handles browser 'beforeunload' (refresh/close).
 * @param isDirty boolean indicating if there are unsaved changes
 * @param customMessage optional custom warning message (modern browsers often ignore this and show default)
 */
export function useUnsavedChangesGuard(isDirty: boolean, customMessage = 'You have unsaved changes. Are you sure you want to leave?') {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = customMessage;
        return customMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, customMessage]);
}
