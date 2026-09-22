// RESPONSIBILITY: Owns the Manager referrals command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { ReferralsClaimRewardRequestDto } from '@/modules/manager/referrals/dtos/referrals-claim-reward.request.dto';
import { ReferralsClaimRewardResponseDto } from '@/modules/manager/referrals/dtos/referrals-claim-reward.response.dto';
import { ReferralsClaimRewardService } from '@/modules/manager/referrals/services/referrals-claim-reward.service';
import { ReferralsCreateReferralRequestDto } from '@/modules/manager/referrals/dtos/referrals-create-referral.request.dto';
import { ReferralsCreateReferralResponseDto } from '@/modules/manager/referrals/dtos/referrals-create-referral.response.dto';
import { ReferralsCreateReferralService } from '@/modules/manager/referrals/services/referrals-create-referral.service';
import { ReferralsQueryDto } from '@/modules/manager/referrals/dtos/referrals-query.dto';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(CoreRole.MANAGER)
export class ReferralsCommandController {
  constructor(private readonly createReferralService: ReferralsCreateReferralService, private readonly claimRewardService: ReferralsClaimRewardService) {}

  // SLA: STANDARD
  @Post("referrals")
  @ApiOperation({ summary: 'createReferral for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReferralsCreateReferralResponseDto })
  createReferral(@Body() dto: ReferralsCreateReferralRequestDto): Promise<ReferralsCreateReferralResponseDto> {  return this.createReferralService.createReferral(dto) as Promise<ReferralsCreateReferralResponseDto>;  }


  // SLA: STANDARD
  @Post("referrals/:referralId/claim")
  @ApiOperation({ summary: 'claimReward for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'referralId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReferralsClaimRewardResponseDto })
  claimReward(@Param('referralId') referralId: string, @Body() dto: ReferralsClaimRewardRequestDto): Promise<ReferralsClaimRewardResponseDto> {  return this.claimRewardService.claimReward(dto, referralId) as Promise<ReferralsClaimRewardResponseDto>;  }


}
