// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { ProfileUpdateService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-update.service';
import { ProfilePasswordService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-password.service';
import { ProfileTwoFactorService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-two-factor.service';
import { ProfileUpdateDto } from '@/backend_superadmin/modules/superadmin/profile/dtos/profile-update.dto';
import { ProfilePasswordChangeDto } from '@/backend_superadmin/modules/superadmin/profile/dtos/profile-password-change.dto';
import { ProfileTwoFactorDto } from '@/backend_superadmin/modules/superadmin/profile/dtos/profile-two-factor.dto';
import type { AuthenticatedUser } from '@/backend_superadmin/core/auth/auth.types';
import type { Request } from 'express';

@ApiTags('profilesecuritycommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileSecurityCommandController {
  constructor(private readonly updateService: ProfileUpdateService, private readonly passwordService: ProfilePasswordService, private readonly twoFactorService: ProfileTwoFactorService) {}


  /** Executes PATCH /superadmin/profile. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async update(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: ProfileUpdateDto): Promise<unknown> { return this.updateService.updateProfile(request.user!.userId, body as never); }


  /** Executes PATCH /superadmin/profile/password. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/password' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile/password')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async password(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: ProfilePasswordChangeDto): Promise<null> { await this.passwordService.updatePassword(request.user!.userId, body.currentPassword, body.newPassword, body.confirmPassword); return null; }


  /** Executes PATCH /superadmin/profile/2fa. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/2fa' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile/2fa')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async twoFactor(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: ProfileTwoFactorDto): Promise<unknown> { return this.twoFactorService.updateTwoFactor(request.user!.userId, body.enabled, body.password); }

}