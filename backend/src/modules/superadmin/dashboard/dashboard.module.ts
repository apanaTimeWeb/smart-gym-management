import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardController } from './controllers/dashboard.controller';

/**
 * DashboardModule — no TypeORM entity registration needed.
 * The DashboardService computes metrics from other services/constants,
 * not from a dedicated database table.
 */
@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
