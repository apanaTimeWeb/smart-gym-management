// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature.
'use client';
import { formatNumber } from '@/lib/formatters';
import MetricCard from '@/components/ui/MetricCard';
import type { SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppCampaignSummaryCardsTypes';

export default function SuperadminMessagingV1WhatsAppCampaignSummaryCards({ total, pending, sent, skipped, }: SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps) {
    return (<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Recipients" value={formatNumber(total)} helper="WhatsApp-ready queue" tone="primary"/>
      <MetricCard label="Waiting" value={formatNumber(pending)} helper="Need a manual send" tone="warning"/>
      <MetricCard label="Marked sent" value={formatNumber(sent)} helper="Confirmed by operator" tone="success"/>
      <MetricCard label="Skipped" value={formatNumber(skipped)} helper="Removed from this run" tone="danger"/>
    </div>);
}
