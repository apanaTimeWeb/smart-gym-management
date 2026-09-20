// RESPONSIBILITY: Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, Play, SkipForward } from 'lucide-react';
import type { AdminCampaignsQueuePanelProps, AdminCampaignsQueueStatus } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

function getAdminCampaignsStatusIcon(status: AdminCampaignsQueueStatus) {
  if (status === 'SENT') return <CheckCircle2 size={18} className="text-success" aria-hidden="true" />;
  if (status === 'OPENED') return <Clock size={18} className="text-warning" aria-hidden="true" />;
  if (status === 'SKIPPED') return <SkipForward size={18} className="text-secondary" aria-hidden="true" />;
  return <Circle size={18} className="text-secondary" aria-hidden="true" />;
}

export default function AdminCampaignsQueuePanel({ queue, onOpen, onMarkSent, onSkip }: AdminCampaignsQueuePanelProps) {
  const [isSendingAll, setIsSendingAll] = useState(false);

  const handleSendAll = async () => {
    if (isSendingAll || queue.length === 0) return;
    setIsSendingAll(true);
    for (let index = 0; index < queue.length; index += 1) {
      const item = queue[index];
      if (item?.status === 'QUEUED') {
        onOpen(index);
        await new Promise<void>((resolve) => window.setTimeout(resolve, 500));
      }
    }
    setIsSendingAll(false);
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-queue-heading">
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="campaign-queue-heading" className="text-sm font-semibold text-primary">4. WhatsApp Queue</h2>
          <p className="mt-1 text-xs text-secondary">{queue.filter((item) => item.status === 'SENT').length} / {queue.length} sent</p>
        </div>
        {queue.length > 0 && (
          <button
            type="button"
            onClick={() => void handleSendAll()}
            disabled={isSendingAll || queue.every((item) => item.status !== 'QUEUED')}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Play size={18} aria-hidden="true" />
            {isSendingAll ? 'Opening Tabs...' : 'Send All'}
          </button>
        )}
      </div>
      <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
        {queue.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-input p-10 text-center">
            <p className="text-sm font-medium text-primary">Queue is empty</p>
            <p className="mt-1 text-xs text-secondary">Select an audience and generate the queue.</p>
          </div>
        ) : (
          queue.map((item, index) => (
            <div key={item.recipient.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-input p-3 motion-safe:transition-colors motion-safe:duration-base hover:bg-card">
              <div className="flex min-w-0 items-center gap-3">
                {getAdminCampaignsStatusIcon(item.status)}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary">{item.recipient.name}</p>
                  <p className="truncate text-xs text-secondary">{item.recipient.branchName}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {item.status === 'OPENED' && (
                  <>
                    <button type="button" onClick={() => onMarkSent(index)} className="rounded bg-success-bg px-3 py-1.5 text-xs font-medium text-success motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Mark Sent</button>
                    <button type="button" onClick={() => onSkip(index)} className="rounded bg-input px-3 py-1.5 text-xs font-medium text-secondary motion-safe:transition-colors hover:bg-surface-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Skip</button>
                  </>
                )}
                {item.status === 'QUEUED' && (
                  <button type="button" onClick={() => onOpen(index)} className="flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary motion-safe:transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    <ExternalLink size={18} aria-hidden="true" />Open
                  </button>
                )}
                {(item.status === 'SENT' || item.status === 'SKIPPED') && <span className="px-2 text-xs font-medium text-secondary">{item.status}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
