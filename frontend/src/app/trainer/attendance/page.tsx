import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Attendance tracking module entry point.
import TrainerAttendanceMain from '@/app/trainer/attendance/attendance_components/TrainerAttendanceMain/TrainerAttendanceMain';

export default function AttendancePage() {
 return (
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerAttendanceMain />
    </Suspense>
  );
}

