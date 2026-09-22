// RESPONSIBILITY: Owns the HTTP boundary for the profile command side.
// FLOW: HTTP request → ProfileCommandController → feature service → canonical response interceptor.

import { Body, Patch, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { ProfileTrainerProfileUpdateService } from '@/backend_trainer/modules/backend_trainer/profile/services/profile-trainer-profile-update.service'; import { ProfileTrainerPasswordChangeService } from '@/backend_trainer/modules/backend_trainer/profile/services/profile-trainer-password-change.service'; import { ProfileUpdateTrainerProfileDto } from '@/backend_trainer/modules/backend_trainer/profile/dtos/profile-update-trainer-profile.dto'; import { ProfileChangePasswordDto } from '@/backend_trainer/modules/backend_trainer/profile/dtos/profile-change-password.dto';
@Controller('/trainer/profile')
@ApiTags('trainer/profile')
export class ProfileCommandController {
  constructor(private readonly profile:ProfileTrainerProfileUpdateService,private readonly password:ProfileTrainerPasswordChangeService){}
// SLA: STANDARD
  // SLA: STANDARD
@Patch() @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates trainer profile fields. */ async update(@Body() dto:ProfileUpdateTrainerProfileDto){return this.profile.update(dto);}
// SLA: STANDARD
@Patch('password') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Changes the authenticated trainer password. */ async changePassword(@Body() dto:ProfileChangePasswordDto){return this.password.change(dto);}
}
