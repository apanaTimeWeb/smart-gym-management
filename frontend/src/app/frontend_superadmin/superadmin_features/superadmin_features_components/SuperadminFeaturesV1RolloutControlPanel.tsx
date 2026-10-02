'use client';
// RESPONSIBILITY: Renders the Superadmin features V1 Rollout control view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import { formatNumber } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_utils/SuperadminFeaturesFormatters';

import type { SuperadminFeaturesV1SectionProps } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesV1Types';



/**
 * @description Renders the Superadmin features V1 Rollout control view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminFeaturesV1RolloutControlPanel({ data }: SuperadminFeaturesV1SectionProps) {
  const t = useTranslations('superadmin_features');
    return <Panel title={t('ui.rollout_control_ee65d35')} description={t('ui.use_percentage_rollout_tenant_targeting_schedule_1e30b5d')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_features-superadmin-features-v1-rollout-control-panel-control-panel-action-1">
          <th className="px-3 py-3">
            
            {t('ui.feature_9889145')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.rollout_91b746b')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.target_4783067')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.status_40f1e0a')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.health_68d8e0b')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.rollouts.map((r) => <tr key={r.feature} className="border-b border-border" data-testid={`superadmin_features-features-v1-rollout-control-panel-item-r-feature-2-${String(r.feature)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_feature')}>
            {r.feature}
          </td>
          <td className="px-3 py-3 text-primary" data-mobile-label={t('ui.mobile_rollout')}>
            {r.rollout}
            {t('ui.text_0bcef9c4')}</td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_target')}>
            {r.target}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_status')}>
            <span data-testid={`superadmin_features-rollout-status-${r.feature}`}>{r.status}</span>
          </td>
          <td className="px-3 py-3 text-success" data-mobile-label={t('ui.mobile_health')}>
            {formatNumber(r.health)}
            {t('ui.text_0bcef9c4')}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
