// RESPONSIBILITY: Renders the sortable-direction icon for one payouts summary table header.
"use client";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PayoutSortDirection, PayoutSortKey } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';

import type { AdminPayoutsSummaryTableSortIconProps } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsSummaryTableSortIconPropsTypes';


/**
 * AdminPayoutsSummaryTableSortIcon renders the admin payouts summary table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsSummaryTableSortIcon: Renders the sortable-direction icon for one payouts summary table header.
 * @dependencies Consumes AdminPayoutsTypes, AdminPayoutsSummaryTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsSummaryTableSortIcon({ column, sortKey, sortDir }: AdminPayoutsSummaryTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
