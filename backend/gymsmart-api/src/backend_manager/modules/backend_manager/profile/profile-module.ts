// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ProfileCommandController } from '@/backend_manager/modules/backend_manager/profile/profile-command.controller';
import { ProfileQueryController } from '@/backend_manager/modules/backend_manager/profile/profile-query.controller';
import { ProfileRepository } from '@/backend_manager/modules/backend_manager/profile/repositories/profile-repository';
import { ProfileFetchProfileService } from '@/backend_manager/modules/backend_manager/profile/services/profile-fetch-profile.service';
import { ProfileOrchestratorService } from '@/backend_manager/modules/backend_manager/profile/services/profile-orchestrator.service';
import { ProfileUpdatePasswordService } from '@/backend_manager/modules/backend_manager/profile/services/profile-update-password.service';
import { ProfileUpdateProfileService } from '@/backend_manager/modules/backend_manager/profile/services/profile-update-profile.service';

@Module({
  controllers: [ProfileQueryController, ProfileCommandController],
  providers: [ProfileUpdateProfileService, ProfileUpdatePasswordService, ProfileFetchProfileService, ProfileRepository, ProfileOrchestratorService],
  exports: [ProfileRepository],
})
export class ProfileModule {}
