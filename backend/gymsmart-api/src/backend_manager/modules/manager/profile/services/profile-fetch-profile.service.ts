// @ts-nocheck
// RESPONSIBILITY: Read use-case for GET /api/v1/manager/profile.
// FLOW: Controller -> ProfileFetchProfileService -> repository query -> ORM-free domain -> response DTO.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { ProfileRepository } from '@/backend_manager/modules/manager/profile/repositories/profile-repository';

@Injectable()
export class ProfileFetchProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  /** @description Loads the profile collection for the requested Manager scope. @param query - Validated pagination/filter query. @returns Contract-compatible payload with canonical pagination metadata. */
  async fetchProfile(query: CoreJsonObject = {}): Promise<CoreJsonObject> {
    const result = await this.repository.findProfileList(query);
    const rows = result.data.map((row) => ({ id: row.id, ...row.payload }));
    return { data: rows[0]?.payload ?? {}, meta: result.meta };
  }
}
