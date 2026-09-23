// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ReportsCommandController } from '@/backend_manager/modules/backend_manager/reports/reports-command.controller';
import { ReportsQueryController } from '@/backend_manager/modules/backend_manager/reports/reports-query.controller';
import { ReportsRepository } from '@/backend_manager/modules/backend_manager/reports/repositories/reports-repository';
import { ReportsExportReportsReportService } from '@/backend_manager/modules/backend_manager/reports/services/reports-export-reports-report.service';
import { ReportsFetchReportsSummaryService } from '@/backend_manager/modules/backend_manager/reports/services/reports-fetch-reports-summary.service';
import { ReportsOrchestratorService } from '@/backend_manager/modules/backend_manager/reports/services/reports-orchestrator.service';

@Module({
  controllers: [ReportsQueryController, ReportsCommandController],
  providers: [ReportsFetchReportsSummaryService, ReportsExportReportsReportService, ReportsRepository, ReportsOrchestratorService],
  exports: [ReportsRepository],
})
export class ReportsModule {}
