// RESPONSIBILITY: Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.
// No manual check-in button — this is a read-only view for the gym owner (Admin role).
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminAttendanceKPIs from '@/app/admin/attendance/attendance_components/AdminAttendanceKPIs/AdminAttendanceKPIs';
import AdminAttendanceTrendChart from '@/app/admin/attendance/attendance_components/AdminAttendanceTrendChart/AdminAttendanceTrendChart';
import AdminAttendanceToolbar from '@/app/admin/attendance/attendance_components/AdminAttendanceToolbar/AdminAttendanceToolbar';
import AdminAttendanceTable from '@/app/admin/attendance/attendance_components/AdminAttendanceTable/AdminAttendanceTable';
import { useAdminAttendanceLogic } from '@/app/admin/attendance/attendance_context/useAdminAttendanceLogic';
import { RefreshCw, ShieldAlert } from 'lucide-react';

export default function AdminAttendanceMain() {
  const { fetchState, error, loadAll } = useAdminAttendanceLogic();

  return (
    <div className="min-h-full pb-10 bg-background text-foreground">
      <AdminHeader
        title="Attendance Overview"
        subtitle="Read-only daily attendance analytics across all branches"
      />

      {/* Read-only notice banner */}
      <div className="mx-6 mt-4 flex items-center gap-2.5 px-4 py-2.5 bg-info/10 border border-info/20 rounded-xl">
        <ShieldAlert size={15} strokeWidth={2} className="text-info flex-shrink-0" />
        <p className="text-xs text-info font-medium">
          View-only mode — Manual check-in is managed by Branch Managers.
        </p>
      </div>

      <div className="p-6 space-y-5">
        {fetchState === 'error' && (
          <div className="flex items-center justify-between bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">
            <p className="text-sm text-danger">{error}</p>
            <button
              onClick={() => void loadAll()}
              className="flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline"
            >
              <RefreshCw size={13} /> Retry
            </button>
          </div>
        )}

        <AdminAttendanceKPIs />

        <AdminAttendanceTrendChart />

        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Attendance Records</p>
          </div>
          <AdminAttendanceToolbar />
          <AdminAttendanceTable />
        </div>
      </div>
    </div>
  );
}
