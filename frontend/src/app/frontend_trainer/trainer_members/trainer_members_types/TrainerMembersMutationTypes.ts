// RESPONSIBILITY: Defines mutation variable contracts for Trainer Members server-state writes.
import type { TrainerMembersMember, TrainerMembersDietSnapshot, TrainerMembersWorkoutSnapshot } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersTypes';

import type { TrainerMembersTrainerMemberAssessment } from '@/app/frontend_trainer/trainer_members/trainer_members_types/TrainerMembersTypes';



export interface TrainerMembersAddNoteMutationVariables { memberId: string; text: string; idempotencyKey: string; }
export interface TrainerMembersUpdateMutationVariables { id: string; data: Partial<TrainerMembersMember>; idempotencyKey: string; }
export interface TrainerMembersAssignDietMutationVariables { id: string; diet: TrainerMembersDietSnapshot | null; idempotencyKey: string; }
export interface TrainerMembersAssignWorkoutMutationVariables { id: string; workout: TrainerMembersWorkoutSnapshot | null; idempotencyKey: string; }
export interface TrainerMembersUpdateAssessmentMutationVariables { id: string; assessment: TrainerMembersTrainerMemberAssessment; idempotencyKey: string; }
