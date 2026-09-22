// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/profile.
// FLOW: Controller DTO -> ProfileUpdateProfileService -> ProfileOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { ProfileOrchestratorService } from '@/modules/manager/profile/services/profile-orchestrator.service';

@Injectable()
export class ProfileUpdateProfileService {
  constructor(private readonly orchestrator: ProfileOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async updateProfile(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateProfileById(data, id);
  }
}
