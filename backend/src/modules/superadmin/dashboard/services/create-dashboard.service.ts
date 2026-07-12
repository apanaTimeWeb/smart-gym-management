import { Injectable } from '@nestjs/common';
@Injectable()
export class CreateDashboardService {
  async execute() { return { success: true, module: 'dashboard' }; }
}
