// RESPONSIBILITY: Owns the HTTP boundary for the profile query side.
// FLOW: HTTP request → TrainerProfileQueryController → feature service → canonical response interceptor.

import { TrainerProfileResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_dtos/trainer-profile-response.dto';
import { Get, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerProfileTrainerProfileReadService } from '@/backend_trainer/backend_trainer_modules/trainer_profile/profile_services/trainer-profile-trainer-profile-read.service';

/**
 * Intent: Defines the TrainerProfileQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/profile')
@ApiTags('trainer/profile')
export class TrainerProfileQueryController {
  constructor(private readonly service:TrainerProfileTrainerProfileReadService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-profile-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerProfileResponseDto }) /** Returns the complete trainer profile. */ async getProfile(){return this.service.find();}
}