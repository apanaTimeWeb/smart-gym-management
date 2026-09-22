// RESPONSIBILITY: Registers the isolated Manager pt feature boundary.
// FLOW: ManagerDomainModule -> PtModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { PtCommandController } from '@/backend_manager/modules/manager/pt/pt-command.controller';
import { PtCreateAssignmentService } from '@/backend_manager/modules/manager/pt/services/pt-create-assignment.service';
import { PtFetchAssignmentsService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-assignments.service';
import { PtFetchPackagesService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-packages.service';
import { PtFetchPtDashboardKpisService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-pt-dashboard-kpis.service';
import { PtFetchWorkloadService } from '@/backend_manager/modules/manager/pt/services/pt-fetch-workload.service';
import { PtMarkSessionCompleteService } from '@/backend_manager/modules/manager/pt/services/pt-mark-session-complete.service';
import { PtOrchestratorService } from '@/backend_manager/modules/manager/pt/services/pt-orchestrator.service';
import { PtQueryController } from '@/backend_manager/modules/manager/pt/pt-query.controller';
import { PtRepository } from '@/backend_manager/modules/manager/pt/repositories/pt-repository';

@Module({
  controllers: [PtQueryController, PtCommandController],
  providers: [PtCreateAssignmentService, PtMarkSessionCompleteService, PtFetchPtDashboardKpisService, PtFetchWorkloadService, PtFetchPackagesService, PtFetchAssignmentsService, PtRepository, PtOrchestratorService],
  exports: [PtRepository],
})
export class PtModule {}
