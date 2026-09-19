// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature.
'use client';
import { displayValue, formatDateTime, formatNumber } from '@/lib/formatters';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import SuperadminTooltip from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminTooltip';
import { getSuperadminMessagingStatusBadgeClasses } from '@/app/superadmin/messaging/messaging_utils/SuperadminMessagingStatusBadgeConfig';
import type { SuperadminWhatsAppCampaign } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { SuperadminMessagingV1WhatsAppCampaignHistoryPanelProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppCampaignHistoryPanelTypes';

export default function SuperadminMessagingV1WhatsAppCampaignHistoryPanel({ campaigns }: SuperadminMessagingV1WhatsAppCampaignHistoryPanelProps) {
    return (<SuperadminPanel title="Campaign history" description="Recent free WhatsApp queues created from this Superadmin workspace.">
      {campaigns.length === 0 ? (<div className="rounded-lg border border-dashed border-border p-5 text-sm text-secondary">No campaigns have been created yet.</div>) : (<div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-secondary">
                <th className="px-3 py-3">Campaign</th>
                <th className="px-3 py-3">Audience</th>
                <th className="px-3 py-3">Recipients</th>
                <th className="px-3 py-3">Progress</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (<tr key={campaign.id} className="border-b border-border">
                  <td className="px-3 py-3 font-medium text-primary">
                    <SuperadminTooltip content={campaign.name}>
                      <span className="block max-w-52 truncate">{campaign.name}</span>
                    </SuperadminTooltip>
                    <span className="mt-1 block text-xs text-secondary">{campaign.templateName}</span>
                  </td>
                  <td className="px-3 py-3 text-secondary">{campaign.audienceLabel}</td>
                  <td className="px-3 py-3 text-secondary">{formatNumber(campaign.totalRecipients)}</td>
                  <td className="px-3 py-3 text-secondary">{formatNumber(campaign.sentCount)} sent · {formatNumber(campaign.skippedCount)} skipped</td>
                  <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getSuperadminMessagingStatusBadgeClasses(campaign.status)}`}>{campaign.status}</span></td>
                  <td className="px-3 py-3 text-xs text-secondary">{displayValue(campaign.createdAt ? formatDateTime(campaign.createdAt) : null, '—')}</td>
                </tr>))}
            </tbody>
          </table>
        </div>)}
    </SuperadminPanel>);
}
