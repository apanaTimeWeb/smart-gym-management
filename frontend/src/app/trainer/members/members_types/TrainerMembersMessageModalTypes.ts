// RESPONSIBILITY: View-prop contract for the Members-owned messaging modal.
import type { MemberMessageType, TrainerMemberMessageRecipient } from '@/app/trainer/members/members_types/TrainerMembersMessagingTypes';

export interface TrainerMembersMessageModalProps {
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  recipient: TrainerMemberMessageRecipient;
  type: MemberMessageType;
  defaultMessage?: string;
  message?: string;
  subject?: string;
  onSuccess?: () => void;
}
