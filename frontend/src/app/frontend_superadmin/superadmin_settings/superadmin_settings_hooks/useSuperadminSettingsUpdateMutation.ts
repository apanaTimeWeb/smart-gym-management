'use client';// DATA FLOW: Owning feature API/query/store state → useSuperadminSettingsUpdateMutation → consuming feature component.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_api/SuperadminSettingsApi';
import { SUPERADMIN_SETTINGS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_constants/SuperadminSettingsQueryKeys';



/**
 * @description Persists one platform setting while keeping idempotency-key lifecycle inside the mutation boundary.
 * @dependencies Consumes only the settings API and query-key registry.
 * @edge-case The same key is reused for retrying an unchanged save intent and cleared only after a successful authoritative response.
 */
export function useSuperadminSettingsUpdateMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: ({ id, value, idempotencyKey }: { id: string; value: string; idempotencyKey: string }) => settingsApi.updateSetting(id, { value }, idempotencyKey),
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_SETTINGS_QUERY_KEYS.all });
      idempotencyKeyRef.current = null;
    },
  });

  const updateSetting = (input: { id: string; value: string }) => {
    idempotencyKeyRef.current ??= crypto.randomUUID();
    return mutation.mutateAsync({ ...input, idempotencyKey: idempotencyKeyRef.current });
  };

  return { updateSetting, isUpdating: mutation.isPending, updateError: mutation.error, variables: mutation.variables };
}
