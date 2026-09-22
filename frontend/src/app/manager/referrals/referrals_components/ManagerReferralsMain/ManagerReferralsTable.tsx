// RESPONSIBILITY: Renders the referrals data table and its row-level actions using feature-owned referral data.
'use client';
import { Loader2, Search, Gift, Check, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/app/manager/manager_layout/manager_utils/ManagerFormatCurrency';
import { maskSensitiveData, formatDate, displayValue } from '@/lib/formatters';
import ManagerEmptyState from '@/app/manager/manager_components/ManagerFeedback/ManagerEmptyState';
import ManagerPagination from '@/app/manager/manager_components/ManagerShared/ManagerPagination';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { MANAGER_REFERRAL_STATUS_OPTIONS } from '@/app/manager/referrals/referrals_constants/ManagerReferralsFilterConstants';
import { useManagerReferralsLogic } from '@/app/manager/referrals/referrals_hooks/ManagerUseManagerReferralsLogic';
import { useLocale } from "next-intl";

// Rule 20 FIX: Replaced native <select> with SearchableDropdown.




export default function ManagerReferralsTable() {
    const locale = useLocale();
  const { 
    referrals, isReferralsLoading, isReferralsError, reloadReferrals, errorMessage, 
    searchQuery, setSearchQuery, 
    statusFilter, setStatusFilter,
    currentPage, setCurrentPage, totalPages,
    claimReward, isClaiming
  } = useManagerReferralsLogic();

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col min-h-96 shadow-card">
      
      {/* Header & Filters */}
      <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 shrink-0 bg-input">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input
            type="text"
            placeholder="Search Referrer or Referee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary motion-safe:transition-all"
          />
        </div>
        
        <div className="w-full sm:w-48">
          <ManagerSearchableDropdown
            value={statusFilter}
            onChange={(val) => setStatusFilter(String(val))}
            options={[...MANAGER_REFERRAL_STATUS_OPTIONS]}
            placeholder="Filter by status"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-auto">
        {isReferralsLoading ? (
          <div className="h-full flex flex-col items-center justify-center text-secondary">
            <Loader2 size={18} className="motion-safe:animate-spin mb-4 text-primary" />
            <p className="text-sm font-medium">Loading Referrals...</p>
          </div>
        ) : isReferralsError ? (
          <div role="alert" className="h-full flex flex-col items-center justify-center gap-3 text-center p-10">
            <p className="text-sm font-semibold text-danger">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
            <button type="button" onClick={() => void reloadReferrals()} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-sm font-semibold motion-safe:transition-colors hover:bg-primary-hover">Try Again</button>
          </div>
        ) : referrals.length === 0 ? (
          <ManagerEmptyState
            icon={<Gift size={18} />}
            title="No referrals found"
            subtitle="No referrals match the current filter. Try changing the status filter."
          />
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-card border-b border-border text-secondary font-semibold text-xs uppercase z-10">
              <tr>
                <th className="px-6 py-4">Referrer (Member)</th>
                <th className="px-6 py-4">Referee (Inquiry)</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Inquiry Status</th>
                <th className="px-6 py-4">Reward Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {referrals.map((ref) => {
                const canClaim = ref.status === 'JOINED' && ref.rewardStatus === 'PENDING';
                
                return (
                  <tr key={ref.id} className="hover:bg-input motion-safe:transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-primary">{ref.referrerName}</p>
                      <p className="text-xs text-secondary">{ref.referrerId}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-primary">{ref.refereeName}</p>
                      <p className="text-xs text-secondary">{maskSensitiveData(ref.refereePhone, 'phone')}</p>
                    </td>
                    <td className="px-6 py-4 text-secondary">{formatDate(ref.dateReferred)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        ref.status === 'JOINED' ? 'bg-success-bg text-success' :
                        ref.status === 'REJECTED' ? 'bg-danger text-on-danger' :
                        'bg-warning-bg text-warning'
                      }`}>
                        {ref.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {ref.rewardStatus === 'N/A' ? (
                        <span className="text-secondary">{displayValue(ref.rewardStatus)}</span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          ref.rewardStatus === 'CLAIMED' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'
                        }`}>
                          {ref.rewardStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {ref.rewardStatus === 'CLAIMED' ? (
                        <span className="inline-flex items-center gap-1 text-success text-xs font-bold">
                          <Check size={18} /> Claimed
                        </span>
                      ) : canClaim ? (
                        <button
                          onClick={() => claimReward(ref.id)}
                          disabled={isClaiming}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-subtle text-primary rounded text-xs font-bold hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50"
                        >
                          <IndianRupee size={18} /> Claim {formatCurrency(ref.rewardAmount ?? 0, ManagerEnvConfig.currencyCode, locale)}
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
        <div className="shrink-0 p-3 border-t border-border bg-input">
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
