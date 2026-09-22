"use client";
// RESPONSIBILITY: Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts.
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/app/admin/admin_layout/admin_utils/AdminFormatCurrency';
import { formatKPI } from '@/lib/formatters';
import { ADMIN_CHART_THEME } from '@/app/admin/admin_layout/admin_utils/AdminChartThemeTokens';
import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AdminSalesOverview() {
  const { overviewData, referralData, status } = useAdminSalesLogic();
  if (status === 'pending') return <div className="space-y-6 motion-safe:animate-pulse motion-safe:duration-base"><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /></div>;
  if (status === 'error') return <div className="text-center py-16 bg-card rounded-2xl border border-danger"><p className="text-danger font-medium">Sales overview could not be loaded.</p></div>;

  const months = overviewData.map((item) => item.date);
  const revenue = overviewData.map((item) => item.revenue);
  const members = overviewData.map((item) => item.newMembers);
  const pieLabels = referralData.map((item) => item.source);
  const pieSeries = referralData.map((item) => item.revenue);

  return <div className="space-y-6">
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">Monthly Revenue </h3>
      <ReactApexChart type="bar" height={288} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months, labels: { style: { colors: ADMIN_CHART_THEME.textSecondary } } }, yaxis: { labels: { formatter: (value: number) => `${formatKPI(value)}K` } }, dataLabels: { enabled: false }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => formatCurrency(value) } } }} series={[{ name: 'Revenue', data: revenue }]} />
    </div>
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">New Members Trend</h3>
      <ReactApexChart type="area" height={256} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months }, dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 3 }, fill: { opacity: 0.25 }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => formatKPI(value) } } }} series={[{ name: 'New Members', data: members }]} />
    </div>
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">Marketing ROI: Revenue by Referral Source</h3>
      <ReactApexChart type="donut" height={256} options={{ labels: pieLabels, chart: { toolbar: { show: false } }, legend: { position: 'bottom' }, dataLabels: { enabled: false }, tooltip: { y: { formatter: (value: number) => formatCurrency(value) } } }} series={pieSeries} />
    </div>
  </div>;
}
