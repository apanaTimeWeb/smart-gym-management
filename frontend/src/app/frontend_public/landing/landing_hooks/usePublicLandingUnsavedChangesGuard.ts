'use client';
// RESPONSIBILITY: Protects dirty PublicLanding forms from browser exits and in-page anchor/navigation loss.
// DATA FLOW: Form dirty state → guard listeners → confirmation → allow/cancel navigation.
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

/**
 * Guards forms with unsaved values from browser exits and same-origin navigation triggered by links.
 * @dependencies Requires Next.js App Router and a boolean dirty-state signal.
 * @edge-case Hash navigation is treated as in-page navigation; external/mail links are allowed through.
 */
export function usePublicLandingUnsavedChangesGuard(isDirty: boolean): void {
  const router = useRouter();
  const t = useTranslations('LANDING');
  const allowNextNavigationRef = useRef(false);

  useEffect(() => {
    if (!isDirty) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = t('shared.unsavedChanges');
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (allowNextNavigationRef.current || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      if (!anchor.href.startsWith(window.location.origin)) return;
      if (anchor.href.startsWith(`${window.location.origin}${window.location.pathname}${window.location.search}${anchor.hash}`)) return;

      const shouldLeave = window.confirm(t('shared.unsavedChanges'));
      if (!shouldLeave) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      allowNextNavigationRef.current = true;
      window.setTimeout(() => { allowNextNavigationRef.current = false; }, 0);
      if (anchor.hash) {
        event.preventDefault();
        const nextUrl = `${window.location.pathname}${window.location.search}${anchor.hash}`;
        router.push(nextUrl);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [isDirty, router, t]);
}
