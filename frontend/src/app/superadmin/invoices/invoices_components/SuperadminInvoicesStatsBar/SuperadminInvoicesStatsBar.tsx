// RESPONSIBILITY: Renders the Superadmin invoices summary statistics.
'use client';
import { AlertCircle, DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { useSuperadminDateRangeSuffix } from '@/app/superadmin/superadmin_components/SuperadminShared/useSuperadminDateRangeSuffix';
import type { SuperadminInvoicesStatsBarProps } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesStatsBarTypes';

export default function SuperadminInvoicesStatsBar({ totalRevenue, failedRevenue, pendingRevenue, overdueCount, }: SuperadminInvoicesStatsBarProps) {
    const dateSuffix = useSuperadminDateRangeSuffix(false);
    const cards = [
        { label: `Total Collected${dateSuffix}`, value: formatCurrency(totalRevenue), tone: 'success', Icon: DollarSign },
        { label: `Failed Payments${dateSuffix}`, value: formatCurrency(failedRevenue), tone: 'danger', Icon: AlertCircle },
        { label: `Pending Revenue${dateSuffix}`, value: formatCurrency(pendingRevenue), tone: 'warning', Icon: DollarSign },
        { label: `Overdue Count${dateSuffix}`, value: formatNumber(overdueCount), tone: 'danger', Icon: AlertCircle },
    ] as const;
    return (<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, tone, Icon }) => (<div key={label} className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card">
          <div className={`rounded-xl p-4 ${tone === 'success' ? 'bg-success/10 text-success' : tone === 'warning' ? 'bg-warning/10 text-warning' : 'bg-danger-bg/10 text-danger'}`}>
            <Icon size={32} aria-hidden="true"/>
          </div>
          <div>
            <p className="text-sm font-medium text-secondary">{label}</p>
            <p className={`text-3xl font-bold ${tone === 'danger' ? 'text-danger' : 'text-primary'}`}>{value}</p>
          </div>
        </div>))}
    </div>);
}
