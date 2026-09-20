// RESPONSIBILITY: Renders the Dashboard revenue, growth, plan, and geography ApexCharts. No data fetching.
'use client';
import dynamic from 'next/dynamic';
import { SUPERADMIN_DASHBOARD_CHART_COLORS } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardConstants';
import type { SuperadminDashboardChartsProps, RevenueChartData, GrowthChartData } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardTypes';
import { formatCurrency, formatNumber } from '@/lib/formatters';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export function SuperadminDashboardCharts({ metrics, revenueChartData, growthChartData, timeMultiplier, mrrLabel }: SuperadminDashboardChartsProps) {
    const chartOptions = {
        chart: { type: 'area' as const, toolbar: { show: false }, background: 'transparent' },
        colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY],
        fill: {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] },
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' as const, width: 2 },
        xaxis: {
            categories: revenueChartData.map((d: RevenueChartData) => d.month),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } },
        },
        yaxis: {
            labels: {
                style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY },
                formatter: (val: number) => formatCurrency(val / 1000).replace('.00', '') + 'k',
            },
        },
        grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.BORDER, strokeDashArray: 4 },
        theme: { mode: 'dark' as const },
        tooltip: { theme: 'dark' as const },
    };
    const chartSeries = [{
            name: mrrLabel,
            data: revenueChartData.map((d: RevenueChartData) => Math.round(d.mrr * timeMultiplier)),
        }];
    const growthChartOptions = {
        ...chartOptions,
        colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.INFO],
        xaxis: {
            ...chartOptions.xaxis,
            categories: growthChartData.map((d: GrowthChartData) => d.month),
        },
        yaxis: {
            labels: {
                style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY },
                formatter: (val: number) => formatNumber(Math.round(val)),
            },
        },
    };
    const growthChartSeries = [{
            name: 'New Gyms',
            data: growthChartData.map((d: GrowthChartData) => d.gyms),
        }];
    const donutOptions = {
        chart: { type: 'donut' as const, background: 'transparent' },
        labels: (metrics.revenueByTier || []).map((t) => t.plan.toUpperCase()),
        colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY, SUPERADMIN_DASHBOARD_CHART_COLORS.INFO, SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING, SUPERADMIN_DASHBOARD_CHART_COLORS.SUCCESS, SUPERADMIN_DASHBOARD_CHART_COLORS.DANGER],
        theme: { mode: 'dark' as const },
        stroke: { show: false },
        dataLabels: { enabled: false },
        tooltip: {
            theme: 'dark' as const,
            y: { formatter: (val: number) => formatCurrency(val) },
        },
        legend: { position: 'bottom' as const, labels: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } },
    };
    const donutSeries = (metrics.revenueByTier || []).map((t) => Math.round(t.amount * timeMultiplier));
    const geoChartOptions = {
        chart: { type: 'bar' as const, toolbar: { show: false }, background: 'transparent' },
        colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.WARNING],
        plotOptions: { bar: { horizontal: true, borderRadius: 4, dataLabels: { position: 'top' } } },
        dataLabels: {
            enabled: true,
            offsetX: 20,
            style: { fontSize: '12px', colors: [SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY] },
            formatter: (val: number) => formatCurrency(val / 1000).replace('.00', '') + 'k'
        },
        stroke: { show: true, width: 1, colors: ['transparent'] },
        xaxis: {
            categories: (metrics.revenueByGeography || []).map((g) => g.region),
            labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY }, formatter: (val: number) => formatCurrency(val / 1000).replace('.00', '') + 'k' },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { labels: { style: { colors: SUPERADMIN_DASHBOARD_CHART_COLORS.TEXT_SECONDARY } } },
        grid: { borderColor: SUPERADMIN_DASHBOARD_CHART_COLORS.BORDER, strokeDashArray: 4, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
        theme: { mode: 'dark' as const },
        tooltip: { theme: 'dark' as const, y: { formatter: (val: number) => formatCurrency(val) } },
    };
    const geoChartSeries = [{
            name: 'Revenue',
            data: (metrics.revenueByGeography || []).map((g) => Math.round(g.revenue * timeMultiplier)),
        }];
    return (<>
      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-primary">{mrrLabel} Growth</h2>
          {metrics.arrDeltaPercent !== undefined && (<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${metrics.arrDeltaPercent >= 0 ? 'bg-success-bg text-success border border-success/20' : 'bg-danger-bg text-danger border border-danger/20'}`}>
              ARR Trend: {metrics.arrDeltaPercent > 0 ? '+' : ''}{metrics.arrDeltaPercent}%
            </span>)}
        </div>
        <div className="h-80 w-full">
          <Chart options={chartOptions} series={chartSeries} type="area" height="100%"/>
        </div>
      </div>

      <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-card mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-primary mb-6">Gym Growth (New Signups)</h2>
        <div className="h-80 w-full">
          <Chart options={growthChartOptions} series={growthChartSeries} type="bar" height="100%"/>
        </div>
      </div>

      <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-card mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-primary mb-6">Revenue by Plan</h2>
        <div className="h-80 w-full flex items-center justify-center">
          {(metrics.revenueByTier?.length || 0) > 0 ? (<Chart options={donutOptions} series={donutSeries} type="donut" height="100%"/>) : (<div className="text-secondary text-sm">No revenue data by tier</div>)}
        </div>
      </div>

      <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 shadow-card mt-6 lg:mt-0">
        <h2 className="text-base font-semibold text-primary mb-6">Revenue by Geography</h2>
        <div className="h-80 w-full">
          {(metrics.revenueByGeography?.length || 0) > 0 ? (<Chart options={geoChartOptions} series={geoChartSeries} type="bar" height="100%"/>) : (<div className="flex h-full items-center justify-center text-secondary text-sm">No geographical revenue data available</div>)}
        </div>
      </div>
    </>);
}
