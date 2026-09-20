'use client';
import { MANAGER_COMMUNICATION_HISTORY_HEADERS } from '@/app/manager/communications/communications_constants/ManagerCommunicationsTableConstants';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { formatDate } from '@/lib/formatters';
// RESPONSIBILITY: Paginated history table of past communication campaigns with search and channel filter.
import { Search, MessageCircle, Mail, Users } from 'lucide-react';
import { useManagerCommunicationsLogic } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsLogic';
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { COMM_STATUS_STYLES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';




export default function ManagerCommunicationsHistory() {
  const {
    paginatedCampaigns, isLoading, isError, errorMessage,
    historySearch, setHistorySearch,
    historyChannelFilter, setHistoryChannelFilter,
    currentPage, setCurrentPage, totalPages,
    filteredCampaigns } = useManagerCommunicationsLogic();

  if (isLoading) return <ManagerTableSkeleton rows={5} />;

  if (isError) {
    return (
      <div role="alert" className="bg-card border border-border rounded-xl p-12 text-center space-y-3">
        <p className="text-sm font-semibold text-danger">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <p className="text-sm text-secondary">Please retry the request or adjust the current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'whatsapp', 'email'] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setHistoryChannelFilter(ch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all capitalize ${
                historyChannelFilter === ch
                  ? 'bg-primary-subtle border-primary text-on-success'
                  : 'bg-input border-border text-secondary hover:text-on-success'
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
            <MessageCircle size={18} className="text-on-success" />
          </div>
          <p className="text-base font-semibold text-on-success">No campaigns yet</p>
          <p className="text-sm text-secondary">Send your first campaign using the Compose tab.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary/5">
                  {MANAGER_COMMUNICATION_HISTORY_HEADERS.map(h => (
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
                        <p className="text-sm font-medium text-on-success">{c.title}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-on-success ${isWA ? 'bg-success' : 'bg-info text-on-info'}`}
                        >
                          {isWA ? <MessageCircle size={18} /> : <Mail size={18} />}
                          {isWA ? 'WhatsApp' : 'Email'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary">{c.segmentLabel}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-sm text-secondary">
                          <Users size={18} />
                          {c.recipientCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-on-success font-medium">{c.sentCount}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle?.bg || ''} ${statusStyle?.text || ''}`}>
                          {statusStyle?.label || c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">
                        {formatDate(c.sentAt)}
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
