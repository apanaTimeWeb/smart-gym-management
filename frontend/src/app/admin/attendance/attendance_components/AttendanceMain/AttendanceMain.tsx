// RESPONSIBILITY: Entry component for the Attendance module that wraps the UI in the context provider and handles the core page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';

import { AttendanceProvider, useAttendanceContext } from '@/app/admin/attendance/attendance_context/AttendanceContext';
import AttendanceKPIs from '@/app/admin/attendance/attendance_components/AttendanceKPIs/AttendanceKPIs';
import AttendanceToolbar from '@/app/admin/attendance/attendance_components/AttendanceToolbar/AttendanceToolbar';
import AttendanceTable from '@/app/admin/attendance/attendance_components/AttendanceTable/AttendanceTable';
import AttendanceModal from '@/app/admin/attendance/attendance_components/AttendanceModal/AttendanceModal';

function AttendanceContent() {
 const { toast, hideToast } = useAttendanceContext();

 return (
 <div className="min-h-full pb-10 attendance-module bg-background text-foreground">
 <AdminHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
 <div className="p-6 space-y-5">
 <AttendanceKPIs />
 
 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
 <AttendanceToolbar />
 <AttendanceTable />
 </div>
 </div>

 <AttendanceModal />

 {toast && (
 <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
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
