// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin notifications feature.

// RESPONSIBILITY: Provides MSW fixture data for Admin Notifications
import type { AdminNotification } from '@/app/admin/notifications/notifications_types/AdminNotificationsTypes';

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', title: 'Payment received', body: 'Payment received for Invoice #1245.', severity: 'INFO', read: false, createdAt: '2026-09-16T12:00:00Z' },
  { id: 'n2', title: 'Membership expiring', body: '12 memberships expire within the next 7 days.', severity: 'WARNING', read: false, createdAt: '2026-09-16T10:30:00Z' },
  { id: 'n3', title: 'System backup completed', body: 'The scheduled system backup completed successfully.', severity: 'INFO', read: true, createdAt: '2026-09-16T08:00:00Z' },
  { id: 'n4', title: 'High-severity audit event', body: 'A permission change was recorded in the audit log.', severity: 'CRITICAL', read: true, createdAt: '2026-09-15T16:30:00Z' },
];
