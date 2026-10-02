'use client';// RESPONSIBILITY: Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';

import { formatNumber, formatPercent1dp, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureFormatters';

import type { SuperadminInfrastructureV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureV1Types';



/**
 * @description Renders the Superadmin infrastructure V1 InfrastructureServiceHealthSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsInfrastructureV1ServiceHealthSummaryCards({ data }: SuperadminInfrastructureV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
  <MetricCard label={t('ui.requests_minute_836efe9')} value={formatNumber(data.summary.requestsPerMinute)} helper={t('ui.kpi_helper_current_traffic_v3')} data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-v1-service-health-summary-cards-metric-card-1"/>
  <MetricCard label={t('ui.error_rate_045aaae')} value={formatPercent1dp(data.summary.errorsPercent)} helper={t('ui.kpi_helper_api_errors_v3')} tone={data.summary.errorsPercent < 1 ? 'success' : 'danger'} data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-v1-service-health-summary-cards-metric-card-2"/>
  <MetricCard label={t('ui.fast_response_616da60')} value={`${data.summary.p50} ms`} helper={t('ui.kpi_helper_typical_v3')} tone="success" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-v1-service-health-summary-cards-metric-card-3"/>
  <MetricCard label={t('ui.slow_response_35708e4')} value={`${data.summary.p95} ms`} helper={t('ui.kpi_helper_most_slower_requests_v3')} tone="warning" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-v1-service-health-summary-cards-metric-card-4"/>
  <MetricCard label={t('ui.worst_response_42e0329')} value={`${data.summary.p99} ms`} helper={t('ui.kpi_helper_top_1_slowest_v3')} tone="danger" data-testid="superadmin-system-ops-superadmin-system-ops-infrastructure-v1-service-health-summary-cards-metric-card-5"/>
    </div>;
}
