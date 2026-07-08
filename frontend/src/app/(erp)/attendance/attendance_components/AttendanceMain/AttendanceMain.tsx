"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';

import { AttendanceProvider, useAttendanceContext } from '../../attendance_context/AttendanceContext';
import AttendanceKPIs from '../AttendanceKPIs/AttendanceKPIs';
import AttendanceToolbar from '../AttendanceToolbar/AttendanceToolbar';
import AttendanceTable from '../AttendanceTable/AttendanceTable';
import AttendanceModal from '../AttendanceModal/AttendanceModal';

import '../../attendance.css';

function AttendanceContent() {
  const { toast, hideToast } = useAttendanceContext();

  return (
    <div className="min-h-full pb-10 attendance-module bg-[var(--bg-page)] text-[var(--attendance-text-primary)]">
      <ErpHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
      <div className="p-6 space-y-5">
        <AttendanceKPIs />
        
        <div className="bg-[var(--attendance-bg-card)] rounded-xl shadow-sm border border-[var(--attendance-border)] overflow-hidden">
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
