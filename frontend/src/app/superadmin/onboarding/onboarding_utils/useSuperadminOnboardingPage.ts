// RESPONSIBILITY: Owns Onboarding list query and lifecycle mutations for the Superadmin onboarding page.
'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';
import type { SuperadminOnboardingExtendTrialVariables } from '@/app/superadmin/onboarding/onboarding_types/SuperadminOnboardingMutationTypes';
import { onboardingApi } from '@/app/superadmin/onboarding/onboarding_api/SuperadminOnboardingApi';
/**
 * Purpose: Centralizes server reads and lifecycle mutations for onboarding.
 * Inputs: URL-derived search/date query parameters.
 * Output: tenant list query state and lifecycle mutation actions.
 * Side effects: Query cache reconciliation after successful mutations.
 * Invariant: components only orchestrate local UI state and consume this hook.
 */
export function useSuperadminOnboardingPage(queryParams: Record<string, string>) {
  const queryClient = useQueryClient();
  const { confirm } = useSuperadminConfirm();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['superadmin', 'onboarding'] });
  const listQuery = useQuery({ queryKey: ['superadmin', 'onboarding', queryParams], queryFn: () => onboardingApi.fetchOnboardings(queryParams) });
  const resend = useMutation({ mutationFn: onboardingApi.resendVerification, onSuccess: invalidate });
  const markVerified = useMutation({ mutationFn: onboardingApi.markVerified, onSuccess: invalidate });
  const extendTrial = useMutation({ mutationFn: ({ id, days }: SuperadminOnboardingExtendTrialVariables) => onboardingApi.extendTrial(id, days), onSuccess: invalidate });
  const convertToPaid = useMutation({ mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => onboardingApi.convertToPaid(id, idempotencyKey), onSuccess: invalidate });
  const confirmConvertToPaid = async (id: string) => {
    const confirmed = await confirm({ title: 'Convert Tenant to Paid', message: 'This will end the tenant trial and mark the tenant as a paid subscriber. Continue?', type: 'warning', confirmText: 'Convert to Paid', cancelText: 'Cancel' });
    if (!confirmed) return null;
    return convertToPaid.mutateAsync({ id, idempotencyKey: crypto.randomUUID() });
  };
  return { listQuery, resendVerification: resend.mutateAsync, markVerified: markVerified.mutateAsync, extendTrial: extendTrial.mutateAsync, confirmConvertToPaid, isMutating: resend.isPending || markVerified.isPending || extendTrial.isPending || convertToPaid.isPending };
}
