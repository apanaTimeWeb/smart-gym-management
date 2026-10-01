'use client';
// RESPONSIBILITY: Orchestrates the async Superadmin tenant-data export request and completion feedback.
import { SUPERADMIN_PROFILE_DATA_EXPORT_COMPLETION_STATES } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_constants/SuperadminProfileConstants';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

import { useSuperadminSocketEvent } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutSocketProvider';
import { superadminProfileDataExportApi } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_api/SuperadminProfileDataExportApi';

// DATA FLOW: API / URL state / module client state → useRef → superadmin_profile view components.
/**
 * @description Requests the asynchronous Superadmin full-data export and listens for its exact completion event through the centralized role socket.
 * @dependencies Uses the Profile-owned export API, idempotency lifecycle, translated feedback, and the role-level socket subscription hook.
 * @edge-case Reuses one idempotency key across retries and clears it only after a successful request; no file bytes are streamed through the browser.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminProfileDataExportMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin profile data export mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminProfileDataExportMutation() {
  const t = useTranslations('superadmin_profile');
  const idempotencyKeyRef = useRef<string | null>(null);
  const [completionState, setCompletionState] = useState<(typeof SUPERADMIN_PROFILE_DATA_EXPORT_COMPLETION_STATES)[number]>('idle');
  const activeExportRef = useRef(false);

  const mutation = useMutation({
    mutationFn: (idempotencyKey: string) => superadminProfileDataExportApi.requestFullDataExport(idempotencyKey),
    onSuccess: (response) => {
      if (response.success) {
        idempotencyKeyRef.current = null;
        activeExportRef.current = true;
        setCompletionState('started');
        toast.success(response.message, { id: 'superadmin-profile-data-export-success' });
      } else {
        toast.error(response.message, { id: 'superadmin-profile-data-export-error' });
      }
    },
    onError: () => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-profile-data-export-error' });
    },
  });

  useSuperadminSocketEvent('export.completed', () => {
    if (!activeExportRef.current) return;
    activeExportRef.current = false;
    setCompletionState('completed');
    toast.success(t('ui.export_completed_success'), { id: 'superadmin-profile-data-export-completed' });
  });

  const requestExport = async (): Promise<void> => {
    setCompletionState('idle');
    activeExportRef.current = false;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    await mutation.mutateAsync(idempotencyKeyRef.current);
  };

  return {
    requestExport,
    isRequesting: mutation.isPending,
    completionState,
  };
}
