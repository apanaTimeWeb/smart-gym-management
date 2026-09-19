// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature.
'use client';
import { Building2, UsersRound } from 'lucide-react';
import SuperadminPanel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPanel';
import { formatNumber } from '@/lib/formatters';
import type { SuperadminWhatsAppAudience, SuperadminWhatsAppRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { getUniqueWhatsAppTenants, getWhatsAppAudienceCount } from '@/app/superadmin/messaging/messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';
import type { SuperadminMessagingV1WhatsAppAudiencePanelProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppAudiencePanelTypes';

export default function SuperadminMessagingV1WhatsAppAudiencePanel({ audiences, recipients, audienceId, tenantId, onAudienceChange, onTenantChange }: SuperadminMessagingV1WhatsAppAudiencePanelProps) {
    const tenants = getUniqueWhatsAppTenants(recipients);
    const selectedAudience = audiences.find((audience) => audience.id === audienceId);
    return (<SuperadminPanel title="Choose tenant audience" description="Superadmin WhatsApp is tenant-only: target gym owners, admins, and managers—not gym members.">
      <div className="grid gap-3 xl:grid-cols-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((audience) => {
            const count = getWhatsAppAudienceCount(recipients, audience.id, tenantId);
            const selected = audience.id === audienceId;
            return (<button key={audience.id} type="button" onClick={() => onAudienceChange(audience.id)} className={`rounded-xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-primary/50 bg-primary/10' : 'border-border bg-input/30 hover:border-primary/30'}`} aria-pressed={selected}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-card text-primary"><UsersRound size={18} aria-hidden="true"/></span>
                  <span className="text-lg font-bold text-primary">{formatNumber(count)}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-primary">{audience.label}</p>
                <p className="mt-1 text-xs text-secondary">{audience.description}</p>
              </button>);
        })}
        </div>
        <div className="rounded-xl border border-border bg-input/30 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary"><Building2 size={15} aria-hidden="true"/> Gym scope</div>
          <label htmlFor="whatsapp-tenant-scope" className="sr-only">Gym scope</label>
          <select id="whatsapp-tenant-scope" value={tenantId} onChange={(event) => onTenantChange(event.target.value)} className="mt-3 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="ALL_TENANTS">All gyms</option>
            {tenants.map((tenant) => <option key={tenant.id} value={tenant.id}>{tenant.name}</option>)}
          </select>
          <p className="mt-4 text-xs leading-5 text-secondary">Selected audience: <span className="font-medium text-primary">{selectedAudience?.label ?? '—'}</span></p>
          <p className="mt-2 text-xs leading-5 text-secondary">Recipients are tenant owners, admins, or managers with WhatsApp-ready contact details.</p>
        </div>
      </div>
    </SuperadminPanel>);
}
