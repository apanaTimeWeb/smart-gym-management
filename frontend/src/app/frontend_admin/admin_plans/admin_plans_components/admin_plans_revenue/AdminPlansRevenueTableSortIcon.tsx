// RESPONSIBILITY: Renders the sortable-direction icon for one plan revenue table header.
"use client";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { RevenueSortDirection, RevenueSortKey } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTypes';

import type { AdminPlansRevenueTableSortIconProps } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansRevenueTableSortIconPropsTypes';


/**
 * AdminPlansRevenueTableSortIcon renders the admin plans revenue table sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminPlansRevenueTableSortIcon: Renders the sortable-direction icon for one plan revenue table header.
 * @dependencies Consumes AdminPlansRevenueTypes, AdminPlansRevenueTableSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminPlansRevenueTableSortIcon({ column, sortKey, sortDir }: AdminPlansRevenueTableSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
