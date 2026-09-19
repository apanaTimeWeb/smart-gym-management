// RESPONSIBILITY: Owns WhatsApp campaign creation mutation for the Superadmin tenant-contact center.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_api/SuperadminMessagingWhatsappApi';
import { SuperadminWhatsAppCreateCampaignPayloadSchema } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
/**
 * Purpose: Validates and creates a tenant-scoped WhatsApp campaign through the feature API.
 * Inputs: feature-owned campaign payload.
 * Output: mutation action and pending state.
 * Side effects: reconciles WhatsApp campaign history after success.
 * Invariant: direct API invocation never happens in the rendering component.
 */
export function useSuperadminMessagingV1WhatsAppCampaign() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: unknown; idempotencyKey: string }) => {
      const validated = SuperadminWhatsAppCreateCampaignPayloadSchema.parse(payload);
      return createWhatsAppCampaign(validated, idempotencyKey);
    },
    onSuccess: async (response) => {
      if (!response.success || !response.data) throw new Error(response.message);
      await queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'whatsapp-bulk-center'] });
    },
  });
  return { createCampaign: (payload: unknown) => mutation.mutateAsync({ payload, idempotencyKey: crypto.randomUUID() }), isCreating: mutation.isPending, error: mutation.error };
}
