// DATA FLOW: Form dirty state → guard → ManagerConfirmProvider → confirmed navigation/closure or cancelled action.
'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';


const DEFAULT_WARNING = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.';

/** Guards a dirty form against browser exit, in-app navigation, and accidental discard. */
export function useManagerUnsavedChangesGuard(isDirty: boolean, warningText = DEFAULT_WARNING) {
  const router = useRouter();
  const { confirm } = useConfirm();

  const askBeforeDiscard = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({
      title: 'Unsaved Changes',
      message: warningText,
      confirmText: 'Discard',
      cancelText: 'Keep Editing',
      type: 'warning',
    });
  }, [confirm, isDirty, warningText]);

  const confirmAndClose = useCallback(async (onClose: () => void) => {
    const shouldClose = await askBeforeDiscard();
    if (shouldClose) onClose();
    return shouldClose;
  }, [askBeforeDiscard]);

  const confirmAndNavigate = useCallback(async (href: string) => {
    const shouldLeave = await askBeforeDiscard();
    if (shouldLeave) router.push(href);
    return shouldLeave;
  }, [askBeforeDiscard, router]);

  // EFFECT: Registers and cleans up browser-exit and same-origin navigation protection only while the form is dirty.
  useEffect(() => {
    if (!isDirty) return undefined;

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
      const currentUrl = new URL(window.location.href);
      if (targetUrl.origin !== currentUrl.origin || targetUrl.href === currentUrl.href) return;

      event.preventDefault();
      event.stopPropagation();
      const href = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
      void confirmAndNavigate(href);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [confirmAndNavigate, isDirty]);

  return { askBeforeDiscard, confirmAndClose, confirmAndNavigate };
}
