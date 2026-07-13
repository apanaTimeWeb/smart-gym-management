import { Injectable } from '@nestjs/common';
import { DashboardResponse } from '../dashboard.interfaces';
import { DASHBOARD_MESSAGES } from '../dashboard.constants';

@Injectable()
export class UpdateDashboardService {
  async execute(): Promise<DashboardResponse> { 
    return { success: true, message: DASHBOARD_MESSAGES.UPDATED_SUCCESS, data: { module: 'dashboard' } }; 
  }
}
