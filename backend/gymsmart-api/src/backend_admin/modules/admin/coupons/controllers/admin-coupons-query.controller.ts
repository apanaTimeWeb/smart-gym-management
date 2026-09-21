// RESPONSIBILITY: Exposes read-only Admin coupons HTTP endpoints; contains no business logic.
// FLOW: HTTP GET -> AdminCouponsQueryController -> AdminCouponsQueryService -> repository.

import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoreJwtAuthGuard } from '@/backend_admin/core/auth/core-jwt-auth.guard';
import { CoreRoles } from '@/backend_admin/core/auth/core-roles.decorator';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';
import { CoreAdminRole } from '@/backend_admin/core/tenant/core-tenant.constants';
import { AdminCouponsQueryService } from '@/backend_admin/modules/admin/coupons/services/admin-coupons-query.service';
import { AdminCouponsQueryDto } from '@/backend_admin/modules/admin/coupons/dtos/admin-coupons-query.dto';
import { AdminCouponDto, AdminCouponsKPIDataDto } from '@/backend_admin/modules/admin/coupons/dtos/admin-coupons-response.dto';

@ApiTags('Admin / coupons')
@Controller('admin/coupons')
@UseGuards(CoreJwtAuthGuard, CoreRolesGuard)
@CoreRoles(CoreAdminRole.ADMIN)
export class AdminCouponsQueryController {
  constructor(private readonly service: AdminCouponsQueryService) {}

  // SLA: STANDARD
  @Get('fetchCoupons')
  @ApiOperation({ summary: 'Execute fetchCoupons' })
  @ApiResponse({ status: HttpStatus.OK, type: [AdminCouponDto] })
  async fetchCoupons(@Query() query: AdminCouponsQueryDto): Promise<AdminCouponDto[]> {
    return this.service.fetchCoupons(query);
  }

  // SLA: STANDARD
  @Get('kpis')
  @ApiOperation({ summary: 'Fetch coupon KPIs' })
  @ApiResponse({ status: HttpStatus.OK, type: AdminCouponsKPIDataDto })
  async fetchKPIs(): Promise<AdminCouponsKPIDataDto> {
    return this.service.fetchKPIs();
  }

}
