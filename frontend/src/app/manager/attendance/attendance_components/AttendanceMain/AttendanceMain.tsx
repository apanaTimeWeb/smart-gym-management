// RESPONSIBILITY: Entry component for the Attendance module that wraps the UI in the context provider and handles the core page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';

import { AttendanceProvider, useAttendanceContext } from '@/app/manager/attendance/attendance_context/AttendanceContext';
import AttendanceKPIs from '@/app/manager/attendance/attendance_components/AttendanceKPIs/AttendanceKPIs';
import AttendanceToolbar from '@/app/manager/attendance/attendance_components/AttendanceToolbar/AttendanceToolbar';
import AttendanceTable from '@/app/manager/attendance/attendance_components/AttendanceTable/AttendanceTable';
import AttendanceModal from '@/app/manager/attendance/attendance_components/AttendanceModal/AttendanceModal';
import AttendanceCalendar from '@/app/manager/attendance/attendance_components/AttendanceCalendar/AttendanceCalendar';

function AttendanceContent() {
  const { toast, hideToast } = useAttendanceContext();

  return (
  <div className="min-h-full pb-10 attendance-module bg-background text-foreground">
  <ManagerHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
  <div className="p-6 space-y-5">
  <AttendanceKPIs />
  
  <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
  <AttendanceToolbar />
  <AttendanceTable />
  </div>
  </div>

  <AttendanceModal />
  <AttendanceCalendar />

  {toast && (
 <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}

export default function AttendanceMain() {
 return (
 <AttendanceProvider>
 <AttendanceContent />
 </AttendanceProvider>
 );
}
