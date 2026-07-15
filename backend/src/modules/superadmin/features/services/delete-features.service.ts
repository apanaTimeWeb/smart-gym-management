import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';
import { FeatureResponse } from '../features.interfaces';
import { FEATURES_MESSAGES } from '../features.constants';

@Injectable()
export class DeleteFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(id: string): Promise<FeatureResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: FEATURES_MESSAGES.DELETED,
      data: null
    };
  }
}
