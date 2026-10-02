// RESPONSIBILITY: Type contract extracted from SuperadminBroadcastsBroadcastQueueModal.tsx; no business behavior.
import type { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsBroadcastConstants';

export interface SuperadminBroadcastRecipient {
  id: string;
  name: string;
  phone: string;
}

export type SuperadminBroadcastQueueRecipientState = keyof typeof SUPERADMIN_BROADCAST_QUEUE_STATE_CODES;

export interface SuperadminBroadcastsBroadcastQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: SuperadminBroadcastRecipient[];
  broadcastId: string | null;
  broadcastTitle: string;
  onComplete: (message: string) => void;
}
