// RESPONSIBILITY: Renders the sortable-direction icon for one payouts P&L table header.
"use client";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PnlSortDirection, PnlSortKey } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsTypes';

import type { AdminPayoutsPnLStatementSortIconProps } from '@/app/frontend_admin/admin_payouts/admin_payouts_types/AdminPayoutsPnLStatementSortIconPropsTypes';


/**
 * AdminPayoutsPnLStatementSortIcon renders the admin payouts pn lstatement sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPayoutsPnLStatementSortIcon: Renders the sortable-direction icon for one payouts P&L table header.
 * @dependencies Consumes AdminPayoutsTypes, AdminPayoutsPnLStatementSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPayoutsPnLStatementSortIcon({ column, sortKey, sortDir }: AdminPayoutsPnLStatementSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
