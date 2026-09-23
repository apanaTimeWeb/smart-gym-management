// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCouponsRedemptionsService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-redemptions.service';

@ApiTags('couponsredemptionsquery')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminCouponsRedemptionsQueryController {
  constructor(private readonly redemptionsService: SuperadminCouponsRedemptionsService) {}


  /** Executes GET /superadmin/saas-billing/coupons/:id/redemptions. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/coupons/:id/redemptions' })
  // SLA: FAST
  @Get('superadmin/saas-billing/coupons/:id/redemptions')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async redemptions(@Param('id') id: string): Promise<unknown> { return await this.redemptionsService.findCouponsRedemptions(id); }

}