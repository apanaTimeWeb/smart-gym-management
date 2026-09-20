// RESPONSIBILITY: Type contract extracted from SuperadminBroadcastQueueModal.tsx; no business behavior.


export interface SuperadminBroadcastRecipient {
  id: string;
  name: string;
  phone: string;
}

export type SuperadminBroadcastQueueRecipientState = 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'FAILED';

export interface SuperadminBroadcastQueueModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipients: SuperadminBroadcastRecipient[];
  broadcastId: string | null;
  broadcastTitle: string;
  onComplete: (message: string) => void;
}
