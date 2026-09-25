import { Module } from '@nestjs/common';
import { SuperadminDashboardController } from './superadmin-dashboard.controller';

@Module({
  controllers: [SuperadminDashboardController],
})
export class SuperadminDashboardModule {}
