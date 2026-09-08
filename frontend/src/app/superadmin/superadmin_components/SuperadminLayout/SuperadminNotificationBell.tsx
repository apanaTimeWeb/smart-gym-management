'use client';

// RESPONSIBILITY: Global Notification Bell for Superadmin. Displays real-time alerts.
// DATA FLOW: Mock data -> SuperadminNotificationBell. Includes popover logic.

import { useState, useRef, useEffect } from 'react';
import { Bell, Info, AlertTriangle, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';

type NotificationType = 'INFO' | 'WARNING' | 'CRITICAL';
interface SuperadminNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

const MOCK_NOTIFICATIONS: SuperadminNotification[] = [
  { id: 'notif-1', title: 'New tenant signup', body: 'FitZone Indiranagar just signed up for a trial.', type: 'INFO', read: false, createdAt: '2024-05-22T10:00:00Z' },
  { id: 'notif-2', title: 'Payment failed', body: 'Invoice #INV-0042 for PowerHouse Gym failed to process.', type: 'WARNING', read: false, createdAt: '2024-05-21T14:30:00Z' },
  { id: 'notif-3', title: 'System alert: High DB load', body: 'Database CPU exceeded 85% for 10 minutes.', type: 'CRITICAL', read: false, createdAt: '2024-05-21T03:15:00Z' },
];

function NotifIcon({ type }: { type: NotificationType }) {
  if (type === 'INFO') return <Info size={18} strokeWidth={2} className="text-info shrink-0" />;
  if (type === 'WARNING') return <AlertTriangle size={18} strokeWidth={2} className="text-warning shrink-0" />;
  return <AlertTriangle size={18} strokeWidth={2} className="text-danger shrink-0" />;
}

export default function SuperadminNotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<SuperadminNotification[]>(MOCK_NOTIFICATIONS);
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
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function handleMarkRead(id: string) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return (
    <div className="relative" ref={popoverRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-secondary hover:text-foreground hover:bg-input rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="View notifications"
      >
        <Bell size={20} strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white shadow-sm ring-2 ring-card animate-superadmin-fade-in-up">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover rounded-2xl shadow-2xl shadow-black/50 border border-border overflow-hidden z-30 animate-superadmin-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-header">
            <div>
              <h3 className="text-sm font-bold text-foreground">Notifications</h3>
              <p className="text-xs text-secondary mt-0.5">You have {unreadCount} unread messages</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-primary hover:text-primary-hover motion-safe:transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:underline"
              >
                <CheckCheck size={14} /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
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
                        <span className="text-[10px] text-secondary whitespace-nowrap shrink-0">
                          {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
              href={`${SuperadminUrlConfig.PAGES.MESSAGING}?tab=notifications`}
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
