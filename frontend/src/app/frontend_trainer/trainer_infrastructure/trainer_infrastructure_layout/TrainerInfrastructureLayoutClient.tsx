"use client";
// RESPONSIBILITY: Client-only authenticated Trainer shell; owns sidebar UI state and derives the current route's presentation metadata.
/**
 * @description Renders the authenticated Trainer shell and connects role-owned navigation with approved global feedback/realtime infrastructure.
 * @dependencies Uses Trainer route configuration, shell primitives, confirmation/toast infrastructure, and the centralized Trainer socket provider.
 * @edge-cases Preserves collapsed-sidebar state, nested route title resolution, fixed shell offsets, and safe recovery around child route errors.
 */
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { usePathname } from 'next/navigation';

import { TRAINER_ROUTE_TITLE_MAP } from '@/app/frontend_trainer/trainer_navigation/TrainerNavigationConstants';

import { TrainerInfrastructureConfirmProvider } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/TrainerInfrastructureConfirmProvider';

import TrainerInfrastructureToastHost from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_feedback/TrainerInfrastructureToastHost';

import TrainerInfrastructureCommandPalette from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureCommandPalette';

import TrainerInfrastructureHeader from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureHeader';

import '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureShell.css';

import TrainerInfrastructureSidebar from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureSidebar';

import TrainerInfrastructureSocketProvider from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_realtime/TrainerInfrastructureSocketProvider';

import { TrainerUrlConfig } from '@/app/frontend_trainer/trainer_url_config';

import type { TrainerInfrastructureLayoutClientProps } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_layout/TrainerInfrastructureLayoutClientProps';

/**
 * @description Owns TrainerInfrastructureLayoutClient behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureLayoutClient, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureLayoutClient({ children }: TrainerInfrastructureLayoutClientProps) {
  const t = useTranslations('TRAINER_SHELL');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const baseRoute = Object.keys(TRAINER_ROUTE_TITLE_MAP).find((route) => pathname === route || pathname.startsWith(`${route}/`)) ?? '';
  const headerProps = TRAINER_ROUTE_TITLE_MAP[baseRoute] ?? { titleKey: 'TEXT_GYMSMART_TRAINER', subtitleKey: 'TEXT_DEFAULT_SHELL_SUBTITLE' };

  return (
    <TrainerInfrastructureConfirmProvider>
      <TrainerInfrastructureSocketProvider>
      <div className="min-h-screen bg-page text-primary">
        <TrainerInfrastructureCommandPalette />
        <TrainerInfrastructureHeader title={t(headerProps.titleKey)} subtitle={t(headerProps.subtitleKey)} />
        <TrainerInfrastructureSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`min-h-screen pt-16 trainer-shell-scrollbar overflow-y-auto motion-safe:transition-all motion-safe:duration-base motion-reduce:transition-none ${isCollapsed ? "trainer-shell-content-offset-collapsed" : "trainer-shell-content-offset"}`}>
          {children}
        </main>
        <TrainerInfrastructureToastHost />
      </div>
      </TrainerInfrastructureSocketProvider>
    </TrainerInfrastructureConfirmProvider>
  );
}
