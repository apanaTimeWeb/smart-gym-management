'use client';
import { useEffect, useState } from 'react';
import type { AdminCampaignsQueueItem } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';
import AdminCampaignsQueuePanel from '@/app/admin/campaigns/campaigns_components/AdminCampaignsQueuePanel/AdminCampaignsQueuePanel';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  queue: AdminCampaignsQueueItem[];
  onOpenItem: (index: number) => void;
  onMarkSent: (index: number) => void;
  onSkip: (index: number) => void;
}

export default function AdminCampaignsBulkModal({ isOpen, onClose, queue, onOpenItem, onMarkSent, onSkip }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-page shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">Bulk Campaign Queue</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-secondary hover:bg-input hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <AdminCampaignsQueuePanel 
            queue={queue}
            onOpen={onOpenItem}
            onMarkSent={onMarkSent}
            onSkip={onSkip}
          />
        </div>
      </div>
    </div>
  );
}
