// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export type NotificationItem = {
  id: string;
  text: string;
  time: string;
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  { id: '1', text: 'New member booked your 10AM slot', time: '1 hour ago', unread: true },
  { id: '2', text: 'Your shift schedule for next week is ready', time: '5 hours ago', unread: true },
  { id: '3', text: 'Manager approved your leave request', time: 'Yesterday', unread: false },
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

