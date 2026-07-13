import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { WORKOUT_CONSTANTS } from '../library.constants';
import { DietPlanListResponse } from '../library.interfaces';

@Injectable()
export class FindDietPlanService {
  private readonly logger = new Logger(FindDietPlanService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(query: PaginationQueryDto): Promise<DietPlanListResponse> {
    this.logger.log(`Fetching diet plans`);
    const [dietPlans, total] = await this.repository.findAllDietPlans(query);
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.DIET_PLAN_FETCHED, data: { dietPlans: dietPlans as any, total } };
  }
}
