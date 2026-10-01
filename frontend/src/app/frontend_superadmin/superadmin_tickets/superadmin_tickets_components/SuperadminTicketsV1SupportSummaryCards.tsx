'use client';
// RESPONSIBILITY: Renders the Superadmin tickets V1 TicketsSupportSummary summary cards.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_utils/SuperadminTicketsFormatters';


import type { SuperadminTicketsV1SectionProps } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_types/SuperadminTicketsV1Types';

/**
 * @description Renders the Superadmin tickets V1 TicketsSupportSummary summary cards.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminTicketsV1SupportSummaryCards({ data }: SuperadminTicketsV1SectionProps) {
  const t = useTranslations('superadmin_tickets');
    return <div className="grid grid-cols-2 gap-4 xl:grid-cols-6">
  <MetricCard label={t('ui.open_tickets_743aa46')} value={formatNumber(data.summary.open)} helper={t('ui.kpi_helper_current_backlog_v3')}/>
  <MetricCard label={t('ui.urgent_6c931ba')} value={formatNumber(data.summary.urgent)} helper={t('ui.kpi_helper_need_fast_response_v3')} tone="danger"/>
  <MetricCard label={t('ui.near_target_6da6e4b')} value={formatNumber(data.summary.nearTarget)} helper={t('ui.kpi_helper_watch_closely_v3')} tone="warning"/>
  <MetricCard label={t('ui.over_target_6659676')} value={formatNumber(data.summary.overTarget)} helper={t('ui.kpi_helper_service_target_missed_v3')} tone="danger"/>
  <MetricCard label={t('ui.first_response_8b32888')} value={`${data.summary.averageFirstResponseMinutes} min`} helper={t('ui.kpi_helper_average_v3')}/>
  <MetricCard label={t('ui.customer_satisfaction_891f543')} value={`${data.summary.satisfaction}/5`} helper={t('ui.kpi_helper_recent_surveys_v3')} tone="success"/>
    </div>;
}
