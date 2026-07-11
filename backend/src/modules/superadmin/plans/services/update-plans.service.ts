import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';

@Injectable()
export class UpdatePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
