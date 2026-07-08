"use client";

import Header from '@/components/Header';
import Toast from '@/components/Toast';

import { AttendanceProvider, useAttendanceContext } from './attendance_context/AttendanceContext';
import AttendanceKPIs from './attendance_components/AttendanceKPIs/AttendanceKPIs';
import AttendanceToolbar from './attendance_components/AttendanceToolbar/AttendanceToolbar';
import AttendanceTable from './attendance_components/AttendanceTable/AttendanceTable';
import AttendanceModal from './attendance_components/AttendanceModal/AttendanceModal';

import './attendance.css';

function AttendanceContent() {
  const { toast, hideToast } = useAttendanceContext();

  return (
    <div className="min-h-full pb-10 attendance-module bg-[var(--bg-page)] text-[var(--attendance-text-primary)]">
      <Header title="Attendance" subtitle="Track daily member and staff check-ins" />
      <div className="p-6 space-y-5">
        <AttendanceKPIs />
        
        <div className="bg-[var(--attendance-bg-card)] rounded-xl shadow-sm border border-[var(--attendance-border)] overflow-hidden">
          <AttendanceToolbar />
          <AttendanceTable />
        </div>
      </div>

      <AttendanceModal />

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}

export default function AttendancePage() {
  return (
    <AttendanceProvider>
      <AttendanceContent />
    </AttendanceProvider>
  );
}
