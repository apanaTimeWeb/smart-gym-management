import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../dashboard.repository';

@Injectable()
export class DeleteDashboardService {
  constructor(private readonly repository: DashboardRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
