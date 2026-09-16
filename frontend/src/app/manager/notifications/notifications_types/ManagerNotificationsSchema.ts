import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.string(), type: z.string(), priority: z.string(), status: z.string(),
  title: z.string(), message: z.string(), memberName: z.string().nullable().optional(), createdAt: z.string(), readAt: z.string().nullable().optional(),
});

export const notificationKpiSchema = z.object({ total: z.number(), unread: z.number(), highPriority: z.number(), todayCount: z.number() });
