import { z } from 'zod';
export const TrainerNotificationItemSchema = z.object({
  id: z.string(), text: z.string(), time: z.string(), unread: z.boolean(),
  type: z.enum(['MEMBER','WORKOUT','SYSTEM','ATTENDANCE']).optional(),
  actionUrl: z.string().optional(), relatedEntityId: z.string().optional(), relatedEntityType: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
