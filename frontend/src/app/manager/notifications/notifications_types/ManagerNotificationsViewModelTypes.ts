// RESPONSIBILITY: Return type contract for the Manager Notifications feature facade.
import type { Notification, NotificationKPIData } from '@/app/manager/notifications/notifications_types/ManagerNotificationsTypes';

export interface ManagerNotificationsViewModel {
  notifications: Notification[];
  kpis: NotificationKPIData | null;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleMarkRead: (id: string) => Promise<unknown>;
  handleMarkAllRead: () => Promise<unknown>;
  handleDelete: (id: string) => Promise<unknown>;
  reload: () => Promise<void>;
}
