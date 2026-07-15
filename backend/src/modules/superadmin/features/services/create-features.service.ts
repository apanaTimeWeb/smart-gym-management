import { CreateFeatureFlagDto } from '../dto/create-feature-flag.dto';
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';
import { FeatureResponse } from '../features.interfaces';
import { FEATURES_MESSAGES } from '../features.constants';

@Injectable()
export class CreateFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(dto: CreateFeatureFlagDto): Promise<FeatureResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: FEATURES_MESSAGES.CREATED,
      data
    };
  }
}
