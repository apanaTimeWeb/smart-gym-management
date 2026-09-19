"use client";
// RESPONSIBILITY: Renders the sortable-direction icon for an Admin Reports attendance header.
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import type { AttendanceSortDirection, AttendanceSortKey } from '@/app/admin/reports/reports_types/AdminReportsAttendanceTypes';

import type { AdminReportsAttendanceSortIconProps } from '@/app/admin/reports/reports_types/AdminReportsAttendanceSortIconPropsTypes';


export default function AdminReportsAttendanceSortIcon({ column, sortKey, sortDir }: AdminReportsAttendanceSortIconProps) {
  if (column !== sortKey) return <ChevronsUpDown size={13} className="text-disabled" />;
  return sortDir === 'asc' ? <ChevronUp size={13} className="text-primary" /> : <ChevronDown size={13} className="text-primary" />;
}
