import type { AdminNotification } from '@/app/admin/notifications/notifications_api/AdminNotificationsApi';

export const MOCK_ADMIN_NOTIFICATIONS: AdminNotification[] = [
  { id: 'n1', text: 'New member registration at Downtown Main.', category: 'MEMBER', time: '10 mins ago', unread: true },
  { id: 'n2', text: 'System backup completed successfully.', category: 'SYSTEM', time: '1 hour ago', unread: false },
  { id: 'n3', text: 'Payment of ₹15,000 received for Annual Pro plan.', category: 'PAYMENT', time: '2 hours ago', unread: true },
  { id: 'n4', text: 'Staff Priya Singh requested leave.', category: 'STAFF', time: '3 hours ago', unread: false },
  { id: 'n5', text: 'Server maintenance scheduled for midnight.', category: 'SYSTEM', time: '5 hours ago', unread: true },
];
