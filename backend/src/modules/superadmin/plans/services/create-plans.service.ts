import { CreateSubscriptionPlanDto } from '../dto/create-plans.dto';
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';

@Injectable()
export class CreatePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(dto: CreateSubscriptionPlanDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
