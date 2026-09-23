// RESPONSIBILITY: Owns HTTP transport for the coupons-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { CouponsQueryDto } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/dtos/coupons-query.dto';
import { CouponsListService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-list.service';
import { CouponsFindService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-find.service';

@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsQueryController {
  constructor(private readonly listService: CouponsListService, private readonly findService: CouponsFindService) {}
  /** Returns a paginated coupons list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: CouponsQueryDto): Promise<unknown> { return await this.listService.findCouponsPage(query); }
  /** Returns one coupons record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findCouponsById(id); }
}