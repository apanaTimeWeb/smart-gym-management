'use client';
import { useState } from 'react';
import type { AdminCampaignsQueueItem } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import { buildAdminWhatsAppLink } from '@/app/admin/campaigns/campaigns_utils/AdminCampaignsWhatsAppUtils';
import { CheckCircle2, Circle, Clock, ExternalLink, Play, SkipForward } from 'lucide-react';

interface Props {
  queue: AdminCampaignsQueueItem[];
  onOpen: (index: number) => void;
  onMarkSent: (index: number) => void;
  onSkip: (index: number) => void;
}

export default function AdminCampaignsQueuePanel({ queue, onOpen, onMarkSent, onSkip }: Props) {
  const [isSendingAll, setIsSendingAll] = useState(false);

  const handleSendAll = async () => {
    if (isSendingAll || queue.length === 0) return;
    setIsSendingAll(true);
    
    // Iterate through all QUEUED items
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item && item.status === 'QUEUED') {
        onOpen(i);
        // Wait 500ms before opening the next tab to prevent browser popup blockers
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setIsSendingAll(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SENT': return <CheckCircle2 size={16} className="text-success" />;
      case 'OPENED': return <Clock size={16} className="text-warning" />;
      case 'SKIPPED': return <SkipForward size={16} className="text-secondary" />;
      default: return <Circle size={16} className="text-secondary/40" />;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-primary">4. WhatsApp Queue</h2>
          <p className="mt-1 text-xs text-secondary">
            {queue.filter(q => q.status === 'SENT').length} / {queue.length} sent
          </p>
        </div>
        
        {queue.length > 0 && (
          <button
            onClick={() => void handleSendAll()}
            disabled={isSendingAll || queue.every(q => q.status !== 'QUEUED')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-sm font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Play size={16} />
            {isSendingAll ? 'Opening Tabs...' : 'Send All'}
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {queue.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-border rounded-lg bg-input/50">
            <p className="text-sm font-medium text-primary">Queue is empty</p>
            <p className="mt-1 text-xs text-secondary">Select an audience and generate the queue.</p>
          </div>
        ) : (
          queue.map((item, i) => (
            <div key={item.recipient.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-input/30 hover:bg-input transition-colors">
              <div className="flex items-center gap-3">
                {getStatusIcon(item.status)}
                <div>
                  <p className="text-sm font-medium text-primary">{item.recipient.name}</p>
                  <p className="text-xs text-secondary">{item.recipient.branchName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {item.status === 'OPENED' && (
                  <>
                    <button
                      onClick={() => onMarkSent(i)}
                      className="px-3 py-1.5 rounded bg-success-bg text-success text-xs font-medium hover:bg-success-bg transition-colors"
                    >
                      Mark Sent
                    </button>
                    <button
                      onClick={() => onSkip(i)}
                      className="px-3 py-1.5 rounded bg-input text-secondary text-xs font-medium hover:bg-secondary/10 transition-colors"
                    >
                      Skip
                    </button>
                  </>
                )}
                
                {item.status === 'QUEUED' && (
                  <button
                    onClick={() => onOpen(i)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-card text-primary text-xs font-medium hover:border-primary transition-colors"
                  >
                    <ExternalLink size={14} />
                    Open
                  </button>
                )}
                
                {(item.status === 'SENT' || item.status === 'SKIPPED') && (
                  <span className="text-xs font-medium text-secondary px-2">
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
