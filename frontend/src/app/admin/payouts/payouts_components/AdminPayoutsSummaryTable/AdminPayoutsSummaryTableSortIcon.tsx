"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one payouts summary table header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PayoutSortDirection, PayoutSortKey } from '@/app/admin/payouts/payouts_types/AdminPayoutsTypes';

import type { AdminPayoutsSummaryTableSortIconProps } from '@/app/admin/payouts/payouts_types/AdminPayoutsSummaryTableSortIconPropsTypes';


export default function AdminPayoutsSummaryTableSortIcon({ column, sortKey, sortDir }: AdminPayoutsSummaryTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}
