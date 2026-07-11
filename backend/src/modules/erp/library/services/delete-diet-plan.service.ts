import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '../library.repository';

@Injectable()
export class DeleteDietPlanService {
  private readonly logger = new Logger(DeleteDietPlanService.name);
  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: string) {
    this.logger.log(`Soft-deleting diet plan ${id}`);
    await this.repository.dietPlanRepository.softDelete(id);
    return { success: true, message: 'Diet plan deleted successfully' };
  }
}
