// RESPONSIBILITY: Renders the Superadmin dashboard V1 DashboardBusinessOverviewHeader.
'use client';
import type { SuperadminDashboardV1SectionProps } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types.ts';
export default function SuperadminDashboardV1BusinessOverviewHeader({ data }: SuperadminDashboardV1SectionProps) {
    return <div className="flex flex-col gap-1">
  <h2 className="text-lg font-semibold text-primary">
    Income & Retention Snapshot
  </h2>
  <p className="text-sm text-secondary">
    Simple labels for the platform numbers that explain where monthly income came from and where it went.
  </p>
    </div>;
}
