import { CreateSubscriptionPlanDto } from '../dto/create-plans.dto';
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';
import { PlanResponse } from '../plans.interfaces';
import { PLANS_MESSAGES } from '../plans.constants';

@Injectable()
export class CreatePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(dto: CreateSubscriptionPlanDto): Promise<PlanResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: PLANS_MESSAGES.CREATED,
      data
    };
  }
}
