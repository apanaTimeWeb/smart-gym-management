// RESPONSIBILITY: Registers the isolated Manager reports feature boundary.
// FLOW: ManagerDomainModule -> ReportsModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ReportsCommandController } from '@/backend_manager/modules/manager/reports/reports-command.controller';
import { ReportsExportReportsReportService } from '@/backend_manager/modules/manager/reports/services/reports-export-reports-report.service';
import { ReportsFetchReportsSummaryService } from '@/backend_manager/modules/manager/reports/services/reports-fetch-reports-summary.service';
import { ReportsOrchestratorService } from '@/backend_manager/modules/manager/reports/services/reports-orchestrator.service';
import { ReportsQueryController } from '@/backend_manager/modules/manager/reports/reports-query.controller';
import { ReportsRepository } from '@/backend_manager/modules/manager/reports/repositories/reports-repository';

@Module({
  controllers: [ReportsQueryController, ReportsCommandController],
  providers: [ReportsFetchReportsSummaryService, ReportsExportReportsReportService, ReportsRepository, ReportsOrchestratorService],
  exports: [ReportsRepository],
})
export class ReportsModule {}
