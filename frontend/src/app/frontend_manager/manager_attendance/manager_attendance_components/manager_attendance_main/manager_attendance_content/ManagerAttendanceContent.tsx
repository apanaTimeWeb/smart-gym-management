// RESPONSIBILITY: Renders ManagerAttendanceContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import ManagerAttendanceCalendar from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_calendar/ManagerAttendanceCalendar';
import ManagerAttendanceKPIs from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_kpis/ManagerAttendanceKPIs';
import ManagerAttendanceModal from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_modal/ManagerAttendanceModal';
import ManagerAttendanceQrScannerModal from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_qr_scanner/ManagerAttendanceQrScannerModal';
import ManagerAttendanceTable from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_table/ManagerAttendanceTable';
import ManagerAttendanceToolbar from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_toolbar/ManagerAttendanceToolbar';
import { useManagerAttendanceLogic } from '@/app/frontend_manager/manager_attendance/manager_attendance_hooks/useManagerAttendanceLogic';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';


/** @description Renders the ManagerAttendanceContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerAttendanceContent() {
  const t = useTranslations('MANAGER_ATTENDANCE');

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
  <ManagerHeader data-testid="manager_attendance-managerattendancecontent-managerheader-1" title={t("COPY_ATTENDANCE")} subtitle={t("COPY_TRACK_DAILY_MEMBER_STAFF_CHECK_INS")} />
  <div className="p-6 space-y-5">
  <ManagerAttendanceKPIs />
  
  <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
  <ManagerAttendanceToolbar />
  <ManagerAttendanceTable />
  </div>
  </div>

  <ManagerAttendanceModal />
  <ManagerAttendanceCalendar />
  <ManagerAttendanceQrScannerModal data-testid="manager_attendance-managerattendancecontent-managerattendanceqrscannermodal-2" open={scannerOpen} onClose={closeScanner} />

  {toast && (
 <ManagerToast data-testid="manager_attendance-managerattendancecontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />
 )}
 </div>
 );
}
