'use client';
// RESPONSIBILITY: Protects dirty Trainer forms from browser exits and in-app route changes without losing typed data.
// DATA FLOW: formState.isDirty → TrainerNavigationGuardStore → anchor/router navigation interception → TrainerConfirmProvider.
import { useCallback, useEffect, useId, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTrainerConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerConfirm';
import { useTrainerNavigationGuardStore } from '@/app/trainer/trainer_utils/TrainerNavigationGuardStore';

const UNSAVED_CHANGES_MESSAGE = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.';

/** Blocks browser exits and same-origin anchor navigation while a form contains unsaved changes. */
export function useTrainerUnsavedChangesGuard(isDirty: boolean) {
  const { confirm } = useTrainerConfirm();
  const router = useRouter();
  const sourceId = useId();
  const promptOpenRef = useRef(false);
  const setSourceDirty = useTrainerNavigationGuardStore((state) => state.setSourceDirty);

  useEffect(() => {
    setSourceDirty(sourceId, isDirty);
    return () => setSourceDirty(sourceId, false);
  }, [isDirty, setSourceDirty, sourceId]);

  useEffect(() => {
    if (!isDirty) return undefined;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== '_self') return;
      if (target.origin !== window.location.origin) return;
      if (target.href === window.location.href) return;
      if (promptOpenRef.current) return;

      event.preventDefault();
      promptOpenRef.current = true;
      const nextUrl = new URL(target.href);
      const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      void confirm({
        title: 'Unsaved changes',
        message: UNSAVED_CHANGES_MESSAGE,
        confirmText: 'Leave',
        cancelText: 'Stay',
        type: 'warning',
      }).then((approved) => {
        promptOpenRef.current = false;
        if (approved) router.push(nextPath);
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleDocumentClick, true);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, [confirm, isDirty, router]);

  return useCallback(async (navigate: () => void) => {
    if (!isDirty) {
      navigate();
      return true;
    }
    if (promptOpenRef.current) return false;
    promptOpenRef.current = true;
    try {
      const approved = await confirm({
        title: 'Unsaved changes',
        message: UNSAVED_CHANGES_MESSAGE,
        confirmText: 'Leave',
        cancelText: 'Stay',
        type: 'warning',
      });
      if (approved) navigate();
      return approved;
    } finally {
      promptOpenRef.current = false;
    }
  }, [confirm, isDirty]);

}
