import { Suspense } from 'react';
// RESPONSIBILITY: Renders the notifications page.
import type { Metadata } from 'next';
import TrainerNotificationsMain from '@/app/trainer/notifications/notifications_components/TrainerNotificationsMain/TrainerNotificationsMain';

export const metadata: Metadata = {
  title: 'Notifications | Trainer — GymSmart',
  description: 'View and manage your gym notifications.',
};

export default function TrainerNotificationsPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <TrainerNotificationsMain />
    </Suspense>
  );
}
