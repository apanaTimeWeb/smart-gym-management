// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { ReferralsClaimRewardRequestDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-claim-reward.request.dto';
import { ReferralsClaimRewardResponseDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-claim-reward.response.dto';
import { ReferralsCreateReferralRequestDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-create-referral.request.dto';
import { ReferralsCreateReferralResponseDto } from '@/backend_manager/modules/backend_manager/referrals/dtos/referrals-create-referral.response.dto';
import { ReferralsClaimRewardService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-claim-reward.service';
import { ReferralsCreateReferralService } from '@/backend_manager/modules/backend_manager/referrals/services/referrals-create-referral.service';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(CoreRole.MANAGER)
export class ReferralsCommandController {
  constructor(private readonly createReferralService: ReferralsCreateReferralService, private readonly claimRewardService: ReferralsClaimRewardService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("referrals")
  @ApiOperation({ summary: 'createReferral for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReferralsCreateReferralResponseDto })
  createReferral(@Body() dto: ReferralsCreateReferralRequestDto): ReturnType<ReferralsCreateReferralService['createReferral']> { return this.createReferralService.createReferral(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("referrals/:referralId/claim")
  @ApiOperation({ summary: 'claimReward for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'referralId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ReferralsClaimRewardResponseDto })
  claimReward(@Param('referralId') referralId: string, @Body() dto: ReferralsClaimRewardRequestDto): ReturnType<ReferralsClaimRewardService['claimReward']> { return this.claimRewardService.claimReward(dto as any, referralId); }


}
