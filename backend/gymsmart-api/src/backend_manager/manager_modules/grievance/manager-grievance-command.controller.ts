// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto } from '@/backend_manager/manager_modules/grievance/grievance_dtos/manager-grievance-manager-grievance-api-create-grievance-ticket.request.dto';
import { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto } from '@/backend_manager/manager_modules/grievance/grievance_responses/manager-grievance-manager-grievance-api-create-grievance-ticket.response.dto';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto } from '@/backend_manager/manager_modules/grievance/grievance_dtos/manager-grievance-manager-grievance-api-resolve-grievance-ticket.request.dto';
import { ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto } from '@/backend_manager/manager_modules/grievance/grievance_responses/manager-grievance-manager-grievance-api-resolve-grievance-ticket.response.dto';
import { ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-create-grievance-ticket.service';
import { ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-resolve-grievance-ticket.service';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerGrievanceCommandController {
  constructor(private readonly createService: ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService, private readonly resolveService: ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService) {}
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('grievance')
  @ApiOperation({ summary: 'Create grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto })
  create(@Body() dto: GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto): ReturnType<ManagerGrievanceManagerGrievanceApiCreateGrievanceTicketService['createGrievanceTicket']> { return this.createService.createGrievanceTicket(dto); }
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('grievance/:id/resolve')
  @ApiOperation({ summary: 'Resolve grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto })
  @ManagerCoreAuthorizeResourceParam('id')
  resolve(@Param('id') id: string, @Body() dto: GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto): ReturnType<ManagerGrievanceManagerGrievanceApiResolveGrievanceTicketService['updateGrievanceTicket']> { return this.resolveService.updateGrievanceTicket(dto, id); }
}

export { ManagerGrievanceCommandController as GrievanceCommandController };
