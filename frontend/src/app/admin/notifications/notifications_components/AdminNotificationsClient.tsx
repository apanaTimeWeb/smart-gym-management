"use client";
// RESPONSIBILITY: Orchestrates the notifications list and actions (mark all read, clear all).
import { useAdminNotificationsPage } from '@/app/admin/notifications/notifications_utils/useAdminNotificationsPage';
import AdminNotificationsList from '@/app/admin/notifications/notifications_components/AdminNotificationsList/AdminNotificationsList';
import AdminNotificationsListSkeleton from '@/app/admin/notifications/notifications_components/AdminNotificationsListSkeleton';
import { CheckCheck } from 'lucide-react';

export default function AdminNotificationsClient() {
  const { notifications, status, isError, retry, markAllAsRead, markAsRead } = useAdminNotificationsPage();
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-header">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-primary">All Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => void markAllAsRead()}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 text-sm text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-base disabled:cursor-not-allowed disabled:text-disabled focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            <CheckCheck size={18} aria-hidden="true" /> Mark all read
          </button>

        </div>
      </div>
      
      {status === 'pending' && <AdminNotificationsListSkeleton />}
      {isError && <div className="flex items-center justify-between gap-4 border-b border-border bg-danger-bg p-6 text-sm text-danger"><span>Unable to load notifications.</span><button type="button" onClick={() => void retry()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out rounded-lg px-3 py-2 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div>}
      {status === 'success' && <AdminNotificationsList 
        notifications={notifications} 
        onMarkAsRead={markAsRead}
      />}
    </div>
  );
}