// RESPONSIBILITY: Owns GET endpoints for the affiliates feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { AffiliatesQueryDto } from '@/modules/superadmin/affiliates/dtos/affiliates-query.dto';
import { AffiliatesListService } from '@/modules/superadmin/affiliates/services/affiliates-list.service';
import { AffiliatesFindService } from '@/modules/superadmin/affiliates/services/affiliates-find.service';
import { AffiliatesPayoutService } from '@/modules/superadmin/affiliates/services/affiliates-payout.service';

@ApiTags('affiliates')
@Controller('/superadmin/affiliates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class AffiliatesQueryController {
  constructor(private readonly listService: AffiliatesListService, private readonly findService: AffiliatesFindService, private readonly payoutService: AffiliatesPayoutService) {}
  /** Returns payout history across active affiliates. */
  // SLA: STANDARD
  @Get('payout-history')
  async payoutHistory(): Promise<unknown[]> { return this.payoutService.history(); }

  /** Returns a paginated affiliates list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: AffiliatesQueryDto): Promise<unknown> { return await this.listService.findAffiliatesPage(query); }
  /** Returns one affiliates record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findAffiliatesById(id); }
}
