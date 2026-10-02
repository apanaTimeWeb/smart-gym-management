'use client';
// RESPONSIBILITY: Renders the Superadmin infrastructure V1 Recent incidents view.
import { ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';

import { getSuperadminInfrastructureStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_constants/SuperadminSystemOpsInfrastructureStatusBadgeConfig';
import { formatNumber, formatPercent1dp, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureFormatters';

import type { SuperadminInfrastructureV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureV1Types';



/**
 * @description Renders the Superadmin infrastructure V1 Recent incidents view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsInfrastructureV1RecentIncidentsPanel({ data }: SuperadminInfrastructureV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
    return <Panel title={t('ui.recent_incidents_65fb026')} description={t('ui.application_level_incidents_stay_visible_even_when_s_a1d8cfb')}>
  <div className="space-y-3">
    {data.incidents.map((i) => <div key={i.title} className="flex gap-3 rounded-lg border border-border p-3">
      <ShieldAlert size={18} className="text-warning"/>
      <div className="min-w-0">
        <Tooltip content={i.title}><p className="truncate font-medium text-primary">{i.title}</p></Tooltip>
        <p className="text-xs text-secondary">
          {i.impact}
          {t('ui.text_176848af')}{formatDateTime(i.started)}
        </p>
      </div>
      <span data-testid={`superadmin_system_ops_infrastructure-incident-status-${i.title}`} className={`ml-auto rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminInfrastructureStatusBadgeClasses(i.status)}`}>
        {i.status}
      </span>
    </div>)}
  </div>
    </Panel>;
}
