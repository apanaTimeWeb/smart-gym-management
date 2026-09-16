'use client';
import { useEffect } from 'react';

// RESPONSIBILITY: Blocks browser exits and same-origin in-app navigation while a Manager form has unsaved changes.
// DATA FLOW: RHF isDirty → navigation guard → browser/router navigation decision

const DEFAULT_WARNING = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.';

/** Prevents accidental loss of dirty Manager forms on browser exits and client-side navigation. */
export function useManagerUnsavedChangesGuard(isDirty: boolean, warningText = DEFAULT_WARNING): void {
  useEffect(() => {
    if (!isDirty) return undefined;

    const confirmNavigation = (): boolean => window.confirm(warningText);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      const targetUrl = new URL(anchor.href, window.location.href);
      if (targetUrl.origin !== window.location.origin || targetUrl.href === window.location.href) return;
      if (!confirmNavigation()) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const historyPushState = window.history.pushState.bind(window.history);
    const historyReplaceState = window.history.replaceState.bind(window.history);
    window.history.pushState = ((state: unknown, unused: string, url?: string | URL | null) => {
      if (url && !confirmNavigation()) return;
      historyPushState(state, unused, url);
    }) as typeof window.history.pushState;
    window.history.replaceState = ((state: unknown, unused: string, url?: string | URL | null) => {
      if (url && new URL(String(url), window.location.href).pathname !== window.location.pathname && !confirmNavigation()) return;
      historyReplaceState(state, unused, url);
    }) as typeof window.history.replaceState;

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
      window.history.pushState = historyPushState;
      window.history.replaceState = historyReplaceState;
    };
  }, [isDirty, warningText]);
}
