'use client';
// DATA FLOW: Referral create/claim intent → mutation hook → ManagerReferralsApi → Query invalidation → referral UI.
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { ManagerReferralsApi } from '@/app/frontend_manager/manager_referrals/manager_referrals_api/ManagerReferralsApi';
import { ManagerReferralsQueryKeys } from '@/app/frontend_manager/manager_referrals/manager_referrals_constants/ManagerReferralsQueryKeys';
import type { CreateReferralDto } from '@/app/frontend_manager/manager_referrals/manager_referrals_types/ManagerReferralsTypes';
import { useTranslations } from 'next-intl';

/**
 * @description Owns referral creation and reward-claim mutations, confirmation, idempotency lifecycle, and cache reconciliation.
 * @dependencies Uses ManagerReferralsApi, ManagerReferralsQueryKeys, confirmation/toast infrastructure, and module translations.
 * @edge-case Reward claim keys persist per referral until the mutation succeeds so a retry reuses the same intent key.
 */
export function useManagerReferralsMutations() {
  const t = useTranslations('MANAGER_REFERRALS');
  const { confirm } = useConfirm();
  const queryClient = useQueryClient();
  const claimKeyByReferralRef = useRef(new Map<string, string>());
  const createKeyRef = useRef<string | null>(null);
  const createMutation = useMutation({
    mutationFn: ({ dto, idempotencyKey }: { dto: CreateReferralDto; idempotencyKey: string }) => ManagerReferralsApi.createReferral(dto, idempotencyKey),
    onSuccess: (res) => {
      showManagerSuccessToast(res.message, 'manager-referral-success');
      void queryClient.invalidateQueries({ queryKey: ManagerReferralsQueryKeys.all });
    },
    onError: (err) => showManagerErrorToast(err, 'manager-referrals-error'),
  });
  const claimMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerReferralsApi.claimReward(id, idempotencyKey),
    onSuccess: (res, variables) => {
      claimKeyByReferralRef.current.delete(variables.id);
      showManagerSuccessToast(res.message, `manager-referral-${variables.id}-claim-success`);
      void queryClient.invalidateQueries({ queryKey: ManagerReferralsQueryKeys.all });
    },
    onError: (err, variables) => showManagerErrorToast(err, `manager-referral-${variables.id}-claim-error`),
  });
  const createReferral = async (dto: CreateReferralDto) => { const idempotencyKey = createKeyRef.current ?? createManagerIdempotencyKey(); createKeyRef.current = idempotencyKey; const response = await createMutation.mutateAsync({ dto, idempotencyKey }); createKeyRef.current = null; return response; };
  const claimReward = async (id: string) => {
    const confirmed = await confirm({ title: t('CONFIRM_REWARD_TITLE'), message: t('CONFIRM_REWARD_MESSAGE'), confirmText: t('CONFIRM_REWARD'), cancelText: t('KEEP'), type: 'warning' });
    if (!confirmed) return;
    const idempotencyKey = claimKeyByReferralRef.current.get(id) ?? createManagerIdempotencyKey();
    claimKeyByReferralRef.current.set(id, idempotencyKey);
    await claimMutation.mutateAsync({ id, idempotencyKey });
  };
  return {
    createReferral,
    isCreating: createMutation.isPending,
    claimReward,
    isClaiming: claimMutation.isPending,
  };
}
