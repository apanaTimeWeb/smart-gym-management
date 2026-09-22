// RESPONSIBILITY: Registers the reports feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportSnapshotEntity } from '@/backend_superadmin/modules/superadmin/reports/reports.entity';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { ReportsQueryController } from '@/backend_superadmin/modules/superadmin/reports/reports-query.controller';
import { ReportsCommandController } from '@/backend_superadmin/modules/superadmin/reports/reports-command.controller';
import { ReportsListService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-list.service';
import { ReportsFindService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-find.service';
import { ReportsCreateService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-create.service';
import { ReportsDeleteService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-delete.service';
import { ReportsMainService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-main.service';
import { ReportsComparisonService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-comparison.service';
import { ReportsDataService } from '@/backend_superadmin/modules/superadmin/reports/services/reports-data.service';
import { ReportsSpecialController } from '@/backend_superadmin/modules/superadmin/reports/reports-special.controller';
import { ReportsCompatibilityController } from '@/backend_superadmin/modules/superadmin/reports/reports-compatibility.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReportSnapshotEntity])],
  controllers: [ReportsQueryController, ReportsCommandController, ReportsSpecialController, ReportsCompatibilityController],
  providers: [ReportsDataService, ReportsMainService, ReportsComparisonService, ReportsRepository, ReportsListService, ReportsFindService, ReportsCreateService, ReportsDeleteService],
  exports: [ReportsRepository],
})
export class ReportsModule {}
