// RESPONSIBILITY: Exposes read-only Admin audit_logs HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAuditLogsQueryController -> AdminAuditLogsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminAuditLogsQueryDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-query.dto'
import { AdminAuditLogsKpiDto, AdminAuditLogDto } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_dtos/admin-audit-logs-response.dto'
import { AdminAuditLogsQueryService } from '@/backend_admin/admin_modules/admin_audit_logs/audit_logs_services/admin-audit-logs-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / audit_logs')
@Controller('admin/audit_logs')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminAuditLogsQueryController boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsQueryController {
  constructor(private readonly service: AdminAuditLogsQueryService) {}

  // SLA: STANDARD
  @Get('fetchLogs')
  @ApiOperation({ summary: 'Execute fetchLogs' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAuditLogDto] })
  async findAllLogs(@Query() query: AdminAuditLogsQueryDto): Promise<AdminCorePaginatedResult<AdminAuditLogDto>> {
    return this.service.findAllLogs(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAuditLogsKpiDto })
  async findAuditLogKpis(@Query() query: AdminAuditLogsQueryDto): Promise<AdminAuditLogsKpiDto> {
    return this.service.findAuditLogKpis(query);
  }

}
