// RESPONSIBILITY: Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications.
'use client';
import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useSuperadminMessagingNotifications } from '@/app/superadmin/messaging/messaging_utils/useSuperadminMessagingNotifications';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import SuperadminMessagingNotificationIcon from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingNotificationBell/SuperadminMessagingNotificationIcon';
import { formatDateTime } from '@/lib/formatters';

export default function SuperadminMessagingNotificationBell() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markRead, isMarkingRead, markAllRead, isMarkingAllRead } = useSuperadminMessagingNotifications();

// EFFECT INTENT: registers/removes a browser event listener and keeps the listener aligned with its captured values.
  useEffect(() => {
    // EFFECT DEPENDENCIES: Registers one document-level outside-click listener; popoverRef is mutable and intentionally excluded.
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button type="button" onClick={() => setOpen((value) => !value)} className="relative min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-input rounded-full motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="View notifications" aria-expanded={open}>
        <Bell size={18} strokeWidth={2}/>
        {unreadCount > 0 && <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-danger text-on-danger text-xs font-bold flex items-center justify-center rounded-full border-2 border-border" aria-label={`${unreadCount} unread notifications`}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-header">
            <div><h3 className="text-sm font-bold text-primary">Notifications</h3><p className="text-xs text-secondary mt-0.5">You have {unreadCount} unread messages</p></div>
            {unreadCount > 0 && <button type="button" onClick={() => markAllRead()} disabled={isMarkingAllRead} className="text-xs font-semibold text-primary hover:text-primary-hover motion-safe:transition-all motion-safe:duration-base flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md min-h-11 px-2"><CheckCheck size={18} strokeWidth={2}/> Mark all read</button>}
          </div>
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? <div className="p-6 text-center text-secondary text-sm">No notifications right now.</div> : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <button type="button" key={notification.id} onClick={() => markRead(notification.id)} disabled={isMarkingRead} className={`w-full text-left flex items-start gap-3 p-4 hover:bg-input motion-safe:transition-all motion-safe:duration-base ${notification.read ? 'opacity-70' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset`}>
                    <SuperadminMessagingNotificationIcon type={notification.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1"><p className={`text-sm font-semibold truncate ${notification.read ? 'text-secondary' : 'text-primary'}`}>{notification.title}</p><span className="text-xs text-secondary whitespace-nowrap shrink-0">{formatDateTime(notification.createdAt)}</span></div>
                      <p className="text-xs text-secondary line-clamp-2">{notification.body}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-2 border-t border-border bg-header"><Link href={`${MessagingUrlConfig.PAGES.MAIN}?tab=notifications`} onClick={() => setOpen(false)} className="block w-full text-center py-2 text-sm font-semibold text-primary hover:text-primary-hover motion-safe:transition-all motion-safe:duration-base rounded-md hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">View in Notification Center</Link></div>
        </div>
      )}
    </div>
  );
}
