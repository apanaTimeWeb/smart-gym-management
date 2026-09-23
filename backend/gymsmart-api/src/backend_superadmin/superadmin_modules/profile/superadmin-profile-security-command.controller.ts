// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminProfileUpdateService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-update.service';
import { SuperadminProfilePasswordService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-password.service';
import { SuperadminProfileTwoFactorService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-two-factor.service';
import { SuperadminProfileUpdateDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-update.dto';
import { SuperadminProfilePasswordChangeDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-password-change.dto';
import { SuperadminProfileTwoFactorDto } from '@/backend_superadmin/superadmin_modules/profile/dtos/superadmin-profile-two-factor.dto';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import type { Request } from 'express';

@ApiTags('profilesecuritycommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileSecurityCommandController {
  constructor(private readonly updateService: SuperadminProfileUpdateService, private readonly passwordService: SuperadminProfilePasswordService, private readonly twoFactorService: SuperadminProfileTwoFactorService) {}


  /** Executes PATCH /superadmin/profile. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async update(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfileUpdateDto): Promise<unknown> { return this.updateService.updateProfile(request.user!.userId, body as never); }


  /** Executes PATCH /superadmin/profile/password. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/password' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile/password')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async password(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfilePasswordChangeDto): Promise<null> { await this.passwordService.updatePassword(request.user!.userId, body.currentPassword, body.newPassword, body.confirmPassword); return null; }


  /** Executes PATCH /superadmin/profile/2fa. */
  @ApiOperation({ summary: 'PATCH /superadmin/profile/2fa' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/profile/2fa')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async twoFactor(@Req() request: Request & { user?: SuperadminAuthenticatedUser }, @Body() body: SuperadminProfileTwoFactorDto): Promise<unknown> { return this.twoFactorService.updateTwoFactor(request.user!.userId, body.enabled, body.password); }

}