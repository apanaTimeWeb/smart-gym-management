'use client';
// RESPONSIBILITY: Renders the Superadmin dashboard V1 DashboardBusinessOverviewHeader.
import { useTranslations } from 'next-intl';

import type { SuperadminDashboardV1SectionProps } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardV1Types';

/**
 * @description Renders the Superadmin dashboard V1 DashboardBusinessOverviewHeader.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminDashboardV1BusinessOverviewHeader({ data }: SuperadminDashboardV1SectionProps) {
  const t = useTranslations('superadmin_dashboard');
    return <div className="flex flex-col gap-1">
  <h2 className="text-lg font-semibold text-primary">
    
    {t('ui.income_retention_snapshot_c4fc3d9')}
  </h2>
  <p className="text-sm text-secondary">
    
    {t('ui.simple_labels_for_the_platform_numbers_that_expl_6ab13c4')}
  </p>
    </div>;
}
