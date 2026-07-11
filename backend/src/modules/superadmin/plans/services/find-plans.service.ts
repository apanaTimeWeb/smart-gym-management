import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';

@Injectable()
export class FindPlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
