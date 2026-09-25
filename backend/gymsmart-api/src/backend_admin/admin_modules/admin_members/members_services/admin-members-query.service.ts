// RESPONSIBILITY: Owns read-side use cases for Admin members; no write persistence occurs here.
// FLOW: AdminMembersQueryController â†’ AdminMembersQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable, NotFoundException } from '@nestjs/common';

import { AdminMembersQueryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-query.dto'
import { AdminMemberDto, AdminMembersSummaryDto } from '@/backend_admin/admin_modules/admin_members/members_dtos/admin-members-response.dto'
import { AdminMembersResponsePresenter } from '@/backend_admin/admin_modules/admin_members/members_mappers/admin-members.response.presenter'
import { AdminMembersRepository } from '@/backend_admin/admin_modules/admin_members/members_repositories/admin-members-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminMembersQueryService boundary for the admin_members backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminMembersQueryService {
  constructor(
    private readonly repository: AdminMembersRepository,
    private readonly presenter: AdminMembersResponsePresenter,
  ) {}

  /** @description Executes listMembers for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllMembers(query: AdminMembersQueryDto): Promise<AdminCorePaginatedResult<AdminMemberDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))), meta: result.meta };
  }

  /** @description Executes fetchSummary for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findMembersSummary(_query?: AdminMembersQueryDto): Promise<AdminMembersSummaryDto> {
    const result = await this.repository.findSummary(_query);
    return this.presenter.toSummaryResponse(result);
  }

  /** @description Executes findMemberById for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findMemberById(id: string): Promise<AdminMemberDto> {
    const entity = await this.repository.findByIdOrThrow(id); return this.presenter.toResponse(entity);
  }

  /** @description Executes exportMembers for the Admin members feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findMembersExport(query?: AdminMembersQueryDto): Promise<string> {
    const rows = await this.repository.exportAllMatching(query ?? ({} as AdminMembersQueryDto));
    return this.presenter.toCsvRows(rows);
  }
}
