// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { PtCommandController } from '@/backend_manager/modules/backend_manager/pt/pt-command.controller';
import { PtQueryController } from '@/backend_manager/modules/backend_manager/pt/pt-query.controller';
import { PtRepository } from '@/backend_manager/modules/backend_manager/pt/repositories/pt-repository';
import { PtCreateAssignmentService } from '@/backend_manager/modules/backend_manager/pt/services/pt-create-assignment.service';
import { PtFetchAssignmentsService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-assignments.service';
import { PtFetchPackagesService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-packages.service';
import { PtFetchPtDashboardKpisService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-pt-dashboard-kpis.service';
import { PtFetchWorkloadService } from '@/backend_manager/modules/backend_manager/pt/services/pt-fetch-workload.service';
import { PtMarkSessionCompleteService } from '@/backend_manager/modules/backend_manager/pt/services/pt-mark-session-complete.service';
import { PtOrchestratorService } from '@/backend_manager/modules/backend_manager/pt/services/pt-orchestrator.service';

@Module({
  controllers: [PtQueryController, PtCommandController],
  providers: [PtCreateAssignmentService, PtMarkSessionCompleteService, PtFetchPtDashboardKpisService, PtFetchWorkloadService, PtFetchPackagesService, PtFetchAssignmentsService, PtRepository, PtOrchestratorService],
  exports: [PtRepository],
})
export class PtModule {}
