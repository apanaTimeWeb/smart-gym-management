import { Plan } from './entities/plan.entity';

export interface PlanResponse {
  message: string;
  data: Plan | Plan[] | any;
}
