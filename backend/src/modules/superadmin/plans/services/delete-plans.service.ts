import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';
import { PlanResponse } from '../plans.interfaces';
import { PLANS_MESSAGES } from '../plans.constants';

@Injectable()
export class DeletePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(id: string): Promise<PlanResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: PLANS_MESSAGES.DELETED,
      data: null
    };
  }
}
