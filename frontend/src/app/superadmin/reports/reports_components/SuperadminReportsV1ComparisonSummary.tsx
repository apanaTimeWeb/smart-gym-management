// RESPONSIBILITY: Renders the Superadmin reports V1 ReportsComparisonSummary.
'use client';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminReportsV1SectionProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1Types.ts';
export default function SuperadminReportsV1ComparisonSummary({ data }: SuperadminReportsV1SectionProps) {
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
  {data.metrics.map((m) => <MetricCard key={m.name} label={m.name} value={m.name.includes('income') ? formatCurrency(m.current) : m.name.includes('churn') || m.name.includes('retention') ? formatPercent1dp(m.current) : formatNumber(m.current)} helper={`Previous: ${m.name.includes('income') ? formatCurrency(m.previous) : m.name.includes('churn') || m.name.includes('retention') ? formatPercent1dp(m.previous) : formatNumber(m.previous)}`} tone={m.change < 0 ? (m.name.includes('churn') ? 'success' : 'danger') : 'success'}/>)}
    </div>;
}
