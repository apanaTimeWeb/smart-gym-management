'use client';// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature.
import { ClipboardPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Panel from '@/components/ui/Panel';

import type { SuperadminMessagingV1WhatsAppComposerPanelProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppComposerPanelTypes';
import type { SuperadminWhatsAppTemplate } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';



/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppComposerPanel responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppComposerPanel({ template, title, body, variables, onTitleChange, onBodyChange, onInsertVariable, }: SuperadminMessagingV1WhatsAppComposerPanelProps) {
  const t = useTranslations('superadmin_messaging');
    return (<Panel title={t('ui.message_composer_800f211')} description={t('ui.pick_a_template_edit_the_wording_and_use_variabl_6bd63cc')} action={(<span className="rounded-full border border-border bg-primary-subtle px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          
          {t('ui.free_click_to_chat_mode_3e126b9')}
        </span>)}>
      <div className="space-y-4">
        <div>
          <label htmlFor="whatsapp-campaign-title" className="text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.campaign_title_18fdf4a')}</label>
          <input  id="whatsapp-campaign-title" value={title} onChange={(event) => onTitleChange(event.target.value)} className="min-h-11 mt-2 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={t('ui.september_fee_reminder_c7a719c')} data-testid="superadmin_messaging-superadmin-messaging-v1-whats-app-composer-panel-app-composer-panel-control"/>
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="whatsapp-message-body" className="text-xs font-semibold uppercase tracking-wider text-secondary">{t('ui.message_06e907d')}</label>
            <span className="text-xs text-secondary">{body.length}  {t('ui.characters_dc3b089')}</span>
          </div>
          <textarea  id="whatsapp-message-body" value={body} onChange={(event) => onBodyChange(event.target.value)} rows={7} className="min-h-11 mt-2 w-full resize-y rounded-lg border border-border bg-input px-3 py-3 text-sm leading-6 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={template?.body ?? t('ui.write_your_whatsapp_message_c08f21f')} data-testid="superadmin_messaging-superadmin-messaging-v1-whats-app-composer-panel-composer-panel-control-2"/>
        </div>

        <div className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
            <ClipboardPlus size={18} aria-hidden="true"/>  {t('ui.personalization_variables_e1ad89d')}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {variables.map((variable, index) => (<button  key={variable} type="button" onClick={() => onInsertVariable(variable)} className="min-h-11 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-primary hover:border-border hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid={`superadmin_messaging-messaging-messaging-v1-whats-app-composer-panel-action1-${index}`}>
                {variable}
              </button>))}
          </div>
          <p className="mt-3 text-xs text-secondary">{t('ui.example_8c479e2')} <span className="text-primary">{t('ui.hi_176245d')} {t('ui.contact_name_d361b00')}</span>  {t('ui.becomes_the_selected_tenant_contact_name_before__595c75b')}</p>
        </div>
      </div>
    </Panel>);
}
