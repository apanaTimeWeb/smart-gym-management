'use client';
// RESPONSIBILITY: Renders the Superadmin messaging V1 Template library view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';


import { getSuperadminMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingStatusBadgeConfig';

import type { SuperadminMessagingV1SectionProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1Types';

/**
 * @description Renders the Superadmin messaging V1 Template library view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1TemplateLibraryPanel({ data }: SuperadminMessagingV1SectionProps) {
  const t = useTranslations('superadmin_messaging');
    return <Panel title={t('ui.template_library_91f97fa')} description={t('ui.reusable_messaging_copy_with_an_approval_state_a_41a2845')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_messaging-messaging-v1-template-library-panel-action-1">
          <th className="px-3 py-3">
            
            {t('ui.template_e847f1a')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.channels_cdf3d91')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.uses_8fb0baf')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.status_523019d')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.templates.map((templateItem) => <tr key={templateItem.name} className="border-b border-border" data-testid={`superadmin_messaging-messaging-v1-template-library-panel-item-t-name-2-${String(templateItem.name)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_template')}>
            {templateItem.name}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_channels')}>
            {templateItem.channel}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_uses')}>
            {formatNumber(templateItem.uses)}
          </td>
          <td className="px-3 py-3" data-mobile-label={t('ui.mobile_status')}>
            <span data-testid={`superadmin_messaging-template-status-${templateItem.name}`} className={getSuperadminMessagingStatusBadgeClasses(templateItem.status)}>
              {templateItem.status}
            </span>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
