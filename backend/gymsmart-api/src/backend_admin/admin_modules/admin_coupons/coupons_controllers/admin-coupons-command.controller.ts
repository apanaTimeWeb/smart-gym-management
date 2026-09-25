// RESPONSIBILITY: Exposes mutation endpoints for Admin coupons; contains HTTP concerns only.
// FLOW: HTTP mutation â†’ AdminCouponsCommandController â†’ AdminCouponsCommandService.
import { BadRequestException, Body, Controller, Delete, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { RequireIdempotencyKey } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-require-idempotency-key.decorator.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminCouponsIdDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-id.dto.js';
import { AdminCouponsMutationDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-mutation.dto.js';
import { AdminCouponDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-response.dto.js';
import { AdminCouponsCommandService } from '@/backend_admin/admin_modules/admin_coupons/coupons_services/admin-coupons-command.service.js';

@ApiTags('Admin / coupons')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
@Controller('admin/coupons')
/**
 * @description Defines the AdminCouponsCommandController boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsCommandController {
  constructor(private readonly service: AdminCouponsCommandService) {}

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('createCoupon')
  @ApiOperation({ summary: 'Execute createCoupon' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCouponDto })
  async createRecord(@Body() dto: AdminCouponsMutationDto): Promise<Record<string, unknown>> {
    return this.service.createRecord(dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('updateCoupon')
  @ApiOperation({ summary: 'Execute updateCoupon' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCouponDto })
  async updateById(@Body() dto: AdminCouponsMutationDto): Promise<Record<string, unknown>> {
    const id = dto.id;
    if (!id) throw new BadRequestException({ message: 'Coupon id is required.', errorCode: 'ADMIN.COUPONS.INVALID_REQUEST' });
    return this.service.updateById(id, dto);
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('deleteCoupon')
  @ApiOperation({ summary: 'Execute deleteCoupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async deleteCoupon(@Body() dto: AdminCouponsIdDto): Promise<void> {
    const id = dto.id;
    if (!id) throw new BadRequestException({ message: 'Coupon id is required.', errorCode: 'ADMIN.COUPONS.INVALID_REQUEST' });
    return this.service.deleteCoupon(id) as any;
  }

  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('toggleCoupon')
  @ApiOperation({ summary: 'Execute toggleCoupon' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCouponDto })
  async toggleCoupon(@Body() dto: AdminCouponsIdDto): Promise<Record<string, unknown>> {
    const id = dto.id;
    if (!id) throw new BadRequestException({ message: 'Coupon id is required.', errorCode: 'ADMIN.COUPONS.INVALID_REQUEST' });
    return this.service.updateCouponActiveById(id);
  }

}
