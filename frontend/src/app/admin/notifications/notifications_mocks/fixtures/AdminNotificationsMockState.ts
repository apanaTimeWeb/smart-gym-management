// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin notifications feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.
import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/admin/notifications/notifications_mocks/fixtures/AdminNotificationsMockFixtures';
import type { AdminNotification } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';

function cloneNotifications(records: AdminNotification[]): AdminNotification[] {
  return records.map((record) => ({ ...record }));
}

let adminNotificationsMockState = cloneNotifications(MOCK_ADMIN_NOTIFICATIONS);

export function getAdminNotificationsMockState(): AdminNotification[] {
  return adminNotificationsMockState;
}

export function resetAdminNotificationsMockState(): void {
  adminNotificationsMockState = cloneNotifications(MOCK_ADMIN_NOTIFICATIONS);
}
