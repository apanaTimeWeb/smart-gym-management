import { Injectable } from '@nestjs/common';
@Injectable()
export class FindDashboardService {
  async execute() { return { success: true, module: 'dashboard' }; }
}
