// RESPONSIBILITY: Server Component route layout for the Trainer role; delegates browser-only shell behavior to TrainerInfrastructureLayoutClient.
import { Inter } from 'next/font/google';

import TrainerInfrastructureLayoutClient from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureLayoutClient';

import TrainerInfrastructureRoleGuard from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_role_guard/TrainerInfrastructureRoleGuard';

import type { ReactNode } from 'react';





/**
 * @description Owns the authenticated Trainer role shell and composes the role-scoped layout infrastructure for layout.tsx.
 * @dependencies Uses only documented layout.tsx module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
const trainerInter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export default function TrainerLayout({ children }: { children: ReactNode }) {
  return <TrainerInfrastructureRoleGuard><div className={trainerInter.className}><TrainerInfrastructureLayoutClient>{children}</TrainerInfrastructureLayoutClient></div></TrainerInfrastructureRoleGuard>;
}
