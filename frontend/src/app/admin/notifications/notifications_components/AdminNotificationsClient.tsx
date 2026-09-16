"use client";
// RESPONSIBILITY: Orchestrates the notifications list and actions (mark all read, clear all).
import { useAdminNotificationsPage } from '@/app/admin/notifications/notifications_utils/useAdminNotificationsPage';
import AdminNotificationsList from '@/app/admin/notifications/notifications_components/AdminNotificationsList/AdminNotificationsList';
import { CheckCheck } from 'lucide-react';

export default function AdminNotificationsClient() {
  const { notifications, status, isError, retry, markAllAsRead, markAsRead } = useAdminNotificationsPage();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-header">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-foreground">All Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary motion-safe:transition-colors disabled:opacity-50 disabled:hover:text-secondary"
          >
            <CheckCheck size={16} /> Mark all read
          </button>

        </div>
      </div>
      
      {status === 'pending' && <div className="p-6 text-sm text-secondary">Loading notifications…</div>}
      {isError && <div className="p-6 text-sm text-danger flex items-center justify-between"><span>Unable to load notifications.</span><button type="button" onClick={() => retry()} className="font-semibold text-primary">Retry</button></div>}
      {status === 'success' && <AdminNotificationsList 
        notifications={notifications} 
        onMarkAsRead={markAsRead}
      />}
    </div>
  );
}