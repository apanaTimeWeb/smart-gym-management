// RESPONSIBILITY: Renders a single row in the Affiliates data table. Handles row-level action buttons with stopPropagation. Purely presentational.
'use client';
import { Pencil, Trash2, Power, Check, Banknote } from 'lucide-react';
import toast from 'react-hot-toast';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import SuperadminAffiliateStatusBadge from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliateStatusBadge/SuperadminAffiliateStatusBadge';
import type { Affiliate, AffiliateStatus } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTypes';
import { maskSensitiveData, formatCurrencyFromMinorUnits, formatNumber } from '@/lib/formatters';
import type { SuperadminAffiliatesTableRowProps } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesTableRowTypes';

export default function SuperadminAffiliatesTableRow({ affiliate: aff, onToggleStatus, onEdit, onDelete, onPayCommission }: SuperadminAffiliatesTableRowProps) {
    const { confirm } = useConfirm();
    return (<tr tabIndex={0} aria-label={`Edit affiliate ${aff.name}`} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset" onClick={() => onEdit(aff)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onEdit(aff); } }}>
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-primary truncate" title={aff.name}>{aff.name}</span>
          <span className="text-xs text-secondary truncate" title={maskSensitiveData(aff.email, 'email')}>{maskSensitiveData(aff.email, 'email')}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="px-2 py-1 bg-input rounded text-secondary font-mono">{aff.referralCode}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">
        {aff.referralCount ?? aff.totalReferred} Gyms
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
        {aff.conversionRate !== undefined ? `${aff.conversionRate}%` : 'â€”'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-success font-medium">
        {formatCurrencyFromMinorUnits(aff.commissionEarned)}
        {aff.pendingPayout ? (<span className="ml-2 text-xs text-warning">({formatCurrencyFromMinorUnits(aff.pendingPayout)} pending)</span>) : null}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <SuperadminAffiliateStatusBadge status={aff.status}/>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
        <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
          <button onClick={async (e) => {
            e.stopPropagation();
            if (aff.status === 'ACTIVE') {
                const ok = await confirm({
                    title: 'Suspend Affiliate',
                    message: `Are you sure you want to suspend ${aff.name}? Their referral links will stop working and they will not earn further commission.`,
                    type: 'danger',
                    confirmText: 'Suspend',
                });
                if (ok)
                    onToggleStatus(aff.id, aff.status);
            }
            else {
                const ok = await confirm({
                    title: 'Activate Affiliate',
                    message: `Are you sure you want to activate ${aff.name}? Their referral links will be active again.`,
                    type: 'info',
                    confirmText: 'Activate',
                });
                if (ok)
                    onToggleStatus(aff.id, aff.status);
            }
        }} className="p-1.5 text-secondary hover:text-primary motion-safe:transition-colors" title={aff.status === 'ACTIVE' ? 'Suspend Affiliate' : 'Activate Affiliate'} aria-label={aff.status === 'ACTIVE' ? `Suspend ${aff.name}` : `Activate ${aff.name}`}>
            {aff.status === 'ACTIVE' ? <Power size={18} className="w-4"/> : <Check size={18} className="w-4"/>}
          </button>
          {onPayCommission && (aff.pendingPayout ?? 0) > 0 && (<button onClick={async (e) => {
                e.stopPropagation();
                const ok = await confirm({
                    title: 'Pay Commission',
                    message: `Pay ${formatCurrencyFromMinorUnits(aff.pendingPayout || 0)} to ${aff.name}? This will trigger a bank transfer.`,
                    type: 'warning',
                    confirmText: 'Pay Now',
                });
                if (ok)
                    onPayCommission(aff);
            }} className="p-1.5 text-secondary hover:text-success motion-safe:transition-colors" title="Pay Commission" aria-label={`Pay commission to ${aff.name}`}>
              <Banknote size={18} className="w-4"/>
            </button>)}
          <button onClick={(e) => { e.stopPropagation(); onEdit(aff); }} className="p-1.5 text-secondary hover:text-info motion-safe:transition-colors" title="Edit Affiliate" aria-label={`Edit ${aff.name}`}>
            <Pencil size={18} className="w-4"/>
          </button>
          <button onClick={async (e) => {
            e.stopPropagation();
            const ok = await confirm({
                title: 'Delete Affiliate',
                message: `Are you sure you want to delete affiliate "${aff.name}"? This action cannot be undone.`,
                type: 'danger',
                confirmText: 'Delete'
            });
            if (ok) {
                onDelete(aff.id);
            }
        }} className="p-1.5 text-secondary hover:text-danger motion-safe:transition-colors" title="Delete Affiliate" aria-label={`Delete ${aff.name}`}>
            <Trash2 size={18} className="w-4"/>
          </button>
        </div>
      </td>
    </tr>);
}
