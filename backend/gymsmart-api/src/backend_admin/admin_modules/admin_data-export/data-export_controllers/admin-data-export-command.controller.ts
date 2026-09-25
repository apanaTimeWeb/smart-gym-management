// RESPONSIBILITY: Exposes mutation endpoints for Admin data-export; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminDataExportCommandController -> AdminDataExportCommandService.
import { Body, Controller, Delete, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminDataExportIdDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-id.dto.js';
import { AdminDataExportMutationDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-mutation.dto.js';
import { AdminExportJobDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-response.dto.js';
import { AdminDataExportCommandService } from '@/backend_admin/admin_modules/admin_data-export/data-export_services/admin-data-export-command.service.js';

@ApiTags('Admin / data-export')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/data-export')
/**
 * @description Defines the AdminDataExportCommandController boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportCommandController {
  constructor(private readonly service: AdminDataExportCommandService) {}

  // SLA: HEAVY
  @RequireIdempotencyKey()
  @Post('createExport')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Execute createExport' })
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: AdminExportJobDto })
  async createExportJob(@Body() dto: AdminDataExportMutationDto): Promise<AdminExportJobDto> {
    return this.service.createExportJob({ ...dto }) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  @Delete('deleteJob')
  @ApiOperation({ summary: 'Execute deleteJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteDataExport(@Body() dto: AdminDataExportIdDto): Promise<void> {
    return this.service.deleteDataExport(dto.id) as any;
  }

}
