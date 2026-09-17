// RESPONSIBILITY: Renders the Superadmin integrations webhooks and developer access panel section.
'use client';
import { KeyRound, Webhook } from 'lucide-react';
import { displayValue, formatDate, formatNumber } from '@/lib/formatters';
import SuperadminIntegrationsDeveloperAccessEmptyState from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState';
import SuperadminIntegrationsWebhooksEmptyState from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsWebhooksEmptyState';
import SuperadminTooltip from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminTooltip';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
import type { SuperadminIntegrationsSectionProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
export default function SuperadminIntegrationsWebhooksAndDeveloperAccessPanel({ data }: SuperadminIntegrationsSectionProps) {
    return (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <SuperadminV1Panel title="Webhook Delivery" description="Delivery status, attempts, and latency.">
    <div className="space-y-3">
      {data.webhooks.length === 0 ? <SuperadminIntegrationsWebhooksEmptyState /> : data.webhooks.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Webhook size={18} className="text-secondary"/>
              <SuperadminTooltip content={item.event}>
                <span className="max-w-52 truncate font-medium text-foreground">
                  {item.event}
                </span>
              </SuperadminTooltip>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminStatusBadgeClasses(item.status)}`}>
              {item.status}
            </span>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-secondary">
            <span>
              {item.integration}
            </span>
            <span>
              {formatNumber(item.attempts)}
              tries
            </span>
            <span>
              {formatNumber(item.latency)}
              ms
            </span>
          </div>
        </div>))}
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Tenant developer access" description="Issue or revoke access without showing secret values.">
    <div className="space-y-3">
      {data.keys.length === 0 ? <SuperadminIntegrationsDeveloperAccessEmptyState /> : data.keys.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <KeyRound size={18} className="text-primary"/>
              <div className="min-w-0">
                <SuperadminTooltip content={item.label}>
                  <p className="max-w-40 truncate font-medium text-foreground">
                    {item.label}
                  </p>
                </SuperadminTooltip>
                <SuperadminTooltip content={item.tenant}>
                  <p className="max-w-40 truncate text-xs text-secondary">
                    {item.tenant}
                  </p>
                </SuperadminTooltip>
              </div>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminStatusBadgeClasses(item.status)}`}>
              {item.status}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-secondary">
            <span>
              {item.rateLimit}
            </span>
            <span>
              {displayValue(item.lastUsed ? formatDate(item.lastUsed) : null, '—')}
            </span>
          </div>
        </div>))}
    </div>
  </SuperadminV1Panel>
    </div>);
}
