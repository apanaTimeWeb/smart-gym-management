'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import type { CommChannel, WinBackTemplateTier } from '@/app/manager/communications/communications_types/communications_types';

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
      toast.success(res.message || 'Win-back message sent successfully');
      closeComposer();
      qc.invalidateQueries({ queryKey: ['manager', 'communications'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  return { winBackMutation };
}
