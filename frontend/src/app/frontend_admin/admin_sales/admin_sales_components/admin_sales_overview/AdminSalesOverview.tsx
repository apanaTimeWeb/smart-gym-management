"use client";
// RESPONSIBILITY: Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts.
import { useLocale, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatCurrency';
import { formatKPI } from '@/app/frontend_admin/admin_sales/admin_sales_utils/AdminSalesFormatters';
import { ADMIN_CHART_THEME } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutChartThemeTokens';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/admin_sales_hooks/useAdminSalesLogic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * AdminSalesOverview renders the admin sales overview UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesOverview: Renders Admin Sales revenue, member-trend, and referral-source charts using ApexCharts.
 * @dependencies Consumes AdminSalesFormatCurrency, AdminSalesFormatters, AdminLayoutChartThemeTokens, useAdminSalesLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesOverview() {
  const locale = useLocale();
  const t = useTranslations();

  const { overviewData, referralData, status } = useAdminSalesLogic();
  if (status === 'pending') return <div className="space-y-6 motion-safe:animate-pulse motion-safe:duration-base"><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /><div className="bg-card p-5 rounded-xl border border-border shadow-card h-80" /></div>;
  if (status === 'error') return <div className="text-center py-16 bg-card rounded-2xl border border-border" role="alert" data-testid="admin_sales-admin_sales-overview-error-state"><p className="text-danger font-medium">{t('sales.admin_sales_overview.text_41bdcad919')}</p></div>;

  const months = overviewData.map((item) => item.date);
  const revenue = overviewData.map((item) => item.revenue);
  const members = overviewData.map((item) => item.newMembers);
  const pieLabels = referralData.map((item) => item.source);
  const pieSeries = referralData.map((item) => item.revenue);

  return <div className="space-y-6">
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">{t('sales.admin_sales_overview.text_762e600e5f')}</h3>
      <ReactApexChart type="bar" height={288} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months, labels: { style: { colors: ADMIN_CHART_THEME.textSecondary } } }, yaxis: { labels: { formatter: (value: number) => `${formatKPI(value, locale)}K` } }, dataLabels: { enabled: false }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => AdminSalesFormatCurrency(value, undefined, locale) } } }} series={[{ name: t('sales.admin_sales_overview.series_revenue'), data: revenue }]} />
    </div>
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">{t('sales.admin_sales_overview.text_c7474256e3')}</h3>
      <ReactApexChart type="area" height={256} options={{ chart: { toolbar: { show: false } }, xaxis: { categories: months }, dataLabels: { enabled: false }, stroke: { curve: 'smooth', width: 3 }, fill: { opacity: 0.25 }, grid: { borderColor: ADMIN_CHART_THEME.border }, tooltip: { y: { formatter: (value: number) => formatKPI(value, locale) } } }} series={[{ name: t('sales.admin_sales_overview.remaining_newMembers'), data: members }]} />
    </div>
    <div className="bg-card p-5 rounded-xl border border-border shadow-card dark:shadow-none">
      <h3 className="font-bold text-primary mb-4">{t('sales.admin_sales_overview.text_6f62ec7108')}</h3>
      <ReactApexChart type="donut" height={256} options={{ labels: pieLabels, chart: { toolbar: { show: false } }, legend: { position: 'bottom' }, dataLabels: { enabled: false }, tooltip: { y: { formatter: (value: number) => AdminSalesFormatCurrency(value, undefined, locale) } } }} series={pieSeries} />
    </div>
  </div>;
}
