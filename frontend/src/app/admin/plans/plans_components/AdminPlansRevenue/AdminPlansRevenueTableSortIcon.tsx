"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one plan revenue table header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { RevenueSortDirection, RevenueSortKey } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

import type { AdminPlansRevenueTableSortIconProps } from '@/app/admin/plans/plans_types/AdminPlansRevenueTableSortIconPropsTypes';


export default function AdminPlansRevenueTableSortIcon({ column, sortKey, sortDir }: AdminPlansRevenueTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
}
