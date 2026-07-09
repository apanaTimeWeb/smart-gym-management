import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { CreateDietPlanDto } from '../dto/create-diet-plan.dto';

@Injectable()
export class CreateDietPlanService {
  private readonly logger = new Logger(CreateDietPlanService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(dto: CreateDietPlanDto) {
    this.logger.log(`Creating diet plan: ${dto.name}`);
    const dietPlan = this.repository.dietPlanRepository.create(dto);
    const data = await this.repository.dietPlanRepository.save(dietPlan);
    return { success: true, data };
  }
}
