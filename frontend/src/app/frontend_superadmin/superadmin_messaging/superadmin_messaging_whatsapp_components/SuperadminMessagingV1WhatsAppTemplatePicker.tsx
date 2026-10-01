// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature.
'use client';
import { useTranslations } from 'next-intl';

import { MessageSquareText } from 'lucide-react';

import Panel from '@/components/ui/Panel';

import { getSuperadminMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingStatusBadgeConfig';

import type { SuperadminMessagingV1WhatsAppTemplatePickerProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppTemplatePickerTypes';
import type { SuperadminWhatsAppTemplate } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppTemplatePicker({ templates, selectedId, onSelect, }: SuperadminMessagingV1WhatsAppTemplatePickerProps) {
  const t = useTranslations('superadmin_messaging');
    return (<Panel title={t('ui.whatsapp_templates_0cd1d5a')} description={t('ui.ready_to_use_messages_for_fees_renewals_maintena_0c50526')}>
      {templates.length === 0 ? (<div className="rounded-lg border border-dashed border-border p-5 text-sm text-secondary">
          
          {t('ui.no_whatsapp_templates_are_available_0447a5b')}
        </div>) : (<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template, index) => {
                const selected = template.id === selectedId;
                return (<button  key={template.id} type="button" onClick={() => onSelect(template)} className={`min-h-11 rounded-xl border p-4 text-left motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-border bg-primary-subtle shadow-card shadow-card' : 'border-border bg-card hover:border-border hover:bg-surface-hover'} motion-safe:active:scale-95`} aria-pressed={selected} data-testid={`superadmin_messaging-messaging-messaging-v1-whats-app-template-picker-action1-${index}`}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
                    <MessageSquareText size={18} aria-hidden="true"/>
                  </span>
                  <span data-testid={`superadmin_messaging-whatsapp-template-status-${template.id}`} className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider ${getSuperadminMessagingStatusBadgeClasses(template.status)}`}>
                    {template.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-primary">{template.name}</p>
                <p className="mt-1 text-xs text-secondary">{template.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-secondary">{template.category}</p>
              </button>);
            })}
        </div>)}
    </Panel>);
}
