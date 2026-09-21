// RESPONSIBILITY: Exposes read-only Admin audit_logs HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminAuditLogsQueryController -> AdminAuditLogsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { AdminAuditLogsQueryService } from '@/modules/admin/audit_logs/services/admin-audit_logs-query.service';
import { AdminAuditLogsQueryDto } from '@/modules/admin/audit_logs/dtos/admin-audit_logs-query.dto';
import { AdminAuditLogsKpiResponseDto, AdminAuditLogsResponseDto } from '@/modules/admin/audit_logs/dtos/admin-audit_logs-response.dto';

@ApiTags('Admin / audit_logs')
@Controller('admin/audit_logs')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminAuditLogsQueryController {
  constructor(private readonly service: AdminAuditLogsQueryService) {}

  // SLA: STANDARD
  @Get('fetchLogs')
  @ApiOperation({ summary: 'Execute fetchLogs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAuditLogsResponseDto })
  async fetchLogs(@Query() query: AdminAuditLogsQueryDto): Promise<unknown> {
    return this.service.fetchLogs(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminAuditLogsKpiResponseDto })
  async fetchKPIs(@Query() query: AdminAuditLogsQueryDto): Promise<unknown> {
    return this.service.fetchKPIs(query);
  }

}
