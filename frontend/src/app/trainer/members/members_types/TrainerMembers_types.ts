// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Members module. Single source of truth for member data shapes.
import type { MessageType, TrainerMessageRecipient } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerMessageModal';
import type { MemberFormValues } from '@/app/trainer/members/members_utils/TrainerMembersSharedConstants';
import { z } from 'zod';
import { MemberSchema, MemberStatsSchema } from '@/app/trainer/members/members_types/TrainerMembers.schema';
import { TrainerMemberDietSnapshotSchema, type TrainerMemberDietSnapshot } from '@/app/trainer/members/members_types/TrainerMemberDietSnapshot';
import { TrainerMemberWorkoutSnapshotSchema, type TrainerMemberWorkoutSnapshot, type TrainerMemberWorkoutExerciseSnapshot } from '@/app/trainer/members/members_types/TrainerMemberWorkoutSnapshot';

export type Member = z.infer<typeof MemberSchema>;
export type MemberStats = z.infer<typeof MemberStatsSchema>;
export type DietPlan = TrainerMemberDietSnapshot;
export type Workout = TrainerMemberWorkoutSnapshot;
export type WorkoutExercise = TrainerMemberWorkoutExerciseSnapshot;
export const PROFILE_TAB_IDS = ['overview','fitness','assessment','progress','workout','diet','attendance','notes'] as const;
export type TrainerProfileTab = (typeof PROFILE_TAB_IDS)[number];

export interface MembersInitialData {
  members: Member[];
  stats: MemberStats;
  totalMembers: number;
}

export interface MembersContextType {
  // Data state
  members: Member[];
  stats: MemberStats;
  totalMembers: number;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  saving: boolean;
  attMap: Record<string, { day: number; status: string }[]>;
  loadAll: () => Promise<void>;
  loadMemberProfile: (memberId: string) => Promise<void>;

  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  progressStatusFilter: string;
  setProgressStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;


  // Member Profile
  selectedMember: Member | null;
  setSelectedMember: (m: Member | null) => void;
  profileTab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes';
  setProfileTab: (tab: 'overview' | 'fitness' | 'assessment' | 'progress' | 'workout' | 'diet' | 'attendance' | 'notes') => void;

  // Add/Edit Modal
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  editId: string | null;
  editData: MemberFormValues | null;

  // Actions
  openAdd: () => void;
  openEdit: (m: Member) => void;
  saveMember: (data: MemberFormValues) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  assignWorkout: (memberId: string, workout: Workout | null) => Promise<void>;
  assignDiet: (memberId: string, diet: DietPlan | null) => Promise<void>;

  // Message Modal
  msgModal: { open: boolean; recipient: TrainerMessageRecipient; type: MessageType; message: string; subject?: string } | null;
  openMsg: (m: Member, type: MessageType) => void;
  closeMsg: () => void;
}

