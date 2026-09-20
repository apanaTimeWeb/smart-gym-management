import { Suspense } from 'react';
import TrainerNotificationsLoadingSkeleton from '@/app/trainer/notifications/notifications_components/TrainerNotificationsLoadingSkeleton/TrainerNotificationsLoadingSkeleton';
// RESPONSIBILITY: Renders the notifications page.
import type { Metadata } from 'next';
import TrainerNotificationsMain from '@/app/trainer/notifications/notifications_components/TrainerNotificationsMain/TrainerNotificationsMain';

export const metadata: Metadata = {
  title: 'Notifications | Trainer — GymSmart',
  description: 'View and manage your gym notifications.',
};

export default function TrainerNotificationsPage() {
  return (
    <Suspense fallback={<TrainerNotificationsLoadingSkeleton />}>
      <TrainerNotificationsMain />
    </Suspense>
  );
}
