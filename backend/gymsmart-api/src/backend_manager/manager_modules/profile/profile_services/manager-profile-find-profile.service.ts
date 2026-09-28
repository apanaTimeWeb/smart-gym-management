// RESPONSIBILITY: Fetches the authenticated Manager profile through the profile query boundary.
// FLOW: HTTP query -> profile service -> feature repository -> typed profile response.
import { ManagerCoreNotFoundException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-not-found.exception';
// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { ProfileRepository } from '@/backend_manager/manager_modules/profile/manager-profile.repository';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';

export interface ManagerProfileFindProfileServiceFindProfileResult extends ManagerCoreJsonObject {}

@Injectable()
export class ManagerProfileFindProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  /** @description Loads the profile collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async findProfile(query: ManagerCoreJsonObject = {}): Promise<ManagerProfileFindProfileServiceFindProfileResult> {
    const result = await this.repository.findAll(query);
    const rows = result.data.map((row: any) => ({ id: row.id, ...row.payload }));
    if (!rows[0]) throw new ManagerCoreNotFoundException('profile', 'current');
    return rows[0];
  }
}

export { ManagerProfileFindProfileService as ProfileFindProfileService };
