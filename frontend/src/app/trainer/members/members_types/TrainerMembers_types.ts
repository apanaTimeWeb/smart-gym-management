// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Members module. Single source of truth for member data shapes.
import type { MemberMessageType, TrainerMemberMessageRecipient } from '@/app/trainer/members/members_types/TrainerMembersMessagingTypes';
import { z } from 'zod';
import { MemberSchema, MemberStatsSchema } from '@/app/trainer/members/members_types/TrainerMembers.schema';
import { TrainerMemberDietSnapshotSchema, type TrainerMemberDietSnapshot } from '@/app/trainer/members/members_types/TrainerMemberDietSnapshot';
import { TrainerMemberWorkoutSnapshotSchema, type TrainerMemberWorkoutSnapshot, type TrainerMemberWorkoutExerciseSnapshot } from '@/app/trainer/members/members_types/TrainerMemberWorkoutSnapshot';

export type Member = z.infer<typeof MemberSchema>;
export type MemberStats = z.infer<typeof MemberStatsSchema>;
export type DietPlan = TrainerMemberDietSnapshot;
export type Workout = TrainerMemberWorkoutSnapshot;
export type WorkoutExercise = TrainerMemberWorkoutExerciseSnapshot;
export interface MembersInitialData {
  members: Member[];
  stats: MemberStats;
  totalMembers: number;
}
