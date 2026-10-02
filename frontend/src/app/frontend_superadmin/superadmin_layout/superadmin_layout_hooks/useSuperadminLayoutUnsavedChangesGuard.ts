import { useEffect, useRef } from 'react';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';



// RESPONSIBILITY: Blocks browser and in-app navigation while Superadmin feature forms have unsaved changes.
// DATA FLOW: formState.isDirty -> guard -> design-system confirmation -> continued or cancelled navigation.

/**
 * @description Prevents data loss for dirty Superadmin forms during browser exit, in-app link navigation, and back/forward navigation.
 * @dependencies Uses the approved ConfirmProvider for in-app navigation and the browser beforeunload contract for full-page exits.
 * @edge-case beforeunload must use the browser-native prompt because custom dialogs cannot intercept a tab/window close; in-app navigation uses the design-system dialog.
 */
export function useSuperadminLayoutUnsavedChangesGuard(
  isDirty: boolean,
  message = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
): void {
  const { confirm } = useConfirm();
  const acceptedHrefRef = useRef<string | null>(null);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    acceptedHrefRef.current = window.location.href;
  }, []);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = message;
    };

    const confirmNavigation = async () => confirm({
      title: 'Unsaved changes',
      message,
      type: 'warning',
      confirmText: 'Leave page',
      cancelText: 'Stay',
    });

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;
      const url = new URL(target.href, window.location.href);
      if (url.origin !== window.location.origin || url.href === window.location.href) return;
      event.preventDefault();
      event.stopPropagation();
      void confirmNavigation().then((approved) => {
        if (!approved) return;
        acceptedHrefRef.current = url.href;
        window.location.assign(url.href);
      });
    };

    const handlePopState = () => {
      const previousHref = acceptedHrefRef.current ?? window.location.href;
      const targetHref = window.location.href;
      window.history.pushState(window.history.state, document.title, previousHref);
      void confirmNavigation().then((approved) => {
        if (!approved) return;
        acceptedHrefRef.current = targetHref;
        window.location.assign(targetHref);
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [confirm, isDirty, message]);
}
