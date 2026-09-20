// RESPONSIBILITY: Server Component route layout for the Trainer role; delegates browser-only shell behavior to TrainerLayoutClient.
import type { ReactNode } from 'react';
import TrainerLayoutClient from '@/app/trainer/trainer_components/TrainerLayout/TrainerLayoutClient';
import TrainerRoleGuard from '@/app/trainer/trainer_components/TrainerRoleGuard/TrainerRoleGuard';

export default function TrainerLayout({ children }: { children: ReactNode }) {
  return <TrainerRoleGuard><TrainerLayoutClient>{children}</TrainerLayoutClient></TrainerRoleGuard>;
}
