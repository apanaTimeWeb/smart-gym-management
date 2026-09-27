// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto } from '@/backend_manager/manager_modules/maintenance/maintenance_dtos/manager-maintenance-manager-maintenance-api-create-maintenance-ticket.request.dto';
import { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto } from '@/backend_manager/manager_modules/maintenance/maintenance_responses/manager-maintenance-manager-maintenance-api-create-maintenance-ticket.response.dto';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto } from '@/backend_manager/manager_modules/maintenance/maintenance_dtos/manager-maintenance-manager-maintenance-api-resolve-maintenance-ticket.request.dto';
import { ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto } from '@/backend_manager/manager_modules/maintenance/maintenance_responses/manager-maintenance-manager-maintenance-api-resolve-maintenance-ticket.response.dto';
import { ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerMaintenanceCommandController {
  constructor(private readonly createService: ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, private readonly resolveService: ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService) {}
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('maintenance')
  @ApiOperation({ summary: 'Create maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto })
  create(@Body() dto: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto): ReturnType<ManagerMaintenanceManagerMaintenanceApiCreateMaintenanceTicketService['createMaintenanceTicket']> { return this.createService.createMaintenanceTicket(dto); }
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('maintenance/:id/resolve')
  @ApiOperation({ summary: 'Resolve maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  resolve(@Param('id') id: string, @Body() dto: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto): ReturnType<ManagerMaintenanceManagerMaintenanceApiResolveMaintenanceTicketService['updateMaintenanceTicket']> { return this.resolveService.updateMaintenanceTicket(dto, id); }
}

export { ManagerMaintenanceCommandController as MaintenanceCommandController };
