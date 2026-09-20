"use client";
// RESPONSIBILITY: Table of gym health alerts with severity badges, metrics, and resolve/dismiss actions.

import { CheckCircle, X, Building2, Clock } from 'lucide-react';
import { useAdminGymHealthAlertsLogic } from '@/app/admin/gym-health-alerts/gym_health_alerts_context/useAdminGymHealthAlertsLogic';
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';
import AdminPagination from '@/app/admin/admin_layout/AdminShared/AdminPagination';
import type { AlertSeverity, AlertType } from '@/app/admin/gym-health-alerts/gym_health_alerts_types/AdminGymHealthAlertsTypes';
import AdminGymHealthAlertsEmptyState from '@/app/admin/gym-health-alerts/gym_health_alerts_components/AdminGymHealthAlertsEmptyState/AdminGymHealthAlertsEmptyState';

const SEVERITY_STYLES: Record<AlertSeverity, string> = {
  critical: 'bg-danger text-on-danger',
  warning: 'bg-warning text-on-primary',
  info: 'bg-info text-on-info',
};

const TYPE_LABELS: Record<AlertType, string> = {
  no_new_members: 'No New Members',
  revenue_drop: 'Revenue Drop',
  high_cancellations: 'High Member Loss',
  pending_payroll: 'Pending Payroll',
  low_attendance: 'Low Attendance',
  expiring_members: 'Expiring Members',
};

const HEADERS = ['Gym', 'Alert', 'Type', 'Severity', 'Metric', 'Threshold', 'Detected', 'Status', 'Actions'];

export default function AdminGymHealthAlertsTable() {
  const { alerts, status, resolveAlert, dismissAlert, currentPage, setCurrentPage, totalPages, totalItems } = useAdminGymHealthAlertsLogic();

  if (status === 'pending') return <AdminTableSkeleton rows={5} cols={HEADERS.length} />;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead>
            <tr className="bg-warning-bg">
              {HEADERS.map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {alerts.length === 0 ? (
              <tr><td colSpan={HEADERS.length}><AdminGymHealthAlertsEmptyState /></td></tr>
            ) : alerts.map((alert) => (
              <tr key={alert.id} className={`motion-safe:transition-colors group ${alert.severity === 'critical' ? 'hover:bg-danger-bg' : alert.severity === 'warning' ? 'hover:bg-warning-bg' : 'hover:bg-info-bg'}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-secondary shrink-0" />
                    <span className="text-sm font-medium text-primary">{alert.gymName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 max-w-56">
                  <p className="text-sm font-medium text-primary">{alert.title}</p>
                  <p className="text-xs text-secondary mt-0.5 line-clamp-2">{alert.description}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-input text-secondary whitespace-nowrap">
                    {TYPE_LABELS[alert.alertType as AlertType]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${SEVERITY_STYLES[alert.severity as AlertSeverity]}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-primary whitespace-nowrap">{alert.metric}</td>
                <td className="px-4 py-3 text-xs text-secondary whitespace-nowrap">{alert.threshold}</td>
                <td className="px-4 py-3 text-xs text-secondary whitespace-nowrap">
                  {new Date(alert.detectedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="px-4 py-3">
                  {alert.isResolved ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success">
                      <CheckCircle size={11} /> Resolved
                    </span>
                  ) : (
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger text-on-danger">Active</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                    {!alert.isResolved && (
                      <>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="p-1.5 rounded-lg hover:bg-success-bg text-secondary hover:text-success motion-safe:transition-colors motion-safe:duration-base"
                          aria-label="Mark as resolved"
                        >
                          <CheckCircle size={15} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => dismissAlert(alert.id, alert.title)}
                      className="p-1.5 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base"
                      aria-label="Dismiss alert"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={totalItems} itemsPerPage={10} />
      </div>
    </div>
  );
}
