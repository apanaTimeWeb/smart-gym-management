// RESPONSIBILITY: Renders the Reports Cancellations Tab component and its associated UI logic.
import dynamic from 'next/dynamic';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import type { CancellationsRecord } from '@/app/superadmin/reports/reports_types/superadmin_reports_types';
import { formatCurrency } from '@/lib/formatters';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export function SuperadminReportsCancellationsTab({ cancellationsData, filteredCancellationsData, totalCancelledRevenue, avgDaysActive, }: {
    cancellationsData: CancellationsRecord[];
    filteredCancellationsData: CancellationsRecord[];
    totalCancelledRevenue: number;
    avgDaysActive: number;
}) {
    const cancellationsReasonCounts = cancellationsData.reduce<Record<string, number>>((acc, c) => {
        acc[c.reason] = (acc[c.reason] ?? 0) + 1;
        return acc;
    }, {});
    const cancellationsPieOptions = {
        chart: { type: 'donut' as const, background: 'transparent' },
        colors: [CHART_COLORS.DANGER, CHART_COLORS.WARNING, CHART_COLORS.PRIMARY, CHART_COLORS.INFO, CHART_COLORS.SUCCESS],
        labels: Object.keys(cancellationsReasonCounts),
        legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'bottom' as const },
        theme: { mode: 'dark' as const },
        tooltip: { theme: 'dark' as const },
        dataLabels: { style: { colors: [CHART_COLORS.WHITE] } },
    };
    const cancellationsPieSeries = Object.values(cancellationsReasonCounts);
    return (<div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-6">Reasons for Leaving</h2>
          <div className="h-64">
            <Chart options={cancellationsPieOptions} series={cancellationsPieSeries} type="donut" height="100%"/>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-base font-semibold text-foreground mb-2">Lost Gyms Summary</h2>
          <div className="flex justify-between text-sm"><span className="text-secondary">Filtered Lost Gyms</span><span className="text-foreground font-medium">{filteredCancellationsData.length}</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">Total Lost Monthly Income</span><span className="text-danger font-medium">{formatCurrency(totalCancelledRevenue)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">Avg Days Active Before Leaving</span><span className="text-foreground font-medium">{avgDaysActive} days</span></div>
          <div className="flex justify-between text-sm"><span className="text-secondary">Top Reason for Leaving</span><span className="text-foreground font-medium">Too expensive</span></div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input/40">
                {['Gym', 'Plan', 'Left On', 'Reason', 'Lost Monthly Income', 'Days Active'].map((h) => (<th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCancellationsData.map((row: CancellationsRecord) => (<tr key={row.id} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{row.gymName}</p>
                    <p className="text-xs text-secondary">{row.ownerName}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary">{row.plan}</td>
                  <td className="px-4 py-3 text-secondary">{row.cancelledAt}</td>
                  <td className="px-4 py-3 text-secondary">{row.reason}</td>
                  <td className="px-4 py-3 text-danger font-medium">{formatCurrency(row.mrr)}</td>
                  <td className="px-4 py-3 text-secondary">{row.daysActive}d</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
