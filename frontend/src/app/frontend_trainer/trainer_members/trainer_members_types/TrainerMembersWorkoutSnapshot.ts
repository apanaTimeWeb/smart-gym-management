// RESPONSIBILITY: Owns Trainer Members embedded workout snapshot types derived from the feature validation schemas.
import { z } from 'zod';

import { TrainerMembersTrainerMemberWorkoutExerciseSnapshotSchema, TrainerMembersWorkoutSnapshotSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersSnapshotSchemas';




export type TrainerMembersTrainerMemberWorkoutExerciseSnapshot = z.infer<typeof TrainerMembersTrainerMemberWorkoutExerciseSnapshotSchema>;
export type TrainerMembersWorkoutSnapshot = z.infer<typeof TrainerMembersWorkoutSnapshotSchema>;
