// RESPONSIBILITY: Renders the Superadmin messaging V1 Campaign engagement view.
'use client';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';


import type { SuperadminMessagingV1SectionProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1Types';

/**
 * @description Renders the Superadmin messaging V1 Campaign engagement view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1CampaignEngagementPanel({ data }: SuperadminMessagingV1SectionProps) {
  const t = useTranslations('superadmin_messaging');
    return <Panel title={t('ui.campaign_engagement_fe6e0ea')} description={t('ui.messages_sent_delivered_opened_and_answered_137282f')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_messaging-messaging-v1-campaign-engagement-panel-action-1">
          <th className="px-3 py-3">
            
            {t('ui.campaign_7269633')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.sent_148c331')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.delivered_cdb8a53')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.opened_9209f9d')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.responded_cfd00e0')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.campaigns.map((c) => <tr key={c.name} className="border-b border-border" data-testid={`superadmin_messaging-messaging-v1-campaign-engagement-panel-item-c-name-2-${String(c.name)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_campaign')}><Tooltip content={c.name}><span className="block max-w-56 truncate">{c.name}</span></Tooltip></td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_sent')}>
            {formatNumber(c.sent)}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_delivered')}>
            {formatNumber(c.delivered)}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_opened')}>
            {formatNumber(c.opened)}
          </td>
          <td className="px-3 py-3 text-primary" data-mobile-label={t('ui.mobile_responded')}>
            {formatNumber(c.responded)}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
