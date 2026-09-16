'use client';
// RESPONSIBILITY: Renders the recent tenant onboarding records and navigates to the tenant detail page.
import { useRouter } from 'next/navigation';
import type { SuperadminDashboardRecentOnboardsProps } from '@/app/superadmin/dashboard/superadmin_dashboard_types/superadmin_dashboard_types';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_url_config';
import {
  DASHBOARD_PLAN_BADGE_CLASSES,
  DASHBOARD_PLAN_BADGE_FALLBACK_CLASS,
} from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardConstants';

export function SuperadminDashboardRecentOnboards({ recentOnboards }: SuperadminDashboardRecentOnboardsProps) {
  const router = useRouter();

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-foreground mb-6">Recent Onboards</h2>
      <div className="space-y-4">
        {recentOnboards.map((tenant) => {
          const planUpper = tenant.plan?.toUpperCase() ?? 'UNKNOWN';
          const planClass = DASHBOARD_PLAN_BADGE_CLASSES[planUpper] ?? DASHBOARD_PLAN_BADGE_FALLBACK_CLASS;
          return (
            <div
              key={tenant.id}
              onClick={() => router.push(`${DashboardUrlConfig.PAGES.GYMS}?id=${tenant.id}`)}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:bg-input motion-safe:transition-colors motion-safe:duration-200 cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-foreground truncate" title={tenant.name}>{tenant.name}</h3>
                <p className="text-xs text-secondary mt-1 truncate" title={tenant.ownerName}>{tenant.ownerName}</p>
              </div>
              <div className="ml-3 text-right flex flex-col items-end shrink-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${planClass}`}>
                  {planUpper}
                </span>
                <p className="text-xs text-disabled mt-2">{tenant.createdAt}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
