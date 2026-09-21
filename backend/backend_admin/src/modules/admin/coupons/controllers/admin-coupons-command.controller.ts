// RESPONSIBILITY: Exposes mutation endpoints for Admin coupons; contains HTTP concerns only.
// FLOW: HTTP mutation -> AdminCouponsCommandController -> AdminCouponsCommandService.

import { BadRequestException, Body, Controller, Delete, Headers, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/core/tenant/core-tenant.constants';
import { CoreIdempotencyService } from '@/core/idempotency/core-idempotency.service';
import { AdminCouponsCommandService } from '@/modules/admin/coupons/services/admin-coupons-command.service';
import { AdminCouponsMutationDto } from '@/modules/admin/coupons/dtos/admin-coupons-mutation.dto';
import { AdminCouponsIdDto } from '@/modules/admin/coupons/dtos/admin-coupons-id.dto';

@ApiTags('Admin / coupons')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
@Controller('admin/coupons')
export class AdminCouponsCommandController {
  constructor(private readonly service: AdminCouponsCommandService, private readonly idempotency: CoreIdempotencyService) {}

  // SLA: STANDARD
  @Post('createCoupon')
  @ApiOperation({ summary: 'Execute createCoupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async createRecord(@Body() dto: AdminCouponsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.createRecord(dto as unknown as Record<string, unknown>));
  }

  // SLA: STANDARD
  @Post('updateCoupon')
  @ApiOperation({ summary: 'Execute updateCoupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async updateById(@Body() dto: AdminCouponsMutationDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Coupon id is required.');
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.updateById(id, dto as unknown as Record<string, unknown>));
  }

  // SLA: STANDARD
  @Delete('deleteCoupon')
  @ApiOperation({ summary: 'Execute deleteCoupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async markAsDeleted(@Body() dto: AdminCouponsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Coupon id is required.');
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.markAsDeleted(id));
  }

  // SLA: STANDARD
  @Post('toggleCoupon')
  @ApiOperation({ summary: 'Execute toggleCoupon' })
  @ApiResponse({ status: HttpStatus.OK })
  async toggleActiveById(@Body() dto: AdminCouponsIdDto, @Headers('Idempotency-Key') idempotencyKey?: string): Promise<unknown> {
    const id = dto.id;
    if (!id) throw new BadRequestException('Coupon id is required.');
    return this.idempotency.executeOnce(idempotencyKey, async () => this.service.toggleActiveById(id));
  }

}
