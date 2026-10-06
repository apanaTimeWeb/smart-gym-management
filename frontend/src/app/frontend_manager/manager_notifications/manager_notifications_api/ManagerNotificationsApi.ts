import { z } from 'zod';
import { apiFetch } from '@/lib/api';
import { notificationSchema, notificationKpiSchema } from '@/app/frontend_manager/manager_notifications/manager_notifications_schemas/ManagerNotificationsSchema';
import { ManagerNotificationsUrlConfig } from '@/app/frontend_manager/manager_notifications/manager_notifications_url_config';
import type { Notification, NotificationKPIData } from '@/app/frontend_manager/manager_notifications/manager_notifications_types/ManagerNotificationsTypes';
import type { ApiResponse } from '@/lib/api';


/**
 * @description Provides the ManagerNotificationsApi implementation for the notifications module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_notifications/manager_notifications_schemas/ManagerNotificationsSchema; @/app/frontend_manager/manager_notifications/manager_notifications_url_config; @/app/frontend_manager/manager_notifications/manager_notifications_types/ManagerNotificationsTypes; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const nullResponseSchema = z.null();

export const ManagerNotificationsApi = {
  fetchManagerNotifications: async (params?: Record<string, string>): Promise<ApiResponse<{ notifications: Notification[]; total: number }>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${ManagerNotificationsUrlConfig.BACKEND_API.BASE}${query ? `?${query}` : ''}`, {
      dataSchema: z.object({ notifications: z.array(notificationSchema), total: z.number() }) });
  },
  fetchNotificationKPIs: async (): Promise<ApiResponse<NotificationKPIData>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.STATS, { dataSchema: notificationKpiSchema }),
  markNotificationRead: async (id: string, idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.MARK_READ(id), { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }),
  markAllNotificationsRead: async (idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.MARK_ALL_READ, { method: 'PATCH', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }),
  deleteNotification: async (id: string, idempotencyKey: string): Promise<ApiResponse<null>> =>
    apiFetch(ManagerNotificationsUrlConfig.BACKEND_API.DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: nullResponseSchema }) };
