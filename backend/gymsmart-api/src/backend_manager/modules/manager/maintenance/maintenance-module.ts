// RESPONSIBILITY: Registers the isolated Manager maintenance feature boundary.
// FLOW: ManagerDomainModule -> MaintenanceModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { MaintenanceCommandController } from '@/modules/manager/maintenance/maintenance-command.controller';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/modules/manager/maintenance/services/maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService } from '@/modules/manager/maintenance/services/maintenance-manager-maintenance-api-fetch-maintenance-issues.service';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/modules/manager/maintenance/services/maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';
import { MaintenanceOrchestratorService } from '@/modules/manager/maintenance/services/maintenance-orchestrator.service';
import { MaintenanceQueryController } from '@/modules/manager/maintenance/maintenance-query.controller';
import { MaintenanceRepository } from '@/modules/manager/maintenance/repositories/maintenance-repository';

@Module({
  controllers: [MaintenanceQueryController, MaintenanceCommandController],
  providers: [MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService, MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService, MaintenanceRepository, MaintenanceOrchestratorService],
  exports: [MaintenanceRepository],
})
export class MaintenanceModule {}
