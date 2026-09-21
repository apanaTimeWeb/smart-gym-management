// RESPONSIBILITY: Exposes read-only Admin data-export HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminDataExportQueryController -> AdminDataExportQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminDataExportQueryService } from '@/backend_admin/modules/admin/data-export/services/admin-data_export-query.service';
import { AdminDataExportQueryDto } from '@/backend_admin/modules/admin/data-export/dtos/admin-data_export-query.dto';
import { AdminExportJobDto, AdminDataExportKPIDataDto } from '@/backend_admin/modules/admin/data-export/dtos/admin-data_export-response.dto';

@ApiTags('Admin / data-export')
@Controller('admin/data-export')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminDataExportQueryController {
  constructor(private readonly service: AdminDataExportQueryService) {}

  // SLA: STANDARD
  @Get('fetchJobs')
  @ApiOperation({ summary: 'Execute fetchJobs' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminExportJobDto] })
  async fetchJobs(@Query() query: AdminDataExportQueryDto): Promise<AdminExportJobDto[]> {
    return this.service.fetchJobs(query);
  }

  // SLA: STANDARD
  @Get('fetchKPIs')
  @ApiOperation({ summary: 'Execute fetchKPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminDataExportKPIDataDto })
  async fetchKPIs(@Query() query: AdminDataExportQueryDto): Promise<AdminDataExportKPIDataDto> {
    return this.service.fetchKPIs(query);
  }

}
