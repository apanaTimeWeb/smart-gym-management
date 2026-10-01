// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature.
'use client';
import { SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_constants/SuperadminMessagingConstants';
import { useTranslations } from 'next-intl';

import { Check, ExternalLink, MessageCircle, SkipForward } from 'lucide-react';

import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import Tooltip from '@/components/ui/Tooltip';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_components/superadmin_messaging_whatsapp_components_utils/SuperadminMessagingWhatsappComponentsFormatters';

import { superadminMessagingMaskPhone } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingFormatters';


import { getSuperadminMessagingStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_utils/SuperadminMessagingStatusBadgeConfig';

import type { SuperadminMessagingV1WhatsAppQueuePanelProps } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_types/SuperadminMessagingV1WhatsAppQueuePanelTypes';
import type { SuperadminWhatsAppQueueRecipient } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';

/**
 * @description Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminMessagingV1WhatsAppQueuePanel({ queue, activeIndex, onOpen, onMarkSent, onSkip, onClear, }: SuperadminMessagingV1WhatsAppQueuePanelProps) {
  const t = useTranslations('superadmin_messaging');
    if (queue.length === 0) {
        return (<Panel title={t('ui.bulk_whatsapp_queue_6a5b39a')} description={t('ui.start_a_campaign_to_build_a_guided_sending_queue_b9c0a23')}>
        <div className="flex min-h-36 items-center justify-center rounded-xl border border-dashed border-border p-6 text-sm text-secondary">{t('ui.no_active_queue_yet_9782271')}</div>
      </Panel>);
    }
    const sent = queue.filter((item) => item.status === SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUS_CODES.SENT).length;
    const skipped = queue.filter((item) => item.status === SUPERADMIN_WHATSAPP_QUEUE_ACTION_STATUS_CODES.SKIPPED).length;
    const pending = queue.length - sent - skipped;
    const active = queue[activeIndex] ?? null;
    const progress = queue.length === 0 ? 0 : ((sent + skipped) / queue.length) * 100;
    return (<Panel title={t('ui.bulk_whatsapp_queue_6a5b39a')} description={t('ui.open_one_chat_at_a_time_press_send_in_whatsapp_t_21c3cd4')} action={(<button type="button" onClick={onClear} className="min-h-11 rounded-lg border border-border bg-transparent px-3 py-2 text-xs font-medium text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-v1-whats-app-queue-panel-clear">
          
          {t('ui.clear_queue_2e33e90')}
        </button>)}>
      <div className="space-y-5">
        <ProgressBar label={`${formatNumber(sent + skipped)} of ${formatNumber(queue.length)} completed`} value={progress}/>

        {active ? (<div className="rounded-xl border border-border bg-primary-subtle p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t('ui.current_recipient_224343f')} {formatNumber(activeIndex + 1)} / {formatNumber(queue.length)}</p>
                <Tooltip content={`${active.recipient.contactName} · ${active.recipient.tenantName}`}>
                  <p className="mt-2 truncate text-lg font-semibold text-primary">{active.recipient.contactName}</p>
                </Tooltip>
                <p className="mt-1 text-xs text-secondary">{active.recipient.tenantName} · {superadminMessagingMaskPhone(active.recipient.phone)}</p>
                <p className="mt-3 line-clamp-2 text-sm text-secondary">{active.message}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                <button  type="button" onClick={() => onOpen(activeIndex)} className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border bg-primary-subtle px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-v1-whats-app-queue-panel-open">
                  <MessageCircle size={18} aria-hidden="true"/>  {t('ui.open_whatsapp_65ef740')}
                </button>
                <button  type="button" onClick={() => onMarkSent(activeIndex)} className="min-h-11 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-v1-whats-app-queue-panel-next">
                  <Check size={18} aria-hidden="true"/>  {t('ui.mark_sent_next_e24d6b9')}
                </button>
                <button  type="button" onClick={() => onSkip(activeIndex)} className="min-h-11 inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-3 py-2 text-sm font-medium text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_messaging-messaging-messaging-v1-whats-app-queue-panel-control">
                  <SkipForward size={18} aria-hidden="true"/>  {t('ui.skip_9c8de43')}
                </button>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <ExternalLink size={18} aria-hidden="true"/>  {t('ui.opening_a_chat_does_not_prove_the_message_was_se_5411190')}
            </p>
          </div>) : (<div className="rounded-xl border border-border bg-success-bg p-5 text-sm text-primary">{t('ui.queue_complete_4ab859a')} {formatNumber(sent)}  {t('ui.marked_sent_and_961254e')} {formatNumber(skipped)}  {t('ui.skipped_f5d3266')}</div>)}

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm superadmin-mobile-card-table">
            <thead>
              <tr className="border-b border-border bg-surface-highlight text-left text-xs uppercase tracking-wider text-secondary" data-testid="superadmin_messaging-messaging-v1-whats-app-queue-panel-action-1">
                <th className="px-3 py-3">{t('ui.recipient_d0f76ae')}</th>
                <th className="px-3 py-3">{t('ui.gym_dc8273a')}</th>
                <th className="px-3 py-3">{t('ui.status_523019d')}</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item, index) => (<tr key={item.recipient.id} className={index === activeIndex ? 'border-b border-border bg-primary-subtle' : 'border-b border-border'} data-testid={`superadmin_messaging-messaging-v1-whats-app-queue-panel-item-item-recipient-id-2-${String(item.recipient.id)}`}>
                  <td className="px-3 py-3" data-mobile-label={t('ui.mobile_recipient')}>
                    <Tooltip content={item.recipient.contactName}>
                      <span className="block max-w-44 truncate font-medium text-primary">{item.recipient.contactName}</span>
                    </Tooltip>
                  </td>
                  <td className="px-3 py-3 text-secondary" data-mobile-label={t('ui.mobile_gym')}>{item.recipient.tenantName}</td>
                  <td className="px-3 py-3" data-mobile-label={t('ui.mobile_status')}>
                    <span data-testid={`superadmin_messaging-whatsapp-queue-status-${item.id}`} className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getSuperadminMessagingStatusBadgeClasses(item.status)}`}>{item.status}</span>
                  </td>
                </tr>))}
            </tbody>
          </table>
          {pending === 0 ? <p className="px-3 py-3 text-xs text-secondary">{t('ui.all_queue_items_are_complete_c44b765')}</p> : null}
        </div>
      </div>
    </Panel>);
}
