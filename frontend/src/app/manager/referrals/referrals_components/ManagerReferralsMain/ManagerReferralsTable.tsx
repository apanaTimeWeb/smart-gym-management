// RESPONSIBILITY: Display referrals table with claim reward action.
'use client';

import { Loader2, Search, Filter, Gift, Check, IndianRupee } from 'lucide-react';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_context/useManagerReferralsLogic';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import { maskSensitiveData } from '@/lib/formatters';

export default function ManagerReferralsTable() {
  const { 
    referrals, isReferralsLoading, 
    searchQuery, setSearchQuery, 
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages,
    claimReward, isClaiming
  } = useManagerReferralsLogic();

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-[600px] shadow-sm">
      
      {/* Header & Filters */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 shrink-0 bg-input/10">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
          <input
            type="text"
            placeholder="Search Referrer or Referee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary motion-safe:transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-secondary" size={16} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending Join</option>
            <option value="JOINED">Joined</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {isReferralsLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary">
            <Loader2 size={32} className="motion-safe:animate-spin mb-4 text-primary" />
            <p className="text-sm font-medium">Loading Referrals...</p>
          </div>
        ) : referrals.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary">
            <Gift size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No referrals found.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-card border-b border-border text-secondary font-semibold text-xs uppercase z-10">
              <tr>
                <th className="px-6 py-4">Referrer (Member)</th>
                <th className="px-6 py-4">Referee (Lead)</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Lead Status</th>
                <th className="px-6 py-4">Reward Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {referrals.map((ref) => {
                const canClaim = ref.status === 'JOINED' && ref.rewardStatus === 'PENDING';
                
                return (
                  <tr key={ref.id} className="hover:bg-input/50 motion-safe:transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-foreground">{ref.referrerName}</p>
                      <p className="text-xs text-secondary">{ref.referrerId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{ref.refereeName}</p>
                      <p className="text-xs text-secondary">{maskSensitiveData(ref.refereePhone, 'phone')}</p>
                    </td>
                    <td className="px-6 py-4 text-secondary">{new Date(ref.dateReferred).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ref.status === 'JOINED' ? 'bg-success/10 text-success' :
                        ref.status === 'REJECTED' ? 'bg-destructive/10 text-destructive' :
                        'bg-warning/10 text-warning'
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ref.rewardStatus === 'N/A' ? (
                        <span className="text-secondary">-</span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ref.rewardStatus === 'CLAIMED' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {ref.rewardStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {ref.rewardStatus === 'CLAIMED' ? (
                        <span className="inline-flex items-center gap-1 text-success text-xs font-bold">
                          <Check size={14} /> Claimed
                        </span>
                      ) : canClaim ? (
                        <button
                          onClick={() => claimReward(ref.id)}
                          disabled={isClaiming}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-black rounded text-xs font-bold hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50"
                        >
                          <IndianRupee size={14} /> Claim ₹{ref.rewardAmount}
                        </button>
                      ) : (
                        <span className="text-secondary text-xs italic">Awaiting Join</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Pagination */}
      {referrals.length > 0 && (
        <div className="shrink-0 p-3 border-t border-border bg-input/10">
          <ManagerPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
