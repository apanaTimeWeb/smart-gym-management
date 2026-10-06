import { z } from 'zod';

/**
 * @description Provides the ManagerNotificationsSchema implementation for the notifications module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const notificationSchema = z.object({
  id: z.string(), type: z.string(), priority: z.string(), status: z.string(),
  title: z.string(), message: z.string(), memberName: z.string().nullable().optional(), createdAt: z.string(), readAt: z.string().nullable().optional() });

export const notificationKpiSchema = z.object({ total: z.number(), unread: z.number(), highPriority: z.number(), todayCount: z.number() });
