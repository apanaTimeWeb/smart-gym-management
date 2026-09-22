// @ts-nocheck
// RESPONSIBILITY: Owns the Manager maintenance query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-manager-maintenance-api-fetch-maintenance-issues.response.dto.ts';
import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService } from '@/backend_manager/modules/manager/maintenance/services/maintenance-manager-maintenance-api-fetch-maintenance-issues.service.ts';
import { MaintenanceQueryDto } from '@/backend_manager/modules/manager/maintenance/dtos/maintenance-query.dto';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(CoreRole.MANAGER)
export class MaintenanceQueryController {
  constructor(private readonly fetchService: MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService) {}
  // SLA: STANDARD
  @Get('maintenance')
  @ApiOperation({ summary: 'Fetch maintenance' })
  @ApiResponse({ status: HttpStatus.OK, type: [MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto] })
  fetchMaintenanceIssues(@Query() query: MaintenanceQueryDto): Promise<MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto[]> {  return this.fetchService.fetchMaintenanceIssues(query) as unknown as Promise<MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto[]>;  }
}
