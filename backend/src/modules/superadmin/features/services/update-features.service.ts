import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';

@Injectable()
export class UpdateFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute(id: string, dto: UpdateFeaturesDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
