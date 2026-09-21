// RESPONSIBILITY: Exposes mutation endpoints for Admin reports; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminReportsCommandController -> AdminReportsCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminReportsCommandService } from '@/modules/admin/reports/services/admin-reports-command.service';
import { AdminReportsMutationDto } from '@/modules/admin/reports/dtos/admin-reports-mutation.dto';
import { AdminReportsIdDto } from '@/modules/admin/reports/dtos/admin-reports-id.dto';

@ApiTags('Admin / reports')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/reports')
export class AdminReportsCommandController {
  constructor(private readonly service: AdminReportsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: HEAVY
  @Post('exportReport')
  @ApiOperation({ summary: 'Execute exportReport' })
  @ApiResponse({ status: HttpStatus.OK })
  async createExportJob(@Body() dto: AdminReportsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createExportJob(dto as unknown as Record<string, unknown>));
  }

}
