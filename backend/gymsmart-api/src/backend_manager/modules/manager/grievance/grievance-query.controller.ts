// @ts-nocheck
// RESPONSIBILITY: Owns the Manager grievance query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto } from '@/backend_manager/modules/manager/grievance/dtos/grievance-manager-grievance-api-fetch-grievance-tickets.response.dto';
import { GrievanceManagerGrievanceApiFetchGrievanceTicketsService } from '@/backend_manager/modules/manager/grievance/services/grievance-manager-grievance-api-fetch-grievance-tickets.service';
import { GrievanceQueryDto } from '@/backend_manager/modules/manager/grievance/dtos/grievance-query.dto';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(CoreRole.MANAGER)
export class GrievanceQueryController {
  constructor(private readonly fetchService: GrievanceManagerGrievanceApiFetchGrievanceTicketsService) {}
  // SLA: STANDARD
  @Get('grievance')
  @ApiOperation({ summary: 'Fetch grievance' })
  @ApiResponse({ status: HttpStatus.OK, type: [GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto] })
  fetchGrievanceTickets(@Query() query: GrievanceQueryDto): Promise<GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto[]> {  return this.fetchService.fetchGrievanceTickets(query) as unknown as Promise<GrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto[]>;  }
}
