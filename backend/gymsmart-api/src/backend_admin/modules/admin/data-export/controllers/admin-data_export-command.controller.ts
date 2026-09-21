// RESPONSIBILITY: Exposes mutation endpoints for Admin data-export; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminDataExportCommandController -> AdminDataExportCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminDataExportCommandService } from '@/backend_admin/modules/admin/data-export/services/admin-data_export-command.service';
import { AdminDataExportMutationDto } from '@/backend_admin/modules/admin/data-export/dtos/admin-data_export-mutation.dto';
import { AdminDataExportIdDto } from '@/backend_admin/modules/admin/data-export/dtos/admin-data_export-id.dto';
import { AdminExportJobDto } from '@/backend_admin/modules/admin/data-export/dtos/admin-data_export-response.dto';

@ApiTags('Admin / data-export')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/data-export')
export class AdminDataExportCommandController {
  constructor(private readonly service: AdminDataExportCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: HEAVY
  @Post('createExport')
  @ApiOperation({ summary: 'Execute createExport' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminExportJobDto })
  async createExportJob(@Body() dto: AdminDataExportMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminExportJobDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createExportJob(dto as unknown as Record<string, unknown>)) as unknown as Promise<AdminExportJobDto>;
  }

  // SLA: STANDARD
  @Delete('deleteJob')
  @ApiOperation({ summary: 'Execute deleteJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminDataExportIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id)) as unknown as Promise<void>;
  }

}
