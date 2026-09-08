// RESPONSIBILITY: TypeScript types for the Admin Notifications module.

export type NotificationSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface AdminNotification {
  id: string;
  title: string;
  body: string;
  severity: NotificationSeverity;
  read: boolean;
  createdAt: string;
  branchId?: string;
  branchName?: string;
}

export type NotificationsFetchState = 'idle' | 'loading' | 'success' | 'error';
