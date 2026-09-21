// RESPONSIBILITY: Exposes mutation endpoints for Admin blacklist; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminBlacklistCommandController -> AdminBlacklistCommandService.

import { Body, Controller, Delete, Headers, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminBlacklistCommandService } from '@/backend_admin/modules/admin/blacklist/services/admin-blacklist-command.service';
import { AdminBlacklistIdDto } from '@/backend_admin/modules/admin/blacklist/dtos/admin-blacklist-id.dto';
import { AdminBlacklistMutationDto } from '@/backend_admin/modules/admin/blacklist/dtos/admin-blacklist-mutation.dto';
import { AdminBlacklistedMemberDto } from '@/backend_admin/modules/admin/blacklist/dtos/admin-blacklist-response.dto';

@ApiTags('Admin / blacklist')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/blacklist')
export class AdminBlacklistCommandController {
  constructor(private readonly service: AdminBlacklistCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('addToBlacklist')
  @ApiOperation({ summary: 'Execute addToBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async createRecord(@Body() dto: AdminBlacklistMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminBlacklistedMemberDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createRecord(dto));
  }

  // SLA: STANDARD
  @Delete('removeFromBlacklist')
  @ApiOperation({ summary: 'Execute removeFromBlacklist' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminBlacklistIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(dto.id));
  }

  // SLA: STANDARD
  @Post('toggleBlacklist')
  @ApiOperation({ summary: 'Execute toggleBlacklist' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async toggleActiveById(@Body() dto: AdminBlacklistIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminBlacklistedMemberDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.toggleActiveById(dto.id));
  }

  // SLA: STANDARD
  @Post('propagateToAllBranches')
  @ApiOperation({ summary: 'Execute propagateToAllBranches' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminBlacklistedMemberDto })
  async propagateById(@Body() dto: AdminBlacklistIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminBlacklistedMemberDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.propagateById(dto.id));
  }

}
