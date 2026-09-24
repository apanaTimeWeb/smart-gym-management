// RESPONSIBILITY: Registers the reports feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminReportsAnalyticsQueryController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-analytics-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/reports/reports_repositories/superadmin-reports-analytics.repository';
import { SuperadminReportsQueryController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-query.controller';
import { SuperadminReportsCommandController } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports-command.controller';
import { SuperadminReportsListService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-list.service';
import { SuperadminReportsFindService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-find.service';
import { SuperadminReportsCreateService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-create.service';
import { SuperadminReportsDeleteService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-delete.service';
import { SuperadminReportsUpdateService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-update.service';
import { SuperadminReportsMainService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-main.service';
import { SuperadminReportsComparisonService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-comparison.service';
import { SuperadminReportsDataService } from '@/backend_superadmin/superadmin_modules/reports/reports_services/superadmin-reports-data.service';

/**
 * Primary Intent: Defines SuperadminReportsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminReportsEntity])],
  controllers: [SuperadminReportsQueryController, SuperadminReportsCommandController, SuperadminReportsAnalyticsQueryController],
  providers: [SuperadminReportsDataService, SuperadminReportsMainService, SuperadminReportsComparisonService, SuperadminReportsRepository, SuperadminReportsAnalyticsRepository, SuperadminReportsListService, SuperadminReportsFindService, SuperadminReportsCreateService, SuperadminReportsUpdateService, SuperadminReportsDeleteService],
  exports: [SuperadminReportsRepository],
})
/**
 * Primary Intent: Defines SuperadminReportsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminReportsModule {}
