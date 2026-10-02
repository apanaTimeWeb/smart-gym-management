'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsTable owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTableRow, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTableTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls.
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminCouponsEmptyState from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState';
import SuperadminCouponsTableRow from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTableRow';

import type { SuperadminCouponsTableProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTableTypes';
import type { Coupon, CouponStatus } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';



const ITEMS_PER_PAGE = 10;
/**
 * @description Owns the SuperadminCouponsTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCouponsTable({ coupons, onToggleStatus, onEdit, onDelete, onRestore, onCreateClick }: SuperadminCouponsTableProps) {
  const t = useTranslations('superadmin_coupons');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(coupons.length / ITEMS_PER_PAGE) || 1;
    const paginatedCoupons = coupons.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.code_ca0dbad9')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.discount_104d9898')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.usage_c6451870')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_ec53a8c4')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.expiry_date_5abc7a3a')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedCoupons.length === 0 ? (<tr>
                <td colSpan={6}><SuperadminCouponsEmptyState onCreateClick={onCreateClick} data-testid="superadmin_coupons_table-superadmin-coupons-empty-state-interactive-1"/></td>
              </tr>) : (paginatedCoupons.map((cpn) => (<SuperadminCouponsTableRow key={cpn.id} coupon={cpn} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} onRestore={onRestore} data-testid="superadmin_coupons_table-superadmin-coupons-table-row-interactive-2"/>)))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} data-testid="superadmin_coupons-superadmin-coupons-table-superadmin-coupons-table-pagination"/>
    </div>);
}
