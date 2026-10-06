// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Search, Bell, CheckCheck, Trash2, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { NOTIFICATION_STATUS_VALUES } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsSharedConstants';
import { NOTIFICATION_TYPE_STYLES, NOTIFICATION_PRIORITY_STYLES, NOTIFICATION_TYPE_OPTIONS, NOTIFICATION_PRIORITY_OPTIONS, NOTIFICATION_STATUS_OPTIONS } from '@/app/frontend_manager/manager_notifications/manager_notifications_constants/ManagerNotificationsSharedConstants';
import { useManagerNotificationsLogic } from '@/app/frontend_manager/manager_notifications/manager_notifications_hooks/useManagerNotificationsLogic';
import { ManagerNotificationsFormatDate } from '@/app/frontend_manager/manager_notifications/manager_notifications_utils/ManagerNotificationsFormatters';


/** @description Renders the ManagerNotificationsTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves error state. */
export default function ManagerNotificationsTable() {
  const t = useTranslations('MANAGER_NOTIFICATIONS');

  const {
    notifications, isPending, isError, errorMessage, saving,
    search, setSearch,
    typeFilter, setTypeFilter,
    priorityFilter, setPriorityFilter,
    statusFilter, setStatusFilter,
    handleMarkRead, handleMarkAllRead, handleDelete, reload } = useManagerNotificationsLogic();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <div className="relative w-full sm:w-72">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_notifications-manager-notifications-table-input-text"
            type="text"
            placeholder={t("COPY_SEARCH_NOTIFICATIONS")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_notifications-manager-notifications-table-select-option-1" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            >
            {NOTIFICATION_TYPE_OPTIONS.map((o, mapIndex) => <option key={o} value={o} data-testid={`manager_notifications-managernotificationstable-select-type-option-${mapIndex}`}>{o === 'ALL' ? t('COPY_ALL_TYPES') : o}</option>)}
          </select>
          <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_notifications-manager-notifications-table-select-option-2" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
            >
            {NOTIFICATION_PRIORITY_OPTIONS.map((o, mapIndex) => <option key={o} value={o} data-testid={`manager_notifications-managernotificationstable-select-priority-option-${mapIndex}`}>{o === 'ALL' ? t('COPY_ALL_PRIORITY') : o}</option>)}
          </select>
          <select className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:border-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_notifications-manager-notifications-table-select-option-3" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            >
            {NOTIFICATION_STATUS_OPTIONS.map((o, mapIndex) => <option key={o} value={o} data-testid={`manager_notifications-managernotificationstable-select-status-option-${mapIndex}`}>{o === 'ALL' ? t('COPY_ALL_STATUS') : o}</option>)}
          </select>
          <button data-testid="manager_notifications-manager-notifications-table-mark-all-read"
            onClick={handleMarkAllRead}
            disabled={saving}
            className="min-w-32 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary motion-safe:transition-all hover:bg-primary-hover disabled:opacity-50 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"
          >
            <CheckCheck size={18} strokeWidth={2}/>{t("COPY_MARK_ALL_READ")}</button>
        </div>
      </div>

      {/* List */}
      {(() => { if (isPending) { return (
        <ul aria-label={t("COPY_LOADING_NOTIFICATIONS")} className="divide-y divide-border">
          {[1, 2, 3, 4, 5].map((skeletonRow) => (
            <li key={`notification-skeleton-row-${skeletonRow}`} className="flex items-start gap-4 px-5 py-4 motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-input" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 rounded bg-input" />
                <div className="h-4 w-56 max-w-full rounded bg-input" />
                <div className="h-3 w-72 max-w-full rounded bg-input" />
              </div>
            </li>
          ))}
        </ul>
      ); } return (() => { if (isError) { return (
        <div className="py-16 text-center space-y-3">
          <p className="text-sm font-medium text-danger">{errorMessage}</p>
          <button data-testid="manager_notifications-manager-notifications-table-reload" type="button" onClick={reload} className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110">{t("COPY_TRY_AGAIN_1")}</button>
        </div>
      ); } return (() => { if (notifications.length === 0) { return (
        <div className="py-16 text-center space-y-2">
          <Bell size={18} strokeWidth={2} className="mx-auto text-secondary opacity-40"/>
          <p className="text-sm text-secondary font-medium">{t("COPY_NO_NOTIFICATIONS_FOUND")}</p>
        </div>
      ); } return (
        <ul className="divide-y divide-border">
          {notifications.map((n, mapIndex) => {
            const typeStyle = NOTIFICATION_TYPE_STYLES[n.type] ?? NOTIFICATION_TYPE_STYLES['SYSTEM'] ?? { bg: 'bg-input', text: 'text-secondary', label: n.type };
            const priorityStyle = NOTIFICATION_PRIORITY_STYLES[n.priority] ?? { bg: 'bg-input', text: 'text-secondary' };
            const isUnread = n.status === NOTIFICATION_STATUS_VALUES[0];

            return (
              <li key={n.id} className={[`group flex items-start gap-4 px-5 py-4 motion-safe:transition-all hover:bg-primary-subtle ${isUnread ? 'bg-primary-subtle' : ''}`, "motion-safe:transition-all motion-safe:duration-base ease-in-out"].filter(Boolean).join(' ')}>
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0">
                  {isUnread
                    ? <span className="block w-2.5 h-2.5 rounded-full bg-primary text-on-primary" />
                    : <span className="block w-2.5 h-2.5 rounded-full bg-transparent border border-border" />
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeStyle.bg} ${typeStyle.text}`}>{typeStyle.label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityStyle.bg} ${priorityStyle.text}`}>{n.priority}</span>
                    {n.memberName && <span className="text-xs text-secondary">— {n.memberName}</span>}
                  </div>
                  <p className={`text-sm font-semibold ${isUnread ? 'text-primary' : 'text-secondary'}`}>{n.title}</p>
                  <p className="text-xs text-secondary mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-xs text-secondary mt-1">
                    {ManagerNotificationsFormatDate(n.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-all motion-safe:duration-base ease-in-out">
                  {isUnread && (
                    <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-2 rounded-lg hover:bg-success-bg text-secondary hover:text-success motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_notifications-notifications-managernotificationstable-button-mark-as-read-${mapIndex}`}
                      onClick={() => handleMarkRead(n.id)}
                      title={t("COPY_MARK_AS_READ")}
                      aria-label={t("TEXT_MARK_NOTIFICATION_READ", { value: n.title })}
                      
                    >
                      <CheckCircle size={18} strokeWidth={2}/>
                    </button>
                  )}
                  <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-2 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_notifications-notifications-managernotificationstable-button-dismiss-${mapIndex}`}
                    onClick={() => handleDelete(n.id)}
                    title={t("COPY_DISMISS")}
                    aria-label={t("TEXT_DISMISS_NOTIFICATION", { value: n.title })}
                    
                  >
                    <Trash2 size={18} strokeWidth={2}/>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ); })(); })(); })()}
    </div>
  );
}
