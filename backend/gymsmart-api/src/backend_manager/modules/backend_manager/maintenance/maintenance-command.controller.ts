// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-manager-maintenance-api-create-maintenance-ticket.request.dto';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-manager-maintenance-api-create-maintenance-ticket.response.dto';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-manager-maintenance-api-resolve-maintenance-ticket.request.dto';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-manager-maintenance-api-resolve-maintenance-ticket.response.dto';
import { MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-create-maintenance-ticket.service';
import { MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-resolve-maintenance-ticket.service';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(CoreRole.MANAGER)
export class MaintenanceCommandController {
  constructor(private readonly createService: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService, private readonly resolveService: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService) {}
  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post('maintenance')
  @ApiOperation({ summary: 'Create maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketResponseDto })
  create(@Body() dto: MaintenanceManagerMaintenanceApiCreateMaintenanceTicketRequestDto): ReturnType<MaintenanceManagerMaintenanceApiCreateMaintenanceTicketService['createMaintenanceTicket']> { return this.createService.createMaintenanceTicket(dto as any); }
  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post('maintenance/:id/resolve')
  @ApiOperation({ summary: 'Resolve maintenance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketResponseDto })
  resolve(@Param('id') id: string, @Body() dto: MaintenanceManagerMaintenanceApiResolveMaintenanceTicketRequestDto): ReturnType<MaintenanceManagerMaintenanceApiResolveMaintenanceTicketService['resolveMaintenanceTicket']> { return this.resolveService.resolveMaintenanceTicket(dto as any, id); }
}
