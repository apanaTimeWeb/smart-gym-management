'use client';
import { useState } from 'react';
import type { SuperadminBroadcastQueueRecipientDraft, SuperadminBroadcastQueueState } from '@/app/superadmin/broadcasts/broadcasts_utils/SuperadminBroadcastQueueStateTypes';

/** Owns local draft state for opening and closing the Broadcast delivery queue. */
export function useSuperadminBroadcastQueueState() {
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueRecipients, setQueueRecipients] = useState<SuperadminBroadcastQueueRecipientDraft[]>([]);
  const [queueBroadcastId, setQueueBroadcastId] = useState<string | null>(null);
  const [queueTitle, setQueueTitle] = useState('');
  return { queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, setQueueModalOpen, setQueueRecipients, setQueueBroadcastId, setQueueTitle };
}
