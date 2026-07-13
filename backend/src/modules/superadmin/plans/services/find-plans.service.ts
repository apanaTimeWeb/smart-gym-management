import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';
import { PlanResponse } from '../plans.interfaces';
import { PLANS_MESSAGES, PLANS_ERRORS } from '../plans.constants';

@Injectable()
export class FindPlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(): Promise<PlanResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: PLANS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<PlanResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(PLANS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: PLANS_MESSAGES.FETCHED,
      data
    };
  }
}
