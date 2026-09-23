// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { CouponsRestoreService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/services/coupons-restore.service';

@ApiTags('couponsrestorecommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsRestoreCommandController {
  constructor(private readonly restoreService: CouponsRestoreService) {}


  /** Executes POST /superadmin/saas-billing/coupons/:id/restore. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/coupons/:id/restore' })
  @RequireIdempotencyKey()
  // SLA: HEAVY
  @Post('superadmin/saas-billing/coupons/:id/restore')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async restore(@Param('id') id: string): Promise<unknown> { return await this.restoreService.restoreCoupon(id); }

}