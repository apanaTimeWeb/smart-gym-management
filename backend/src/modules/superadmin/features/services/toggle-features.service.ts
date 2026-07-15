import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';
import { FeatureResponse } from '../features.interfaces';
import { FEATURES_MESSAGES, FEATURES_ERRORS } from '../features.constants';

@Injectable()
export class ToggleFeaturesService {
  private readonly logger = new Logger(ToggleFeaturesService.name);
  
  constructor(private readonly repository: FeaturesRepository) {}

  async execute(id: string): Promise<FeatureResponse> {
    this.logger.log(`Toggling feature flag ${id}`);
    
    const feature = await this.repository.findById(id);
    if (!feature) throw new NotFoundException(FEATURES_ERRORS.NOT_FOUND);
    
    const newState = !feature.isGlobalEnabled;
    await this.repository.update(id, { isGlobalEnabled: newState });
    
    return { success: true, message: FEATURES_MESSAGES.UPDATED, data: { id, isGlobalEnabled: newState } };
  }
}
