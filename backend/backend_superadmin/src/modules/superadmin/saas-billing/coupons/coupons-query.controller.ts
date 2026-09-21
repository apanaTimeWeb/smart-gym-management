// RESPONSIBILITY: Owns GET endpoints for the coupons feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { CouponsQueryDto } from '@/modules/superadmin/saas-billing/coupons/dtos/coupons-query.dto';
import { CouponsListService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-list.service';
import { CouponsFindService } from '@/modules/superadmin/saas-billing/coupons/services/coupons-find.service';

@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsQueryController {
  constructor(private readonly listService: CouponsListService, private readonly findService: CouponsFindService) {}
  /** Returns a paginated coupons list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: CouponsQueryDto): Promise<unknown> { return await this.listService.findCouponsPage(query); }
  /** Returns one coupons record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findCouponsById(id); }
}
