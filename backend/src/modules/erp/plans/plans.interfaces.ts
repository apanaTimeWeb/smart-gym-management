import { Plan } from '@/modules/erp/plans/entities/plan.entity';

export interface PlanResponse {
  message: string;
  data: Plan | Plan[] | any;
}
