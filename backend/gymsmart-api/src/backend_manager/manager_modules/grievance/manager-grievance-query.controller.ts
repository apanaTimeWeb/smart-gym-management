// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerGrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto } from '@/backend_manager/manager_modules/grievance/grievance_responses/manager-grievance-manager-grievance-api-fetch-grievance-tickets.response.dto';
import { ManagerGrievanceQueryDto } from '@/backend_manager/manager_modules/grievance/grievance_dtos/manager-grievance-query.dto';
import { ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService } from '@/backend_manager/manager_modules/grievance/grievance_services/manager-grievance-manager-grievance-api-find-grievance-tickets.service';

@Controller('manager')
@ApiTags('Manager grievance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerGrievanceQueryController {
  constructor(private readonly fetchService: ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService) {}
  // SLA: STANDARD
  @Get('grievance')
  @ApiOperation({ summary: 'Fetch grievance' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerGrievanceManagerGrievanceApiFetchGrievanceTicketsResponseDto] })
  findGrievanceTickets(@Query() query: ManagerGrievanceQueryDto): ReturnType<ManagerGrievanceManagerGrievanceApiFindGrievanceTicketsService['findGrievanceTickets']> { return this.fetchService.findGrievanceTickets(query); }
}

export { ManagerGrievanceQueryController as GrievanceQueryController };
