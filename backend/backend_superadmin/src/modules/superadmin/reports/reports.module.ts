// RESPONSIBILITY: Registers the reports feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSnapshotEntity } from '@/modules/superadmin/reports/reports.entity';
import { ReportsRepository } from '@/modules/superadmin/reports/reports.repository';
import { ReportsQueryController } from '@/modules/superadmin/reports/reports-query.controller';
import { ReportsCommandController } from '@/modules/superadmin/reports/reports-command.controller';
import { ReportsListService } from '@/modules/superadmin/reports/services/reports-list.service';
import { ReportsFindService } from '@/modules/superadmin/reports/services/reports-find.service';
import { ReportsCreateService } from '@/modules/superadmin/reports/services/reports-create.service';
import { ReportsUpdateService } from '@/modules/superadmin/reports/services/reports-update.service';
import { ReportsDeleteService } from '@/modules/superadmin/reports/services/reports-delete.service';
import { ReportsMainService } from '@/modules/superadmin/reports/services/reports-main.service';
import { ReportsComparisonService } from '@/modules/superadmin/reports/services/reports-comparison.service';
import { ReportsDataService } from '@/modules/superadmin/reports/services/reports-data.service';
import { ReportsSpecialController } from '@/modules/superadmin/reports/reports-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ReportSnapshotEntity])],
  controllers: [ReportsQueryController, ReportsCommandController, ReportsSpecialController],
  providers: [ReportsDataService, ReportsMainService, ReportsComparisonService, ReportsRepository, ReportsListService, ReportsFindService, ReportsCreateService, ReportsUpdateService, ReportsDeleteService],
  exports: [ReportsRepository],
})
export class ReportsModule {}
