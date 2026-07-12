import { CreateFeatureFlagDto } from '../dto/create-feature-flag.dto';
import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';

@Injectable()
export class CreateFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(dto: CreateFeatureFlagDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
