import { Injectable } from '@nestjs/common';
import { FeaturesRepository } from '../features.repository';

@Injectable()
export class DeleteFeaturesService {
  constructor(private readonly repository: FeaturesRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
