'use client';
/**
 * RESPONSIBILITY: React component SuperadminInvoicesStatsBar owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesFormatCurrency, next-intl, lucide-react, @/lib/formatters, @/hooks/useDateRangeSuffix, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesStatsBarTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Superadmin invoices summary statistics.
import { AlertCircle, DollarSign } from 'lucide-react';
import { useLocale } from 'next-intl';

import { useDateRangeSuffix } from '@/hooks/useDateRangeSuffix';
import { formatNumber } from '@/lib/formatters';

import { formatCurrency as SuperadminInvoicesFormatCurrency } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesFormatCurrency';

import type { SuperadminInvoicesStatsBarProps } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesStatsBarTypes';



/** @description Displays invoice revenue and overdue KPIs from derived module-owned values. @dependencies Receives read-only statistics and currency presentation props. @edge-case Shows zero-safe values when a bucket has no records. */
export default function SuperadminInvoicesStatsBar({ totalRevenue, failedRevenue, pendingRevenue, overdueCount, currency = 'INR' }: SuperadminInvoicesStatsBarProps) {
    const locale = useLocale();

    const dateSuffix = useDateRangeSuffix(false);
    const cards = [
        { label: `Total Collected${dateSuffix}`, value: SuperadminInvoicesFormatCurrency(totalRevenue, currency, locale), tone: 'success', Icon: DollarSign },
        { label: `Failed Payments${dateSuffix}`, value: SuperadminInvoicesFormatCurrency(failedRevenue, currency, locale), tone: 'danger', Icon: AlertCircle },
        { label: `Pending Revenue${dateSuffix}`, value: SuperadminInvoicesFormatCurrency(pendingRevenue, currency, locale), tone: 'warning', Icon: DollarSign },
        { label: `Overdue Count${dateSuffix}`, value: formatNumber(overdueCount), tone: 'danger', Icon: AlertCircle },
    ] as const;
    return (<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, tone, Icon }) => (<div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card">
          <div className={`rounded-xl p-4 ${tone === 'success' ? 'bg-success-bg text-success' : tone === 'warning' ? 'bg-warning-bg text-warning' : 'bg-danger-bg text-danger'}`}>
            <Icon size={18} aria-hidden="true"/>
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">{label}</p>
            <p className={`text-3xl font-bold ${tone === 'danger' ? 'text-danger' : 'text-primary'}`}>{value}</p>
          </div>
        </div>))}
    </div>);
}
