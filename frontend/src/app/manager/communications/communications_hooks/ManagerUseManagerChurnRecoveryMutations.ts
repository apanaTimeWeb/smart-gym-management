'use client';
// DATA FLOW: Manager module state/API data → useManagerChurnRecoveryMutations → owning Manager UI components.
/** Manages UseChurnRecoveryMutations for the Manager module. */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import type { CommChannel, WinBackTemplateTier } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export function useManagerChurnRecoveryMutations(closeComposer: () => void) {
  const qc = useQueryClient();

  const winBackMutation = useMutation({
    mutationFn: (payload: {
      memberId: string;
      memberName: string;
      phone: string;
      email: string;
      channel: CommChannel;
      templateTier: WinBackTemplateTier;
      message: string;
      subject: string;
    }) => ManagerCommunicationsApi.sendWinBackMessage(payload),
    onSuccess: (res) => {
      showManagerSuccessToast(res.message, 'manager-churn-winback-success');
      closeComposer();
      qc.invalidateQueries({ queryKey: ['manager', 'communications'] });
    },
    onError: (err) => showManagerErrorToast(err, 'manager-referrals-error') });

  return { winBackMutation };
}
