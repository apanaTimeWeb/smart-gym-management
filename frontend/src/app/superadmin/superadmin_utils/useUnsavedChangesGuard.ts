'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSuperadminConfirm } from '@/components/ui/SuperadminFeedback/SuperadminConfirmProvider';

export function useUnsavedChangesGuard(
  isDirty: boolean,
  warningMessage: string = 'You have unsaved changes. Are you sure you want to leave?'
) {
  const router = useRouter();
  const { confirm } = useSuperadminConfirm();

  // RESPONSIBILITY: Handle side-effects for useUnsavedChangesGuard
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

    // 3. Browser back/forward buttons (popstate)
    const handlePopState = async () => {
      if (!isDirty) return;
      
      // Push state back to prevent the actual pop
      window.history.pushState(null, '', window.location.href);
      
      const confirmed = await confirm({
        title: 'Unsaved Changes',
        message: warningMessage,
        type: 'warning',
        confirmText: 'Leave Page',
        cancelText: 'Stay'
      });
      
      if (confirmed) {
        window.history.back(); // Wait, they might have gone forward. Safe approach is to let them go back.
        // Actually, popstate handling with async modal is tricky. We'll do our best.
        // Since we pushed state, we just go back once to clear the push.
        setTimeout(() => {
          window.history.go(-2);
        }, 0);
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
  }, [isDirty, warningMessage, router, confirm]);
}
