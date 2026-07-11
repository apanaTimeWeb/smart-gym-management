import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../dashboard.repository';

@Injectable()
export class FindDashboardService {
  constructor(private readonly repository: DashboardRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
