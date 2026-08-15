import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { UpdateDietPlanDto } from '@/modules/erp/library/dto/update-diet-plan.dto';
import { DietPlanNotFoundException } from '@/modules/erp/library/library.exceptions';
import { WORKOUT_CONSTANTS } from '../library.constants';
import { DietPlanResponse } from '../library.interfaces';

@Injectable()
export class UpdateDietPlanService {
  private readonly logger = new Logger(UpdateDietPlanService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: number, dto: UpdateDietPlanDto): Promise<DietPlanResponse> {
    this.logger.log(`Updating diet plan ID: ${id}`);
    const existing = await this.repository.dietPlanRepository.findOne({
      where: { id },
    });
    if (!existing) throw new DietPlanNotFoundException();

    await this.repository.dietPlanRepository.update(id, dto);
    const data = await this.repository.dietPlanRepository.findOne({
      where: { id },
    });
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.DIET_PLAN_UPDATED, data: data as any };
  }

  async remove(id: number): Promise<DietPlanResponse> {
    this.logger.log(`Soft removing diet plan ID: ${id}`);
    const existing = await this.repository.dietPlanRepository.findOne({
      where: { id },
    });
    if (!existing) throw new DietPlanNotFoundException();

    await this.repository.dietPlanRepository.update(id, { isActive: false });
    const data = await this.repository.dietPlanRepository.findOne({
      where: { id },
    });
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.DIET_PLAN_DELETED, data: data as any };
  }
}
