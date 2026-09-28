// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerReferralsClaimRewardRequestDto } from '@/backend_manager/manager_modules/referrals/referrals_dtos/manager-referrals-claim-reward.request.dto';
import { ManagerReferralsClaimRewardResponseDto } from '@/backend_manager/manager_modules/referrals/referrals_responses/manager-referrals-claim-reward.response.dto';
import { ManagerReferralsCreateReferralRequestDto } from '@/backend_manager/manager_modules/referrals/referrals_dtos/manager-referrals-create-referral.request.dto';
import { ManagerReferralsCreateReferralResponseDto } from '@/backend_manager/manager_modules/referrals/referrals_responses/manager-referrals-create-referral.response.dto';
import { ManagerReferralsClaimRewardService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-claim-reward.service';
import { ManagerReferralsCreateReferralService } from '@/backend_manager/manager_modules/referrals/referrals_services/manager-referrals-create-referral.service';

@Controller('manager')
@ApiTags('Manager referrals')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerReferralsCommandController {
  constructor(private readonly createReferralService: ManagerReferralsCreateReferralService, private readonly claimRewardService: ManagerReferralsClaimRewardService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("referrals")
  @ApiOperation({ summary: 'createReferral for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerReferralsCreateReferralResponseDto })
  createReferral(@Body() dto: ManagerReferralsCreateReferralRequestDto): ReturnType<ManagerReferralsCreateReferralService['createReferral']> { return this.createReferralService.createReferral(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("referrals/:referralId/claim")
  @ApiOperation({ summary: 'claimReward for Manager referrals' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'referralId', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerReferralsClaimRewardResponseDto })
  @ManagerCoreAuthorizeResourceParam('referralId')
  claimReward(@Param('referralId') referralId: string, @Body() dto: ManagerReferralsClaimRewardRequestDto): ReturnType<ManagerReferralsClaimRewardService['claimReward']> { return this.claimRewardService.claimReward(dto, referralId); }


}

export { ManagerReferralsCommandController as ReferralsCommandController };
