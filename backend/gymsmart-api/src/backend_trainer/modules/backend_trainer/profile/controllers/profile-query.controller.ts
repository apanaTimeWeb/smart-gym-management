// RESPONSIBILITY: Owns the HTTP boundary for the profile query side.
// FLOW: HTTP request → ProfileQueryController → feature service → canonical response interceptor.

import { Get, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { ProfileTrainerProfileReadService } from '@/backend_trainer/modules/backend_trainer/profile/services/profile-trainer-profile-read.service';
@Controller('/trainer/profile')
@ApiTags('trainer/profile')
export class ProfileQueryController {
  constructor(private readonly service:ProfileTrainerProfileReadService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns the complete trainer profile. */ async getProfile(){return this.service.find();}
}