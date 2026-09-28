// RESPONSIBILITY: Owns the HTTP boundary for the profile command side.
// FLOW: HTTP request → TrainerProfileCommandController → feature service → canonical response interceptor.

import { TrainerProfileResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-response.dto';
import { Body, Patch, Controller, HttpStatus } from '@nestjs/common'; import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerProfileTrainerProfileUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_services/trainer-profile-trainer-profile-update.service'; import { TrainerProfileTrainerPasswordChangeService } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_services/trainer-profile-trainer-password-change.service'; import { TrainerProfileUpdateTrainerProfileDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-update-trainer-profile.dto'; import { TrainerProfileChangePasswordDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-change-password.dto';

/**
 * Intent: Defines the TrainerProfileCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/profile')
@ApiTags('trainer/profile')
export class TrainerProfileCommandController {
  constructor(private readonly profile:TrainerProfileTrainerProfileUpdateService,private readonly password:TrainerProfileTrainerPasswordChangeService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({summary:'Update Trainer profile'}) @ApiBody({type:TrainerProfileUpdateTrainerProfileDto}) @Patch() @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, type: TrainerProfileResponseDto }) /** Updates trainer profile fields. */ async update(@Body() dto:TrainerProfileUpdateTrainerProfileDto){return this.profile.update(dto);}
// SLA: STANDARD
@ApiOperation({summary:'Change Trainer password'}) @ApiBody({type:TrainerProfileChangePasswordDto}) @Patch('password') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Changes the authenticated trainer password. */ async changePassword(@Body() dto:TrainerProfileChangePasswordDto){return this.password.change(dto);}
}
