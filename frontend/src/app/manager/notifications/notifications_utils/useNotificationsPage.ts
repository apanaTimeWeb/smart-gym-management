import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export type NotificationItem = {
  id: string;
  text: string;
  time: string;
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  { id: '1', text: 'Trainer Mark requested schedule change', time: 'Yesterday', unread: false },
  { id: '2', text: 'New inventory shipment arrived', time: '2 days ago', unread: false },
];

export const useNotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast.success('All notifications marked as read');
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    toast.success('All notifications cleared');
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification removed');
  }, []);

  return {
    notifications,
    markAllAsRead,
    clearAll,
    markAsRead,
    deleteNotification,
  };
};
