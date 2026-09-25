// RESPONSIBILITY: Exposes mutation endpoints for Admin reports; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminReportsCommandController -> AdminReportsCommandService.
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminReportsMutationDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-mutation.dto'
import { AdminReportsExportResponseDto } from '@/backend_admin/admin_modules/admin_reports/reports_dtos/admin-reports-response.dto'
import { AdminReportsCommandService } from '@/backend_admin/admin_modules/admin_reports/reports_services/admin-reports-command.service'

@ApiTags('Admin / reports')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/reports')
/**
 * @description Defines the AdminReportsCommandController boundary for the admin_reports backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminReportsCommandController {
  constructor(private readonly service: AdminReportsCommandService) {}

  // SLA: HEAVY
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('exportReport')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Execute exportReport' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: AdminReportsExportResponseDto })
  async createExportJob(@Body() dto: AdminReportsMutationDto): Promise<AdminReportsExportResponseDto> {
    return this.service.createExportJob({ ...dto });
  }

}
