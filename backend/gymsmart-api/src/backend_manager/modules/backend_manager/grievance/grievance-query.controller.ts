// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-manager-grievance-api-fetch-grievance-tickets.response.dto';
import { GrievanceQueryDto } from '@/backend_manager/modules/backend_manager/grievance/dtos/grievance-query.dto';
import { GrievanceManagerGrievanceApiFetchGrievanceTicketsService } from '@/backend_manager/modules/backend_manager/grievance/services/grievance-manager-grievance-api-fetch-grievance-tickets.service';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(CoreRole.MANAGER)
export class GrievanceQueryController {
  constructor(private readonly fetchService: GrievanceManagerGrievanceApiFetchGrievanceTicketsService) {}
  // SLA: STANDARD
  @Get('grievance')
  @ApiOperation({ summary: 'Fetch grievance' })
  @ApiResponse({ status: HttpStatus.OK, type: [GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto] })
  fetchGrievanceTickets(@Query() query: GrievanceQueryDto): ReturnType<GrievanceManagerGrievanceApiFetchGrievanceTicketsService['fetchGrievanceTickets']> { return this.fetchService.fetchGrievanceTickets(query as any); }
}
