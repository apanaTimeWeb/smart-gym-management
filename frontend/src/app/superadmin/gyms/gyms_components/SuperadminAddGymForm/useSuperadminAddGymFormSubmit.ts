// DATA FLOW: Superadmin UI → useSuperadminAddGymFormSubmit → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: Form → provisioning mutation → Query invalidation → visible success/error → gyms list.
// RESPONSIBILITY: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { gymsApi } from '@/app/superadmin/gyms/gyms_api/SuperadminGymsApi';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import type { OnboardGymFormValues } from '@/app/superadmin/gyms/gyms_utils/SuperadminGymsValidationSchemas';

/**
 * Purpose: Owns the Superadmin tenant-provisioning submission workflow. It never simulates backend infrastructure steps or sends credentials before confirmed success.
 * Inputs: form values defined by the owning Add Gym form schema.
 * Output: mutation state and provisioning log entries for the view layer.
 * Side effects: calls the module-owned API, updates the gyms query cache, shows backend messages, and navigates after success.
 * Invariant: the same idempotency key is reused until the confirmed provisioning intent succeeds or is abandoned.
 */
export function useSuperadminAddGymFormSubmit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const [provisioningLogs, setProvisioningLogs] = useState<string[]>([]);
  const mutation = useMutation({
    mutationFn: ({ data, idempotencyKey }: { data: OnboardGymFormValues; idempotencyKey: string }) =>
      gymsApi.provisionGym({ ...data, planId: data.plan }, idempotencyKey),
    onSuccess: async (response) => {
      setProvisioningLogs(['Tenant provisioning request accepted.', `Tenant ${response.data?.name ?? 'new tenant'} is ready.`]);
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'gyms'] });
      toast.success(response.message, { id: `superadmin-gym-provisioned-${response.data?.id ?? 'new'}` });
      idempotencyKeyRef.current = null;
      router.push(GymsUrlConfig.PAGES.MAIN);
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : '';
      setProvisioningLogs([`Provisioning failed: ${message || 'Unknown error'}`]);
      toast.error(message, { id: 'superadmin-gym-provision-error' });
    },
  });

  const onSubmit = async (data: OnboardGymFormValues) => {
    const confirmed = await confirm({
      title: 'Provision Tenant',
      message: 'This will provision a new tenant database and create the tenant in Superadmin. Continue?',
      type: 'warning',
      confirmText: 'Provision Tenant',
      cancelText: 'Cancel',
    });
    if (!confirmed || mutation.isPending) return;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    setProvisioningLogs(['Submitting tenant provisioning request...']);
    await mutation.mutateAsync({ data, idempotencyKey: idempotencyKeyRef.current });
  };

  return { onSubmit, isProvisioning: mutation.isPending, provisioningLogs };
}
