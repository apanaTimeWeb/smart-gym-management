// RESPONSIBILITY: Exposes read-only Admin audit_logs HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAuditLogsQueryController -> AdminAuditLogsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminAuditLogsQueryService } from '@/backend_admin/modules/admin/audit_logs/services/admin-audit_logs-query.service';
import { AdminAuditLogsQueryDto } from '@/backend_admin/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';
import { AdminAuditLogsKpiDto, AdminAuditLogDto } from '@/backend_admin/modules/admin/audit_logs/dtos/admin-audit_logs-response.dto';

@ApiTags('Admin / audit_logs')
@Controller('admin/audit_logs')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminAuditLogsQueryController {
  constructor(private readonly service: AdminAuditLogsQueryService) {}

  // SLA: STANDARD
  @Get('fetchLogs')
  @ApiOperation({ summary: 'Execute fetchLogs' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminAuditLogDto] })
  async fetchLogs(@Query() query: AdminAuditLogsQueryDto): Promise<AdminAuditLogDto[]> {
    return this.service.fetchLogs(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAuditLogsKpiDto })
  async fetchKPIs(@Query() query: AdminAuditLogsQueryDto): Promise<AdminAuditLogsKpiDto> {
    return this.service.fetchKPIs(query);
  }

}
