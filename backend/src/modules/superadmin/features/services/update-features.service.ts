import { UpdateFeatureFlagDto } from '../dto/update-feature-flag.dto';
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';
import { FeatureResponse } from '../features.interfaces';
import { FEATURES_MESSAGES } from '../features.constants';

@Injectable()
export class UpdateFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(id: string, dto: UpdateFeatureFlagDto): Promise<FeatureResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: FEATURES_MESSAGES.UPDATED,
      data
    };
  }
}
