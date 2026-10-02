'use client';
// RESPONSIBILITY: Renders the Superadmin integrations connection health panel section.
import { PlugZap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';

import SuperadminIntegrationsConnectionsEmptyState from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_components/SuperadminIntegrationsConnectionsEmptyState';
import { getSuperadminIntegrationsStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_constants/SuperadminIntegrationsStatusBadgeConfig';
import { superadminIntegrationsDisplayValue, formatDateTime, formatNumber } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_utils/SuperadminIntegrationsFormatters';

import type { SuperadminIntegrationsSectionProps } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_types/SuperadminIntegrationsTypes';



/**
 * @description Renders the Superadmin integrations connection health panel section.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminIntegrationsConnectionHealthPanel({ data }: SuperadminIntegrationsSectionProps) {
  const t = useTranslations('superadmin_integrations');
    return (<Panel title={t('ui.connection_health_aa6e44e')} description={t('ui.payment_messaging_email_and_storage_connections_5329411')}>
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {data.integrations.length === 0 ? <SuperadminIntegrationsConnectionsEmptyState /> : data.integrations.map(item => (<div key={item.name} className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <PlugZap size={18} className="text-primary"/>
            <div>
              <p className="font-medium text-primary">
                {item.name}
              </p>
              <p className="text-xs text-secondary">
                {item.type}
              </p>
            </div>
          </div>
          <span data-testid={`superadmin_integrations-connection-status-${item.name}`} className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminIntegrationsStatusBadgeClasses(item.status)}`}>
            {item.status}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-secondary">
            
            {t('ui.last_event_43959ef')}
          </span>
          <Tooltip content={superadminIntegrationsDisplayValue(item.lastEvent, '—')}>
            <span className="max-w-52 truncate text-primary">
              {superadminIntegrationsDisplayValue(item.lastEvent ? formatDateTime(item.lastEvent) : null, '—')}
            </span>
          </Tooltip>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-secondary">
            
            {t('ui.failed_events_fde73e3')}
          </span>
          <span className={item.failedEvents > 5 ? 'text-danger' : 'text-primary'}>
            {formatNumber(item.failedEvents)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-secondary">
            
            {t('ui.health_3782f68')}
          </span>
          <span className="text-primary">
            {formatNumber(item.health)}
            {t('ui.text_0bcef9c4')}</span>
        </div>
      </div>))}
  </div>
    </Panel>);
}
