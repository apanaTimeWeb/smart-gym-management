// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';

import { ManagerReferralsFetchReferralKPIsResponseDto } from '@/backend_manager/manager_modules/referrals/referrals_responses/manager-referrals-fetch-referral-k-p-is.response.dto';
import { ManagerReferralsFetchReferralsResponseDto } from '@/backend_manager/manager_modules/referrals/referrals_responses/manager-referrals-fetch-referrals.response.dto';
import { ManagerReferralsQueryDto } from '@/backend_manager/manager_modules/referrals/referrals_dtos/manager-referrals-query.dto';
import { ManagerReferralsFindReferralKPIsService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-find-referral-k-p-is.service';
import { ManagerReferralsFindReferralsService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-find-referrals.service';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerReferralsQueryController {
  constructor(private readonly fetchReferralKPIsService: ManagerReferralsFindReferralKPIsService, private readonly fetchReferralsService: ManagerReferralsFindReferralsService) {}

  // SLA: FAST
  @Get("referrals/kpis")
  @ApiOperation({ summary: 'findReferralKPIs for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerReferralsFetchReferralKPIsResponseDto })
  findReferralKPIs(@Query() query: ManagerReferralsQueryDto): ReturnType<ManagerReferralsFindReferralKPIsService['findReferralKPIs']> { return this.fetchReferralKPIsService.findReferralKPIs(query); }


  // SLA: STANDARD
  @Get("referrals")
  @ApiOperation({ summary: 'findReferrals for Manager referrals' })
  @ApiResponse({ status: HttpStatus.OK, type: [ManagerReferralsFetchReferralsResponseDto] })
  findReferrals(@Query() query: ManagerReferralsQueryDto): ReturnType<ManagerReferralsFindReferralsService['findReferrals']> { return this.fetchReferralsService.findReferrals(query); }


}

export { ManagerReferralsQueryController as ReferralsQueryController };
