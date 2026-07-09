import { Injectable, Logger } from '@nestjs/common';
import { PlansRepository } from '@/modules/plans/plans.repository';
import { PlanNotFoundException } from '@/modules/plans/plans.exceptions';
import { PLAN_MESSAGES } from '@/modules/plans/plans.constants';
import type { PlanResponse } from '@/modules/plans/plans.interfaces';

@Injectable()
export class FindPlanService {
  private readonly logger = new Logger(FindPlanService.name);

  constructor(private readonly plansRepository: PlansRepository) {}

  async findAll(): Promise<PlanResponse> {
    this.logger.log('Fetching all active plans');
    const plans = await this.plansRepository.findPlans();

    return {
      message: PLAN_MESSAGES.FETCHED_SUCCESS,
      data: plans,
    };
  }

  async findOne(id: string): Promise<PlanResponse> {
    this.logger.log(`Fetching plan with ID: ${id}`);
    const plan = await this.plansRepository.findPlanById(id);

    if (!plan) {
      throw new PlanNotFoundException();
    }

    return {
      message: PLAN_MESSAGES.FETCHED_SUCCESS,
      data: plan,
    };
  }
}
