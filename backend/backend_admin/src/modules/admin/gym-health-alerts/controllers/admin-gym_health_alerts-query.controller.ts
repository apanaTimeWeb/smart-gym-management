// RESPONSIBILITY: Exposes read-only Admin gym-health-alerts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminGymHealthAlertsQueryController -> AdminGymHealthAlertsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminGymHealthAlertsQueryService } from '@/modules/admin/gym-health-alerts/services/admin-gym_health_alerts-query.service';
import { AdminGymHealthAlertsQueryDto } from '@/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-query.dto';
import { AdminGymHealthAlertListResponseDto, AdminGymHealthKPIDataDto } from '@/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-response.dto';

@ApiTags('Admin / gym-health-alerts')
@Controller('admin/gym-health-alerts')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminGymHealthAlertsQueryController {
  constructor(private readonly service: AdminGymHealthAlertsQueryService) {}

  // SLA: STANDARD
  @Get('fetchAlerts')
  @ApiOperation({ summary: 'Execute fetchAlerts' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminGymHealthAlertListResponseDto })
  async fetchAlerts(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthAlertListResponseDto> {
    return this.service.fetchAlerts(query) as unknown as AdminGymHealthAlertListResponseDto;
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminGymHealthKPIDataDto })
  async fetchKPIs(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthKPIDataDto> {
    return this.service.fetchKPIs(query) as unknown as AdminGymHealthKPIDataDto;
  }

}
