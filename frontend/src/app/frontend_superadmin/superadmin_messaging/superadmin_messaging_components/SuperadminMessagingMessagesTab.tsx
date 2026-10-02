'use client';
import SuperadminMessagingDateRangePicker from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_components/SuperadminMessagingDateRangePicker';
import Pagination from '@/components/ui/Pagination';
import { formatDateTime } from '@/lib/formatters';
import Tooltip from '@/components/ui/Tooltip';
import { useTranslations } from 'next-intl';
import { Search, Bell, Mail, MessageSquare } from 'lucide-react';

// RESPONSIBILITY: Renders and composes SuperadminMessagingMessagesTab for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { SUPERADMIN_MESSAGING_CHANNEL_CODES, SUPERADMIN_MESSAGING_ALL_FILTER, CHANNEL_STYLES, MESSAGE_STATUS_STYLES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';

import type { SuperadminMessagingMessagesTabProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingMessagesTabTypes';



/**
 * @description Renders the searchable, filterable, URL-backed Superadmin tenant message table.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminMessagingMessagesTab({ search, setSearch, channelFilter, setChannelFilter, setRange, messages, currentPage, totalPages, totalItems, onPageChange, isFetching }: SuperadminMessagingMessagesTabProps) {
  const t = useTranslations('superadmin_messaging');
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">{t('ui.search_tenant_messages_41b6f66')}</span>
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" strokeWidth={2}/>
          <input  id="superadmin_messaging-messages-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('ui.search_tenant_subject_or_message_502b55e')} className="min-h-11 w-full rounded-lg border border-border bg-input py-2 pl-10 pr-3 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_messaging-superadmin-messaging-messages-tab-messaging-messages-tab-control"/>
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {([SUPERADMIN_MESSAGING_ALL_FILTER, SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL, SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS, SUPERADMIN_MESSAGING_CHANNEL_CODES.IN_APP] as const).map((channel, index) => (
              <button  key={channel === SUPERADMIN_MESSAGING_ALL_FILTER ? t('ui.all') : channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL ? t('ui.email') : channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS ? t('ui.sms') : t('ui.in_app')} type="button" onClick={() => setChannelFilter(channel)} className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${channelFilter === channel ? 'border-border bg-primary-subtle text-primary' : 'border-border bg-card text-secondary hover:text-primary'} motion-safe:active:scale-95`} data-testid={`superadmin_messaging-messaging-messaging-messages-tab-action1-${index}`}>
                {channel === SUPERADMIN_MESSAGING_ALL_FILTER ? t('ui.all') : channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL ? t('ui.email') : channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS ? t('ui.sms') : t('ui.in_app')}
              </button>
            ))}
          </div>
          <SuperadminMessagingDateRangePicker onRangeChange={setRange} data-testid="superadmin_messaging-superadmin-messaging-date-range-picker-interactive-1" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm superadmin-mobile-card-table">
            <caption className="sr-only">{t('ui.superadmin_tenant_messages_eb44d48')}</caption>
            <thead>
              <tr className="border-b border-border bg-surface-highlight" data-testid="superadmin_messaging-superadmin-messaging-messages-tab-messages-tab-action-1">
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.tenant_67c84ad')}</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.channel_eaf60de')}</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.subject_0a48a61')}</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.status_523019d')}</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.sent_at_a04f131')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((message) => (
                <tr key={message.id} className="motion-safe:transition-colors hover:bg-surface-hover" data-testid={`superadmin_messaging-messaging-messages-tab-item-message-id-2-${String(message.id)}`}>
                  <td className="px-4 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_tenant')}>{message.tenantName}</td>
                  <td className="px-4 py-3" data-mobile-label={t('ui.mobile_channel')}>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${CHANNEL_STYLES[message.channel]}`}>
                      {message.channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.EMAIL && <Mail size={18} aria-hidden="true"/>}
                      {message.channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.SMS && <MessageSquare size={18} aria-hidden="true"/>}
                      {message.channel === SUPERADMIN_MESSAGING_CHANNEL_CODES.IN_APP && <Bell size={18} aria-hidden="true"/>}
                      {message.channel}
                    </span>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-secondary" data-mobile-label={t('ui.mobile_subject')}><Tooltip content={message.subject}><span className="block max-w-full truncate">{message.subject}</span></Tooltip></td>
                  <td className="px-4 py-3" data-mobile-label={t('ui.mobile_status')}><span data-testid={`superadmin_messaging-message-status-${message.id}`} className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${MESSAGE_STATUS_STYLES[message.status]}`}>{message.status}</span></td>
                  <td className="px-4 py-3 text-xs text-secondary" data-mobile-label={t('ui.mobile_sent_at')}>{message.sentAt ? formatDateTime(message.sentAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {messages.length === 0 && (
          <div className="px-6 py-16 text-center text-secondary">{t('ui.no_messages_match_the_current_search_and_filters_041135b')}</div>
        )}
        {isFetching && <div className="border-t border-border px-5 py-2 text-xs text-secondary">{t('ui.refreshing_message_results_b3e8951')}</div>}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} totalItems={totalItems} itemsPerPage={10}  data-testid="superadmin_messaging-superadmin-messaging-messages-tab-messaging-messages-tab-pagination"/>
      </div>
    </div>
  );
}

