'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsAddGymFormSubmit → Superadmin module API/state → consuming component
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_constants/SuperadminGymsQueryKeys';
import { toast } from 'sonner';

// DATA FLOW: Form → provisioning mutation → Query invalidation → visible success/error → gyms list.
// RESPONSIBILITY: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';

import type { OnboardGymFormValues } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_schemas/SuperadminGymsValidationSchemas';



/**
 * Purpose: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
 * Inputs: form values defined by the owning Add Gym form schema.
 * Output: mutation state and provisioning log entries for the view layer.
 * Side effects: calls the module-owned API, updates the gyms query cache, shows backend messages, and navigates after success.
 * Invariant: the same idempotency key is reused until the confirmed provisioning intent succeeds or is abandoned.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsAddGymFormSubmit.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsAddGymFormSubmit → consuming feature component.
export function useSuperadminGymsAddGymFormSubmit() {
  const router = useRouter();
  const t = useTranslations('superadmin_gyms');
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: OnboardGymFormValues; idempotencyKey: string }) =>
      gymsApi.provisionGym({ ...data, planId: data.plan }, idempotencyKey),
    onSuccess: async (response) => {
      setProvisioningLogs([t('ui.tenant_provisioning_request_accepted_repair'), t('ui.tenant_ready_repair', { name: response.data?.name ?? 'new tenant' })]);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_GYMS_QUERY_KEYS.all });
      toast.success(response.message, { id: `superadmin-gym-provisioned-${response.data?.id ?? 'new'}` });
      idempotencyKeyRef.current = null;
      router.push(MODULE_URLS.PAGES.MAIN);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : t('ui.tenant_provisioning_failed_repair');
      setProvisioningLogs([message]);
      toast.error(message, { id: 'superadmin-gym-provision-error' });
    },
  });

  const onSubmit = async (data: OnboardGymFormValues) => {
    const confirmed = await confirm({
      title: t('ui.provision_tenant_title_repair'),
      message: t('ui.provision_tenant_message_repair'),
      type: 'warning',
      confirmText: t('ui.provision_tenant_action_repair'),
      cancelText: t('ui.cancel_action_repair'),
    });
    if (!confirmed || mutation.isPending) return;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    setProvisioningLogs([t('ui.submitting_tenant_provisioning_repair')]);
    await mutation.mutateAsync({ data, idempotencyKey: idempotencyKeyRef.current });
  };

  return { onSubmit, isProvisioning: mutation.isPending, provisioningLogs };
}
