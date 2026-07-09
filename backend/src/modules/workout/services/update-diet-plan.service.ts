import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { UpdateDietPlanDto } from '../dto/update-diet-plan.dto';
import { DietPlanNotFoundException } from '../workout.exceptions';

@Injectable()
export class UpdateDietPlanService {
  private readonly logger = new Logger(UpdateDietPlanService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(id: number, dto: UpdateDietPlanDto) {
    this.logger.log(`Updating diet plan ID: ${id}`);
    const existing = await this.repository.dietPlanRepository.findOne({ where: { id } });
    if (!existing) throw new DietPlanNotFoundException();

    await this.repository.dietPlanRepository.update(id, dto);
    const data = await this.repository.dietPlanRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async remove(id: number) {
    this.logger.log(`Soft removing diet plan ID: ${id}`);
    const existing = await this.repository.dietPlanRepository.findOne({ where: { id } });
    if (!existing) throw new DietPlanNotFoundException();

    await this.repository.dietPlanRepository.update(id, { isActive: false });
    const data = await this.repository.dietPlanRepository.findOne({ where: { id } });
    return { success: true, data };
  }
}
