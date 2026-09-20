// RESPONSIBILITY: Defines the Communications-owned bulk messaging contract for campaign recipients.
import type { CommChannel } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
export interface ManagerCommunicationsBulkMessageRecipient { name: string; phone?: string; email?: string; }
export interface ManagerCommunicationsBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerCommunicationsBulkMessageRecipient[];
  type: CommChannel;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
