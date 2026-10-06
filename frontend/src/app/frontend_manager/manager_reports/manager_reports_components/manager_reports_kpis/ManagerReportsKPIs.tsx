// RESPONSIBILITY: Renders ManagerReportsKPIs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { TrendingUp, Users, CalendarCheck, TrendingDown, IndianRupee, UserPlus, UserMinus, Activity } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useDateRangeSuffix } from '@/lib/useDateRangeSuffix';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { ManagerReportsKpiCard } from '@/app/frontend_manager/manager_reports/manager_reports_components/manager_reports_kpis/manager_reports_kpi_card/ManagerReportsKpiCard';
import { useManagerReportsLogic } from '@/app/frontend_manager/manager_reports/manager_reports_hooks/useManagerReportsLogic';
import { ManagerReportsFormatCurrency, ManagerReportsFormatNumber } from '@/app/frontend_manager/manager_reports/manager_reports_utils/ManagerReportsFormatters';



/**
 * Formats report currency using the active UI locale and the Manager environment currency contract.
 * Business intent: keep KPI currency values consistent with locale-aware module formatting.
 * State dependencies: reads the active `next-intl` locale from the containing component.
 * Edge cases: callers pass `undefined` only by guarding before invocation; zero and negative values remain valid.
 */
const formatReportCurrency = (value: number, locale: string) => ManagerReportsFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

/** @description Renders the ManagerReportsKPIs component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsKPIs() {
  const locale = useLocale();
  const t = useTranslations('MANAGER_REPORTS');
  const { summary } = useManagerReportsLogic();
  const dateSuffix = useDateRangeSuffix();
  const k = summary?.kpis;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      <ManagerReportsKpiCard label={t('TEXT_KPI_TOTAL_INCOME', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.totalRevenue, locale) : '—'} icon={TrendingUp} iconBg="bg-success-bg" iconColor="text-success" sub={k ? t('TEXT_KPI_NET', { amount: formatReportCurrency(k.netProfit, locale) }) : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_TOTAL_EXPENSES', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.totalExpenses, locale) : '—'} icon={TrendingDown} iconBg="bg-danger-bg" iconColor="text-danger" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_ACTIVE_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsFormatNumber(k.activeMembers) : '—'} icon={Users} iconBg="bg-info-bg" iconColor="text-info" sub={k ? t('TEXT_KPI_NEW_THIS_MONTH', { count: ManagerReportsFormatNumber(k.newMembersThisMonth) }) : undefined} subColor="text-success" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_AVG_ATTENDANCE', { suffix: dateSuffix })} value={k ? t('TEXT_KPI_PERCENT', { value: k.avgAttendanceRate }) : '—'} icon={CalendarCheck} iconBg="bg-primary-subtle" iconColor="text-primary" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_NEW_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsFormatNumber(k.newMembersThisMonth) : '—'} icon={UserPlus} iconBg="bg-success-bg" iconColor="text-success" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_MEMBERS_LOST', { suffix: dateSuffix })} value={k ? t('TEXT_KPI_PERCENT', { value: k.churnRate }) : '—'} icon={UserMinus} iconBg="bg-warning-bg" iconColor="text-warning" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_TOTAL_MEMBERS', { suffix: dateSuffix })} value={k ? ManagerReportsFormatNumber(k.totalMembers) : '—'} icon={Activity} iconBg="bg-purple-bg" iconColor="text-purple-text" />
      <ManagerReportsKpiCard label={t('TEXT_KPI_NET_PROFIT', { suffix: dateSuffix })} value={k ? formatReportCurrency(k.netProfit, locale) : '—'} icon={IndianRupee} iconBg="bg-success-bg" iconColor="text-success" />
    </div>
  );
}
