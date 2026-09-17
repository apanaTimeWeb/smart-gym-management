// RESPONSIBILITY: Root layout for the TRAINER module. Wraps all TRAINER pages with the sidebar layout and feedback providers.
import type { ReactNode } from 'react';
import TrainerLayout from '@/app/trainer/trainer_components/TrainerLayout/TrainerLayout';
import TrainerRoleGuard from '@/app/trainer/trainer_components/TrainerRoleGuard/TrainerRoleGuard';
import { TrainerConfirmProvider } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import TrainerToastHost from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToastHost';

export const metadata = {
  title: 'GymSmart TRAINER | Gym Management System',
  description: 'Complete gym management platform — members, attendance, finance, HR, and more.',
};

export default function TRAINERLayout({ children }: { children: ReactNode }) {
 return (
    <TrainerRoleGuard>
      <TrainerConfirmProvider>
        <TrainerLayout>{children}</TrainerLayout>
        <TrainerToastHost />
      </TrainerConfirmProvider>
    </TrainerRoleGuard>
  );
}

