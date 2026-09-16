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
    <Suspense fallback={<div className="p-6 space-y-3"><div className="h-6 w-48 rounded bg-skeleton-base motion-safe:animate-pulse" /><div className="h-32 w-full rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>}>
      <TrainerNotificationsMain />
    </Suspense>
  );
}
