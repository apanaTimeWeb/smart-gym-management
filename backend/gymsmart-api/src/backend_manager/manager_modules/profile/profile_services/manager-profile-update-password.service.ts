// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ProfileOrchestratorService } from '@/backend_manager/manager_modules/profile/profile_services/manager-profile-orchestrator.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

@Injectable()
export class ManagerProfileUpdatePasswordService {
  constructor(private readonly orchestrator: ProfileOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updatePassword(data: ManagerCoreJsonObject, id?: string): ReturnType<ProfileOrchestratorService['updateProfile']> {
    return this.orchestrator.updateProfile(data, id);
  }
}

export { ManagerProfileUpdatePasswordService as ProfileUpdatePasswordService };
