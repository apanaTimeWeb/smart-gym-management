import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/messaging_types';

export const MOCK_SUPERADMIN_MESSAGES: TenantMessage[] = [
  { id: 'm1', tenantId: 't1', tenantName: 'Iron Paradise', channel: 'EMAIL', subject: 'Invoice Overdue', body: 'Please pay invoice #1234', status: 'SENT', sentAt: '2023-11-01T10:00:00Z', scheduledAt: null, createdAt: '2023-11-01T09:00:00Z' },
  { id: 'm2', tenantId: 't2', tenantName: 'Fit Life Studio', channel: 'IN_APP', subject: 'Welcome to Smart Gym', body: 'Thanks for joining.', status: 'SENT', sentAt: '2023-11-15T14:30:00Z', scheduledAt: null, createdAt: '2023-11-15T14:30:00Z' },
];

export const MOCK_SUPERADMIN_NOTIFICATIONS: SuperadminNotification[] = [
  { id: 'n1', title: 'System Load High', body: 'Database CPU utilization at 90%', type: 'WARNING', read: false, createdAt: '2023-11-21T08:00:00Z' },
  { id: 'n2', title: 'New Tenant Signup', body: 'Fit Life Studio has joined.', type: 'INFO', read: true, createdAt: '2023-11-15T14:30:00Z' },
];

export const MOCK_SUPERADMIN_MESSAGING_TENANTS: MessagingTenant[] = [
  { id: 't1', name: 'Iron Paradise', plan: 'Pro' },
  { id: 't2', name: 'Fit Life Studio', plan: 'Basic' },
];
