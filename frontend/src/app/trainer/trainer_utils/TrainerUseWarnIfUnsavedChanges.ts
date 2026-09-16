'use client';
// RESPONSIBILITY: Protects dirty Trainer forms from browser exits and provides a modal-confirmed navigation gate.
// DATA FLOW: formState.isDirty → useUnsavedChangesGuard → TrainerConfirmProvider → approved navigation callback.
import { useCallback, useEffect } from 'react';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

export function useTrainerUnsavedChangesGuard(isDirty: boolean) {
  const { confirm } = useConfirm();

  useEffect(() => {
    if (!isDirty) return undefined;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return useCallback(async (navigate: () => void) => {
    if (!isDirty) {
      navigate();
      return true;
    }
    const approved = await confirm({
      title: 'Unsaved changes',
      message: 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
      confirmText: 'Leave',
      cancelText: 'Stay',
      type: 'warning',
    });
    if (approved) navigate();
    return approved;
  }, [confirm, isDirty]);
}

