import { CoreNotFoundException } from '@/backend_manager/core/exceptions/core-not-found.exception';
// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ProfileRepository } from '@/backend_manager/modules/backend_manager/profile/repositories/profile-repository';

import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';

@Injectable()
export class ProfileFetchProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  /** @description Loads the profile collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchProfile(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findProfileList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    if (!rows[0]) throw new CoreNotFoundException('profile', 'current');
    return rows[0];
  }
}
