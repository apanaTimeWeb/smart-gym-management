"use client";
// RESPONSIBILITY: Filter tabs and action buttons for the Admin Attendance module.
import { RefreshCw, PlusCircle } from "lucide-react";
import { useAdminAttendanceContext } from "@/app/admin/attendance/attendance_context/AdminAttendanceContext";
import { ADMIN_ATTENDANCE_FILTER_TABS } from "@/app/admin/attendance/attendance_utils/AdminAttendanceSharedConstants";
import type { AttendanceFilter } from "@/app/admin/attendance/attendance_types/admin_attendance_types";

export default function AdminAttendanceToolbar() {
  const { filter, setFilter, setShowModal, refresh } = useAdminAttendanceContext();
  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
      <div className="flex gap-1 bg-bg-page p-1 rounded-lg">
        {ADMIN_ATTENDANCE_FILTER_TABS.map(tab => (
          <button key={tab.id} onClick={() => setFilter(tab.id as AttendanceFilter)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === tab.id ? "bg-primary text-black shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={refresh} className="flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary border border-border rounded-lg hover:bg-bg-overlay transition-colors"><RefreshCw className="w-4 h-4" /> Refresh</button>
        <button id="admin-attendance-mark-btn" onClick={() => setShowModal(true)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-black rounded-lg transition-colors"><PlusCircle className="w-4 h-4" /> Mark Attendance</button>
      </div>
    </div>
  );
}
