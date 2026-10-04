// RESPONSIBILITY: Renders/orchestrates SuperadminReportsHealthTab within its owning Superadmin feature module; no direct backend implementation.
'use client';
import SuperadminReportsProgressBar from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_components/SuperadminReportsProgressBar';
/**
 * RESPONSIBILITY: React component SuperadminReportsHealthTab owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes, @/lib/formatters, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Reports Health Tab component and its associated UI logic.
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { formatNumber } from '@/lib/formatters';

import { GRADE_STYLES, PAYMENT_HEALTH_STYLES, TICKET_DANGER_THRESHOLD, TICKET_WARNING_THRESHOLD, SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsConstants';

import type { SuperadminReportsHealthTabProps } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTabTypes';
import type { TenantHealthScore } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsTypes';


/**
 * Responsibility: Renders the SuperadminReportsHealthTab UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminReportsHealthTab({ sortedHealthData }: SuperadminReportsHealthTabProps) {
  const t = useTranslations('superadmin_reports');
    function renderTicketCount(count: number) {
        const color = count > TICKET_DANGER_THRESHOLD
            ? 'text-danger'
            : count > TICKET_WARNING_THRESHOLD
                ? 'text-warning'
                : 'text-secondary';
        return <span className={`text-xs font-medium ${color}`}>{count}</span>;
    }
    return (<div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-input">
              {['Gym', 'Plan', 'Score', 'Grade', 'Members', 'Last Login', 'Payment', 'Feature Use', 'Tickets'].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedHealthData.map((row) => (<tr key={row.id} className="hover:bg-input motion-safe:transition-colors">
                <td className="px-4 py-3 font-medium text-primary">{row.gymName}</td>
                <td className="px-4 py-3 text-secondary text-xs">{row.plan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-input rounded-full overflow-hidden">
                      <SuperadminReportsProgressBar value={row.score} className={row.score >= 80 ? 'bg-success-bg' : row.score >= 60 ? 'bg-primary-subtle' : row.score >= 40 ? 'bg-warning-bg' : 'bg-danger-bg'}  data-testid="superadmin-reports-superadmin-reports-health-tab-superadmin-reports-progress-bar-1"/>
                    </div>
                    <span className="text-primary font-medium text-xs">{formatNumber(row.score)}</span>
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
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.GOOD && <CheckCircle2 size={18} strokeWidth={2}/>}
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.AT_RISK && <AlertTriangle size={18} strokeWidth={2}/>}
                    {row.paymentHealth === SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES.OVERDUE && <XCircle size={18} strokeWidth={2}/>}
                    {row.paymentHealth}
                  </div>
                </td>
                <td className="px-4 py-3 text-secondary">{row.featureUsage}{t('ui.text_0bcef9c4')}</td>
                <td className="px-4 py-3">{renderTicketCount(row.supportTickets)}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
