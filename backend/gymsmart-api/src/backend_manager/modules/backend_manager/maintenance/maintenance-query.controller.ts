// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-manager-maintenance-api-fetch-maintenance-issues.response.dto';
import { MaintenanceQueryDto } from '@/backend_manager/modules/backend_manager/maintenance/dtos/maintenance-query.dto';
import { MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService } from '@/backend_manager/modules/backend_manager/maintenance/services/maintenance-manager-maintenance-api-fetch-maintenance-issues.service';

@Controller('manager')
@ApiTags('Manager maintenance')
@Roles(CoreRole.MANAGER)
export class MaintenanceQueryController {
  constructor(private readonly fetchService: MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService) {}
  // SLA: STANDARD
  @Get('maintenance')
  @ApiOperation({ summary: 'Fetch maintenance' })
  @ApiResponse({ status: HttpStatus.OK, type: [MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesResponseDto] })
  fetchMaintenanceIssues(@Query() query: MaintenanceQueryDto): ReturnType<MaintenanceManagerMaintenanceApiFetchMaintenanceIssuesService['fetchMaintenanceIssues']> { return this.fetchService.fetchMaintenanceIssues(query as any); }
}
