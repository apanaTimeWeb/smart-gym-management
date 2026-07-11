import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../dashboard.repository';

@Injectable()
export class CreateDashboardService {
  constructor(private readonly repository: DashboardRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
