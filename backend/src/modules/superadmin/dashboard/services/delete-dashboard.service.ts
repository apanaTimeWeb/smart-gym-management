import { Injectable } from '@nestjs/common';
@Injectable()
export class DeleteDashboardService {
  async execute() { return { success: true, module: 'dashboard' }; }
}
