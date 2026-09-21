// RESPONSIBILITY: Owns read-side use cases for Admin permissions; no write persistence occurs here.
// FLOW: AdminPermissionsQueryController → AdminPermissionsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminPermissionsRepository } from '@/backend_admin/modules/admin/permissions/repositories/admin-permissions-repository';
import { AdminPermissionsMapper } from '@/backend_admin/modules/admin/permissions/mappers/admin-permissions.mapper';
import { AdminPermissionsQueryDto } from '@/backend_admin/modules/admin/permissions/dtos/admin-permissions-query.dto';
import { AdminPermissionsDataDto } from '@/backend_admin/modules/admin/permissions/dtos/admin-permissions-response.dto';

@Injectable()
export class AdminPermissionsQueryService {
  constructor(
    private readonly repository: AdminPermissionsRepository,
    private readonly mapper: AdminPermissionsMapper,
  ) {}


  /** @description Executes fetchPermissions for the Admin permissions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPermissions(_query?: AdminPermissionsQueryDto): Promise<AdminPermissionsDataDto> {
    const result = await this.repository.findFirstSnapshot(); 
    return (result ? this.mapper.toResponse(this.mapper.toDomain(result)) : {}) as AdminPermissionsDataDto;
  }
}
