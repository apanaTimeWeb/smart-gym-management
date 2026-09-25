// RESPONSIBILITY: Exposes read-only Admin data-export HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminDataExportQueryController -> AdminDataExportQueryService -> repository.
import { Controller, Get, HttpStatus, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard'
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator'
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard'
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants'

import { AdminDataExportQueryDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-query.dto'
import { AdminExportJobDto, AdminDataExportKPIDataDto } from '@/backend_admin/admin_modules/admin_data-export/data-export_dtos/admin-data-export-response.dto'
import { AdminDataExportQueryService } from '@/backend_admin/admin_modules/admin_data-export/data-export_services/admin-data-export-query.service'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@ApiTags('Admin / data-export')
@Controller('admin/data-export')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminDataExportQueryController boundary for the admin_data-export backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminDataExportQueryController {
  constructor(private readonly service: AdminDataExportQueryService) {}

  // SLA: STANDARD
  @Get('fetchJobs')
  @ApiOperation({ summary: 'Execute fetchJobs' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminExportJobDto] })
  async findAllJobs(@Query() query: AdminDataExportQueryDto): Promise<AdminCorePaginatedResult<AdminExportJobDto>> {
    return this.service.findAllJobs(query);
  }

  // SLA: STANDARD
  /** @description Downloads a completed tenant export using its short-lived signed reference. @param reference Signed object reference. @returns ZIP stream. */
  // SLA: STANDARD
  @Get('download')
  @ApiOperation({ summary: 'Download completed tenant export' })
  @ApiResponse({ status: HttpStatus.OK, description: 'ZIP archive' })
  async findExportDownload(@Query('reference') reference: string): Promise<StreamableFile> {
    const result = await this.service.findExportDownload(reference);
    return new StreamableFile(result.content, { type: 'application/zip', disposition: `attachment; filename=${result.fileName}` });
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDataExportKPIDataDto })
  async findDataExportKpis(@Query() query: AdminDataExportQueryDto): Promise<AdminDataExportKPIDataDto> {
    return this.service.findDataExportKpis(query);
  }

}
