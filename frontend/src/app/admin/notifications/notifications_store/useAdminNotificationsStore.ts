// RESPONSIBILITY: Zustand store for Admin Notifications UI state — filter, selected notification, read/unread counts.
// DATA FLOW: AdminNotificationsClient → useAdminNotificationsStore → child components

import { create } from 'zustand';

type NotificationFilter = 'ALL' | 'UNREAD' | 'READ';

interface AdminNotificationsState {
  activeFilter: NotificationFilter;
  selectedNotificationId: string | null;
  setActiveFilter: (filter: NotificationFilter) => void;
  setSelectedNotificationId: (id: string | null) => void;
}

export const useAdminNotificationsStore = create<AdminNotificationsState>((set) => ({
  activeFilter: 'ALL',
  selectedNotificationId: null,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setSelectedNotificationId: (id) => set({ selectedNotificationId: id }),
}));
