'use client';
// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature.
import { useTranslations } from 'next-intl';

import MetricCard from '@/components/ui/MetricCard';

import { formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/superadmin_messaging_whatsapp_components_utils/SuperadminMessagingWhatsappComponentsFormatters';

import type { SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppCampaignSummaryCardsTypes';



/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppCampaignSummaryCards({ total, pending, sent, skipped, }: SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps) {
  const t = useTranslations('superadmin_messaging');
    return (<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label={t('ui.recipients_e49b0d5')} value={formatNumber(total)} helper={t('ui.kpi_helper_whatsapp_ready_queue_v3')} tone="primary" data-testid="superadmin-messaging-superadmin-messaging-v1-whats-app-campaign-summary-cards-metric-card-1"/>
      <MetricCard label={t('ui.waiting_7ad9042')} value={formatNumber(pending)} helper={t('ui.kpi_helper_need_a_manual_send_v3')} tone="warning" data-testid="superadmin-messaging-superadmin-messaging-v1-whats-app-campaign-summary-cards-metric-card-2"/>
      <MetricCard label={t('ui.marked_sent_5566c33')} value={formatNumber(sent)} helper={t('ui.kpi_helper_confirmed_by_operator_v3')} tone="success" data-testid="superadmin-messaging-superadmin-messaging-v1-whats-app-campaign-summary-cards-metric-card-3"/>
      <MetricCard label={t('ui.skipped_fc3eeb2')} value={formatNumber(skipped)} helper={t('ui.kpi_helper_removed_from_this_run_v3')} tone="danger" data-testid="superadmin-messaging-superadmin-messaging-v1-whats-app-campaign-summary-cards-metric-card-4"/>
    </div>);
}
