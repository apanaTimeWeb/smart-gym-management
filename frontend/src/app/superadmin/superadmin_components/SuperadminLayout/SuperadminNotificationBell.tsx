'use client';

// RESPONSIBILITY: Renders the Superadmin feature UI for SuperadminNotificationBell. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer.
// RESPONSIBILITY: Global Notification Bell for Superadmin. Displays real-time alerts.
// DATA FLOW: Mock data -> SuperadminNotificationBell. Includes popover logic.

import { useState, useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, Info, AlertTriangle, CheckCheck } from 'lucide-react';
import Link from 'next/link';

import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { superadminMessagingApi } from '@/app/superadmin/messaging/messaging_api/superadmin_messaging_api';
import type { SuperadminNotification, NotificationType } from '@/app/superadmin/messaging/messaging_types/superadmin_messaging_types';
import { formatDateTime } from '@/lib/formatters';

function NotifIcon({ type }: { type: NotificationType }) {
  if (type === 'INFO') return <Info className="w-5 h-5 text-info shrink-0" strokeWidth={2}  />;
  if (type === 'WARNING') return <AlertTriangle className="w-5 h-5 text-warning shrink-0" strokeWidth={2}  />;
  return <AlertTriangle className="w-5 h-5 text-danger shrink-0" strokeWidth={2}  />;
}

export default function SuperadminNotificationBell() {
  const [open, setOpen] = useState(false);
  const notificationsQuery = useQuery({
    queryKey: ['superadmin', 'messaging', 'notifications'],
    queryFn: () => superadminMessagingApi.fetchNotifications(),
  });
  const notifications = notificationsQuery.data?.data ?? [];
  const queryClient = useQueryClient();
  const markAllReadMutation = useMutation({ mutationFn: () => superadminMessagingApi.markAllNotificationsRead(), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'notifications'] }); } });
  const markReadMutation = useMutation({ mutationFn: (id: string) => superadminMessagingApi.markNotificationRead(id), onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ['superadmin', 'messaging', 'notifications'] }); } });
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleMarkAllRead() {
    markAllReadMutation.mutate();
  }

  function handleMarkRead(id: string) {
    markReadMutation.mutate(id);
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-secondary hover:text-foreground hover:bg-input rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-danger text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-card">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover rounded-2xl shadow-2xl border border-border overflow-hidden z-30 motion-safe:animate-superadmin-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-header">
            <div>
              <h3 className="text-sm font-bold text-foreground">Notifications</h3>
              <p className="text-xs text-secondary mt-0.5">You have {unreadCount} unread messages</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead} disabled={markAllReadMutation.isPending}
                className="text-xs font-semibold text-primary hover:text-primary-hover motion-safe:transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-secondary text-sm">
                No notifications right now.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => handleMarkRead(notif.id)}
                    className={`flex items-start gap-3 p-4 hover:bg-input cursor-pointer motion-safe:transition-colors ${notif.read ? 'opacity-70' : ''}`}
                  >
                    <NotifIcon type={notif.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className={`text-sm font-semibold truncate ${notif.read ? 'text-secondary' : 'text-foreground'}`}>
                          {notif.title}
                        </p>
                        <span className="text-xs text-secondary whitespace-nowrap shrink-0">
                          {formatDateTime(notif.createdAt)}
                        </span>
                      </div>
                      <p className="text-xs text-secondary line-clamp-2">
                        {notif.body}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5 shadow-sm shadow-primary/50" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-2 border-t border-border bg-header">
            <Link
              href={`${MessagingUrlConfig.PAGES.MAIN}?tab=notifications`}
              onClick={() => setOpen(false)}
              className="block w-full text-center py-2 text-sm font-semibold text-primary hover:text-primary-hover motion-safe:transition-colors rounded-lg hover:bg-primary/5 focus-visible:outline-none focus-visible:bg-primary/5"
            >
              View in Notification Center
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
