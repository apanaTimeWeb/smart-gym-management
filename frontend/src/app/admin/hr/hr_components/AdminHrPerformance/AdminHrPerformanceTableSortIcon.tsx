"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for one HR performance table header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

import type { AdminHrPerformanceTableSortIconProps } from '@/app/admin/hr/hr_types/AdminHrPerformanceTableSortIconPropsTypes';


export default function AdminHrPerformanceTableSortIcon({ column, sortKey, sortDir }: AdminHrPerformanceTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={12} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
}
