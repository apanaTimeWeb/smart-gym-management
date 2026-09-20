// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Members module. Single source of truth for member data shapes.

import { z } from 'zod';
import { MemberSchema, MemberStatsSchema } from '@/app/trainer/members/members_types/TrainerMembers.schema';
import type { TrainerMemberDietSnapshot } from '@/app/trainer/members/members_types/TrainerMemberDietSnapshot';
import type { TrainerMemberWorkoutSnapshot, TrainerMemberWorkoutExerciseSnapshot } from '@/app/trainer/members/members_types/TrainerMemberWorkoutSnapshot';

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

export const TRAINER_MEMBERS_SORT_FIELDS = ['id', 'name', 'status', 'expiryDate', 'progressStatus'] as const;
export type TrainerMembersSortField = (typeof TRAINER_MEMBERS_SORT_FIELDS)[number];
export const TRAINER_MEMBERS_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export type TrainerMembersSortDirection = (typeof TRAINER_MEMBERS_SORT_DIRECTIONS)[number];
