import { Injectable } from '@nestjs/common';
@Injectable()
export class UpdateDashboardService {
  async execute() { return { success: true, module: 'dashboard' }; }
}
