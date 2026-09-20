// DATA FLOW: Generate API Key form → mutation input → module API client/MSW → TanStack Query invalidation + one-time secret result.
// RESPONSIBILITY: Owns API-key generation mutation state, idempotency, and integrations-query reconciliation. No JSX.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { generateSuperadminApiKey } from '@/app/superadmin/integrations/integrations_api/SuperadminIntegrationsApi';
import type { SuperadminGenerateApiKeyMutationInput } from '@/app/superadmin/integrations/integrations_types/SuperadminGenerateApiKeyTypes';

/**
 * Purpose: Executes one API-key creation intent and reuses its idempotency key across manual retries.
 * Inputs: validated form values plus a key created once at user confirmation.
 * Output: typed mutation response and mutation lifecycle state.
 * Side effects: invalidates the integrations overview cache and emits deduplicated backend-result toasts.
 */
export function useSuperadminGenerateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, idempotencyKey }: SuperadminGenerateApiKeyMutationInput) => generateSuperadminApiKey(payload, idempotencyKey),
    retry: false,
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-integrations-api-key-success' });
      void queryClient.invalidateQueries({ queryKey: ['superadmin', 'integrations', 'overview'] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : '', { id: 'superadmin-integrations-api-key-error' });
    },
  });
}
