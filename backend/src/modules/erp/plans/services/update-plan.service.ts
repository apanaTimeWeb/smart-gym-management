import { Injectable, Logger } from '@nestjs/common';
import { PlansRepository } from '@/modules/erp/plans/plans.repository';
import { UpdatePlanDto } from '@/modules/erp/plans/dto/update-plan.dto';
import { PlanNotFoundException } from '@/modules/erp/plans/plans.exceptions';
import { PLAN_MESSAGES } from '@/modules/erp/plans/plans.constants';
import type { PlanResponse } from '@/modules/erp/plans/plans.interfaces';

@Injectable()
export class UpdatePlanService {
  private readonly logger = new Logger(UpdatePlanService.name);

  constructor(private readonly plansRepository: PlansRepository) {}

  async update(id: string, dto: UpdatePlanDto): Promise<PlanResponse> {
    this.logger.log(`Updating plan with ID: ${id}`);
    const existing = await this.plansRepository.findPlanById(id);

    if (!existing) {
      throw new PlanNotFoundException();
    }

    const updatedPlan = await this.plansRepository.updatePlan(id, dto);

    return {
      message: PLAN_MESSAGES.UPDATED_SUCCESS,
      data: updatedPlan,
    };
  }

  async remove(id: string): Promise<PlanResponse> {
    this.logger.log(`Deactivating plan with ID: ${id}`);
    const existing = await this.plansRepository.findPlanById(id);

    if (!existing) {
      throw new PlanNotFoundException();
    }

    const deactivatedPlan = await this.plansRepository.updatePlan(id, {
      isActive: false,
    });

    return {
      message: PLAN_MESSAGES.DELETED_SUCCESS,
      data: deactivatedPlan,
    };
  }
}
