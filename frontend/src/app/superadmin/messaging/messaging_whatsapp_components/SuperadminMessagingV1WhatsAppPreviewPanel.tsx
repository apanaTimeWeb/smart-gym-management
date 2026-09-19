// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature.
'use client';
import { Eye, ExternalLink } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { displayValue } from '@/lib/formatters';
import type { SuperadminWhatsAppRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import { replaceWhatsAppVariables } from '@/app/superadmin/messaging/messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';
import type { SuperadminMessagingV1WhatsAppPreviewPanelProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppPreviewPanelTypes';

export default function SuperadminMessagingV1WhatsAppPreviewPanel({ recipient, title, body }: SuperadminMessagingV1WhatsAppPreviewPanelProps) {
    const preview = recipient ? replaceWhatsAppVariables(body, recipient) : body;
    return (<Panel title="Live preview" description="See the final personalized message before starting the queue.">
      {!recipient ? (<div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-secondary">
          Choose an audience with at least one WhatsApp-ready recipient to preview the message.
        </div>) : (<div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-input/30 p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
              <Eye size={15} aria-hidden="true"/> Example recipient
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <Tooltip content={recipient.contactName}>
                <p className="truncate text-sm font-semibold text-primary">{recipient.contactName}</p>
              </Tooltip>
              <span className="shrink-0 text-xs text-secondary">{recipient.tenantName}</span>
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-primary">{displayValue(title, '—')}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-secondary">{displayValue(preview, '—')}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">How free mode works</p>
            <p className="mt-2 text-sm leading-6 text-secondary">Each queue step opens a WhatsApp chat with the message already filled in. You press WhatsApp's Send button, then mark the item sent in Superadmin.</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <ExternalLink size={14} aria-hidden="true"/> No paid messaging API is required for this workflow.
            </div>
          </div>
        </div>)}
    </Panel>);
}
