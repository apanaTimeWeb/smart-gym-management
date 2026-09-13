import { Search, Mail, MessageSquare, Bell } from 'lucide-react';
import type { TenantMessage, MessageChannel } from '@/app/superadmin/messaging/messaging_types/messaging_types';
import { CHANNEL_STYLES, MESSAGE_STATUS_STYLES } from '@/app/superadmin/messaging/messaging_types/messaging_constants';
import SuperadminDateRangePicker from '@/app/superadmin/superadmin_components/SuperadminDateRangePicker';

export function SuperadminMessagingMessagesTab({
  search,
  setSearch,
  channelFilter,
  setChannelFilter,
  setStartDate,
  setEndDate,
  filteredMessages,
}: {
  search: string;
  setSearch: (s: string) => void;
  channelFilter: MessageChannel | 'ALL';
  setChannelFilter: (c: MessageChannel | 'ALL') => void;
  setStartDate: (s: string) => void;
  setEndDate: (s: string) => void;
  filteredMessages: TenantMessage[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search tenant or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['ALL', 'EMAIL', 'SMS', 'IN_APP'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setChannelFilter(ch)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                channelFilter === ch
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-input text-secondary border-border hover:text-foreground'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <SuperadminDateRangePicker 
            onRangeChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input/40">
                <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Tenant</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Channel</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">Sent At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMessages.map((msg) => (
                <tr key={msg.id} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{msg.tenantName}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${CHANNEL_STYLES[msg.channel]}`}>
                      {msg.channel === 'EMAIL' && <Mail size={11} />}
                      {msg.channel === 'SMS' && <MessageSquare size={11} />}
                      {msg.channel === 'IN_APP' && <Bell size={11} />}
                      {msg.channel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary max-w-xs truncate">{msg.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${MESSAGE_STATUS_STYLES[msg.status]}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-secondary text-xs">
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMessages.length === 0 && (
          <div className="py-16 text-center text-secondary">No messages found.</div>
        )}
      </div>
    </div>
  );
}
