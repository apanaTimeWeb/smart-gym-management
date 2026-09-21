// RESPONSIBILITY: Owns read-side use cases for Admin profile; no write persistence occurs here.
// FLOW: AdminProfileQueryController → AdminProfileQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminProfileRepository } from '@/backend_admin/modules/admin/profile/repositories/admin-profile-repository';
import { AdminProfileMapper } from '@/backend_admin/modules/admin/profile/mappers/admin-profile.mapper';
import { AdminProfileQueryDto } from '@/backend_admin/modules/admin/profile/dtos/admin-profile-query.dto';
import { AdminProfileDto } from '@/backend_admin/modules/admin/profile/dtos/admin-profile-response.dto';

@Injectable()
export class AdminProfileQueryService {
  constructor(
    private readonly repository: AdminProfileRepository,
    private readonly mapper: AdminProfileMapper,
  ) {}


  /** @description Executes fetchProfile for the Admin profile feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchProfile(query: AdminProfileQueryDto): Promise<AdminProfileDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {}) as AdminProfileDto;
  }
}
