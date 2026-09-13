import type { Broadcast } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';

export const MOCK_SUPERADMIN_BROADCASTS: Broadcast[] = [
  {
    id: 'b1', title: 'System Maintenance', content: 'Scheduled maintenance this Sunday 2 AM.',
    status: 'SENT', targetGymIds: ['t1', 't2', 't3'], scheduledDate: null, sentDate: '2023-11-01',
    totalRecipients: 100, deliveredCount: 95, failedCount: 5, audience: 'ALL_TENANTS'
  },
  {
    id: 'b2', title: 'New Feature: AI Workouts', content: 'AI Workouts are now available in beta.',
    status: 'SCHEDULED', targetGymIds: ['t1'], scheduledDate: '2023-12-01', sentDate: null,
    totalRecipients: 50, deliveredCount: 0, failedCount: 0, audience: 'PRO_ONLY'
  },
  {
    id: 'b3', title: 'Urgent: Payment Failed', content: 'Your recent payment failed.',
    status: 'DRAFT', targetGymIds: ['t3'], scheduledDate: null, sentDate: null,
    totalRecipients: 0, deliveredCount: 0, failedCount: 0, audience: 'SUSPENDED_ONLY'
  }
];
