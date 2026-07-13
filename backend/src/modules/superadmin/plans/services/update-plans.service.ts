import { UpdateSubscriptionPlanDto } from '../dto/update-plans.dto';
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';
import { PlanResponse } from '../plans.interfaces';
import { PLANS_MESSAGES } from '../plans.constants';

@Injectable()
export class UpdatePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(id: string, dto: UpdateSubscriptionPlanDto): Promise<PlanResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: PLANS_MESSAGES.UPDATED,
      data
    };
  }
}
