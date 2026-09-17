'use client';
// RESPONSIBILITY: Renders the global Superadmin notification bell and delegates notification data/mutations to the shell notification hook.

import { useEffect, useRef, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { formatDateTime } from '@/lib/formatters';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import SuperadminShellNotificationIcon from '@/app/superadmin/superadmin_components/SuperadminNotifications/SuperadminShellNotificationIcon';
import { useSuperadminShellNotifications } from '@/app/superadmin/superadmin_components/SuperadminNotifications/useSuperadminShellNotifications';

export default function SuperadminNotificationBell() {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAllReadMutation, markReadMutation } = useSuperadminShellNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-haspopup="dialog" aria-label="View notifications" className="relative rounded-full p-2 text-secondary hover:bg-input hover:text-foreground motion-safe:transition-all motion-safe:duration-200">
        <Bell size={18} strokeWidth={2} aria-hidden="true" />
        {unreadCount > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-card bg-danger px-0.5 text-xs font-bold text-white" aria-label={`${unreadCount} unread notifications`}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>

      {open && (
        <div role="dialog" aria-label="Notifications" className="absolute right-0 z-30 mt-2 superadmin-notification-popover overflow-hidden rounded-xl border border-border bg-popover shadow-2xl motion-safe:animate-superadmin-fade-in-up">
          <div className="flex items-center justify-between gap-3 border-b border-border bg-header px-4 py-3">
            <div className="min-w-0"><h3 className="truncate text-sm font-bold text-foreground">Notifications</h3><p className="truncate text-xs text-secondary">{unreadCount} unread notifications</p></div>
            {unreadCount > 0 && <button type="button" onClick={() => markAllReadMutation.mutate()} disabled={markAllReadMutation.isPending} className="flex min-w-28 items-center justify-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-primary hover:bg-primary-subtle disabled:opacity-60 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><CheckCheck size={18} strokeWidth={2} />{markAllReadMutation.isPending ? 'Marking…' : 'Mark all read'}</button>}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-8 text-center text-sm text-secondary">No notifications right now.</div> : notifications.map((notification) => (
              <button key={notification.id} type="button" onClick={() => markReadMutation.mutate(notification.id)} className="flex w-full items-start gap-3 border-b border-border p-4 text-left hover:bg-input last:border-0 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                <SuperadminShellNotificationIcon type={notification.type} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2"><span className={`truncate text-sm font-semibold ${notification.read ? 'text-secondary' : 'text-foreground'}`}>{notification.title}</span><span className="shrink-0 text-xs text-secondary">{formatDateTime(notification.createdAt)}</span></span>
                  <span className="mt-1 block line-clamp-2 text-xs text-secondary">{notification.body}</span>
                </span>
                {!notification.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
              </button>
            ))}
          </div>
          <div className="border-t border-border bg-header p-2">
            <Link href={`${SuperadminUrlConfig.SHELL_PAGES.MESSAGING}?tab=notifications`} onClick={() => setOpen(false)} className="block rounded-lg py-2 text-center text-sm font-semibold text-primary hover:bg-primary-subtle motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Open notification center</Link>
          </div>
        </div>
      )}
    </div>
  );
}
