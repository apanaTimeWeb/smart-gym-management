"use client";
// RESPONSIBILITY: Renders search input, status filter, branch filter, and date range filter for Admin Attendance.

import { Search } from 'lucide-react';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import { useAdminAttendanceBranchReference } from '@/app/admin/attendance/attendance_context/useAdminAttendanceBranchReference';
import { AdminSearchableDropdown } from '@/app/admin/admin_layout/AdminShared/AdminSearchableDropdown/AdminSearchableDropdown';
import { ATTENDANCE_STATUS_OPTIONS, DATE_RANGE_OPTIONS } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';
import type { AdminAttendanceBranchReference } from '@/app/admin/attendance/attendance_types/AdminAttendanceBranchReferenceTypes';

export default function AdminAttendanceToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, dateRange, setDateRange } =
    useAdminAttendanceStore();
  const { data: branches = [] } = useAdminAttendanceBranchReference();

  const branchOptions = [
    { value: 'all', label: 'All Branches' },
    ...(branches as AdminAttendanceBranchReference[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <span className="absolute inset-y-0 left-3 flex items-center"><Search size={16} className="text-secondary pointer-events-none" /></span>
        <input
          type="text"
          placeholder="Search by member name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary"
          aria-label="Search attendance records"
        />
      </div>
      <div className="w-full sm:w-44">
        <AdminSearchableDropdown
          options={DATE_RANGE_OPTIONS}
          value={dateRange}
          onChange={(v) => setDateRange(v as DateRangeFilter)}
          placeholder="Today"
        />
      </div>
      <div className="w-full sm:w-44">
        <AdminSearchableDropdown
          options={ATTENDANCE_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          value={statusFilter}
          onChange={(v) => setStatusFilter(v as AttendanceStatus | 'all')}
          placeholder="All Status"
        />
      </div>
      <div className="w-full sm:w-48">
        <AdminSearchableDropdown
          options={branchOptions}
          value={branchFilter}
          onChange={(v) => setBranchFilter(v as string)}
          placeholder="All Branches"
        />
      </div>
    </div>
  );
}