'use client';
import TrainerRouteErrorFallback from '@/app/trainer/trainer_components/TrainerFeedback/TrainerRouteErrorFallback';
import { AttendanceUrlConfig } from '@/app/trainer/attendance/attendance_url_config';

export default function AttendanceRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <TrainerRouteErrorFallback moduleName="attendance" route={AttendanceUrlConfig.PAGES.LIST} errorDigest={error.digest} reset={reset} />;
}
