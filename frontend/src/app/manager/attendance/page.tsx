import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import ManagerAttendanceLoading from '@/app/manager/attendance/loading';
import ManagerAttendanceMain from '@/app/manager/attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceMain';

export default function AttendancePage() {
 return (
    <Suspense fallback={<ManagerAttendanceLoading />}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}
