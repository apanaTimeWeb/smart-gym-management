import type { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansMembershipSchemas';
import type { z } from 'zod';


export type ManagerPlansActivateForm = z.infer<typeof managerPlansActivateSchema>;
export type ManagerPlansRenewForm = z.infer<typeof managerPlansRenewSchema>;
export type ManagerPlansFreezeForm = z.infer<typeof managerPlansFreezeSchema>;
