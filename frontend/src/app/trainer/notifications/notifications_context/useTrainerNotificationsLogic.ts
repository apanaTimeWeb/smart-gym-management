// RESPONSIBILITY: Logic hook for the Trainer Notifications module. Manages local state until backend is wired.
// DATA FLOW: TrainerNotificationsApi → useTrainerNotificationsLogic → TrainerNotificationsMain

import { useState, useCallback } from 'react';
import type { TrainerNotificationItem } from '@/app/trainer/notifications/notifications_types/TrainerNotificationsTypes';

/** Dev-only seed data — replace with fetchTrainerNotifications() call when backend is ready */
const SEED_NOTIFICATIONS: TrainerNotificationItem[] = [
  { id: '1', text: 'New member booked your 10AM slot', time: '1 hour ago', unread: true },
  { id: '2', text: 'Your shift schedule for next week is ready', time: '5 hours ago', unread: true },
  { id: '3', text: 'Manager approved your leave request', time: 'Yesterday', unread: false },
];

export const useTrainerNotificationsLogic = () => {
  const [notifications, setNotifications] = useState<TrainerNotificationItem[]>(SEED_NOTIFICATIONS);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return {
    notifications,
    unreadCount,
    markAllAsRead,
    clearAll,
    markAsRead,
    deleteNotification,
  };
};
