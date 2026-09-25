// RESPONSIBILITY: Owns read-side use cases for Admin permissions; no write persistence occurs here.
// FLOW: AdminPermissionsQueryController â†’ AdminPermissionsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminPermissionsQueryDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-query.dto.js';
import { AdminPermissionsDataDto } from '@/backend_admin/admin_modules/admin_permissions/permissions_dtos/admin-permissions-response.dto.js';
import { AdminPermissionsResponsePresenter } from '@/backend_admin/admin_modules/admin_permissions/permissions_mappers/admin-permissions.response.presenter.js';
import { AdminPermissionsRepository } from '@/backend_admin/admin_modules/admin_permissions/permissions_repositories/admin-permissions-repository.js';

@Injectable()
/**
 * @description Defines the AdminPermissionsQueryService boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPermissionsQueryService {
  constructor(
    private readonly repository: AdminPermissionsRepository,
    private readonly presenter: AdminPermissionsResponsePresenter,
  ) {}

  /** @description Executes fetchPermissions for the Admin permissions feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPermissions(_query?: AdminPermissionsQueryDto): Promise<AdminPermissionsDataDto> {
    const result = await this.repository.findLatestSnapshot(_query); 
    if (!result) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toResponse(result) as any;
  }
}
