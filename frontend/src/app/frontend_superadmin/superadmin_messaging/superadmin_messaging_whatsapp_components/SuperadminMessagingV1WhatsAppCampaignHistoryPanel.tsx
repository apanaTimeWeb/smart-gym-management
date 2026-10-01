// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature.
'use client';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { superadminMessagingDisplayValue, superadminMessagingMaskPhone } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';

import { formatDateTime, formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/superadmin_messaging_whatsapp_components_utils/SuperadminMessagingWhatsappComponentsFormatters';


import { getSuperadminMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingStatusBadgeConfig';

import type { SuperadminMessagingV1WhatsAppCampaignHistoryPanelProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppCampaignHistoryPanelTypes';
import type { SuperadminWhatsAppCampaign } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppCampaignHistoryPanel responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppCampaignHistoryPanel({ campaigns }: SuperadminMessagingV1WhatsAppCampaignHistoryPanelProps) {
  const t = useTranslations('superadmin_messaging');
    return (<Panel title={t('ui.campaign_history_4829ba8')} description={t('ui.recent_free_whatsapp_queues_created_from_this_su_7facd0f')}>
      {campaigns.length === 0 ? (<div className="rounded-lg border border-dashed border-border p-5 text-sm text-secondary">{t('ui.no_campaigns_have_been_created_yet_186d7d3')}</div>) : (<div className="overflow-x-auto">
          <table className="w-full text-sm superadmin-mobile-card-table">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-secondary" data-testid="superadmin_messaging-messaging-v1-whats-app-campaign-history-panel-action-1">
                <th className="px-3 py-3">{t('ui.campaign_7269633')}</th>
                <th className="px-3 py-3">{t('ui.audience_cb0d45b')}</th>
                <th className="px-3 py-3">{t('ui.recipients_e49b0d5')}</th>
                <th className="px-3 py-3">{t('ui.progress_6067678')}</th>
                <th className="px-3 py-3">{t('ui.status_523019d')}</th>
                <th className="px-3 py-3">{t('ui.created_07193c0')}</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (<tr key={campaign.id} className="border-b border-border" data-testid={`superadmin_messaging-messaging-v1-whats-app-campaign-history-panel-item-campaign-id-2-${String(campaign.id)}`}>
                  <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_campaign')}>
                    <Tooltip content={campaign.name}>
                      <span className="block max-w-52 truncate">{campaign.name}</span>
                    </Tooltip>
                    <span className="mt-1 block text-xs text-secondary">{campaign.templateName}</span>
                  </td>
                  <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_audience')}>{campaign.audienceLabel}</td>
                  <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_recipients')}>{formatNumber(campaign.totalRecipients)}</td>
                  <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_progress')}>{formatNumber(campaign.sentCount)}  {t('ui.sent_4a0e593')} {formatNumber(campaign.skippedCount)}  {t('ui.skipped_368bf5a')}</td>
                  <td className="px-3 py-3" data-mobile-label={t('ui.mobile_status')}><span data-testid={`superadmin_messaging-whatsapp-campaign-status-${campaign.id}`} className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getSuperadminMessagingStatusBadgeClasses(campaign.status)}`}>{campaign.status}</span></td>
                  <td className="px-3 py-3 text-xs text-secondary" data-mobile-label={t('ui.mobile_created')}>{superadminMessagingDisplayValue(campaign.createdAt ? formatDateTime(campaign.createdAt) : null, '—')}</td>
                </tr>))}
            </tbody>
          </table>
        </div>)}
    </Panel>);
}
