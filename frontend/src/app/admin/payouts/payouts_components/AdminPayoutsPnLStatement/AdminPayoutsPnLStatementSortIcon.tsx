"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one payouts P&L table header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PnlSortDirection, PnlSortKey } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';

import type { AdminPayoutsPnLStatementSortIconProps } from '@/app/admin/payouts/payouts_types/AdminPayoutsPnLStatementSortIconPropsTypes';


export default function AdminPayoutsPnLStatementSortIcon({ column, sortKey, sortDir }: AdminPayoutsPnLStatementSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}
