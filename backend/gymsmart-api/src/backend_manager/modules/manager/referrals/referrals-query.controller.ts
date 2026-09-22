// RESPONSIBILITY: Owns the Manager referrals query/read HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { ReferralsFetchReferralKPIsResponseDto } from '@/backend_manager/modules/manager/referrals/dtos/referrals-fetch-referral-k-p-is.response.dto';
import { ReferralsFetchReferralKPIsService } from '@/backend_manager/modules/manager/referrals/services/referrals-fetch-referral-k-p-is.service';
import { ReferralsFetchReferralsResponseDto } from '@/backend_manager/modules/manager/referrals/dtos/referrals-fetch-referrals.response.dto';
import { ReferralsFetchReferralsService } from '@/backend_manager/modules/manager/referrals/services/referrals-fetch-referrals.service';
import { ReferralsQueryDto } from '@/backend_manager/modules/manager/referrals/dtos/referrals-query.dto';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(CoreRole.MANAGER)
export class ReferralsQueryController {
  constructor(private readonly fetchReferralKPIsService: ReferralsFetchReferralKPIsService, private readonly fetchReferralsService: ReferralsFetchReferralsService) {}

  // SLA: FAST
  @Get("referrals/kpis")
  @ApiOperation({ summary: 'fetchReferralKPIs for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: ReferralsFetchReferralKPIsResponseDto })
  fetchReferralKPIs(@Query() query: ReferralsQueryDto): Promise<ReferralsFetchReferralKPIsResponseDto> {  return this.fetchReferralKPIsService.fetchReferralKPIs(query) as unknown as Promise<ReferralsFetchReferralKPIsResponseDto>;  }


  // SLA: STANDARD
  @Get("referrals")
  @ApiOperation({ summary: 'fetchReferrals for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: [ReferralsFetchReferralsResponseDto] })
  fetchReferrals(@Query() query: ReferralsQueryDto): Promise<ReferralsFetchReferralsResponseDto[]> {  return this.fetchReferralsService.fetchReferrals(query) as unknown as Promise<ReferralsFetchReferralsResponseDto[]>;  }


}
