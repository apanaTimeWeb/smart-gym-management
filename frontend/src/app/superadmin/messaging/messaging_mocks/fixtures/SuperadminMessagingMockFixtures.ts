import type { TenantMessage, SuperadminNotification, MessagingTenant } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingTypes';
export const MOCK_SUPERADMIN_MESSAGING_MESSAGES: TenantMessage[] = [
    { id: 'm1', tenantId: 't1', tenantName: 'Iron Paradise', channel: 'EMAIL', subject: 'Invoice Overdue', body: 'Please pay invoice #1234', status: 'SENT', sentAt: '2026-09-01T10:00:00Z', scheduledAt: null, createdAt: '2026-09-01T09:00:00Z' },
    { id: 'm2', tenantId: 't2', tenantName: 'Fit Life Studio', channel: 'IN_APP', subject: 'Welcome to Smart Gym', body: 'Thanks for joining.', status: 'SENT', sentAt: '2026-09-15T14:30:00Z', scheduledAt: null, createdAt: '2026-09-15T14:30:00Z' },
    { id: 'm3', tenantId: 't3', tenantName: 'CoreFit Arena', channel: 'SMS', subject: 'Renewal Reminder', body: 'Your subscription renews this week.', status: 'SCHEDULED', sentAt: null, scheduledAt: '2026-09-18T09:00:00Z', createdAt: '2026-09-16T07:30:00Z' },
    { id: 'm4', tenantId: 't4', tenantName: 'Peak Performance Studio', channel: 'EMAIL', subject: 'Maintenance Notice', body: 'Planned maintenance window this weekend.', status: 'FAILED', sentAt: null, scheduledAt: null, createdAt: '2026-09-12T11:00:00Z' },
    { id: 'm5', tenantId: 't5', tenantName: 'Metro Fitness Network', channel: 'IN_APP', subject: 'Plan Upgrade', body: 'Upgrade options are available.', status: 'SCHEDULED', sentAt: null, scheduledAt: '2026-09-20T10:00:00Z', createdAt: '2026-09-16T08:00:00Z' },
    { id: 'm6', tenantId: 't6', tenantName: 'Zen Wellness Hub', channel: 'SMS', subject: 'Payment Confirmation', body: 'Your payment has been received.', status: 'SENT', sentAt: '2026-08-28T12:00:00Z', scheduledAt: null, createdAt: '2026-08-28T11:00:00Z' },
    { id: 'm7', tenantId: 't7', tenantName: 'Urban Strength Lab', channel: 'EMAIL', subject: 'Trial Ending', body: 'Your trial period ends soon.', status: 'SENT', sentAt: '2026-08-22T13:00:00Z', scheduledAt: null, createdAt: '2026-08-22T12:30:00Z' },
    { id: 'm8', tenantId: 't8', tenantName: 'Lakeside Performance', channel: 'IN_APP', subject: 'Account Update', body: 'Your account settings were updated.', status: 'SENT', sentAt: '2026-08-18T15:00:00Z', scheduledAt: null, createdAt: '2026-08-18T14:00:00Z' },
];
export const MOCK_SUPERADMIN_NOTIFICATIONS: SuperadminNotification[] = [
    { id: 'n1', title: 'System Load High', body: 'Database CPU utilization at 90%', type: 'WARNING', read: false, createdAt: '2026-09-15T08:00:00Z' },
    { id: 'n2', title: 'New Tenant Signup', body: 'Fit Life Studio has joined.', type: 'INFO', read: true, createdAt: '2026-09-14T14:30:00Z' },
    { id: 'n3', title: 'Backup Completed', body: 'Nightly backup completed successfully.', type: 'INFO', read: false, createdAt: '2026-09-12T06:20:00Z' },
    { id: 'n4', title: 'Invoice Failed', body: 'An invoice payment failed and needs review.', type: 'CRITICAL', read: false, createdAt: '2026-09-10T17:45:00Z' },
];
export const MOCK_SUPERADMIN_MESSAGING_TENANTS: MessagingTenant[] = [
    { id: 't1', name: 'Iron Paradise', plan: 'Pro' }, { id: 't2', name: 'Fit Life Studio', plan: 'Basic' }, { id: 't3', name: 'CoreFit Arena', plan: 'Growth' }, { id: 't4', name: 'Peak Performance Studio', plan: 'Enterprise' }, { id: 't5', name: 'Metro Fitness Network', plan: 'Pro' }, { id: 't6', name: 'Zen Wellness Hub', plan: 'Basic' }, { id: 't7', name: 'Urban Strength Lab', plan: 'Growth' }, { id: 't8', name: 'Lakeside Performance', plan: 'Enterprise' },
];
