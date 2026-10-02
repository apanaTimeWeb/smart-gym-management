'use client';
// RESPONSIBILITY: Renders the Superadmin features V1 Platform release log, Rollback readiness view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import { formatDateTime } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_utils/SuperadminFeaturesFormatters';

import type { SuperadminFeaturesV1SectionProps } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesV1Types';



/**
 * @description Renders the Superadmin features V1 Platform release log, Rollback readiness view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminFeaturesV1ReleaseAndRollbackSection({ data }: SuperadminFeaturesV1SectionProps) {
  const t = useTranslations('superadmin_features');
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title={t('ui.platform_release_log_1a12599')} description={t('ui.internal_release_notes_for_the_superadmin_surfac_8caf682')}>
    <div className="space-y-3">
      {data.releases.map((r) => <div key={r.version} className="rounded-lg border border-border p-3">
        <div className="flex justify-between">
          <span className="font-medium text-primary">
            {r.version}
          </span>
          <span className="text-xs text-secondary">
            {r.date}
          </span>
        </div>
        <p className="mt-1 text-sm text-primary">
          {r.summary}
        </p>
        <p className="mt-1 text-xs text-secondary">
          
          {t('ui.impact_b671dd5')}
          {r.impact}
        </p>
      </div>)}
    </div>
  </Panel>
  <Panel title={t('ui.rollback_readiness_9c02b92')} description={t('ui.keep_the_last_healthy_point_visible_before_incre_a4964d1')}>
    <div className="space-y-3">
      {data.rollback.map((r) => <div key={r.feature} className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <p className="font-medium text-primary">
            {r.feature}
          </p>
          <p className="text-xs text-secondary">
            
            {t('ui.last_healthy_50a4dcf')}
            {formatDateTime(r.lastHealthy)}
          </p>
        </div>
        <span className="text-xs text-secondary">
          
          {t('ui.last_rollback_c630bb0')}
          {r.lastRollback}
        </span>
      </div>)}
    </div>
  </Panel>
    </div>;
}
