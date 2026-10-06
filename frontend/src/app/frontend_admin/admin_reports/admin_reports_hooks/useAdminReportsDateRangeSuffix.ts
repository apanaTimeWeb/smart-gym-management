"use client";

// DATA FLOW: Reports URL/date-range state → formatter utility → report API/query parameter construction.


import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { AdminReportsDateFilterRange } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsDateFilterTypes';
/**
 * @description useAdminReportsDateRangeSuffix: Owns the useAdminReportsDateRangeSuffix responsibility for the admin_reports feature.
 * @dependencies Consumes AdminReportsDateFilterTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminReportsDateRangeSuffix(): string {
  const searchParams = useSearchParams();
  const t = useTranslations('reports.AdminAuditRepair');
  const range = (searchParams.get('range') as AdminReportsDateFilterRange | null) ?? 'this_month';

  const labels: Record<AdminReportsDateFilterRange, string> = {
    this_month: t('thisMonth'),
    last_month: t('lastMonth'),
    last_3_months: t('last3Months'),
    last_6_months: t('last6Months'),
    this_year: t('thisYear'),
    monthly: t('monthlyAllTime'),
    yearly: t('yearlyAllTime'),
    custom: t('customRange'),
  };

  return ` — ${labels[range] ?? labels.this_month}`;
}
