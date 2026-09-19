// RESPONSIBILITY: Renders the Superadmin integrations webhooks and developer access panel section.
'use client';
import { KeyRound, Webhook } from 'lucide-react';
import { displayValue, formatDate, formatNumber } from '@/lib/formatters';
import SuperadminIntegrationsDeveloperAccessEmptyState from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsDeveloperAccessEmptyState';
import SuperadminIntegrationsWebhooksEmptyState from '@/app/superadmin/integrations/integrations_components/SuperadminIntegrationsWebhooksEmptyState';
import Tooltip from '@/components/ui/Tooltip';
import Panel from '@/components/ui/Panel';
import { getSuperadminIntegrationsStatusBadgeClasses } from '@/app/superadmin/integrations/integrations_utils/SuperadminIntegrationsStatusBadgeConfig';
import type { SuperadminIntegrationsSectionProps } from '@/app/superadmin/integrations/integrations_types/SuperadminIntegrationsTypes';
import SuperadminGenerateApiKeyModal from '@/app/superadmin/integrations/integrations_components/SuperadminGenerateApiKeyModal';
import { useState } from 'react';

export default function SuperadminIntegrationsWebhooksAndDeveloperAccessPanel({ data }: SuperadminIntegrationsSectionProps) {
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
    
    return (<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
  <Panel title="Webhook Delivery" description="Delivery status, attempts, and latency.">
    <div className="space-y-3">
      {data.webhooks.length === 0 ? <SuperadminIntegrationsWebhooksEmptyState /> : data.webhooks.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Webhook size={18} className="text-secondary"/>
              <Tooltip content={item.event}>
                <span className="max-w-52 truncate font-medium text-primary">
                  {item.event}
                </span>
              </Tooltip>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminIntegrationsStatusBadgeClasses(item.status)}`}>
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
  </Panel>
  <Panel 
    title="Tenant developer access" 
    description="Issue or revoke access without showing secret values."
    action={
      <button 
        onClick={() => setIsApiKeyModalOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary text-xs font-semibold rounded-md hover:bg-primary-hover motion-safe:transition-colors"
      >
        + Generate New Key
      </button>
    }
  >
    <div className="space-y-3">
      {data.keys.length === 0 ? <SuperadminIntegrationsDeveloperAccessEmptyState /> : data.keys.map(item => (<div key={item.id} className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <KeyRound size={18} className="text-primary"/>
              <div className="min-w-0">
                <Tooltip content={item.label}>
                  <p className="max-w-40 truncate font-medium text-primary">
                    {item.label}
                  </p>
                </Tooltip>
                <Tooltip content={item.tenant}>
                  <p className="max-w-40 truncate text-xs text-secondary">
                    {item.tenant}
                  </p>
                </Tooltip>
              </div>
            </div>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getSuperadminIntegrationsStatusBadgeClasses(item.status)}`}>
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
  </Panel>
  
  <SuperadminGenerateApiKeyModal 
    isOpen={isApiKeyModalOpen} 
    onClose={() => setIsApiKeyModalOpen(false)} 
  />
    </div>);
}
