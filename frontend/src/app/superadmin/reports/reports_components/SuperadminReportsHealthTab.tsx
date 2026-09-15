// RESPONSIBILITY: Renders the Reports Health Tab component and its associated UI logic.
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { TenantHealthScore } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { formatNumber } from '@/lib/formatters';
import {
  GRADE_STYLES,
  PAYMENT_HEALTH_STYLES,
  TICKET_DANGER_THRESHOLD,
  TICKET_WARNING_THRESHOLD,
} from '@/app/superadmin/reports/reports_types/SuperadminReportsConstants';

export function SuperadminReportsHealthTab({
  sortedHealthData,
}: {
  sortedHealthData: TenantHealthScore[];
}) {
  function renderTicketCount(count: number) {
    const color =
      count > TICKET_DANGER_THRESHOLD
        ? 'text-danger'
        : count > TICKET_WARNING_THRESHOLD
        ? 'text-warning'
        : 'text-secondary';
    return <span className={`text-xs font-medium ${color}`}>{count}</span>;
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input/40">
              {['Gym', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment', 'Feature Use', 'Tickets'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedHealthData.map((row: TenantHealthScore) => (
              <tr key={row.id} className="hover:bg-input/30 motion-safe:transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{row.gymName}</td>
                <td className="px-4 py-3 text-secondary text-xs">{row.plan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-input rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${row.score >= 80 ? 'bg-success' : row.score >= 60 ? 'bg-primary' : row.score >= 40 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${row.score}%` }}
                      />
                    </div>
                    <span className="text-foreground font-medium text-xs">{row.score}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${GRADE_STYLES[row.grade]}`}>
                    {row.grade}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary">{formatNumber(row.memberCount)}</td>
                <td className="px-4 py-3 text-secondary text-xs">{row.lastLogin}</td>
                <td className="px-4 py-3">
                  <div className={`flex items-center gap-1 text-xs font-medium ${PAYMENT_HEALTH_STYLES[row.paymentHealth]}`}>
                    {row.paymentHealth === 'GOOD' && <CheckCircle2 size={18} strokeWidth={2} />}
                    {row.paymentHealth === 'AT_RISK' && <AlertTriangle size={18} strokeWidth={2} />}
                    {row.paymentHealth === 'OVERDUE' && <XCircle size={18} strokeWidth={2} />}
                    {row.paymentHealth}
                  </div>
                </td>
                <td className="px-4 py-3 text-secondary">{row.featureUsage}%</td>
                <td className="px-4 py-3">{renderTicketCount(row.supportTickets)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
