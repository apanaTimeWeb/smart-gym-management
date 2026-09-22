// RESPONSIBILITY: Owns the Manager grievance command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';

import { GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto } from '@/modules/manager/grievance/dtos/grievance-manager-grievance-api-create-grievance-ticket.request.dto.ts';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto } from '@/modules/manager/grievance/dtos/grievance-manager-grievance-api-create-grievance-ticket.response.dto.ts';
import { GrievanceManagerGrievanceApiCreateGrievanceTicketService } from '@/modules/manager/grievance/services/grievance-manager-grievance-api-create-grievance-ticket.service.ts';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto } from '@/modules/manager/grievance/dtos/grievance-manager-grievance-api-resolve-grievance-ticket.request.dto.ts';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto } from '@/modules/manager/grievance/dtos/grievance-manager-grievance-api-resolve-grievance-ticket.response.dto.ts';
import { GrievanceManagerGrievanceApiResolveGrievanceTicketService } from '@/modules/manager/grievance/services/grievance-manager-grievance-api-resolve-grievance-ticket.service.ts';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(CoreRole.MANAGER)
export class GrievanceCommandController {
  constructor(private readonly createService: GrievanceManagerGrievanceApiCreateGrievanceTicketService, private readonly resolveService: GrievanceManagerGrievanceApiResolveGrievanceTicketService) {}
  // SLA: STANDARD
  @Post('grievance')
  @ApiOperation({ summary: 'Create grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto })
  create(@Body() dto: GrievanceManagerGrievanceApiCreateGrievanceTicketRequestDto): Promise<GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto> {  return this.createService.createGrievanceTicket(dto) as Promise<GrievanceManagerGrievanceApiCreateGrievanceTicketResponseDto>;  }
  // SLA: STANDARD
  @Post('grievance/:id/resolve')
  @ApiOperation({ summary: 'Resolve grievance' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto })
  resolve(@Param('id') id: string, @Body() dto: GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto): Promise<GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto> {  return this.resolveService.resolveGrievanceTicket(dto, id) as Promise<GrievanceManagerGrievanceApiResolveGrievanceTicketResponseDto>;  }
}
