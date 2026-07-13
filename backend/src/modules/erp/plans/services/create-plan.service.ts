import { Injectable, Logger } from '@nestjs/common';
import { PlansRepository } from '@/modules/erp/plans/plans.repository';
import { CreatePlanDto } from '@/modules/erp/plans/dto/create-plan.dto';
import { DuplicatePlanTierException } from '@/modules/erp/plans/plans.exceptions';
import { PLAN_MESSAGES } from '@/modules/erp/plans/plans.constants';
import type { PlanResponse } from '@/modules/erp/plans/plans.interfaces';

@Injectable()
export class CreatePlanService {
  private readonly logger = new Logger(CreatePlanService.name);

  constructor(private readonly plansRepository: PlansRepository) {}

  async create(dto: CreatePlanDto): Promise<PlanResponse> {
    this.logger.log(`Attempting to create plan with tier: ${dto.tier}`);

    const existing = await this.plansRepository.findPlanByTier(dto.tier);
    if (existing) {
      this.logger.warn(
        `Plan creation failed. Tier ${dto.tier} already exists.`,
      );
      throw new DuplicatePlanTierException();
    }

    const payload = {
      ...dto,
      isActive: dto.isActive ?? true,
    };

    const plan = await this.plansRepository.createPlan(payload);

    return {
      success: true,
      message: PLAN_MESSAGES.CREATED_SUCCESS,
      data: plan,
    };
  }
}
