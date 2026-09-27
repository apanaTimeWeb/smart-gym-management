// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerReportsMutationService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerReportsAuthorizationService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-authorization.service';

import { ManagerReportsQueryController } from '@/backend_manager/manager_modules/reports/manager-reports-query.controller';
import { ManagerReportsRepository } from '@/backend_manager/manager_modules/reports/manager-reports.repository';
import { ManagerReportsExportReportsReportService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-export-reports-report.service';
import { ManagerReportsFindReportsSummaryService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-find-reports-summary.service';
import { ManagerReportsOrchestratorService } from '@/backend_manager/manager_modules/reports/reports_services/manager-reports-orchestrator.service';

@Module({
  controllers: [ManagerReportsQueryController],
  providers: [ManagerReportsMutationService, ManagerReportsFindReportsSummaryService, ManagerReportsExportReportsReportService, ManagerReportsRepository, ManagerReportsOrchestratorService,
  ManagerReportsAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:reports`, useFactory: (authorization: ManagerReportsAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('reports', authorization); return authorization; }, inject: [ManagerReportsAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerReportsRepository],
})
export class ManagerReportsModule {}

export { ManagerReportsModule as ReportsModule };
