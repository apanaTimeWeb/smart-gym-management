// RESPONSIBILITY: Defines the Members-owned message recipient and message-modal contract for member communications.
export type ManagerMembersMessageType = 'whatsapp' | 'email';
export interface ManagerMembersMessageRecipient { name: string; phone?: string; email?: string; }
export interface ManagerMembersMessageModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  recipient: ManagerMembersMessageRecipient;
  type: ManagerMembersMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  whatsappUrlBuilder?: (phone: string, message: string) => string;
}
