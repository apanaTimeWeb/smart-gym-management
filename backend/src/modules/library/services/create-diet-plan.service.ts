import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/library/library.repository';
import { CreateDietPlanDto } from '@/modules/library/dto/create-diet-plan.dto';

@Injectable()
export class CreateDietPlanService {
  private readonly logger = new Logger(CreateDietPlanService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(dto: CreateDietPlanDto) {
    this.logger.log(`Creating diet plan: ${dto.name}`);
    const dietPlan = this.repository.dietPlanRepository.create(dto);
    const data = await this.repository.dietPlanRepository.save(dietPlan);
    return { success: true, data };
  }
}
