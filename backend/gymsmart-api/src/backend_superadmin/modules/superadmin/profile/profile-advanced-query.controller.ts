// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfileMainService } from '@/backend_superadmin/modules/superadmin/profile/services/profile-main.service';
import type { AuthenticatedUser } from '@/backend_superadmin/core/auth/auth.types';
import type { Request } from 'express';

@ApiTags('profileadvancedquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ProfileAdvancedQueryController {
  constructor(private readonly mainService: ProfileMainService) {}


  /** Executes GET /superadmin/profile. */
  @ApiOperation({ summary: 'GET /superadmin/profile' })
  // SLA: FAST
  @Get('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Req() request: Request & { user?: AuthenticatedUser }): Promise<unknown> { return this.mainService.findProfile(request.user!.userId); }

}