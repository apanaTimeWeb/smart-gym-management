// RESPONSIBILITY: Defines the Inquiries-owned message recipient and single-message modal contract.
export type ManagerInquiriesMessageType = 'whatsapp' | 'email';

export interface ManagerInquiriesMessageRecipient {
  name: string;
  phone?: string;
  email?: string;
}

export interface ManagerInquiriesMessageModalProps {
  open?: boolean;
  onClose: () => void;
  recipient: ManagerInquiriesMessageRecipient;
  type: ManagerInquiriesMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
