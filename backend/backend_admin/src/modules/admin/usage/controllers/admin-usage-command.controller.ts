// RESPONSIBILITY: Exposes mutation endpoints for Admin usage; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminUsageCommandController -> AdminUsageCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminUsageCommandService } from '@/modules/admin/usage/services/admin-usage-command.service';
import { AdminUsageMutationDto } from '@/modules/admin/usage/dtos/admin-usage-mutation.dto';
import { AdminUsageIdDto } from '@/modules/admin/usage/dtos/admin-usage-id.dto';

@ApiTags('Admin / usage')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/usage')
export class AdminUsageCommandController {
  constructor(private readonly service: AdminUsageCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('upgrade-request')
  @ApiOperation({ summary: 'Execute createUpgradeRequest' })
  @ApiResponse({ status: HttpStatus.OK })
  async createUpgradeRequest(@Body() dto: AdminUsageMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const operation = async (): Promise<unknown> => this.service.createUpgradeRequest(dto as unknown as Record<string, unknown>);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }

}
