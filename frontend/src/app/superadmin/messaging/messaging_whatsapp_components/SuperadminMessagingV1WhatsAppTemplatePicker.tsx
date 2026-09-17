// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppTemplatePicker responsibility defined by this module feature.
'use client';
import { MessageSquareText } from 'lucide-react';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { getSuperadminStatusBadgeClasses } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminStatusBadgeConfig';
import type { SuperadminWhatsAppTemplate } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
interface SuperadminMessagingV1WhatsAppTemplatePickerProps {
    templates: SuperadminWhatsAppTemplate[];
    selectedId: string;
    onSelect: (template: SuperadminWhatsAppTemplate) => void;
}
export default function SuperadminMessagingV1WhatsAppTemplatePicker({ templates, selectedId, onSelect, }: SuperadminMessagingV1WhatsAppTemplatePickerProps) {
    return (<SuperadminV1Panel title="WhatsApp templates" description="Ready-to-use messages for fees, renewals, maintenance, updates, and custom outreach.">
      {templates.length === 0 ? (<div className="rounded-lg border border-dashed border-border p-5 text-sm text-secondary">
          No WhatsApp templates are available.
        </div>) : (<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
                const selected = template.id === selectedId;
                return (<button key={template.id} type="button" onClick={() => onSelect(template)} className={`rounded-xl border p-4 text-left motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected ? 'border-primary/50 bg-primary/10 shadow-lg shadow-primary/10' : 'border-border bg-input/30 hover:border-primary/30 hover:bg-input'}`} aria-pressed={selected}>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary">
                    <MessageSquareText size={18} aria-hidden="true"/>
                  </span>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wider ${getSuperadminStatusBadgeClasses(template.status)}`}>
                    {template.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold text-foreground">{template.name}</p>
                <p className="mt-1 text-xs text-secondary">{template.description}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wider text-secondary">{template.category}</p>
              </button>);
            })}
        </div>)}
    </SuperadminV1Panel>);
}
