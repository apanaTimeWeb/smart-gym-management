"use client";
// RESPONSIBILITY: Blocks browser exits and in-app anchor navigation while an Admin form has unsaved changes.
// DATA FLOW: Form isDirty state → useAdminLayoutUnsavedChangesGuard → AdminLayoutConfirmProvider → navigation continuation.
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';

/**
 * Protects dirty Admin forms from accidental browser exits and client-side anchor navigation.
 */
export function useAdminLayoutUnsavedChangesGuard(isDirty: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  const { confirm } = useAdminLayoutConfirm();
  const t = useTranslations('admin_layout.AdminUnsavedChangesGuard');

  /** Prompts only when a dirty form is being explicitly discarded by the user. */
  const confirmDiscardIfDirty = useCallback(async () => {
    if (!isDirty) return true;
    return confirm({
      title: t('title'),
      message: t('message'),
      confirmText: t('discard'),
      type: 'warning',
    });
  }, [confirm, isDirty, t]);

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
      title: t('title'),
      message: t('message'),
      confirmText: t('leave'),
      type: 'warning',
    });
    if (shouldLeave) router.push(`${url.pathname}${url.search}${url.hash}`);
  }, [confirm, isDirty, pathname, router, t]);

// EFFECT: Installs browser-exit protection while a complex form is dirty and removes the listener when clean.
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return;
      event.preventDefault();
      event.returnValue = t('message');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleNavigationAttempt, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleNavigationAttempt, true);
    };
  }, [handleNavigationAttempt, isDirty]);

  return { confirmDiscardIfDirty };
}

