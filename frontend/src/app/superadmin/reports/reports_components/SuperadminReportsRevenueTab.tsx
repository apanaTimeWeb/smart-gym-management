import dynamic from 'next/dynamic';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
import type { RevenueRow } from '@/app/superadmin/reports/reports_types/reports_types';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function SuperadminReportsRevenueTab({
  revenueData,
}: {
  revenueData: RevenueRow[];
}) {
  const revenueChartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
    colors: [CHART_COLORS.PRIMARY, CHART_COLORS.DANGER],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.02, stops: [0, 90, 100] } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: {
      categories: revenueData.map((d) => d.month),
      axisBorder: { show: false }, axisTicks: { show: false },
      labels: { style: { colors: CHART_COLORS.TEXT_SECONDARY } },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_COLORS.TEXT_SECONDARY },
        formatter: (v: number) => `₹${(v / 1000).toFixed(0)}k`,
      },
    },
    grid: { borderColor: CHART_COLORS.BORDER, strokeDashArray: 4 },
    legend: { labels: { colors: CHART_COLORS.TEXT_SECONDARY }, position: 'top' as const, horizontalAlign: 'left' as const },
    theme: { mode: 'dark' as const },
    tooltip: { theme: 'dark' as const },
  };

  const revenueChartSeries = [
    { name: 'MRR', data: revenueData.map((d) => d.mrr) },
    { name: 'Churned Revenue', data: revenueData.map((d) => d.churnedRevenue) },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-foreground mb-6">MRR vs Churned Revenue</h2>
        <div className="h-72">
          <Chart options={revenueChartOptions} series={revenueChartSeries} type="area" height="100%" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input/40">
                {['Month', 'MRR', 'New Revenue', 'Churned', 'Net Revenue', 'Tenants'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {revenueData.map((row: RevenueRow) => (
                <tr key={row.month} className="hover:bg-input/30 motion-safe:transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{row.month}</td>
                  <td className="px-4 py-3 text-foreground">₹{row.mrr.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-success">+₹{row.newRevenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-danger">-₹{row.churnedRevenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 font-semibold text-foreground">₹{row.netRevenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-secondary">{row.tenantCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
