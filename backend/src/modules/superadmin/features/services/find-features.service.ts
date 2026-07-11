import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';

@Injectable()
export class FindFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('FeatureFlag not found');
    return entity;
  }
}
