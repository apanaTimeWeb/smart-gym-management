// RESPONSIBILITY: Renders search input, status filter, branch filter, and date range filter for Admin Attendance.
'use client';

import { Search } from 'lucide-react';
import { useAdminAttendanceStore } from '@/app/admin/attendance/attendance_store/useAdminAttendanceStore';
import { useAdminBranchesData } from '@/app/admin/admin_store/useAdminBranchesData';
import { AdminSearchableDropdown } from '@/app/admin/admin_components/AdminShared/AdminSearchableDropdown';
import { ATTENDANCE_STATUS_OPTIONS, DATE_RANGE_OPTIONS } from '@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants';
import type { AttendanceStatus, DateRangeFilter } from '@/app/admin/attendance/attendance_types/attendance_types';
import type { Branch } from '@/app/admin/admin_store/useAdminGlobalStore';

export default function AdminAttendanceToolbar() {
  const { search, setSearch, statusFilter, setStatusFilter, branchFilter, setBranchFilter, dateRange, setDateRange } =
    useAdminAttendanceStore();
  const { data: branches = [] } = useAdminBranchesData();

  const branchOptions = [
    { value: 'all', label: 'All Branches' },
    ...(branches as Branch[]).map((b) => ({ value: b.id, label: b.name })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative flex-1 min-w-48">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
        <input
          type="text"
          placeholder="Search by member name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary placeholder:text-secondary"
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
