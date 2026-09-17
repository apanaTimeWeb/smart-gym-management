// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignSummaryCards responsibility defined by this module feature.
'use client';
import { formatNumber } from '@/lib/formatters';
import SuperadminV1MetricCard from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1MetricCard';
interface SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps {
    total: number;
    pending: number;
    sent: number;
    skipped: number;
}
export default function SuperadminMessagingV1WhatsAppCampaignSummaryCards({ total, pending, sent, skipped, }: SuperadminMessagingV1WhatsAppCampaignSummaryCardsProps) {
    return (<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <SuperadminV1MetricCard label="Recipients" value={formatNumber(total)} helper="WhatsApp-ready queue" tone="primary"/>
      <SuperadminV1MetricCard label="Waiting" value={formatNumber(pending)} helper="Need a manual send" tone="warning"/>
      <SuperadminV1MetricCard label="Marked sent" value={formatNumber(sent)} helper="Confirmed by operator" tone="success"/>
      <SuperadminV1MetricCard label="Skipped" value={formatNumber(skipped)} helper="Removed from this run" tone="danger"/>
    </div>);
}
