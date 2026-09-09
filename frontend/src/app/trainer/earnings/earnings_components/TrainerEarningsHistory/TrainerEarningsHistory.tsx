'use client';
import { Search, FileText } from 'lucide-react';
import { useTrainerEarningsContext } from '@/app/trainer/earnings/earnings_context/TrainerEarningsContext';
import { PAYOUT_STATUS_STYLES } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsSharedConstants';

export default function TrainerEarningsHistory() {
  const {
    paginatedHistory, fetchState, search, setSearch, currentPage, setCurrentPage, totalPages,
    startDate, setStartDate, endDate, setEndDate
  } = useTrainerEarningsContext();

  if (fetchState === 'loading') {
    return <div className="h-[400px] bg-skeleton-base bg-skeleton-highlight rounded-xl border border-border motion-safe:animate-pulse" />;
  }

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-header flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Earnings Ledger</h2>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            placeholder="Search descriptions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary motion-safe:transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="px-2 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <span className="text-secondary text-sm">to</span>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="px-2 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <button className="px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 ml-2">
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto custom-scrollbar">
        {paginatedHistory.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center h-full">
            <FileText size={32} className="text-secondary/50 mb-3" />
            <p className="text-sm font-semibold text-foreground">No records found</p>
            <p className="text-xs text-secondary mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">Description</th>
                <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Amount</th>
                <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedHistory.map(row => {
                const style = PAYOUT_STATUS_STYLES[row.status];
                return (
                  <tr key={row.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                    <td className="py-3 px-4 text-sm text-secondary whitespace-nowrap">
                      {new Date(row.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-foreground">{row.description}</p>
                      <p className="text-xs text-secondary mt-0.5">{row.type}</p>
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-foreground text-right whitespace-nowrap">
                      ₹{row.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.text}`}>
                        {style.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-border bg-header flex items-center justify-between text-sm">
          <span className="text-secondary">Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground disabled:opacity-50 hover:bg-primary/10 hover:border-primary/50 motion-safe:transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground disabled:opacity-50 hover:bg-primary/10 hover:border-primary/50 motion-safe:transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
