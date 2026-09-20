'use client';
import { formatDate } from '@/lib/formatters';
// RESPONSIBILITY: Notifications list with toolbar (search + filters) and row actions (mark read, delete).
import { useManagerNotificationsLogic } from '@/app/manager/notifications/notifications_hooks/ManagerUseManagerNotificationsLogic';
import {
  NOTIFICATION_TYPE_STYLES,
  NOTIFICATION_PRIORITY_STYLES,
  NOTIFICATION_TYPE_OPTIONS,
  NOTIFICATION_PRIORITY_OPTIONS,
  NOTIFICATION_STATUS_OPTIONS } from '@/app/manager/notifications/notifications_utils/ManagerNotificationsSharedConstants';
import { Search, Bell, CheckCheck, Trash2, CheckCircle } from 'lucide-react';

export default function ManagerNotificationsTable() {
  const {
    notifications, isPending, isError, errorMessage, saving,
    search, setSearch,
    typeFilter, setTypeFilter,
    priorityFilter, setPriorityFilter,
    statusFilter, setStatusFilter,
    handleMarkRead, handleMarkAllRead, handleDelete, reload } = useManagerNotificationsLogic();

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-border">
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-input border border-border rounded-lg text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary">
            {NOTIFICATION_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o === 'ALL' ? 'All Types' : o}</option>)}
          </select>
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary">
            {NOTIFICATION_PRIORITY_OPTIONS.map(o => <option key={o} value={o}>{o === 'ALL' ? 'All Priority' : o}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-primary">
            {NOTIFICATION_STATUS_OPTIONS.map(o => <option key={o} value={o}>{o === 'ALL' ? 'All Status' : o}</option>)}
          </select>
          <button
            onClick={handleMarkAllRead}
            disabled={saving}
            className="min-w-32 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-on-primary hover:opacity-90 motion-safe:transition-opacity disabled:opacity-50"
          >
            <CheckCheck size={18} /> Mark All Read
          </button>
        </div>
      </div>

      {/* List */}
      {isPending ? (
        <ul aria-label="Loading notifications" className="divide-y divide-border">
          {Array.from({ length: 5 }, (_, index) => (
            <li key={`notification-skeleton-${index}`} className="flex items-start gap-4 px-5 py-4 motion-safe:animate-pulse">
              <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-input" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-28 rounded bg-input" />
                <div className="h-4 w-56 max-w-full rounded bg-input" />
                <div className="h-3 w-72 max-w-full rounded bg-input" />
              </div>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <div className="py-16 text-center space-y-3">
          <p className="text-sm font-medium text-danger">{errorMessage}</p>
          <button type="button" onClick={reload} className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm font-medium text-primary hover:bg-primary-subtle motion-safe:transition-colors">Try Again</button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <Bell size={36} className="mx-auto text-secondary opacity-40" />
          <p className="text-sm text-secondary font-medium">No notifications found</p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {notifications.map(n => {
            const typeStyle = NOTIFICATION_TYPE_STYLES[n.type] ?? NOTIFICATION_TYPE_STYLES['SYSTEM'] ?? { bg: 'bg-secondary/10', text: 'text-secondary', label: n.type };
            const priorityStyle = NOTIFICATION_PRIORITY_STYLES[n.priority] ?? { bg: 'bg-secondary/10', text: 'text-secondary' };
            const isUnread = n.status === 'UNREAD';

            return (
              <li key={n.id} className={`group flex items-start gap-4 px-5 py-4 motion-safe:transition-colors hover:bg-primary-subtle ${isUnread ? 'bg-primary-subtle' : ''}`}>
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0">
                  {isUnread
                    ? <span className="block w-2.5 h-2.5 rounded-full bg-primary" />
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
                  <p className="text-xs text-secondary/60 mt-1">
                    {formatDate(n.createdAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity">
                  {isUnread && (
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      title="Mark as read"
                      aria-label={`Mark notification "${n.title}" as read`}
                      className="p-2 rounded-lg hover:bg-success-bg text-secondary hover:text-success motion-safe:transition-colors"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n.id)}
                    title="Dismiss"
                    aria-label={`Dismiss notification "${n.title}"`}
                    className="p-2 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
