import type { SuperadminShellNotification } from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationTypes';

export const SUPERADMIN_SHELL_NOTIFICATION_MOCK_FIXTURES: SuperadminShellNotification[] = [
  { id: 'shell-n1', title: 'Backup completed', body: 'The latest platform backup completed successfully.', type: 'INFO', read: false, createdAt: '2026-09-16T20:15:00Z' },
  { id: 'shell-n2', title: 'Invoice attention required', body: 'Three tenant invoices are overdue.', type: 'WARNING', read: false, createdAt: '2026-09-16T18:45:00Z' },
  { id: 'shell-n3', title: 'Critical platform alert', body: 'An infrastructure node exceeded the configured error threshold.', type: 'CRITICAL', read: false, createdAt: '2026-09-16T15:30:00Z' },
  { id: 'shell-n4', title: 'New tenant onboarded', body: 'Pulse Fitness was successfully provisioned.', type: 'INFO', read: true, createdAt: '2026-09-15T12:20:00Z' },
];
