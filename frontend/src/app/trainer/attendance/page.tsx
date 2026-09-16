import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import TrainerAttendanceMain from '@/app/trainer/attendance/attendance_components/TrainerAttendanceMain/TrainerAttendanceMain';

export default function AttendancePage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerAttendanceMain />
    </Suspense>
  );
}

