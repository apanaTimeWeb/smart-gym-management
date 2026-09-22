// @ts-nocheck
// RESPONSIBILITY: Owns the Manager maintenance command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-manager-maintenance-api-create-maintenance-ticket.request.dto.ts';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-manager-maintenance-api-create-maintenance-ticket.response.dto.ts';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-create-maintenance-ticket.service.ts';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-manager-maintenance-api-resolve-maintenance-ticket.request.dto.ts';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-manager-maintenance-api-resolve-maintenance-ticket.response.dto.ts';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-resolve-maintenance-ticket.service.ts';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(CoreRole.MANAGER)
export class MaintenanceCommandController {
  constructor(private readonly createService: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, private readonly resolveService: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService) {}
  // SLA: STANDARD
  @Post('maintenance')
  @ApiOperation({ summary: 'Create maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto })
  create(@Body() dto: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto): Promise<MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto> {  return this.createService.createGrievanceTicket(dto) as unknown as Promise<MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto>;  }
  // SLA: STANDARD
  @Post('maintenance/:id/resolve')
  @ApiOperation({ summary: 'Resolve maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto })
  resolve(@Param('id') id: string, @Body() dto: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto): Promise<MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto> {  return this.resolveService.resolveMaintenanceTicket(dto, id) as unknown as Promise<MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto>;  }
}
