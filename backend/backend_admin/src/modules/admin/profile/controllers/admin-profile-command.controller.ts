// RESPONSIBILITY: Exposes Admin profile mutations using the exact frontend API action paths and HTTP concerns only.
// FLOW: HTTP mutation → AdminProfileCommandController → AdminProfileCommandService.

import { Body, Controller, Headers, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminProfileCommandService } from '@/modules/admin/profile/services/admin-profile-command.service';
import { AdminProfileMutationDto } from '@/modules/admin/profile/dtos/admin-profile-mutation.dto';

@ApiTags('Admin / profile')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/adminProfile')
export class AdminProfileCommandController {
  constructor(private readonly service: AdminProfileCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('updateProfile')
  @ApiOperation({ summary: 'Execute updateProfile' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateProfile(@Body() dto: AdminProfileMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return idempotencyKey
      ? this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateProfile(dto as unknown as Record<string, unknown>))
      : this.service.updateProfile(dto as unknown as Record<string, unknown>);
  }

  // SLA: STANDARD
  @Post('updatePassword')
  @ApiOperation({ summary: 'Execute updatePassword' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePassword(@Body() body: AdminProfileMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const newPassword = String(body.newPassword ?? body.password ?? '');
    const operation = async (): Promise<null> => this.service.updatePassword(newPassword);
    return idempotencyKey ? this.idempotency.executeOnce(idempotencyKey, operation) : operation();
  }
}
