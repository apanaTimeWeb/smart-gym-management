// RESPONSIBILITY: Server component entry point for the Trainer Schedule module.
import { Suspense } from 'react';
import ManagerScheduleLoading from '@/app/manager/schedule/loading';
import ManagerScheduleMain from '@/app/manager/schedule/schedule_components/ManagerScheduleMain/ManagerScheduleMain';
import type { Metadata } from 'next';


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
