// RESPONSIBILITY: Server Component route entry that renders the Attendance client boundary without duplicating client data requests.
import { Suspense } from 'react';

import TrainerAttendanceLoadingSkeleton from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_loading_skeleton/TrainerAttendanceLoadingSkeleton';

import TrainerAttendanceMain from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_main/TrainerAttendanceMain';





/**
 * @description Provides the server-owned Next.js route entry point for the attendance feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendancePage() {
 return (
    <Suspense fallback={<TrainerAttendanceLoadingSkeleton />}>
      <TrainerAttendanceMain />
    </Suspense>
  );
}

