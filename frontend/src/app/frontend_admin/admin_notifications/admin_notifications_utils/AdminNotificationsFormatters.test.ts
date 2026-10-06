import { describe, expect, it } from 'vitest';
import { NOTIFICATION_SEVERITY } from '@/app/frontend_admin/admin_notifications/admin_notifications_constants/AdminNotificationsConstants';
import { mapAdminNotificationToItem } from '@/app/frontend_admin/admin_notifications/admin_notifications_utils/AdminNotificationsFormatters';

describe('mapAdminNotificationToItem', () => {
  it('maps an API notification to localized display state', () => {
    const item = mapAdminNotificationToItem({ id: 'n1', title: 'Update', body: 'Body', severity: NOTIFICATION_SEVERITY.INFO, read: false, createdAt: '2026-09-30T10:00:00Z' }, 'en-IN');
    expect(item).toMatchObject({ id: 'n1', text: 'Update', unread: true });
    expect(item.time).not.toBe('—');
  });
  it('uses a safe fallback for invalid timestamps', () => {
    expect(mapAdminNotificationToItem({ id: 'n2', title: 'Update', body: 'Body', severity: NOTIFICATION_SEVERITY.INFO, read: true, createdAt: 'invalid' }, 'en-IN').time).toBe('—');
  });
});
