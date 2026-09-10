'use client';
// RESPONSIBILITY: Renders the paginated churn alerts table.
// Receives filtered data from parent — owns no filter or fetch state.

import { AlertTriangle, Phone, Mail, Edit2 } from 'lucide-react';
import { maskSensitiveData, formatCurrency, displayValue } from '@/lib/formatters';
import {
  CHURN_RISK_STYLES,
  CHURN_ACTION_STATUS_STYLES,
} from '@/app/superadmin/churn-alerts/churn_utils/churn_constants';
import type { ChurnAlert } from '@/app/superadmin/churn-alerts/churn_types/churn_types';

interface SuperadminChurnTableProps {
  alerts: ChurnAlert[];
  onActionClick: (alert: ChurnAlert) => void;
}

export default function SuperadminChurnTable({ alerts, onActionClick }: SuperadminChurnTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-input/40">
            {['Tenant', 'Plan', 'Risk Level', 'Risk Score', 'Last Login', 'Member Drop', 'MRR', 'Last Payment', 'Contract End', 'Action Status', 'Actions'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {alerts.map((alert) => (
            <tr
              key={alert.id}
              className="hover:bg-input/30 motion-safe:transition-colors group"
            >
              <td className="px-4 py-3">
                <p className="font-medium text-foreground truncate max-w-[160px]">{alert.gymName}</p>
                <p className="text-xs text-secondary truncate max-w-[160px]">{alert.ownerName}</p>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs font-medium text-secondary">{alert.plan}</span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${CHURN_RISK_STYLES[alert.riskLevel]}`}>
                  {alert.riskLevel === 'CRITICAL' && <AlertTriangle size={10} strokeWidth={2} />}
                  {alert.riskLevel}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-input rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${alert.riskScore >= 80 ? 'bg-danger' : alert.riskScore >= 60 ? 'bg-warning' : 'bg-success'}`}
                      style={{ width: `${alert.riskScore}%` }}
                    />
                  </div>
                  <span className="text-xs text-secondary">{alert.riskScore}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs ${alert.lastLoginDays >= 14 ? 'text-danger' : 'text-secondary'}`}>
                  {alert.lastLoginDays}d ago
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs font-medium ${alert.memberDrop >= 20 ? 'text-danger' : 'text-warning'}`}>
                  -{alert.memberDrop}%
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-xs font-medium text-foreground">
                  {formatCurrency(alert.mrrAtRisk)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs text-secondary">
                  {displayValue(alert.lastPaymentDate ? new Date(alert.lastPaymentDate).toLocaleDateString('en-IN') : null)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-xs text-secondary">
                  {displayValue(alert.contractEndDate ? new Date(alert.contractEndDate).toLocaleDateString('en-IN') : null)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${CHURN_ACTION_STATUS_STYLES[alert.actionStatus]}`}>
                  {alert.actionStatus}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity">
                  <a
                    href={`mailto:${alert.adminEmail}`}
                    aria-label={`Email ${alert.gymName}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Mail size={18} strokeWidth={2} />
                  </a>
                  <a
                    href={`tel:${alert.phone}`}
                    aria-label={`Call ${alert.gymName}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-secondary hover:text-foreground hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Phone size={18} strokeWidth={2} />
                  </a>
                  <button
                    onClick={(e) => { e.stopPropagation(); onActionClick(alert); }}
                    aria-label={`Update action for ${alert.gymName}`}
                    className="p-1.5 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Edit2 size={18} strokeWidth={2} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
