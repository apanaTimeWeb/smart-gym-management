// RESPONSIBILITY: Renders report period/segment controls from server-provided definitions and exports the selected comparison dataset.
'use client';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { formatDecimal, formatNumber } from '@/lib/formatters';
import type { SuperadminReportsV1ComparisonControlsProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsV1ComparisonTypes';
import { createSuperadminReportsV1ComparisonCsv, getSuperadminReportsV1ComparisonMetrics } from '@/app/superadmin/reports/reports_utils/SuperadminReportsV1ComparisonUtils';

export default function SuperadminReportsV1ComparisonControls({ data, period, segment, onPeriodChange, onSegmentChange }: SuperadminReportsV1ComparisonControlsProps) {
  const metrics = useMemo(() => getSuperadminReportsV1ComparisonMetrics(data, period, segment), [data, period, segment]);
  const handleExport = async () => {
    try {
      const response = await fetch('/api/superadmin/export-data', { method: 'POST' });
      if (response.status === 202) {
        toast.success('Export started. A secure download link will be sent to your email.');
      } else {
        toast.error('Failed to start data export.');
      }
    } catch (e) {
      toast.error('Error starting data export.');
    }
  };
  const periodLabel = data.periods.find((item) => item.key === period)?.label ?? period;
  const segmentLabel = data.segments.find((item) => item.key === segment)?.label ?? segment;
  return <div className="space-y-3 rounded-xl border border-border bg-card p-4">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs uppercase tracking-wide text-secondary">Compare</p><p className="text-sm font-medium text-primary">{periodLabel}</p><p className="text-xs text-secondary" role="status">Segment: {segmentLabel} · {metrics.length} rows</p></div>
      <div className="flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="superadmin-reports-period">Period</label><select id="superadmin-reports-period" value={period} onChange={(event) => onPeriodChange(event.target.value)} className="min-h-11 rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{data.periods.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select><label className="sr-only" htmlFor="superadmin-reports-segment">Segment</label><select id="superadmin-reports-segment" value={segment} onChange={(event) => onSegmentChange(event.target.value)} className="min-h-11 rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{data.segments.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}</select><button type="button" onClick={handleExport} className="min-h-11 rounded-md border border-border px-3 py-2 text-sm text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Export comparison</button></div>
    </div>
    <div className="overflow-x-auto rounded-lg border border-border"><table className="w-full text-sm"><caption className="sr-only">{segmentLabel} report comparison for {periodLabel}</caption><thead><tr className="border-b border-border bg-input"><th scope="col" className="px-3 py-2 text-left text-xs uppercase text-secondary">Metric</th><th scope="col" className="px-3 py-2 text-right text-xs uppercase text-secondary">Current</th><th scope="col" className="px-3 py-2 text-right text-xs uppercase text-secondary">Previous</th><th scope="col" className="px-3 py-2 text-right text-xs uppercase text-secondary">Change</th></tr></thead><tbody className="divide-y divide-border">{metrics.map((metric) => <tr key={metric.name}><td className="px-3 py-2 text-primary">{metric.name}</td><td className="px-3 py-2 text-right text-primary">{formatNumber(metric.current)}</td><td className="px-3 py-2 text-right text-secondary">{formatNumber(metric.previous)}</td><td className="px-3 py-2 text-right text-secondary">{formatDecimal(metric.change, 1)}%</td></tr>)}</tbody></table></div>
  </div>;
}
