// RESPONSIBILITY: Exposes read-only Admin gym-health-alerts HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminGymHealthAlertsQueryController -> AdminGymHealthAlertsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminGymHealthAlertsQueryDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-query.dto.js';
import { AdminGymHealthAlertDto, AdminGymHealthKPIDataDto } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_dtos/admin-gym-health-alerts-response.dto.js';
import { AdminGymHealthAlertsQueryService } from '@/backend_admin/admin_modules/admin_gym-health-alerts/gym-health-alerts_services/admin-gym-health-alerts-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / gym-health-alerts')
@Controller('admin/gym-health-alerts')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminGymHealthAlertsQueryController boundary for the admin_gym-health-alerts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminGymHealthAlertsQueryController {
  constructor(private readonly service: AdminGymHealthAlertsQueryService) {}

  // SLA: STANDARD
  @Get('fetchAlerts')
  @ApiOperation({ summary: 'Execute fetchAlerts' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminGymHealthAlertDto] })
  async findAllAlerts(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminCorePaginatedResult<AdminGymHealthAlertDto>> {
    return this.service.findAllAlerts(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminGymHealthKPIDataDto })
  async findAlertKpis(@Query() query: AdminGymHealthAlertsQueryDto): Promise<AdminGymHealthKPIDataDto> {
    return this.service.findAlertKpis(query);
  }

}
