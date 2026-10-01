'use client';
// RESPONSIBILITY: Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications.
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Bell, CheckCheck } from 'lucide-react';

import { formatDateTime } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';

import Tooltip from '@/components/ui/Tooltip';

import SuperadminMessagingNotificationIcon from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/superadmin_messaging_notification_bell/SuperadminMessagingNotificationIcon';
import { useSuperadminMessagingNotifications } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_hooks/useSuperadminMessagingNotifications';
import { SuperadminMessagingUrlConfig } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';

/**
 * @description Renders the Superadmin notification bell UI. Notification business data access is isolated in useSuperadminMessagingNotifications.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminMessagingNotificationBell() {
  const t = useTranslations('superadmin_messaging');
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
      <button  type="button" onClick={() => setOpen((value) => !value)} className="relative min-h-11 min-w-11 p-2 text-secondary hover:text-primary hover:bg-surface-hover rounded-full motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" aria-label={t('ui.view_notifications_b6949eb')} aria-expanded={open} data-testid="superadmin_messaging-messaging-messaging-notification-bell-view">
        <Bell size={18} strokeWidth={2}/>
        {unreadCount > 0 && <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-danger text-on-danger text-xs font-bold flex items-center justify-center rounded-full border-2 border-border" aria-label={t('ui.a11y_unread_notifications', { count: unreadCount })}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-header">
            <div><h3 className="text-sm font-bold text-primary">{t('ui.notifications_7b4d202')}</h3><p className="text-xs text-secondary mt-0.5">{t('ui.you_have_bf0a21c')} {unreadCount}  {t('ui.unread_messages_37be1b4')}</p></div>
            {unreadCount > 0 && <button  type="button" onClick={() => markAllRead()} disabled={isMarkingAllRead} className="text-xs font-semibold text-primary hover:text-primary motion-safe:transition-all motion-safe:duration-base flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md min-h-11 px-2 motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-notification-bell-control"><CheckCheck size={18} strokeWidth={2}/>  {t('ui.mark_all_read_a2f26a9')}</button>}
          </div>
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? <div className="p-6 text-center text-secondary text-sm">{t('ui.no_notifications_right_now_58d4fc0')}</div> : (
              <div className="divide-y divide-border">
                {notifications.map((notification, index) => (
                  <button  type="button" key={notification.id} onClick={() => markRead(notification.id)} disabled={isMarkingRead} className={`min-h-11 w-full text-left flex items-start gap-3 p-4 hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base ${notification.read ? 'opacity-70' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset motion-safe:active:scale-95`} data-testid={`superadmin_messaging-messaging-messaging-notification-bell-action3-${index}`}>
                    <SuperadminMessagingNotificationIcon type={notification.type} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1"><Tooltip content={notification.title}><p className={`text-sm font-semibold truncate ${notification.read ? 'text-secondary' : 'text-primary'}`}>{notification.title}</p></Tooltip><span className="text-xs text-secondary whitespace-nowrap shrink-0">{formatDateTime(notification.createdAt)}</span></div>
                      <Tooltip content={notification.body}><p className="text-xs text-secondary line-clamp-2">{notification.body}</p></Tooltip>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-primary text-on-primary shrink-0 mt-1.5" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="p-2 border-t border-border bg-header"><Link href={`${SuperadminMessagingUrlConfig.PAGES.MAIN}?tab=notifications`} onClick={() => setOpen(false)} className="min-h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary block w-full text-center py-2 text-sm font-semibold text-primary hover:text-primary motion-safe:transition-all motion-safe:duration-base rounded-md hover:bg-primary text-on-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_messaging-messaging-messaging-notification-bell-view-2">{t('ui.view_in_notification_center_9ee4379')}</Link></div>
        </div>
      )}
    </div>
  );
}
