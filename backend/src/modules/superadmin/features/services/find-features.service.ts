import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';
import { FeatureResponse } from '../features.interfaces';
import { FEATURES_MESSAGES, FEATURES_ERRORS } from '../features.constants';

@Injectable()
export class FindFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(): Promise<FeatureResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: FEATURES_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<FeatureResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(FEATURES_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: FEATURES_MESSAGES.FETCHED,
      data
    };
  }
}
