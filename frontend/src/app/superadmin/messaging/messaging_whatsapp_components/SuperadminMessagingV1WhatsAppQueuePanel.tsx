// RESPONSIBILITY: Renders or orchestrates the Superadmin MessagingV1WhatsAppQueuePanel responsibility defined by this module feature.
'use client';
import { Check, ExternalLink, MessageCircle, SkipForward } from 'lucide-react';
import { formatNumber } from '@/lib/formatters';
import { maskSensitiveData } from '@/lib/formatters';
import Panel from '@/components/ui/Panel';
import ProgressBar from '@/components/ui/ProgressBar';
import Tooltip from '@/components/ui/Tooltip';
import { getSuperadminMessagingStatusBadgeClasses } from '@/app/superadmin/messaging/messaging_utils/SuperadminMessagingStatusBadgeConfig';
import type { SuperadminWhatsAppQueueRecipient } from '@/app/superadmin/messaging/messaging_whatsapp_types/SuperadminMessagingV1WhatsAppTypes';
import type { SuperadminMessagingV1WhatsAppQueuePanelProps } from '@/app/superadmin/messaging/messaging_types/SuperadminMessagingV1WhatsAppQueuePanelTypes';

export default function SuperadminMessagingV1WhatsAppQueuePanel({ queue, activeIndex, onOpen, onMarkSent, onSkip, onClear, }: SuperadminMessagingV1WhatsAppQueuePanelProps) {
    if (queue.length === 0) {
        return (<Panel title="Bulk WhatsApp queue" description="Start a campaign to build a guided sending queue.">
        <div className="flex min-h-36 items-center justify-center rounded-xl border border-dashed border-border p-6 text-sm text-secondary">No active queue yet.</div>
      </Panel>);
    }
    const sent = queue.filter((item) => item.status === 'SENT').length;
    const skipped = queue.filter((item) => item.status === 'SKIPPED').length;
    const pending = queue.length - sent - skipped;
    const active = queue[activeIndex] ?? null;
    const progress = queue.length === 0 ? 0 : ((sent + skipped) / queue.length) * 100;
    return (<Panel title="Bulk WhatsApp queue" description="Open one chat at a time, press Send in WhatsApp, then mark the item sent or skip it." action={(<button type="button" onClick={onClear} className="rounded-lg border border-border bg-input px-3 py-2 text-xs font-medium text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Clear queue
        </button>)}>
      <div className="space-y-5">
        <ProgressBar label={`${formatNumber(sent + skipped)} of ${formatNumber(queue.length)} completed`} value={progress}/>

        {active ? (<div className="rounded-2xl border border-border bg-primary-subtle p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Current recipient · {formatNumber(activeIndex + 1)} / {formatNumber(queue.length)}</p>
                <Tooltip content={`${active.recipient.contactName} · ${active.recipient.tenantName}`}>
                  <p className="mt-2 truncate text-lg font-semibold text-primary">{active.recipient.contactName}</p>
                </Tooltip>
                <p className="mt-1 text-xs text-secondary">{active.recipient.tenantName} · {maskSensitiveData(active.recipient.phone, 'phone')}</p>
                <p className="mt-3 line-clamp-2 text-sm text-secondary">{active.message}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:max-w-sm lg:justify-end">
                <button type="button" onClick={() => onOpen(activeIndex)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-primary-subtle px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <MessageCircle size={18} aria-hidden="true"/> Open WhatsApp
                </button>
                <button type="button" onClick={() => onMarkSent(activeIndex)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <Check size={18} aria-hidden="true"/> Mark Sent & Next
                </button>
                <button type="button" onClick={() => onSkip(activeIndex)} className="inline-flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2 text-sm font-medium text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <SkipForward size={18} aria-hidden="true"/> Skip
                </button>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-secondary">
              <ExternalLink size={18} aria-hidden="true"/> Opening a chat does not prove the message was sent; use “Mark Sent” after pressing Send in WhatsApp.
            </p>
          </div>) : (<div className="rounded-2xl border border-border bg-success-bg p-5 text-sm text-primary">Queue complete. {formatNumber(sent)} marked sent and {formatNumber(skipped)} skipped.</div>)}

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-input text-left text-xs uppercase tracking-wider text-secondary">
                <th className="px-3 py-3">Recipient</th>
                <th className="px-3 py-3">Gym</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((item, index) => (<tr key={item.recipient.id} className={index === activeIndex ? 'border-b border-border bg-primary-subtle' : 'border-b border-border'}>
                  <td className="px-3 py-3">
                    <Tooltip content={item.recipient.contactName}>
                      <span className="block max-w-44 truncate font-medium text-primary">{item.recipient.contactName}</span>
                    </Tooltip>
                  </td>
                  <td className="px-3 py-3 text-secondary">{item.recipient.tenantName}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${getSuperadminMessagingStatusBadgeClasses(item.status)}`}>{item.status}</span>
                  </td>
                </tr>))}
            </tbody>
          </table>
          {pending === 0 ? <p className="px-3 py-3 text-xs text-secondary">All queue items are complete.</p> : null}
        </div>
      </div>
    </Panel>);
}
