// RESPONSIBILITY: Registers the reports feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { ReportsAnalyticsQueryController } from '@/backend_superadmin/modules/backend_superadmin/reports/reports-analytics-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsEntity } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.entity';
import { ReportsRepository } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.repository';
import { ReportsQueryController } from '@/backend_superadmin/modules/backend_superadmin/reports/reports-query.controller';
import { ReportsCommandController } from '@/backend_superadmin/modules/backend_superadmin/reports/reports-command.controller';
import { ReportsListService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-list.service';
import { ReportsFindService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-find.service';
import { ReportsCreateService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-create.service';
import { ReportsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-delete.service';
import { ReportsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-update.service';
import { ReportsMainService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-main.service';
import { ReportsComparisonService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-comparison.service';
import { ReportsDataService } from '@/backend_superadmin/modules/backend_superadmin/reports/services/reports-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportsEntity])],
  controllers: [ReportsQueryController, ReportsCommandController, ReportsAnalyticsQueryController],
  providers: [ReportsDataService, ReportsMainService, ReportsComparisonService, ReportsRepository, ReportsListService, ReportsFindService, ReportsCreateService, ReportsUpdateService, ReportsDeleteService],
  exports: [ReportsRepository],
})
export class ReportsModule {}