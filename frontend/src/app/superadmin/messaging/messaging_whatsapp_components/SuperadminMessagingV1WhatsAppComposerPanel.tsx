// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature.
'use client';
import { ClipboardPlus } from 'lucide-react';
import Panel from '@/components/ui/Panel';
import type { SuperadminWhatsAppTemplate } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { SuperadminMessagingV1WhatsAppComposerPanelProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppComposerPanelTypes';

export default function SuperadminMessagingV1WhatsAppComposerPanel({ template, title, body, variables, onTitleChange, onBodyChange, onInsertVariable, }: SuperadminMessagingV1WhatsAppComposerPanelProps) {
    return (<Panel title="Message composer" description="Pick a template, edit the wording, and use variables for personalized messages." action={(<span className="rounded-full border border-primary/30 bg-primary-subtle px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          Free click-to-chat mode
        </span>)}>
      <div className="space-y-4">
        <div>
          <label htmlFor="whatsapp-campaign-title" className="text-xs font-semibold uppercase tracking-wider text-secondary">Campaign title</label>
          <input id="whatsapp-campaign-title" value={title} onChange={(event) => onTitleChange(event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder="September Fee Reminder"/>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="whatsapp-message-body" className="text-xs font-semibold uppercase tracking-wider text-secondary">Message</label>
            <span className="text-xs text-secondary">{body.length} characters</span>
          </div>
          <textarea id="whatsapp-message-body" value={body} onChange={(event) => onBodyChange(event.target.value)} rows={7} className="mt-2 w-full resize-y rounded-lg border border-border bg-input px-3 py-3 text-sm leading-6 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder={template?.body ?? 'Write your WhatsApp message...'}/>
        </div>

        <div className="rounded-xl border border-border bg-input/30 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
            <ClipboardPlus size={15} aria-hidden="true"/> Personalization variables
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {variables.map((variable) => (<button key={variable} type="button" onClick={() => onInsertVariable(variable)} className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-primary hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {variable}
              </button>))}
          </div>
          <p className="mt-3 text-xs text-secondary">Example: <span className="text-primary">Hi {'{contact_name}'}</span> becomes the selected tenant contact name before the WhatsApp chat opens.</p>
        </div>
      </div>
    </Panel>);
}
