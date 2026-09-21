// RESPONSIBILITY: Registers the dashboard feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardSnapshotEntity } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.entity';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import { DashboardQueryController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-query.controller';
import { DashboardCommandController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-command.controller';
import { DashboardListService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-list.service';
import { DashboardFindService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-find.service';
import { DashboardCreateService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-create.service';
import { DashboardUpdateService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-update.service';
import { DashboardDeleteService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-delete.service';
import { DashboardBusinessOverviewService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-business-overview.service';
import { DashboardMainService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-main.service';
import { DashboardMetricsService } from '@/backend_superadmin/modules/superadmin/dashboard/services/dashboard-metrics.service';
import { DashboardSpecialController } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([DashboardSnapshotEntity])],
  controllers: [DashboardQueryController, DashboardCommandController, DashboardSpecialController],
  providers: [DashboardBusinessOverviewService, DashboardMainService, DashboardMetricsService, DashboardRepository, DashboardListService, DashboardFindService, DashboardCreateService, DashboardUpdateService, DashboardDeleteService],
  exports: [DashboardRepository],
})
export class DashboardModule {}
