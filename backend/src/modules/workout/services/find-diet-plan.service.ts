import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

@Injectable()
export class FindDietPlanService {
  private readonly logger = new Logger(FindDietPlanService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(query: PaginationQueryDto) {
    this.logger.log(`Fetching diet plans`);
    const [dietPlans, total] = await this.repository.findAllDietPlans(query);
    return { success: true, data: { dietPlans, total } };
  }
}
