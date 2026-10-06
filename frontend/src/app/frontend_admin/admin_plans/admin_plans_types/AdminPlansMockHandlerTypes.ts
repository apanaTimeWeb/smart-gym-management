// RESPONSIBILITY: Owns mock-handler input/output types for the Admin plans feature.
import type { Plan } from '@/app/frontend_admin/admin_plans/admin_plans_types/AdminPlansTypes';

export type AdminPlansJsonObject = Record<string, unknown>;
export type PlanRecord = Plan;
