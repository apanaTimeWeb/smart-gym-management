import { Suspense } from 'react';
import TrainerAttendanceLoadingSkeleton from '@/app/trainer/attendance/attendance_components/TrainerAttendanceLoadingSkeleton/TrainerAttendanceLoadingSkeleton';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import TrainerAttendanceMain from '@/app/trainer/attendance/attendance_components/TrainerAttendanceMain/TrainerAttendanceMain';

export default function AttendancePage() {
 return (
    <Suspense fallback={<TrainerAttendanceLoadingSkeleton />}>
      <TrainerAttendanceMain />
    </Suspense>
  );
}

