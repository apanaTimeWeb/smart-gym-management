'use client';
// RESPONSIBILITY: Protects dirty Trainer forms from browser exits and registers dirty state for in-app navigation interception.
// DATA FLOW: formState.isDirty → TrainerNavigationGuardStore → TrainerSidebar/guarded navigation → TrainerConfirmProvider.
import { useCallback, useEffect, useId } from 'react';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { useTrainerNavigationGuardStore } from '@/app/trainer/trainer_utils/TrainerNavigationGuardStore';

export function useTrainerUnsavedChangesGuard(isDirty: boolean) {
  const { confirm } = useConfirm();
  const sourceId = useId();
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
