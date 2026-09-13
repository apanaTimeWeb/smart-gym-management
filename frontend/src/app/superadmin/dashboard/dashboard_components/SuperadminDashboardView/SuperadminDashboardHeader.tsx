import { SuperadminDateFilterDropdown } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateFilterDropdown';

export function SuperadminDashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SaaS Overview</h1>
        <p className="text-secondary mt-1 text-sm">
          Monitor the health and growth of your Multi-Tenant SaaS platform.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        <SuperadminDateFilterDropdown />
      </div>
    </div>
  );
}
