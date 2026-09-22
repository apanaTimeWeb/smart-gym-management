// RESPONSIBILITY: Registers the isolated Manager maintenance feature boundary.
// FLOW: ManagerDomainModule -> MaintenanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { MaintenanceCommandController } from '@/backend_manager/modules/manager/maintenance/maintenance-command.controller';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-fetch-maintenance-issues.service';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';
import { MaintenanceOrchestratorService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-orchestrator.service';
import { MaintenanceQueryController } from '@/backend_manager/modules/manager/maintenance/maintenance-query.controller';
import { MaintenanceRepository } from '@/backend_manager/modules/manager/maintenance/repositories/maintenance-repository';

@Module({
  controllers: [MaintenanceQueryController, MaintenanceCommandController],
  providers: [MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService, MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService, MaintenanceRepository, MaintenanceOrchestratorService],
  exports: [MaintenanceRepository],
})
export class MaintenanceModule {}
