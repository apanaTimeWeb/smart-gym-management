import { Plan } from '@/modules/erp/plans/entities/plan.entity';

export interface PlanResponse {
  success: boolean;
  message: string;
  data: Plan | Plan[] | any;
}
