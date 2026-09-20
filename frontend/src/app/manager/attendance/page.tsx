// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import { Suspense } from 'react';
import ManagerAttendanceMain from '@/app/manager/attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceMain';
import ManagerAttendanceLoading from '@/app/manager/attendance/loading';


export default function AttendancePage() {
 return (
    <Suspense fallback={<ManagerAttendanceLoading />}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}
