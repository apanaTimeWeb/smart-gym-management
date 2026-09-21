// RESPONSIBILITY: Exposes mutation endpoints for Admin usage; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminUsageCommandController -> AdminUsageCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminUsageCommandService } from '@/backend_admin/modules/admin/usage/services/admin-usage-command.service';
import { AdminUsageMutationDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-mutation.dto';
import { AdminUsageIdDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-id.dto';
import { AdminUsageUpgradeRequestDto } from '@/backend_admin/modules/admin/usage/dtos/admin-usage-response.dto';

@ApiTags('Admin / usage')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/usage')
export class AdminUsageCommandController {
  constructor(private readonly service: AdminUsageCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('upgrade-request')
  @ApiOperation({ summary: 'Execute createUpgradeRequest' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminUsageUpgradeRequestDto })
  async createUpgradeRequest(@Body() dto: AdminUsageMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createUpgradeRequest(dto as unknown as Record<string, unknown>)) as unknown as Promise<unknown>;
  }

}
