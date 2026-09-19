import { Suspense } from 'react';
// RESPONSIBILITY: Server component entry point for the Trainer Schedule module.
import type { Metadata } from 'next';
import ManagerScheduleLoading from '@/app/manager/schedule/loading';
import ManagerScheduleMain from '@/app/manager/schedule/schedule_components/ManagerScheduleMain/ManagerScheduleMain';

export const metadata: Metadata = {
  title: 'Trainer Schedule | Manager | Smart Gym 360',
  description: 'View trainer availability, shift timings, and weekly schedule' };

export default function ManagerSchedulePage() {
  return (
    <Suspense fallback={<ManagerScheduleLoading />}>
      <ManagerScheduleMain />
    </Suspense>
  );
}
