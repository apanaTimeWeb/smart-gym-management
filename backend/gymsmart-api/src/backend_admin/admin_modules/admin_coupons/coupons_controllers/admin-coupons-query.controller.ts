// RESPONSIBILITY: Exposes read-only Admin coupons HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminCouponsQueryController -> AdminCouponsQueryService -> repository.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreRoles } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.decorator.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreAdminRole } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-tenant.constants.js';

import { AdminCouponsQueryDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-query.dto.js';
import { AdminCouponDto, AdminCouponsKPIDataDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-response.dto.js';
import { AdminCouponsQueryService } from '@/backend_admin/admin_modules/admin_coupons/coupons_services/admin-coupons-query.service.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@ApiTags('Admin / coupons')
@Controller('admin/coupons')
@UseGuards(AdminCoreJwtAuthGuard, AdminCoreRolesGuard)
@AdminCoreRoles(AdminCoreAdminRole.ADMIN)
/**
 * @description Defines the AdminCouponsQueryController boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsQueryController {
  constructor(private readonly service: AdminCouponsQueryService) {}

  // SLA: STANDARD
  @Get('fetchCoupons')
  @ApiOperation({ summary: 'Execute fetchCoupons' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCouponDto] })
  async findAllCoupons(@Query() query: AdminCouponsQueryDto): Promise<AdminCorePaginatedResult<AdminCouponDto>> {
    return this.service.findAllCoupons(query);
  }

  // SLA: STANDARD
  @Get('kpis')
  @ApiOperation({ summary: 'Fetch coupon KPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCouponsKPIDataDto })
  async findCouponKpis(): Promise<AdminCouponsKPIDataDto> {
    return this.service.findCouponKpis({} as any);
  }

}
