import { Module } from '@nestjs/common';
import { SuperadminDashboardController } from '@/backend_superadmin/superadmin_dashboard/superadmin-dashboard.controller';

@Module({
  controllers: [SuperadminDashboardController],
})
export class SuperadminDashboardModule {}
