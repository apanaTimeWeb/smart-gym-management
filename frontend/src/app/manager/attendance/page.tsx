import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import ManagerAttendanceMain from '@/app/manager/attendance/attendance_components/ManagerAttendanceMain/ManagerAttendanceMain';

export default function AttendancePage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerAttendanceMain />
    </Suspense>
  );
}
