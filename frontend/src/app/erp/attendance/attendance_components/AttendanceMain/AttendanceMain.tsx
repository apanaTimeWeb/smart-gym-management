// RESPONSIBILITY: Entry component for the Attendance module that wraps the UI in the context provider and handles the core page layout.
"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';

import { AttendanceProvider, useAttendanceContext } from '@/app/erp/attendance/attendance_context/AttendanceContext';
import AttendanceKPIs from '@/app/erp/attendance/attendance_components/AttendanceKPIs/AttendanceKPIs';
import AttendanceToolbar from '@/app/erp/attendance/attendance_components/AttendanceToolbar/AttendanceToolbar';
import AttendanceTable from '@/app/erp/attendance/attendance_components/AttendanceTable/AttendanceTable';
import AttendanceModal from '@/app/erp/attendance/attendance_components/AttendanceModal/AttendanceModal';

function AttendanceContent() {
 const { toast, hideToast } = useAttendanceContext();

 return (
 <div className="min-h-full pb-10 attendance-module bg-background text-foreground">
 <ErpHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
 <div className="p-6 space-y-5">
 <AttendanceKPIs />
 
 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
 <AttendanceToolbar />
 <AttendanceTable />
 </div>
 </div>

 <AttendanceModal />

 {toast && (
 <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
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
