// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';

import { ReferralsFetchReferralKPIsResponseDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-fetch-referral-k-p-is.response.dto';
import { ReferralsFetchReferralsResponseDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-fetch-referrals.response.dto';
import { ReferralsQueryDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-query.dto';
import { ReferralsFetchReferralKPIsService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-fetch-referral-k-p-is.service';
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-fetch-referrals.service';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(CoreRole.MANAGER)
export class ReferralsQueryController {
  constructor(private readonly fetchReferralKPIsService: ReferralsFetchReferralKPIsService, private readonly fetchReferralsService: ReferralsFetchReferralsService) {}

  // SLA: FAST
  @Get("referrals/kpis")
  @ApiOperation({ summary: 'fetchReferralKPIs for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: ReferralsFetchReferralKPIsResponseDto })
  fetchReferralKPIs(@Query() query: ReferralsQueryDto): ReturnType<ReferralsFetchReferralKPIsService['fetchReferralKPIs']> { return this.fetchReferralKPIsService.fetchReferralKPIs(query as any); }


  // SLA: STANDARD
  @Get("referrals")
  @ApiOperation({ summary: 'fetchReferrals for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: [ReferralsFetchReferralsResponseDto] })
  fetchReferrals(@Query() query: ReferralsQueryDto): ReturnType<ReferralsFetchReferralsService['fetchReferrals']> { return this.fetchReferralsService.fetchReferrals(query as any); }


}
