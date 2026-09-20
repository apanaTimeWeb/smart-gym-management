// RESPONSIBILITY: Renders the sales overview cards and charts from feature-owned data.
'use client';
import dynamic from 'next/dynamic';
import { formatCurrencyFromMinorUnits, formatKPI } from '@/lib/formatters';
import { ManagerEnvConfig } from '@/app/manager/manager_infrastructure/ManagerEnvConfig';
import { MANAGER_GENERIC_ERROR_MESSAGE } from '@/app/manager/manager_infrastructure/ManagerErrorMessage';
import { useManagerSalesLogic } from '@/app/manager/sales/sales_hooks/ManagerUseManagerSalesLogic';
import type { OverviewDataPoint } from '@/app/manager/sales/sales_types/ManagerSalesTypes';


const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="h-64 rounded-xl bg-card motion-safe:animate-pulse" aria-hidden="true" /> });

export default function ManagerSalesOverview() {
  const { overviewData, isPending, isError, errorMessage } = useManagerSalesLogic();

  if (isPending) {
    return <div className="space-y-5" aria-label="Loading sales overview">
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
      <div className="h-72 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse" />
    </div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger">
        <p className="text-danger font-medium">{errorMessage || MANAGER_GENERIC_ERROR_MESSAGE}</p>
        <span className="text-sm text-secondary">Retry the request.</span>
      </div>
    );
  }

  const revenueOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif', stacked: true },
    colors: ['var(--chart-primary)', 'var(--chart-success)'],
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const, y: { formatter: (v: number) => formatCurrencyFromMinorUnits(v, ManagerEnvConfig.currencyCode) } },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' }, formatter: (v: number) => formatKPI(v) } },
    legend: { labels: { colors: 'var(--text-secondary)' }, position: 'top' as const },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } } };

  const membersOptions = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: ['var(--chart-danger)'],
    stroke: { curve: 'smooth' as const, width: 3 },
    fill: {
      type: 'solid',
      opacity: 0.22
    },
    grid: { borderColor: 'var(--chart-grid)', strokeDashArray: 4 },
    tooltip: { theme: 'dark' as const },
    xaxis: {
      categories: overviewData.map((d: OverviewDataPoint) => d.month),
      labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } },
      axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: 'var(--text-secondary)', fontSize: '11px' } } },
    dataLabels: { enabled: false } };

  return (
    <div className="space-y-6">
      <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
        <h3 className="font-bold text-primary mb-4">Monthly Revenue</h3>
        <Chart
          type="bar"
          height={280}
          options={revenueOptions}
          series={[
            { name: 'Memberships', data: overviewData.map((d: OverviewDataPoint) => d.revenue || 0) },
            { name: 'Store POS', data: overviewData.map((d: OverviewDataPoint) => d.storeRevenue || 0) },
          ]}
        />
      </div>

      <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none col-span-1 md:col-span-2 lg:col-span-3">
        <h3 className="font-bold text-primary mb-4">New Members Trend</h3>
        <Chart
          type="area"
          height={250}
          options={membersOptions}
          series={[
            { name: 'New Members', data: overviewData.map((d: OverviewDataPoint) => d.newMembers || 0) },
          ]}
        />
      </div>
    </div>
  );
}
