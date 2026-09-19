"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one Finance P&L table header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { PnlSortDirection, PnlSortKey } from '@/app/admin/finance/finance_types/AdminFinanceTypes';

import type { AdminFinancePnlTableSortIconProps } from '@/app/admin/finance/finance_types/AdminFinancePnlTableSortIconPropsTypes';


export default function AdminFinancePnlTableSortIcon({ column, sortKey, sortDir }: AdminFinancePnlTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
}
