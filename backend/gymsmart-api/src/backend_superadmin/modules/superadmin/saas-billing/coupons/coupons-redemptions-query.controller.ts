// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouponsRedemptionsService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-redemptions.service';

@ApiTags('couponsredemptionsquery')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsRedemptionsQueryController {
  constructor(private readonly redemptionsService: CouponsRedemptionsService) {}


  /** Executes GET /superadmin/saas-billing/coupons/:id/redemptions. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/coupons/:id/redemptions' })
  // SLA: FAST
  @Get('superadmin/saas-billing/coupons/:id/redemptions')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async redemptions(@Param('id') id: string): Promise<unknown> { return await this.redemptionsService.findCouponsRedemptions(id); }

}