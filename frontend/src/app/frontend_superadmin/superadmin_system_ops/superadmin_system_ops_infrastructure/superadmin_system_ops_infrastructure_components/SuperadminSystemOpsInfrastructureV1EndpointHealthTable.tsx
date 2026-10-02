'use client';
// RESPONSIBILITY: Renders the Superadmin infrastructure V1 Service endpoint health view.
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import { formatNumber, formatPercent1dp, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_utils/SuperadminSystemOpsInfrastructureFormatters';

import type { SuperadminInfrastructureV1SectionProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureV1Types';



/**
 * @description Renders the Superadmin infrastructure V1 Service endpoint health view.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsInfrastructureV1EndpointHealthTable({ data }: SuperadminInfrastructureV1SectionProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
    return <Panel title={t('ui.service_endpoint_health_c2ada6d')} description={t('ui.response_speed_and_error_rate_by_major_endpoint_fami_c12aae8')}>
  <div className="overflow-x-auto">
    <table className="w-full text-sm superadmin-mobile-card-table">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase text-secondary" data-testid="superadmin_system_ops_infrastructure-superadmin-system-ops-infrastructure-v1-endpoint-health-table-health-table-action-1">
          <th className="px-3 py-3">
            
            {t('ui.endpoint_11fdc61')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.typical_0384d22')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.slow_c77ea9d')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.worst_d93209e')}
          </th>
          <th className="px-3 py-3">
            
            {t('ui.errors_b2bfa68')}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.endpoints.map((e) => <tr key={e.name} className="border-b border-border" data-testid={`superadmin_system_ops_infrastructure-system-ops-infrastructure-v1-endpoint-health-table-item-e-name-2-${String(e.name)}`}>
          <td className="px-3 py-3 font-medium text-primary" data-mobile-label={t('ui.mobile_endpoint')}>
            {e.name}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_typical')}>
            {e.p50}
            
            {t('ui.ms_c4ff4a7')}
          </td>
          <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_slow')}>
            {e.p95}
            
            {t('ui.ms_c4ff4a7')}
          </td>
          <td className="px-3 py-3 text-warning" data-mobile-label={t('ui.mobile_worst')}>
            {e.p99}
            
            {t('ui.ms_c4ff4a7')}
          </td>
          <td className="px-3 py-3 text-danger" data-mobile-label={t('ui.mobile_errors')}>
            {formatPercent1dp(e.errors)}
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>
    </Panel>;
}
