// DATA FLOW: Inputs enter useSuperadminBroadcastQueueState, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
'use client';
import { useState } from 'react';
import type { SuperadminBroadcastQueueRecipientDraft, SuperadminBroadcastQueueState } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastQueueStateTypes';

/** Owns local draft state for opening and closing the Broadcast delivery queue. */
/** Purpose: Owns the useSuperadminBroadcastQueueState data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
export function useSuperadminBroadcastQueueState() {
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueRecipients, setQueueRecipients] = useState<SuperadminBroadcastQueueRecipientDraft[]>([]);
  const [queueBroadcastId, setQueueBroadcastId] = useState<string | null>(null);
  const [queueTitle, setQueueTitle] = useState('');
  return { queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, setQueueModalOpen, setQueueRecipients, setQueueBroadcastId, setQueueTitle };
}
