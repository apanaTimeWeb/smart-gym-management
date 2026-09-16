// RESPONSIBILITY: Root layout for the TRAINER module. Wraps all TRAINER pages with the sidebar layout and feedback providers.
import React from 'react';
import TrainerLayout from '@/app/trainer/trainer_components/TrainerLayout/TrainerLayout';
import TrainerRoleGuard from '@/app/trainer/trainer_components/TrainerRoleGuard/TrainerRoleGuard';
import { TrainerConfirmProvider } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { TrainerNotificationsProvider } from '@/app/trainer/notifications/notifications_context/TrainerNotificationsContext';

export const metadata = {
  title: 'GymSmart TRAINER | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

export default function TRAINERLayout({ children }: { children: React.ReactNode }) {
 return (
    <TrainerRoleGuard>
      <TrainerConfirmProvider>
      <TrainerNotificationsProvider>
        <TrainerLayout>{children}</TrainerLayout>
      </TrainerNotificationsProvider>
    </TrainerConfirmProvider>
    </TrainerRoleGuard>
  );
}

