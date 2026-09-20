// RESPONSIBILITY: Renders the branded Manager maintenance not-found state and recovery action.
import { ManagerMaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';

export default function NotFound() {
  return (
    <div className="m-4 sm:m-6 rounded-xl border border-border bg-card p-8 text-center shadow-card">
      <h2 className="text-lg font-bold text-primary">Maintenance record not found</h2>
      <p className="mt-2 text-sm text-secondary">The requested maintenance issue does not exist or is no longer available.</p>
      <a href={ManagerMaintenanceUrlConfig.PAGES.HOME} className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-semibold text-on-primary">Back to Maintenance</a>
    </div>
  );
}
