import { Injectable } from '@nestjs/common';
import { PlansRepository } from '../plans.repository';

@Injectable()
export class DeletePlansService {
  constructor(private readonly repository: PlansRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
