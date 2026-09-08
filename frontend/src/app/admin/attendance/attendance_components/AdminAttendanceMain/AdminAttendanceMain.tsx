// RESPONSIBILITY: Entry component for the Attendance module that wraps the UI in the context provider and handles the core page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';

import { AttendanceProvider, useAttendanceContext } from '@/app/admin/attendance/attendance_context/AdminAttendanceContext';
import AdminAttendanceKPIs from '@/app/admin/attendance/attendance_components/AdminAttendanceKPIs/AdminAttendanceKPIs';
import AttendanceToolbar from '@/app/admin/attendance/attendance_components/AttendanceToolbar/AdminAttendanceToolbar';
import AttendanceTable from '@/app/admin/attendance/attendance_components/AttendanceTable/AdminAttendanceTable';
import AttendanceModal from '@/app/admin/attendance/attendance_components/AttendanceModal/AdminAttendanceModal';
import AttendanceCalendar from '@/app/admin/attendance/attendance_components/AttendanceCalendar/AdminAttendanceCalendar';

function AttendanceContent() {
  const { toast, hideToast } = useAttendanceContext();

  return (
  <div className="min-h-full pb-10 attendance-module bg-background text-foreground">
  <AdminHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
  <div className="p-6 space-y-5">
  <AdminAttendanceKPIs />
  
  <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
  <AttendanceToolbar />
  <AttendanceTable />
  </div>
  </div>

  <AttendanceModal />
  <AttendanceCalendar />

  {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function AdminAttendanceMain() {
 return (
 <AttendanceProvider>
 <AttendanceContent />
 </AttendanceProvider>
 );
}
