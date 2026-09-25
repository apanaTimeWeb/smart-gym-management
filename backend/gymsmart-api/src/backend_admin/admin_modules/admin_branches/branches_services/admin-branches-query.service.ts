// RESPONSIBILITY: Owns read-side use cases for Admin branches; no write persistence occurs here.
// FLOW: AdminBranchesQueryController â†’ AdminBranchesQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';

import { AdminBranchesQueryDto } from '@/backend_admin/admin_modules/admin_branches/branches_dtos/admin-branches-query.dto'
import { AdminBranchDto } from '@/backend_admin/admin_modules/admin_branches/branches_dtos/admin-branches-response.dto'
import { AdminBranchesResponsePresenter } from '@/backend_admin/admin_modules/admin_branches/branches_mappers/admin-branches.response.presenter'
import { AdminBranchesRepository } from '@/backend_admin/admin_modules/admin_branches/branches_repositories/admin-branches-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminBranchesQueryService boundary for the admin_branches backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBranchesQueryService {
  constructor(
    private readonly repository: AdminBranchesRepository,
    private readonly presenter: AdminBranchesResponsePresenter,
  ) {}

  /** @description Executes fetchBranches for the Admin branches feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllBranches(query: AdminBranchesQueryDto): Promise<AdminCorePaginatedResult<AdminBranchDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes findById for the Admin branches feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findById(id: string): Promise<AdminBranchDto | null> {
    const entity = await this.repository.findByIdOrThrow(id); 
    return this.presenter.toResponse(entity as any) as any;
  }
}
