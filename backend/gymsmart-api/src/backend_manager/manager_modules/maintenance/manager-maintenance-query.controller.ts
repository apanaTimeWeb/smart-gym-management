// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerMaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto } from '@/backend_manager/manager_modules/maintenance/maintenance_responses/manager-maintenance-manager-maintenance-api-fetch-maintenance-issues.response.dto';
import { ManagerMaintenanceQueryDto } from '@/backend_manager/manager_modules/maintenance/maintenance_dtos/manager-maintenance-query.dto';
import { ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService } from '@/backend_manager/manager_modules/maintenance/maintenance_services/manager-maintenance-manager-maintenance-api-find-maintenance-issues.service';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerMaintenanceQueryController {
  constructor(private readonly fetchService: ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService) {}
  // SLA: STANDARD
  @Get('maintenance')
  @ApiOperation({ summary: 'Fetch maintenance' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerMaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto] })
  findMaintenanceIssues(@Query() query: ManagerMaintenanceQueryDto): ReturnType<ManagerMaintenanceManagerMaintenanceApiFindMaintenanceIssuesService['findMaintenanceIssues']> { return this.fetchService.findMaintenanceIssues(query); }
}

export { ManagerMaintenanceQueryController as MaintenanceQueryController };
