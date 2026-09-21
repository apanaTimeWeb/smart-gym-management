// RESPONSIBILITY: Exposes read-only Admin gym-health-alerts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminGymHealthAlertsQueryController -> AdminGymHealthAlertsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminGymHealthAlertsQueryService } from '@/backend_admin/modules/admin/gym-health-alerts/services/admin-gym_health_alerts-query.service';
import { AdminGymHealthAlertsQueryDto } from '@/backend_admin/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-query.dto';
import { AdminGymHealthAlertDto, AdminGymHealthKPIDataDto } from '@/backend_admin/modules/admin/gym-health-alerts/dtos/admin-gym_health_alerts-response.dto';

@ApiTags('Admin / gym-health-alerts')
@Controller('admin/gym-health-alerts')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminGymHealthAlertsQueryController {
  constructor(private readonly service: AdminGymHealthAlertsQueryService) {}

  // SLA: STANDARD
  @Get('fetchAlerts')
  @ApiOperation({ summary: 'Execute fetchAlerts' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminGymHealthAlertDto] })
  async fetchAlerts(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthAlertDto[]> {
    return this.service.fetchAlerts(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminGymHealthKPIDataDto })
  async fetchKPIs(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}
