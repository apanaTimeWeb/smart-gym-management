// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-manager-grievance-api-create-grievance-ticket.request.dto';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-manager-grievance-api-create-grievance-ticket.response.dto';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-manager-grievance-api-resolve-grievance-ticket.request.dto';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-manager-grievance-api-resolve-grievance-ticket.response.dto';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-create-grievance-ticket.service';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-resolve-grievance-ticket.service';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(CoreRole.MANAGER)
export class GrievanceCommandController {
  constructor(private readonly createService: GrievanceManagerGrievanceApiCreateGrievanceTicketService, private readonly resolveService: GrievanceManagerGrievanceApiResolveGrievanceTicketService) {}
  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post('grievance')
  @ApiOperation({ summary: 'Create grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto })
  create(@Body() dto: GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto): ReturnType<GrievanceManagerGrievanceApiCreateGrievanceTicketService['createGrievanceTicket']> { return this.createService.createGrievanceTicket(dto as any); }
  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post('grievance/:id/resolve')
  @ApiOperation({ summary: 'Resolve grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto })
  resolve(@Param('id') id: string, @Body() dto: GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto): ReturnType<GrievanceManagerGrievanceApiResolveGrievanceTicketService['resolveGrievanceTicket']> { return this.resolveService.resolveGrievanceTicket(dto as any, id); }
}
