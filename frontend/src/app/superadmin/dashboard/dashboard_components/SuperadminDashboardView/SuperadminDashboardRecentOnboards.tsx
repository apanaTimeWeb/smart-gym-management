import { useRouter } from 'next/navigation';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export function SuperadminDashboardRecentOnboards({ recentOnboards }: { recentOnboards: Tenant[] }) {
  const router = useRouter();

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-base font-semibold text-foreground mb-6">Recent Onboards</h2>
      <div className="space-y-4">
        {recentOnboards.map((tenant) => {
          const planUpper = tenant.plan?.toUpperCase() ?? 'UNKNOWN';
          const planClass =
            planUpper === 'ENTERPRISE' ? 'bg-purple-bg text-purple border border-purple' :
            planUpper === 'PRO' ? 'bg-primary-subtle text-primary border border-primary' :
            (planUpper === 'STARTER' || planUpper === 'BASIC') ? 'bg-success-bg text-success border border-success' :
            'bg-input text-secondary border border-border';
          return (
            <div
              key={tenant.id}
              onClick={() => router.push(`/superadmin/gyms?id=${tenant.id}`)}
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
