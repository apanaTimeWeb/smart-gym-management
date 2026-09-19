// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export interface ManagerChurnRecoveryTableRowProps {
  member: ChurnedMember;
  onOpenComposer: (memberId: string) => void;
  maskPhone: (phone: string) => string;
}
