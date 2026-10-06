// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';

export interface ManagerCommunicationsChurnRecoveryTableRowProps {
  member: ChurnedMember;
  onOpenComposer: (memberId: string) => void;
  maskPhone: (phone: string) => string;
}
