'use client';

import { useEffect } from 'react';

// RESPONSIBILITY: Prevents accidental navigation or closing of a modal when there are unsaved form changes.
// DATA FLOW: Form State -> useUnsavedChangesGuard -> Browser BeforeUnload Event

export function useUnsavedChangesGuard(isDirty: boolean, warningText: string = 'You have unsaved changes. Are you sure you want to leave?') {
  useEffect(() => {
    // 1. Intercept browser refresh/close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = warningText;
        return warningText;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Intercept Next.js client-side router navigation
    // Next.js App Router relies on history.pushState and replaceState for client navigations.
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const handleRouteChange = (originalFn: any) => {
      return function (this: any, ...args: any[]) {
        if (isDirty) {
          if (!window.confirm(warningText)) {
            // User cancelled the navigation
            return;
          }
        }
        return originalFn.apply(this, args);
      };
    };

    window.history.pushState = handleRouteChange(originalPushState);
    window.history.replaceState = handleRouteChange(originalReplaceState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [isDirty, warningText]);
}
