import { z } from 'zod';

import { TrainerInfrastructureApiResponseSchema } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_schemas/TrainerInfrastructureApiResponseSchema';

import { TrainerLibraryDietPlanSchema } from '@/app/frontend_trainer/trainer_library/trainer_library_schemas/TrainerLibraryDomainSchemas';




export const TrainerLibraryDietPlansResponseSchema = TrainerInfrastructureApiResponseSchema(z.object({ dietPlans: z.array(TrainerLibraryDietPlanSchema), total: z.number() }));
export const TrainerLibraryAssignedMembersResponseSchema = TrainerInfrastructureApiResponseSchema(z.array(z.object({ id: z.string(), name: z.string(), assignedDietPlanId: z.string().nullable() })));
export const TrainerLibraryMutationResponseSchema = TrainerInfrastructureApiResponseSchema(z.unknown());
