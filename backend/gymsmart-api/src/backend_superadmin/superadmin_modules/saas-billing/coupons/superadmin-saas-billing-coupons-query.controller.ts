// RESPONSIBILITY: Owns HTTP transport for the coupons-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminCouponsQueryDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/dtos/superadmin-saas-billing-coupons-query.dto';
import { SuperadminCouponsListService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-list.service';
import { SuperadminCouponsFindService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-find.service';

@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminCouponsQueryController {
  constructor(private readonly listService: SuperadminCouponsListService, private readonly findService: SuperadminCouponsFindService) {}
  /** Returns a paginated coupons list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminCouponsQueryDto): Promise<unknown> { return await this.listService.findCouponsPage(query); }
  /** Returns one coupons record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findCouponsById(id); }
}