// RESPONSIBILITY: Owns Trainer Members embedded diet snapshot types derived from the feature validation schema.
import { z } from 'zod';

import { TrainerMembersDietSnapshotSchema } from '@/app/frontend_trainer/trainer_members/trainer_members_schemas/TrainerMembersSnapshotSchemas';




export type TrainerMembersDietSnapshot = z.infer<typeof TrainerMembersDietSnapshotSchema>;
