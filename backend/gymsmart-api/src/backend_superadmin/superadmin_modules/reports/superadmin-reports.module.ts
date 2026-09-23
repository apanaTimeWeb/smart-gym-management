// RESPONSIBILITY: Registers the reports feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminReportsAnalyticsQueryController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-analytics-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsQueryController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-query.controller';
import { SuperadminReportsCommandController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-command.controller';
import { SuperadminReportsListService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-list.service';
import { SuperadminReportsFindService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-find.service';
import { SuperadminReportsCreateService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-create.service';
import { SuperadminReportsDeleteService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-delete.service';
import { SuperadminReportsUpdateService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-update.service';
import { SuperadminReportsMainService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-main.service';
import { SuperadminReportsComparisonService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-comparison.service';
import { SuperadminReportsDataService } from '@/backend_superadmin/superadmin_modules/reports/services/superadmin-reports-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminReportsEntity])],
  controllers: [SuperadminReportsQueryController, SuperadminReportsCommandController, SuperadminReportsAnalyticsQueryController],
  providers: [SuperadminReportsDataService, SuperadminReportsMainService, SuperadminReportsComparisonService, SuperadminReportsRepository, SuperadminReportsListService, SuperadminReportsFindService, SuperadminReportsCreateService, SuperadminReportsUpdateService, SuperadminReportsDeleteService],
  exports: [SuperadminReportsRepository],
})
export class SuperadminReportsModule {}