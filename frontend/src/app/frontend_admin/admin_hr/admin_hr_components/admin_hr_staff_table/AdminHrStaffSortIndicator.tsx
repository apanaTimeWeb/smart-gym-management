// RESPONSIBILITY: Renders the visual sort-direction indicator for the Admin HR staff table.
"use client";
import type { AdminHrStaffSortIndicatorProps } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrStaffSortIndicatorPropsTypes';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrSortTypes';


/**
 * AdminHrStaffSortIndicator renders the admin hr staff sort indicator UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrStaffSortIndicator: Renders the visual sort-direction indicator for the Admin HR staff table.
 * @dependencies Consumes AdminHrStaffSortIndicatorPropsTypes, AdminHrSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrStaffSortIndicator({ active, direction }: AdminHrStaffSortIndicatorProps) {
  if (!active) return <ChevronsUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-60"  size={18} strokeWidth={2}/>;
  return direction === 'asc' ? <ChevronUp aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/> : <ChevronDown aria-hidden="true" className="h-3.5 w-3.5"  size={18} strokeWidth={2}/>;
}
