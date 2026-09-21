// RESPONSIBILITY: Exposes Admin profile mutations using the exact frontend API action paths and HTTP concerns only.
// FLOW: HTTP mutation â†’ AdminProfileCommandController â†’ AdminProfileCommandService.

import { Body, Controller, Headers, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/backend_admin/core/idempotency/core-idempotency.service';
import { AdminProfileCommandService } from '@/backend_admin/modules/admin/profile/services/admin-profile-command.service';
import { AdminProfileMutationDto } from '@/backend_admin/modules/admin/profile/dtos/admin-profile-mutation.dto';
import { AdminProfileDto } from '@/backend_admin/modules/admin/profile/dtos/admin-profile-response.dto';

@ApiTags('Admin / profile')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/adminProfile')
export class AdminProfileCommandController {
  constructor(private readonly service: AdminProfileCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('updateProfile')
  @ApiOperation({ summary: 'Execute updateProfile' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminProfileDto })
  async updateProfile(@Body() dto: AdminProfileMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<AdminProfileDto> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateProfile(dto)) as Promise<AdminProfileDto>;
  }

  // SLA: STANDARD
  @Post('updatePassword')
  @ApiOperation({ summary: 'Execute updatePassword' })
  @ApiResponse({ status: HttpStatus.OK })
  async updatePassword(@Body() body: AdminProfileMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<void> {
    const newPassword = String(body.newPassword ?? body.password ?? '');
    return this.idempotency.executeOnce(idempotencyKey, async () => {
        await this.service.updatePassword(newPassword);
    }) as Promise<void>;
  }
}
