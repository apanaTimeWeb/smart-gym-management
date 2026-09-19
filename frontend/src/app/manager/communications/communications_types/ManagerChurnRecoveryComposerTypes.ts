// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type {
  ChurnedMember,
  CommChannel,
  WinBackTemplateTier } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export interface ManagerChurnRecoveryComposerProps {
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
