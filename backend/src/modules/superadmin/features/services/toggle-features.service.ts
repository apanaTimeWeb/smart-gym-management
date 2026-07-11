import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';

@Injectable()
export class ToggleFeaturesService {
  private readonly logger = new Logger(ToggleFeaturesService.name);
  
  constructor(private readonly repository: FeaturesRepository) {}

  async execute(id: string) {
    this.logger.log(`Toggling feature flag ${id}`);
    
    const feature = await this.repository.findById(id);
    if (!feature) throw new NotFoundException('Feature not found');
    
    const newState = !feature.isGlobalEnabled;
    await this.repository.update(id, { isGlobalEnabled: newState });
    
    return { success: true, data: { id, isGlobalEnabled: newState } };
  }
}
