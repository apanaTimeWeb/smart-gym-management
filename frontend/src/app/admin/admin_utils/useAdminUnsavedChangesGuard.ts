"use client";

// RESPONSIBILITY: Blocks browser exits and in-app anchor navigation while an Admin form has unsaved changes.
// DATA FLOW: Form isDirty state → useAdminUnsavedChangesGuard → AdminConfirmProvider → navigation continuation.
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';

const UNSAVED_CHANGES_MESSAGE = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.';

/**
 * Protects dirty Admin forms from accidental browser exits and client-side anchor navigation.
 */
export function useUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const { confirm } = useAdminConfirm();

  const handleNavigationAttempt = useCallback(async (event: MouseEvent) => {
    if (!isDirty || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[href]');
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname === pathname) return;

    event.preventDefault();
    const shouldLeave = await confirm({
      title: 'Unsaved Changes',
      message: UNSAVED_CHANGES_MESSAGE,
      confirmText: 'Leave Page',
      type: 'warning',
    });
    if (shouldLeave) router.push(`${url.pathname}${url.search}${url.hash}`);
  }, [confirm, isDirty, pathname, router]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = UNSAVED_CHANGES_MESSAGE;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleNavigationAttempt, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleNavigationAttempt, true);
    };
  }, [handleNavigationAttempt, isDirty]);
}
