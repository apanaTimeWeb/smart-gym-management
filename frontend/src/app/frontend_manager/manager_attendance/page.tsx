// RESPONSIBILITY: Renders the manager_attendance route boundary (AttendancePage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerAttendanceLoading from '@/app/frontend_manager/manager_attendance/loading';
import ManagerAttendanceMain from '@/app/frontend_manager/manager_attendance/manager_attendance_components/manager_attendance_main/ManagerAttendanceMain';


/** @description Route-level AttendancePage for the Manager frontend module. */
export default function AttendancePage() {
 return (
    <Suspense fallback={<ManagerAttendanceLoading />}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}
