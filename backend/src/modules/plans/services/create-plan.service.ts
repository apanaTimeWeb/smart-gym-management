import { Injectable, Logger } from '@nestjs/common';
import { PlansRepository } from '@/modules/plans/services/plans.repository';
import { CreatePlanDto } from '@/modules/plans/dto/create-plan.dto';
import { DuplicatePlanTierException } from '@/modules/plans/plans.exceptions';
import { PLAN_MESSAGES } from '@/modules/plans/plans.constants';
import type { PlanResponse } from '@/modules/plans/plans.interfaces';

@Injectable()
export class CreatePlanService {
  private readonly logger = new Logger(CreatePlanService.name);

  constructor(private readonly plansRepository: PlansRepository) {}

  async create(dto: CreatePlanDto): Promise<PlanResponse> {
    this.logger.log(`Attempting to create plan with tier: ${dto.tier}`);
    
    const existing = await this.plansRepository.findPlanByTier(dto.tier);
    if (existing) {
      this.logger.warn(`Plan creation failed. Tier ${dto.tier} already exists.`);
      throw new DuplicatePlanTierException();
    }

    const payload = {
      ...dto,
      isActive: dto.isActive ?? true,
    };

    const plan = await this.plansRepository.createPlan(payload);
    
    return {
      message: PLAN_MESSAGES.CREATED_SUCCESS,
      data: plan,
    };
  }
}
