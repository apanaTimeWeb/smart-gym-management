// RESPONSIBILITY: Renders the Superadmin invoices V1 InvoicesRecoverySummary summary cards.
'use client';

import { formatCurrency } from '@/app/superadmin/saas-billing/saas-billing_utils/formatCurrency';
import { useLocale } from 'next-intl';
import { formatNumber, formatDateTime } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminInvoicesV1SectionProps } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesV1Types.ts';
export default function SuperadminInvoicesV1RecoverySummaryCards({ data }: SuperadminInvoicesV1SectionProps) {
    const locale = useLocale();

    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
  <MetricCard label="Failed payments" value={formatNumber(data.summary.failed)} helper="Need action" tone="danger"/>
  <MetricCard label="In recovery" value={formatNumber(data.summary.inRecovery)} helper="Retry schedule active" tone="warning"/>
  <MetricCard label="Income recovered" value={formatCurrency(data.summary.recoveredIncome, data.summary.currency || 'INR', locale)} helper="Recovered this period" tone="success"/>
  <MetricCard label="Income still at risk" value={formatCurrency(data.summary.unrecoveredIncome, data.summary.currency || 'INR', locale)} helper="Needs review" tone="danger"/>
    </div>;
}
