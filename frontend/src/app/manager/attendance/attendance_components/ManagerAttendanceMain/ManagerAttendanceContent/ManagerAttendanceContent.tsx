// RESPONSIBILITY: Renders the ManagerAttendanceContent sub-view extracted from ManagerAttendanceMain; owns only this presentation responsibility.
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import ManagerAttendanceCalendar from '@/app/manager/attendance/attendance_components/AttendanceCalendar/ManagerAttendanceCalendar';
import ManagerAttendanceModal from '@/app/manager/attendance/attendance_components/AttendanceModal/ManagerAttendanceModal';
import ManagerAttendanceTable from '@/app/manager/attendance/attendance_components/AttendanceTable/ManagerAttendanceTable';
import ManagerAttendanceToolbar from '@/app/manager/attendance/attendance_components/AttendanceToolbar/ManagerAttendanceToolbar';
import ManagerAttendanceKPIs from '@/app/manager/attendance/attendance_components/ManagerAttendanceKPIs/ManagerAttendanceKPIs';
import ManagerQrScannerModal from '@/app/manager/attendance/attendance_components/ManagerQrScanner/ManagerQrScannerModal';
import { useManagerAttendanceLogic  } from '@/app/manager/attendance/attendance_hooks/ManagerUseManagerAttendanceLogic';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';


export function ManagerAttendanceContent() {
  const { toast, hideToast } = useManagerAttendanceLogic();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scannerOpen = searchParams.get('qrScanner') === 'open';
  const closeScanner = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('qrScanner');
    const query = params.toString();
    router.replace(query ? `?${query}` : window.location.pathname, { scroll: false });
  };

  return (
  <div className="min-h-full pb-10 attendance-module bg-page text-primary">
  <ManagerHeader title="Attendance" subtitle="Track daily member and staff check-ins" />
  <div className="p-6 space-y-5">
  <ManagerAttendanceKPIs />
  
  <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
  <ManagerAttendanceToolbar />
  <ManagerAttendanceTable />
  </div>
  </div>

  <ManagerAttendanceModal />
  <ManagerAttendanceCalendar />
  <ManagerQrScannerModal open={scannerOpen} onClose={closeScanner} />

  {toast && (
 <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
