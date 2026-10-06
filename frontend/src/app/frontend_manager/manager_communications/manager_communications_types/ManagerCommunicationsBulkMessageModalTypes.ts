// RESPONSIBILITY: Defines the Communications-owned bulk messaging contract for campaign recipients.
import type { CommChannel } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
export interface ManagerCommunicationsBulkMessageRecipient { name: string; phone?: string; email?: string; }
export interface ManagerCommunicationsBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerCommunicationsBulkMessageRecipient[];
  type: CommChannel;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
