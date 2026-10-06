// RESPONSIBILITY: Renders the manager_schedule route boundary (ManagerSchedulePage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerScheduleLoading from '@/app/frontend_manager/manager_schedule/loading';
import ManagerScheduleMain from '@/app/frontend_manager/manager_schedule/manager_schedule_components/manager_schedule_main/ManagerScheduleMain';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Trainer Schedule | Manager | Smart Gym 360',
  description: 'View trainer availability, shift timings, and weekly schedule' };

/** @description Route-level ManagerSchedulePage for the Manager frontend module. */
export default function ManagerSchedulePage() {
  return (
    <Suspense fallback={<ManagerScheduleLoading />}>
      <ManagerScheduleMain />
    </Suspense>
  );
}
