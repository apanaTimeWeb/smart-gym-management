// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { MaintenanceCommandController } from '@/backend_manager/modules/backend_manager/maintenance/maintenance-command.controller';
import { MaintenanceQueryController } from '@/backend_manager/modules/backend_manager/maintenance/maintenance-query.controller';
import { MaintenanceRepository } from '@/backend_manager/modules/backend_manager/maintenance/repositories/maintenance-repository';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-fetch-maintenance-issues.service';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';
import { MaintenanceOrchestratorService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-orchestrator.service';

@Module({
  controllers: [MaintenanceQueryController, MaintenanceCommandController],
  providers: [MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService, MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService, MaintenanceRepository, MaintenanceOrchestratorService],
  exports: [MaintenanceRepository],
})
export class MaintenanceModule {}
