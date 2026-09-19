import { z } from 'zod';
import { createTrainerApiResponseSchema } from '@/app/trainer/trainer_utils/TrainerApiResponseSchema';
import { DietPlanSchema } from '@/app/trainer/library/library_types/TrainerLibrary.schema';
export const TrainerLibraryDietPlansResponseSchema = createTrainerApiResponseSchema(z.object({ dietPlans: z.array(DietPlanSchema), total: z.number() }));
export const TrainerLibraryAssignedMembersResponseSchema = createTrainerApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string(), assignedDietPlanId: z.string().nullable() })));
export const TrainerLibraryMutationResponseSchema = createTrainerApiResponseSchema(z.unknown());
