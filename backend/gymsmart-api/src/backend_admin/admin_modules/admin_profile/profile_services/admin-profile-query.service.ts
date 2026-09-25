// RESPONSIBILITY: Owns read-side use cases for Admin profile; no write persistence occurs here.
// FLOW: AdminProfileQueryController â†’ AdminProfileQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminProfileQueryDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-query.dto.js';
import { AdminProfileDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-response.dto.js';
import { AdminProfileResponsePresenter } from '@/backend_admin/admin_modules/admin_profile/profile_mappers/admin-profile.response.presenter.js';
import { AdminProfileRepository } from '@/backend_admin/admin_modules/admin_profile/profile_repositories/admin-profile-repository.js';

@Injectable()
/**
 * @description Defines the AdminProfileQueryService boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileQueryService {
  constructor(
    private readonly repository: AdminProfileRepository,
    private readonly presenter: AdminProfileResponsePresenter,
  ) {}

  /** @description Executes fetchProfile for the Admin profile feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findProfile(query: AdminProfileQueryDto): Promise<AdminProfileDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as any;
  }
}
