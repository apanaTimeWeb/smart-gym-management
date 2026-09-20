// RESPONSIBILITY: Renders the searchable, filterable, URL-backed Superadmin tenant message table.
'use client';

import { Bell, Mail, MessageSquare, Search } from 'lucide-react';
import { formatDateTime } from '@/lib/formatters';
import SuperadminMessagingDateRangePicker from '@/app/superadmin/messaging/messaging_components/SuperadminMessagingDateRangePicker';
import Pagination from '@/components/ui/Pagination';
import type { SuperadminMessagingMessagesTabProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingMessagesTabTypes';
import { CHANNEL_STYLES, MESSAGE_STATUS_STYLES } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingConstants';

export function SuperadminMessagingMessagesTab({ search, setSearch, channelFilter, setChannelFilter, setRange, messages, currentPage, totalPages, totalItems, onPageChange, isFetching }: SuperadminMessagingMessagesTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search tenant messages</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} strokeWidth={2} />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tenant, subject, or message..." className="w-full rounded-lg border border-border bg-input py-2 pl-10 pr-3 text-sm text-primary focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {(['ALL', 'EMAIL', 'SMS', 'IN_APP'] as const).map((channel) => (
              <button key={channel} type="button" onClick={() => setChannelFilter(channel)} className={`rounded-lg border px-3 py-2 text-xs font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${channelFilter === channel ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-input text-secondary hover:text-primary'}`}>
                {channel}
              </button>
            ))}
          </div>
          <SuperadminMessagingDateRangePicker onRangeChange={setRange} />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Superadmin tenant messages</caption>
            <thead>
              <tr className="border-b border-border bg-input/40">
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">Tenant</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">Channel</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">Subject</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">Sent At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((message) => (
                <tr key={message.id} className="motion-safe:transition-colors hover:bg-input/30">
                  <td className="px-4 py-3 font-medium text-primary">{message.tenantName}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${CHANNEL_STYLES[message.channel]}`}>
                      {message.channel === 'EMAIL' && <Mail size={11} aria-hidden="true" />}
                      {message.channel === 'SMS' && <MessageSquare size={11} aria-hidden="true" />}
                      {message.channel === 'IN_APP' && <Bell size={11} aria-hidden="true" />}
                      {message.channel}
                    </span>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-secondary">{message.subject}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${MESSAGE_STATUS_STYLES[message.status]}`}>{message.status}</span></td>
                  <td className="px-4 py-3 text-xs text-secondary">{message.sentAt ? formatDateTime(message.sentAt) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {messages.length === 0 && (
          <div className="px-6 py-16 text-center text-secondary">No messages match the current search and filters.</div>
        )}
        {isFetching && <div className="border-t border-border px-5 py-2 text-xs text-secondary">Refreshing message results...</div>}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} totalItems={totalItems} itemsPerPage={10} />
      </div>
    </div>
  );
}
