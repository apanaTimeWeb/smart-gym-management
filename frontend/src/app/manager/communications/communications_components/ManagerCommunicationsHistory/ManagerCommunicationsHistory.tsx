// RESPONSIBILITY: Paginated history table of past communication campaigns with search and channel filter.
'use client';

import { Search, MessageCircle, Mail, Users } from 'lucide-react';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_context/useManagerCommunicationsLogic';
import { TableSkeleton } from '@/app/manager/manager_components/ManagerShared/TableSkeleton';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { COMM_STATUS_STYLES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';

// WhatsApp brand green — third-party brand color, not a design system token.
const WA_GREEN = '#25D366';

const HEADERS = ['Campaign', 'Channel', 'Segment', 'Recipients', 'Sent', 'Status', 'Date'];

export default function ManagerCommunicationsHistory() {
  const {
    paginatedCampaigns, fetchState,
    historySearch, setHistorySearch,
    historyChannelFilter, setHistoryChannelFilter,
    currentPage, setCurrentPage, totalPages,
    filteredCampaigns,
  } = useManagerCommunicationsLogic();

  if (fetchState === 'loading') return <TableSkeleton rows={5} />;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'whatsapp', 'email'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setHistoryChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all capitalize ${
                historyChannelFilter === ch
                  ? 'bg-primary-subtle border-primary text-primary'
                  : 'bg-input border-border text-secondary hover:text-foreground'
              }`}
            >
              {ch === 'all' ? 'All Channels' : ch}
            </button>
          ))}
        </div>
      </div>

      {paginatedCampaigns.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-primary-subtle flex items-center justify-center">
            <MessageCircle size={22} className="text-primary" />
          </div>
          <p className="text-base font-semibold text-foreground">No campaigns yet</p>
          <p className="text-sm text-secondary">Send your first campaign using the Compose tab.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/5">
                  {HEADERS.map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedCampaigns.map((c) => {
                  const statusStyle = COMM_STATUS_STYLES[c.status] ?? COMM_STATUS_STYLES.sent;
                  const isWA = c.channel === 'whatsapp';
                  return (
                    <tr key={c.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{c.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: isWA ? WA_GREEN : 'var(--info)' }}
                        >
                          {isWA ? <MessageCircle size={11} /> : <Mail size={11} />}
                          {isWA ? 'WhatsApp' : 'Email'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">{c.segmentLabel}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-secondary">
                          <Users size={13} />
                          {c.recipientCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground font-medium">{c.sentCount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                        {new Date(c.sentAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border">
            <ManagerPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredCampaigns.length}
              itemsPerPage={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}
