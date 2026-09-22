// RESPONSIBILITY: Registers the isolated Manager pt feature boundary.
// FLOW: ManagerDomainModule -> PtModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { PtCommandController } from '@/modules/manager/pt/pt-command.controller';
import { PtCreateAssignmentService } from '@/modules/manager/pt/services/pt-create-assignment.service';
import { PtFetchAssignmentsService } from '@/modules/manager/pt/services/pt-fetch-assignments.service';
import { PtFetchPackagesService } from '@/modules/manager/pt/services/pt-fetch-packages.service';
import { PtFetchPtDashboardKpisService } from '@/modules/manager/pt/services/pt-fetch-pt-dashboard-kpis.service';
import { PtFetchWorkloadService } from '@/modules/manager/pt/services/pt-fetch-workload.service';
import { PtMarkSessionCompleteService } from '@/modules/manager/pt/services/pt-mark-session-complete.service';
import { PtOrchestratorService } from '@/modules/manager/pt/services/pt-orchestrator.service';
import { PtQueryController } from '@/modules/manager/pt/pt-query.controller';
import { PtRepository } from '@/modules/manager/pt/repositories/pt-repository';

@Module({
  controllers: [PtQueryController, PtCommandController],
  providers: [PtCreateAssignmentService, PtMarkSessionCompleteService, PtFetchPtDashboardKpisService, PtFetchWorkloadService, PtFetchPackagesService, PtFetchAssignmentsService, PtRepository, PtOrchestratorService],
  exports: [PtRepository],
})
export class PtModule {}
