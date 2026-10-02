'use client';
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SuperadminWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_api/SuperadminWhiteLabelingApi';
import { SUPERADMIN_WHITE_LABELING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_constants/SuperadminWhiteLabelingQueryKeys';

import type { UpdateDomainStatusDto } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_types/SuperadminWhiteLabelingTypes';

/**
 * @description Manages white-label domain-status mutations with idempotency, cache invalidation, and stable toast feedback.
 * @dependencies Uses the feature API facade and TanStack Query cache for the owning module only.
 * @edge-case Reuses one idempotency key across retries of a single confirmed mutation intent and clears it after success or failure.
 */
export function useSuperadminWhiteLabelingUpdateDomainStatus() {
  const idempotencyKeyRef = useRef<string | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, dto, idempotencyKey }: { id: string; dto: UpdateDomainStatusDto; idempotencyKey: string }) => SuperadminWhiteLabelingApi.updateDomainStatus(id, dto, idempotencyKey),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_WHITE_LABELING_QUERY_KEYS.all });
      idempotencyKeyRef.current = null;
      toast.success(response.message, { id: 'superadmin-white-labeling-status-success' });
    },
    onError: (error: unknown) => {
      idempotencyKeyRef.current = null;
      toast.error(error instanceof Error ? error.message : String(error), { id: 'superadmin-white-labeling-status-error' });
    },
  });
  const mutateAsync = (input: { id: string; dto: UpdateDomainStatusDto }) => {
    idempotencyKeyRef.current ??= crypto.randomUUID();
    return mutation.mutateAsync({ ...input, idempotencyKey: idempotencyKeyRef.current });
  };
  return { ...mutation, mutateAsync };
}
