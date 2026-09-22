// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Profile.
// FLOW: /superadmin/profile -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/profile.

import { Body, Controller, Get, Patch, Req, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import type { AuthenticatedUser } from '@/backend_superadmin/core/auth/auth.types';
import type { Request } from 'express';

import { ProfileMainService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-main.service';
import { ProfileUpdateService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-update.service';
import { ProfilePasswordService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-password.service';
import { ProfileTwoFactorService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-two-factor.service';

@ApiTags('Profile-Compatibility')
@Controller({ path: 'superadmin/profile', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileCompatibilityController {
  constructor(
    private readonly mainService: ProfileMainService,
    private readonly updateService: ProfileUpdateService,
    private readonly passwordService: ProfilePasswordService,
    private readonly twoFactorService: ProfileTwoFactorService
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async main(@Req() request: Request & { user?: AuthenticatedUser }) { return this.mainService.findProfile(request.user!.userId); }

  @Patch()
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async update(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>) { return this.updateService.updateProfile(request.user!.userId, body as never); }

  @Patch('password')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async password(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>) { 
    await this.passwordService.updatePassword(request.user!.userId, String(body.currentPassword ?? ''), String(body.newPassword ?? ''), String(body.confirmPassword ?? '')); 
    return null; 
  }

  @Patch('2fa')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async twoFactor(@Req() request: Request & { user?: AuthenticatedUser }, @Body() body: Record<string, unknown>) { 
    return this.twoFactorService.updateTwoFactor(request.user!.userId, Boolean(body.enabled), String(body.password ?? '')); 
  }
}
