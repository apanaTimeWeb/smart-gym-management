'use client';
// RESPONSIBILITY: Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
import SuperadminAffiliatesTableRow from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTableRow';
import SuperadminAffiliatesEmptyState from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState';
import type { Affiliate, AffiliateStatus } from '@/app/superadmin/affiliates/superadmin_affiliates_types/superadmin_affiliates_types';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

interface AffiliatesTableProps {
  affiliates: Affiliate[];
  onToggleStatus: (id: string, currentStatus: AffiliateStatus) => void;
  onEdit: (affiliate: Affiliate) => void;
  onDelete: (id: string) => void;
  onAddClick: () => void;
  onPayCommission?: (affiliate: Affiliate) => void;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function SuperadminAffiliatesTable({ 
  affiliates, 
  onToggleStatus, 
  onEdit, 
  onDelete, 
  onAddClick, 
  onPayCommission,
  currentPage,
  totalPages,
  setPage
}: AffiliatesTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Partner Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Referral Code</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Referral Count</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Join Rate %</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Commission Earned</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {affiliates.length === 0 ? (
              <tr>
                <td colSpan={7}><SuperadminAffiliatesEmptyState onAddClick={onAddClick} /></td>
              </tr>
            ) : (
              affiliates.map((aff) => (
                <SuperadminAffiliatesTableRow
                  key={aff.id}
                  affiliate={aff}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPayCommission={onPayCommission}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <SuperadminPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
