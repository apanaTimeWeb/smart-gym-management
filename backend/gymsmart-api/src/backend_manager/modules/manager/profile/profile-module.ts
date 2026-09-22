// RESPONSIBILITY: Registers the isolated Manager profile feature boundary.
// FLOW: ManagerDomainModule -> ProfileModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ProfileCommandController } from '@/backend_manager/modules/manager/profile/profile-command.controller';
import { ProfileFetchProfileService } from '@/backend_manager/modules/manager/profile/services/profile-fetch-profile.service';
import { ProfileOrchestratorService } from '@/backend_manager/modules/manager/profile/services/profile-orchestrator.service';
import { ProfileQueryController } from '@/backend_manager/modules/manager/profile/profile-query.controller';
import { ProfileRepository } from '@/backend_manager/modules/manager/profile/repositories/profile-repository';
import { ProfileUpdatePasswordService } from '@/backend_manager/modules/manager/profile/services/profile-update-password.service';
import { ProfileUpdateProfileService } from '@/backend_manager/modules/manager/profile/services/profile-update-profile.service';

@Module({
  controllers: [ProfileQueryController, ProfileCommandController],
  providers: [ProfileUpdateProfileService, ProfileUpdatePasswordService, ProfileFetchProfileService, ProfileRepository, ProfileOrchestratorService],
  exports: [ProfileRepository],
})
export class ProfileModule {}
