"use client";
// RESPONSIBILITY: Renders/orchestrates AdminNotificationsHeader for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useState, useRef, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import Link from 'next/link';
import { useAdminNotificationsPage } from '@/app/admin/notifications/notifications_utils/useAdminNotificationsPage';
import { AdminNotificationsUrlConfig } from '@/app/admin/notifications/admin_notifications_url_config';

export function AdminNotificationsHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, markAsRead } = useAdminNotificationsPage();
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setShowNotifications(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-colors border border-transparent hover:border-border motion-safe:duration-base"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={2} />
        {notifications.some((n) => n.unread) && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
        )}
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-primary text-sm">Notifications</h3>
            <button onClick={() => setShowNotifications(false)} className="text-secondary hover:text-primary" aria-label="Close notifications"><X size={15} /></button>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-secondary">No new notifications</div>
            ) : notifications.map((n) => (
              <button type="button" key={n.id} onClick={() => n.unread && markAsRead(n.id)} className={`w-full text-left px-4 py-3 border-b border-border hover:bg-input motion-safe:transition-colors cursor-pointer relative group ${n.unread ? 'bg-primary-subtle' : ''}`}>
                <p className={`text-sm pr-6 ${n.unread ? 'text-on-primary font-medium' : 'text-secondary'}`}>{n.text}</p>
                <span className="text-xs text-secondary mt-1 block">{n.time}</span>
              </button>
            ))}
          </div>
          <div className="p-3 text-center border-t border-border">
            <Link href={AdminNotificationsUrlConfig.root} onClick={() => setShowNotifications(false)} className="text-sm font-medium text-on-primary hover:underline">
              View All Notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}