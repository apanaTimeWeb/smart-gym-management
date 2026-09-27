// RESPONSIBILITY: Owns the backend application module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';
import { ManagerProfileMutationService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-mutation.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerProfileAuthorizationService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-authorization.service';

import { ManagerProfileCommandController } from '@/backend_manager/manager_modules/profile/manager-profile-command.controller';
import { ManagerProfileQueryController } from '@/backend_manager/manager_modules/profile/manager-profile-query.controller';
import { ManagerProfileRepository } from '@/backend_manager/manager_modules/profile/manager-profile.repository';
import { ManagerProfileFindProfileService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-find-profile.service';
import { ManagerProfileOrchestratorService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-orchestrator.service';
import { ManagerProfileUpdatePasswordService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-update-password.service';
import { ManagerProfileUpdateProfileService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-update-profile.service';

@Module({
  controllers: [ManagerProfileQueryController, ManagerProfileCommandController],
  providers: [ManagerProfileMutationService, ManagerProfileUpdateProfileService, ManagerProfileUpdatePasswordService, ManagerProfileFindProfileService, ManagerProfileRepository, ManagerProfileOrchestratorService,
  ManagerProfileAuthorizationService,
  { provide: `CORE_RESOURCE_AUTHORIZER:profile`, useFactory: (authorization: ManagerProfileAuthorizationService, registry: ManagerCoreResourceAuthorizationRegistry) => { registry.register('profile', authorization); return authorization; }, inject: [ManagerProfileAuthorizationService, ManagerCoreResourceAuthorizationRegistry] },
  ],
  exports: [ManagerProfileRepository],
})
export class ManagerProfileModule {}

export { ManagerProfileModule as ProfileModule };
