'use client';
// RESPONSIBILITY: Renders the Affiliates data table shell (header row + rows). Delegates each row to AffiliatesTableRow. No API calls.
import AffiliatesTableRow from '@/app/superadmin/affiliates/affiliates_components/AffiliatesTable/AffiliatesTableRow';
import type { AffiliatesTableProps } from '@/app/superadmin/affiliates/affiliates_types/affiliates_types';

export default function AffiliatesTable({ affiliates, onToggleStatus, onEdit, onDelete }: AffiliatesTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Partner Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Referral Code</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Total Referred</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Commission Earned</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {affiliates.map((aff) => (
              <AffiliatesTableRow
                key={aff.id}
                affiliate={aff}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
