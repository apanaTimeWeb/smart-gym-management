// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminAffiliatesEmptyState from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_empty_state/SuperadminAffiliatesEmptyState';
import SuperadminAffiliatesTableRow from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_table/SuperadminAffiliatesTableRow';

import type { SuperadminAffiliatesTableProps } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTableTypes';
import type { Affiliate, AffiliateStatus } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesTypes';



/**
 * @description Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesTable({ affiliates, onToggleStatus, onEdit, onDelete, onAddClick, onPayCommission, currentPage, totalPages, setPage }: SuperadminAffiliatesTableProps) {
  const t = useTranslations('superadmin_affiliates');
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse superadmin-mobile-card-table">
          <thead>
            <tr className="bg-primary-subtle border-b border-border" data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-1">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.partner_name_d78e689')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.referral_code_aaebd49')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.referral_count_63d1eb0')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.join_rate_026e96a')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.commission_earned_d380da6')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_1b84b5c')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">{t('ui.actions_56ec880')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {affiliates.length === 0 ? (<tr data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-2">
                <td colSpan={7} data-mobile-label={t('ui.mobile_partner_name')}><SuperadminAffiliatesEmptyState onAddClick={onAddClick} data-testid="superadmin_affiliates_table-superadmin-affiliates-empty-state-interactive-1"/></td>
              </tr>) : (affiliates.map((aff) => (<SuperadminAffiliatesTableRow key={aff.id} affiliate={aff} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} onPayCommission={onPayCommission} data-testid="superadmin_affiliates_table-superadmin-affiliates-table-row-interactive-2"/>)))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} data-testid="superadmin_affiliates-superadmin-affiliates-table-superadmin-affiliates-table-pagination"/>
    </div>);
}
