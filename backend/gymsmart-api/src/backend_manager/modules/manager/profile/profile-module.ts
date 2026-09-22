// RESPONSIBILITY: Registers the isolated Manager profile feature boundary.
// FLOW: ManagerDomainModule -> ProfileModule -> controllers -> use cases -> repository.
import { Module } from '@nestjs/common';

import { ProfileCommandController } from '@/modules/manager/profile/profile-command.controller';
import { ProfileFetchProfileService } from '@/modules/manager/profile/services/profile-fetch-profile.service';
import { ProfileOrchestratorService } from '@/modules/manager/profile/services/profile-orchestrator.service';
import { ProfileQueryController } from '@/modules/manager/profile/profile-query.controller';
import { ProfileRepository } from '@/modules/manager/profile/repositories/profile-repository';
import { ProfileUpdatePasswordService } from '@/modules/manager/profile/services/profile-update-password.service';
import { ProfileUpdateProfileService } from '@/modules/manager/profile/services/profile-update-profile.service';

@Module({
  controllers: [ProfileQueryController, ProfileCommandController],
  providers: [ProfileUpdateProfileService, ProfileUpdatePasswordService, ProfileFetchProfileService, ProfileRepository, ProfileOrchestratorService],
  exports: [ProfileRepository],
})
export class ProfileModule {}
