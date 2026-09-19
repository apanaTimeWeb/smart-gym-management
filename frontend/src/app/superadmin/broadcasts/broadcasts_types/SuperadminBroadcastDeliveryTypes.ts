// RESPONSIBILITY: Defines the runtime-validated delivery result contract for the Superadmin Broadcasts recipient queue.
import { z } from 'zod';
import { BroadcastResponseSchema } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';

export const SuperadminBroadcastDeliveryStatusSchema = z.enum(['DELIVERED', 'FAILED']);
export type SuperadminBroadcastDeliveryStatus = z.infer<typeof SuperadminBroadcastDeliveryStatusSchema>;

export const SuperadminBroadcastDeliveryResultSchema = z.object({
  broadcast: BroadcastResponseSchema,
  recipientId: z.string().min(1),
  deliveryStatus: SuperadminBroadcastDeliveryStatusSchema,
  deliveredAt: z.string().nullable().optional(),
});
export type SuperadminBroadcastDeliveryResult = z.infer<typeof SuperadminBroadcastDeliveryResultSchema>;
