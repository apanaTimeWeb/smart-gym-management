// RESPONSIBILITY: Renders the sortable-direction icon for an Admin Reports attendance header.
"use client";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AttendanceSortDirection, AttendanceSortKey } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsAttendanceTypes';

import type { AdminReportsAttendanceSortIconProps } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsAttendanceSortIconPropsTypes';


/**
 * AdminReportsAttendanceSortIcon renders the admin reports attendance sort icon UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminReportsAttendanceSortIcon: Renders the sortable-direction icon for an Admin Reports attendance header.
 * @dependencies Consumes AdminReportsAttendanceTypes, AdminReportsAttendanceSortIconPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminReportsAttendanceSortIcon({ column, sortKey, sortDir }: AdminReportsAttendanceSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={18} className="text-disabled"  strokeWidth={2}/>;
  return sortDir === 'asc' ? <ChevronUp size={18} className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} className="text-primary"  strokeWidth={2}/>;
}
