import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '../gyms/entities/gyms.entity';
import { CreateDashboardController } from './controllers/create-dashboard.controller';
import { FindDashboardController } from './controllers/find-dashboard.controller';
import { UpdateDashboardController } from './controllers/update-dashboard.controller';
import { DeleteDashboardController } from './controllers/delete-dashboard.controller';
import { CreateDashboardService } from './services/create-dashboard.service';
import { FindDashboardService } from './services/find-dashboard.service';
import { UpdateDashboardService } from './services/update-dashboard.service';
import { DeleteDashboardService } from './services/delete-dashboard.service';
import { DashboardRepository } from './dashboard.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  controllers: [CreateDashboardController, FindDashboardController, UpdateDashboardController, DeleteDashboardController],
  providers: [CreateDashboardService, FindDashboardService, UpdateDashboardService, DeleteDashboardService, DashboardRepository],
  exports: [CreateDashboardService, FindDashboardService, UpdateDashboardService, DeleteDashboardService],
})
export class DashboardModule {}
