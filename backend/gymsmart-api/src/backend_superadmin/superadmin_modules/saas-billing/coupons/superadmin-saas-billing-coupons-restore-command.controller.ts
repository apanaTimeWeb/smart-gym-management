// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminCouponsRestoreService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-restore.service';

@ApiTags('couponsrestorecommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminCouponsRestoreCommandController {
  constructor(private readonly restoreService: SuperadminCouponsRestoreService) {}


  /** Executes POST /superadmin/saas-billing/coupons/:id/restore. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/coupons/:id/restore' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/saas-billing/coupons/:id/restore')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async restore(@Param('id') id: string): Promise<unknown> { return await this.restoreService.restoreCoupon(id); }

}