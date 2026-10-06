// RESPONSIBILITY: Defines the Inquiries-owned bulk messaging recipient and modal contract.
import type { ManagerInquiriesMessageType, ManagerInquiriesMessageRecipient } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_types/ManagerInquiriesMessageTypes';
export interface ManagerInquiriesBulkMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipients: ManagerInquiriesMessageRecipient[];
  type: ManagerInquiriesMessageType;
  defaultMessage?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
