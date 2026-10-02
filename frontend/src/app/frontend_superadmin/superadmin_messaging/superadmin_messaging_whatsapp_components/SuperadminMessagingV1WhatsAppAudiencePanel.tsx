'use client';// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature.
import { Building2, UsersRound } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import { formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/superadmin_messaging_whatsapp_components_utils/SuperadminMessagingWhatsappComponentsFormatters';
import { getUniqueWhatsAppTenants, getWhatsAppAudienceCount } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppAudienceUtils';

import type { SuperadminMessagingV1WhatsAppAudiencePanelProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppAudiencePanelTypes';
import type { SuperadminWhatsAppAudience, SuperadminWhatsAppRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';



/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppAudiencePanel responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppAudiencePanel({ audiences, recipients, audienceId, tenantId, onAudienceChange, onTenantChange }: SuperadminMessagingV1WhatsAppAudiencePanelProps) {
  const t = useTranslations('superadmin_messaging');
    const tenants = getUniqueWhatsAppTenants(recipients);
    const selectedAudience = audiences.find((audience) => audience.id === audienceId);
    return (<Panel title={t('ui.choose_tenant_audience_15d41b9')} description={t('ui.superadmin_whatsapp_is_tenant_only_target_gym_ow_207f429')}>
      <div className="grid gap-3 xl:grid-cols-3">
        <div className="grid gap-3 sm:grid-cols-2">
          {audiences.map((audience, index) => {
            const count = getWhatsAppAudienceCount(recipients, audience.id, tenantId);
            const selected = audience.id === audienceId;
            return (<button  key={audience.id} type="button" onClick={() => onAudienceChange(audience.id)} className={`min-h-11 rounded-xl border p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-border bg-primary-subtle' : 'border-border bg-card hover:border-border'} motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95`} aria-pressed={selected} data-testid={`superadmin_messaging-messaging-messaging-v1-whats-app-audience-panel-action1-${index}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-card text-primary"><UsersRound size={18} aria-hidden="true"/></span>
                  <span className="text-lg font-bold text-primary">{formatNumber(count)}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-primary">{audience.label}</p>
                <p className="mt-1 text-xs text-secondary">{audience.description}</p>
              </button>);
        })}
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary"><Building2 size={18} aria-hidden="true"/>  {t('ui.gym_scope_61c0c08')}</div>
          <label htmlFor="whatsapp-tenant-scope" className="sr-only">{t('ui.gym_scope_61c0c08')}</label>
          <select  id="whatsapp-tenant-scope" value={tenantId} onChange={(event) => onTenantChange(event.target.value)} className="min-h-11 mt-3 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_messaging-superadmin-messaging-v1-whats-app-audience-panel-audience-panel-control-1">
            <option value="ALL_TENANTS" data-testid="superadmin_messaging-superadmin-messaging-v1-whats-app-audience-panel-audience-panel-action-1">{t('ui.all_superadmin_gyms_b2f706e')}</option>
            {tenants.map((tenant) => <option key={tenant.id} value={tenant.id} data-testid="superadmin_messaging-superadmin-messaging-v1-whats-app-audience-panel-audience-panel-action-2">{tenant.name}</option>)}
          </select>
          <p className="mt-4 text-xs leading-5 text-secondary">{t('ui.selected_audience_a19ea3a')} <span className="font-medium text-primary">{selectedAudience?.label ?? '—'}</span></p>
          <p className="mt-2 text-xs leading-5 text-secondary">{t('ui.recipients_are_tenant_owners_admins_or_managers__607aaac')}</p>
        </div>
      </div>
    </Panel>);
}
