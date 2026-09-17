'use client';
// DATA FLOW: form state → useSuperadminUnsavedChangesGuard → confirmation infrastructure → navigation.
import { useEffect } from 'react';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';

export function useSuperadminUnsavedChangesGuard(
  isDirty: boolean,
  warningMessage: string = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.'
) {
  const { confirm } = useSuperadminConfirm();

  // RESPONSIBILITY: Protect dirty Superadmin forms from browser and in-app navigation data loss.
  // EXPLANATION: Synchronize component state with external dependencies.
  // EFFECT DEPENDENCIES: Documented intentionally.
  useEffect(() => {
    // 1. Browser tab close / hard navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = warningMessage;
      return warningMessage;
    };

    // 2. Anchor-tag clicks (non-Next.js links or Next.js Link intercepted)
    const handleAnchorClick = async (e: MouseEvent) => {
      if (!isDirty) return;
      const target = (e.target as HTMLElement).closest('a');
      if (!target?.href) return;
      if (target.href === window.location.href) return;
      if (target.target === '_blank') return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const confirmed = await confirm({
        title: 'Unsaved Changes',
        message: warningMessage,
        type: 'warning',
        confirmText: 'Leave Page',
        cancelText: 'Stay'
      });
      
      if (confirmed) {
        window.location.assign(target.href);
      }
    };

    // 3. Browser back/forward buttons: preserve the user's current entry while the async confirmation is shown.
    // EFFECT DEPENDENCIES: isDirty/warningMessage/confirm are included because the listener closes over all three values.
    const handlePopState = async () => {
      if (!isDirty) return;

      window.history.pushState({ superadminDirtyGuard: true }, '', window.location.href);
      const confirmed = await confirm({
        title: 'Unsaved Changes',
        message: warningMessage,
        type: 'warning',
        confirmText: 'Leave Page',
        cancelText: 'Stay',
      });

      if (confirmed) {
        window.removeEventListener('popstate', handlePopState);
        window.history.back();
      } else {
        window.history.pushState({ superadminDirtyGuard: true }, '', window.location.href);
      }
    };

    if (isDirty) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('click', handleAnchorClick, { capture: true });
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isDirty, warningMessage, confirm]);
}

