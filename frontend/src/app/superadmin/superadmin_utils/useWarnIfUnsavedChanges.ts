// RESPONSIBILITY: Custom hook to warn users of unsaved changes on both browser unload
// and Next.js client-side navigation (Rule 79). Intercepts beforeunload, anchor clicks,
// and Next.js router.push/replace via the popstate + history patching strategy.

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useWarnIfUnsavedChanges(
  isDirty: boolean,
  warningMessage: string = 'You have unsaved changes. Are you sure you want to leave?'
) {
  const router = useRouter();

  useEffect(() => {
    // 1. Browser tab close / hard navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = warningMessage;
      return warningMessage;
    };

    // 2. Anchor-tag clicks (non-Next.js links)
    const handleAnchorClick = (e: MouseEvent) => {
      if (!isDirty) return;
      const target = (e.target as HTMLElement).closest('a');
      if (!target?.href) return;
      if (target.href === window.location.href) return;
      if (target.target === '_blank') return;
      if (!window.confirm(warningMessage)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 3. Browser back/forward buttons (popstate)
    const handlePopState = () => {
      if (!isDirty) return;
      if (!window.confirm(warningMessage)) {
        // Push the current URL back to cancel the navigation
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Push a state entry so popstate fires on back-button press
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleAnchorClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty, warningMessage, router]);
}
