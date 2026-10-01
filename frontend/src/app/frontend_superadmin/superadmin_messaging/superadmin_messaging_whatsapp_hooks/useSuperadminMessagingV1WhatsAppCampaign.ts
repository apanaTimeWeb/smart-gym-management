'use client';
// DATA FLOW: Inputs enter useSuperadminMessagingV1WhatsAppCampaign, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns WhatsApp campaign creation mutation for the Superadmin tenant-contact center.
import { useRef } from 'react';

import { SUPERADMIN_MESSAGING_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_query_keys/SuperadminMessagingQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWhatsAppCampaign } from "@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_api/SuperadminMessagingWhatsappApi";
import { SuperadminWhatsAppCreateCampaignPayloadSchema } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_schemas/SuperadminMessagingV1WhatsAppSchema';

/**
 * Purpose: Validates and creates a tenant-scoped WhatsApp campaign through the feature API.
 * Inputs: feature-owned campaign payload.
 * Output: mutation action and pending state.
 * Side effects: reconciles WhatsApp campaign history after success.
 * Invariant: direct API invocation never happens in the rendering component.
 
 * @description Validates and creates a tenant-scoped WhatsApp campaign through the feature API.
 * @dependencies feature-owned campaign payload.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminMessagingV1WhatsAppCampaign() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: unknown; idempotencyKey: string }) => {
      const validated = SuperadminWhatsAppCreateCampaignPayloadSchema.parse(payload);
      return createWhatsAppCampaign(validated, idempotencyKey);
    },
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      idempotencyKeyRef.current = null;
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_MESSAGING_QUERY_KEYS.whatsappBulkCenter });
    },
  });
  const createCampaign = (payload: unknown) => {
    idempotencyKeyRef.current ??= crypto.randomUUID();
    return mutation.mutateAsync({ payload, idempotencyKey: idempotencyKeyRef.current });
  };
  return { createCampaign, isCreating: mutation.isPending, error: mutation.error };
}
