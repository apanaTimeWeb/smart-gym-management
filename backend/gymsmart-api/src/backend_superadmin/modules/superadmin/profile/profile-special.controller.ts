// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the profile feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ProfileMainService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-main.service';
import type { AuthenticatedUser } from '@/backend_superadmin/core/auth/auth.types';
import type { Request } from 'express';
import { ProfileUpdateService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-update.service';
import { ProfilePasswordService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-password.service';
import { ProfileTwoFactorService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-two-factor.service';

@ApiTags('profile-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileSpecialController {
  constructor(private readonly mainService: ProfileMainService, private readonly updateService: ProfileUpdateService, private readonly passwordService: ProfilePasswordService, private readonly twoFactorService: ProfileTwoFactorService) {}

  /** Executes GET /superadmin/profile. */
  @ApiOperation({ summary: 'GET /superadmin/profile' })
  @Get('superadmin/profile')
  async main(@Req() request: Request & { user?: AuthenticatedUser }): Promise<unknown> { return this.mainService.findProfile(request.user!.userId); }

  /** Executes PATCH /superadmin/profile. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'PATCH /superadmin/profile' })
  @Patch('superadmin/profile')
  async update(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>): Promise<unknown> { return this.updateService.updateProfile(request.user!.userId, body as never); }

  /** Executes PATCH /superadmin/profile/password. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'PATCH /superadmin/profile/password' })
  @Patch('superadmin/profile/password')
  async password(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>): Promise<null> { await this.passwordService.updatePassword(request.user!.userId, String(body.currentPassword ?? ''), String(body.newPassword ?? ''), String(body.confirmPassword ?? '')); return null; }

  /** Executes PATCH /superadmin/profile/2fa. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'PATCH /superadmin/profile/2fa' })
  @Patch('superadmin/profile/2fa')
  async twoFactor(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>): Promise<unknown> { return this.twoFactorService.updateTwoFactor(request.user!.userId, Boolean(body.enabled), String(body.password ?? '')); }

}
