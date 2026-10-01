'use client';
// RESPONSIBILITY: Renders the recent tenant onboarding records and navigates to the tenant detail page.
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import Tooltip from '@/components/ui/Tooltip';

import { DASHBOARD_PLAN_BADGE_CLASSES, DASHBOARD_PLAN_BADGE_FALLBACK_CLASS, } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';
import { SuperadminDashboardUrlConfig } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';

import type { SuperadminDashboardRecentOnboardsProps } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_types/SuperadminDashboardTypes';

/**
 * @description Renders the recent tenant onboarding records and navigates to the tenant detail page.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminDashboardRecentOnboards({ recentOnboards }: SuperadminDashboardRecentOnboardsProps) {
  const t = useTranslations('superadmin_dashboard');
    const router = useRouter();
    return (<div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <h2 className="text-base font-semibold text-primary mb-6">{t('ui.recent_onboards_bc6e20c')}</h2>
      <div className="space-y-4">
        {recentOnboards.map((tenant) => {
            const planUpper = tenant.plan?.toUpperCase() ?? 'UNKNOWN';
            const planClass = DASHBOARD_PLAN_BADGE_CLASSES[planUpper] ?? DASHBOARD_PLAN_BADGE_FALLBACK_CLASS;
            return (<div key={tenant.id} onClick={() => router.push(`${SuperadminDashboardUrlConfig.PAGES.GYMS}?id=${tenant.id}`)} data-testid={`superadmin_dashboard-recent-onboards-${tenant.id}-open`} className="flex items-center justify-between p-4 bg-page rounded-lg border border-border hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base cursor-pointer">
              <div className="min-w-0 flex-1">
                <Tooltip content={tenant.name}><h3 className="text-sm font-semibold text-primary truncate">{tenant.name}</h3></Tooltip>
                <Tooltip content={tenant.ownerName}><p className="text-xs text-secondary mt-1 truncate">{tenant.ownerName}</p></Tooltip>
              </div>
              <div className="ml-3 text-right flex flex-col items-end shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}>
                  {planUpper}
                </span>
                <p className="text-xs text-disabled mt-2">{tenant.createdAt}</p>
              </div>
            </div>);
        })}
      </div>
    </div>);
}
