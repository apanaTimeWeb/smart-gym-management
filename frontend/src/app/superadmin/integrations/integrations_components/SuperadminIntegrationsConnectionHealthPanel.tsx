// RESPONSIBILITY: Renders the Superadmin integrations connection health panel section.
'use client';
import { PlugZap } from 'lucide-react';
import { displayValue, formatDateTime, formatNumber } from '@/lib/formatters';
import SuperadminIntegrationsConnectionsEmptyState from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsConnectionsEmptyState';
import Tooltip from '@/components/ui/Tooltip';
import Panel from '@/components/ui/Panel';
import { getSuperadminIntegrationsStatusBadgeClasses } from '@/app/superadmin/integrations/integrations_utils/SuperadminIntegrationsStatusBadgeConfig';
import type { SuperadminIntegrationsSectionProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
export default function SuperadminIntegrationsConnectionHealthPanel({ data }: SuperadminIntegrationsSectionProps) {
    return (<Panel title="Connection Health" description="Payment, messaging, email, and storage connections.">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {data.integrations.length === 0 ? <SuperadminIntegrationsConnectionsEmptyState /> : data.integrations.map(item => (<div key={item.name} className="rounded-lg border border-border bg-input p-4">
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
          <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminIntegrationsStatusBadgeClasses(item.status)}`}>
            {item.status}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-secondary">
            Last event
          </span>
          <Tooltip content={displayValue(item.lastEvent, '—')}>
            <span className="max-w-52 truncate text-primary">
              {displayValue(item.lastEvent ? formatDateTime(item.lastEvent) : null, '—')}
            </span>
          </Tooltip>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-secondary">
            Failed events
          </span>
          <span className={item.failedEvents > 5 ? 'text-danger' : 'text-primary'}>
            {formatNumber(item.failedEvents)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-secondary">
            Health
          </span>
          <span className="text-primary">
            {formatNumber(item.health)}
            %
          </span>
        </div>
      </div>))}
  </div>
    </Panel>);
}
