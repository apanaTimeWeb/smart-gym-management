// RESPONSIBILITY: Renders the Superadmin invoices V1 InvoicesRecoverySummary summary cards.
'use client';
import { formatCurrency, formatNumber, formatDateTime } from '@/lib/formatters';
import SuperadminMetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminMetricCard';
import type { SuperadminInvoicesV1SectionProps } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesV1Types.ts';
export default function SuperadminInvoicesV1RecoverySummaryCards({ data }: SuperadminInvoicesV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
  <SuperadminMetricCard label="Failed payments" value={formatNumber(data.summary.failed)} helper="Need action" tone="danger"/>
  <SuperadminMetricCard label="In recovery" value={formatNumber(data.summary.inRecovery)} helper="Retry schedule active" tone="warning"/>
  <SuperadminMetricCard label="Income recovered" value={formatCurrency(data.summary.recoveredIncome)} helper="Recovered this period" tone="success"/>
  <SuperadminMetricCard label="Income still at risk" value={formatCurrency(data.summary.unrecoveredIncome)} helper="Needs review" tone="danger"/>
    </div>;
}
