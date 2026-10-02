'use client';// DATA FLOW: Inputs enter useSuperadminBroadcastsBroadcastQueueState, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
import { useState } from 'react';

import type { SuperadminBroadcastQueueRecipientDraft, SuperadminBroadcastQueueState } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsBroadcastQueueStateTypes';



/** Owns local draft state for opening and closing the Broadcast delivery queue. */
/** Purpose: Owns the useSuperadminBroadcastsBroadcastQueueState data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminBroadcastsBroadcastQueueState.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBroadcastsBroadcastQueueState → consuming feature component.
export function useSuperadminBroadcastsBroadcastQueueState() {
  const [queueModalOpen, setQueueModalOpen] = useState(false);
  const [queueRecipients, setQueueRecipients] = useState<SuperadminBroadcastQueueRecipientDraft[]>([]);
  const [queueBroadcastId, setQueueBroadcastId] = useState<string | null>(null);
  const [queueTitle, setQueueTitle] = useState('');
  return { queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, setQueueModalOpen, setQueueRecipients, setQueueBroadcastId, setQueueTitle };
}
