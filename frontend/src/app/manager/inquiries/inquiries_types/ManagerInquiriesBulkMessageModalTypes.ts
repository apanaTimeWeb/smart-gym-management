// RESPONSIBILITY: Defines the Inquiries-owned bulk messaging recipient and modal contract.
import type { ManagerInquiriesMessageType, ManagerInquiriesMessageRecipient } from '@/app/manager/inquiries/inquiries_types/ManagerInquiriesMessageTypes';
export interface ManagerInquiriesBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerInquiriesMessageRecipient[];
  type: ManagerInquiriesMessageType;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
