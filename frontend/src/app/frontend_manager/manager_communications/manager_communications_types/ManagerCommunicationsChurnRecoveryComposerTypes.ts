// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';

export interface ManagerCommunicationsChurnRecoveryComposerProps {
  member: ChurnedMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => void;
  isSending: boolean;
  defaultTier: WinBackTemplateTier;
}
