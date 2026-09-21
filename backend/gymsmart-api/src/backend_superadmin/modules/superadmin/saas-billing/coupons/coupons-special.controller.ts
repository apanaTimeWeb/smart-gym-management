// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the coupons feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { CouponsRedemptionsService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-redemptions.service';
import { CouponsRestoreService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-restore.service';

@ApiTags('coupons-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsSpecialController {
  constructor(private readonly redemptionsService: CouponsRedemptionsService, private readonly restoreService: CouponsRestoreService) {}

  /** Executes GET /superadmin/saas-billing/coupons/:id/redemptions. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/coupons/:id/redemptions' })
  @Get('superadmin/saas-billing/coupons/:id/redemptions')
  async redemptions(@Param('id') id: string): Promise<unknown> { return await this.redemptionsService.findCouponsRedemptions(id); }

  /** Executes POST /superadmin/saas-billing/coupons/:id/restore. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/coupons/:id/restore' })
  @Post('superadmin/saas-billing/coupons/:id/restore')
  async restore(@Param('id') id: string, @Body() body: Record<string, unknown>): Promise<unknown> { return await this.restoreService.restoreCoupon(id); }

}
