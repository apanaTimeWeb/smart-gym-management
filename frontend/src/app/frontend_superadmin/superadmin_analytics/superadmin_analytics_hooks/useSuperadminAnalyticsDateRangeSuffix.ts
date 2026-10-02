import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_constants/SuperadminAnalyticsDateFilterConstants';



/**
 * @description Resolves the active analytics date-range label from URL state for KPI headings.
 * @dependencies Uses the feature-owned date filter constants and analytics translation namespace.
 * @edge-case Unknown or default `this_month` ranges intentionally return an empty suffix instead of inventing copy.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminAnalyticsDateRangeSuffix → owning feature view/components.
/**
 * @description Owns the feature-local superadmin analytics date range suffix responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminAnalyticsDateRangeSuffix(): string {
  const t = useTranslations('superadmin_analytics');
  const searchParams = useSearchParams();
  const range = searchParams.get('range') ?? 'this_month';
  const option = SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS.find((candidate) => candidate.value === range);

  if (!option || range === 'this_month') return '';
  return ` (${t(option.labelKey)})`;
}

