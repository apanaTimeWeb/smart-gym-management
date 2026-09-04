// RESPONSIBILITY: Entry point for Admin Attendance page.
import type { Metadata } from "next";
import { AdminAttendanceProvider } from "@/app/admin/attendance/attendance_context/AdminAttendanceContext";
import AdminAttendanceKPIs from "@/app/admin/attendance/attendance_components/AdminAttendanceKPIs/AdminAttendanceKPIs";
import AdminAttendanceToolbar from "@/app/admin/attendance/attendance_components/AdminAttendanceToolbar/AdminAttendanceToolbar";
import AdminAttendanceTable from "@/app/admin/attendance/attendance_components/AdminAttendanceTable/AdminAttendanceTable";

export const metadata: Metadata = { title: "Attendance | Admin � GymSmart", description: "Track daily member and staff check-ins." };

export default function AdminAttendancePage() {
  return (
    <AdminAttendanceProvider>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div><h1 className="text-2xl font-bold text-text-primary">Attendance</h1><p className="text-sm text-text-secondary mt-1">Track daily check-ins for members and staff.</p></div>
        <AdminAttendanceKPIs />
        <AdminAttendanceToolbar />
        <AdminAttendanceTable />
      </div>
    </AdminAttendanceProvider>
  );
}
