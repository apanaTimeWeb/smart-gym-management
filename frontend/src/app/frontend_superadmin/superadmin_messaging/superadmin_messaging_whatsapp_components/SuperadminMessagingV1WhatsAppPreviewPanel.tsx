'use client';
// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature.
import { useTranslations } from 'next-intl';

import { Eye, ExternalLink } from 'lucide-react';

import Panel from '@/components/ui/Panel';
import Tooltip from '@/components/ui/Tooltip';
import { superadminMessagingDisplayValue, superadminMessagingMaskPhone } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';



import { replaceWhatsAppVariables } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_utils/SuperadminMessagingV1WhatsAppUtils';

import type { SuperadminMessagingV1WhatsAppPreviewPanelProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppPreviewPanelTypes';
import type { SuperadminWhatsAppRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppPreviewPanel responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppPreviewPanel({ recipient, title, body }: SuperadminMessagingV1WhatsAppPreviewPanelProps) {
  const t = useTranslations('superadmin_messaging');
    const preview = recipient ? replaceWhatsAppVariables(body, recipient) : body;
    return (<Panel title={t('ui.live_preview_9a6fd9a')} description={t('ui.see_the_final_personalized_message_before_starti_d88dd9a')}>
      {!recipient ? (<div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-secondary">
          
          {t('ui.choose_an_audience_with_at_least_one_whatsapp_re_c9b63a5')}
        </div>) : (<div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary">
              <Eye size={18} aria-hidden="true"/>  {t('ui.example_recipient_73cbc55')}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <Tooltip content={recipient.contactName}>
                <p className="truncate text-sm font-semibold text-primary">{recipient.contactName}</p>
              </Tooltip>
              <span className="shrink-0 text-xs text-secondary">{recipient.tenantName}</span>
            </div>
            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-primary">{superadminMessagingDisplayValue(title, '—')}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-secondary">{superadminMessagingDisplayValue(preview, '—')}</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-primary-subtle p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t('ui.how_free_mode_works_3b46724')}</p>
            <p className="mt-2 text-sm leading-6 text-secondary">{t('ui.each_queue_step_opens_a_whatsapp_chat_with_the_m_7a2a27b')}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <ExternalLink size={18} aria-hidden="true"/>  {t('ui.no_paid_messaging_api_is_required_for_this_workf_5599b47')}
            </div>
          </div>
        </div>)}
    </Panel>);
}
