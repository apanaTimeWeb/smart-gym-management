// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Patch, Req } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminProfileMainService } from '@/backend_superadmin/superadmin_modules/profile/services/superadmin-profile-main.service';
import type { SuperadminAuthenticatedUser } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import type { Request } from 'express';

@ApiTags('profileadvancedquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminProfileAdvancedQueryController {
  constructor(private readonly mainService: SuperadminProfileMainService) {}


  /** Executes GET /superadmin/profile. */
  @ApiOperation({ summary: 'GET /superadmin/profile' })
  // SLA: FAST
  @Get('superadmin/profile')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async main(@Req() request: Request & { user?: SuperadminAuthenticatedUser }): Promise<unknown> { return this.mainService.findProfile(request.user!.userId); }

}