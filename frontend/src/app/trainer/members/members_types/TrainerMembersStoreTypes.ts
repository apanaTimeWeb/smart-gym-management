// RESPONSIBILITY: UI-only Zustand state contract for the Trainer Members feature.
import type { MemberFormValues, TrainerProfileTab } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';
import type { MemberMessageType, TrainerMemberMessageRecipient } from '@/app/trainer/members/members_types/TrainerMembersMessagingTypes';

export interface TrainerMemberMessageModalState {
  open: boolean;
  recipient: TrainerMemberMessageRecipient;
  type: MemberMessageType;
  message: string;
  subject?: string;
}

export interface TrainerMembersState {
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
  setSelectedMember: (memberId: string | null) => void;
  profileTab: TrainerProfileTab;
  setProfileTab: (tab: TrainerProfileTab) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editId: string | null;
  editData: MemberFormValues | null;
  setEditState: (id: string | null, data: MemberFormValues | null) => void;
  msgModal: TrainerMemberMessageModalState | null;
  openMsg: (recipient: TrainerMemberMessageRecipient, type: MemberMessageType, message: string) => void;
  closeMsg: () => void;
}
