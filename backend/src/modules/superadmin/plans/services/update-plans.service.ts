import { UpdateSubscriptionPlanDto } from '../dto/update-plans.dto';
import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';

@Injectable()
export class UpdatePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute(id: string, dto: UpdateSubscriptionPlanDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
