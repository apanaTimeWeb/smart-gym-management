import { Plan } from '@/modules/plans/entities/plan.entity';

export interface PlanResponse {
  message: string;
  data: Plan | Plan[] | any;
}
