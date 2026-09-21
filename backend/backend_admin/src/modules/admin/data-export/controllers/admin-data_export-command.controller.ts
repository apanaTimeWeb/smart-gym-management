// RESPONSIBILITY: Exposes mutation endpoints for Admin data-export; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminDataExportCommandController -> AdminDataExportCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminDataExportCommandService } from '@/modules/admin/data-export/services/admin-data_export-command.service';
import { AdminDataExportMutationDto } from '@/modules/admin/data-export/dtos/admin-data_export-mutation.dto';
import { AdminDataExportIdDto } from '@/modules/admin/data-export/dtos/admin-data_export-id.dto';

@ApiTags('Admin / data-export')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/data-export')
export class AdminDataExportCommandController {
  constructor(private readonly service: AdminDataExportCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: HEAVY
  @Post('createExport')
  @ApiOperation({ summary: 'Execute createExport' })
  @ApiResponse({ status: HttpStatus.OK })
  async createExportJob(@Body() dto: AdminDataExportMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createExportJob(dto as unknown as Record<string, unknown>));
  }

  // SLA: STANDARD
  @Delete('deleteJob')
  @ApiOperation({ summary: 'Execute deleteJob' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminDataExportIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id));
  }

}
