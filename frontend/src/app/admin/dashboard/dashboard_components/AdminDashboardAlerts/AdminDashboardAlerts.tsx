"use client";
// RESPONSIBILITY: Renders/orchestrates AdminDashboardAlerts for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';
import { ShieldAlert, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AdminDashboardUrlConfig } from '@/app/admin/dashboard/admin_dashboard_url_config';

export default function AdminDashboardAlerts() {
  const { stats } = useAdminDashboardLogic();
  const router = useRouter();
  if (!stats?.systemAlerts) return null;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertCircle size={18} className="text-danger" />;
      case 'medium': return <AlertTriangle size={18} className="text-warning" />;
      default: return <Info size={18} className="text-primary" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-danger border-border';
      case 'medium': return 'bg-warning border-border';
      default: return 'bg-primary-subtle border-border';
    }
  };

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-danger text-danger rounded-xl">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-primary">System Alerts</h2>
            <p className="text-xs text-secondary">Action required</p>
          </div>
        </div>
        <span className="bg-danger text-on-danger text-xs font-bold px-2 py-0.5 rounded-full">
          {stats.systemAlerts.filter(a => a.severity === 'high').length} Critical
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        {stats.systemAlerts.length === 0 ? (
          <p className="text-sm text-secondary text-center py-4">No alerts at this time.</p>
        ) : (
          stats.systemAlerts.map(alert => (
            <div key={alert.id} className={`p-3 rounded-xl border flex items-start gap-3 motion-safe:transition-colors hover:bg-opacity-80 ${getSeverityStyle(alert.severity)}`}>
              <div className="mt-0.5 shrink-0">
                {getSeverityIcon(alert.severity)}
              </div>
              <div>
                <p className="text-sm font-medium text-primary">{alert.message}</p>
                <p className="text-xs text-secondary mt-1 uppercase font-semibold">
                  {new Date(alert.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {stats.systemAlerts.length > 0 && (
        <button onClick={() => router.push(AdminDashboardUrlConfig.routes.auditLogs)} className="w-full mt-4 py-2 border border-border rounded-lg text-xs font-bold text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base">
          View All Alerts
        </button>
      )}
    </div>
  );
}