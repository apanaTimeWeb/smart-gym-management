// RESPONSIBILITY: Owns read-side use cases for Admin blacklist; no write persistence occurs here.
// FLOW: AdminBlacklistQueryController â†’ AdminBlacklistQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminBlacklistQueryDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-query.dto'
import { AdminBlacklistedMemberDto, AdminBlacklistKPIDataDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto'
import { AdminBlacklistResponsePresenter } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_mappers/admin-blacklist.response.presenter'
import { AdminBlacklistRepository } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_repositories/admin-blacklist-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminBlacklistQueryService boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistQueryService {
  constructor(
    private readonly repository: AdminBlacklistRepository,
    private readonly presenter: AdminBlacklistResponsePresenter,
  ) {}

  /** @description Executes fetchBlacklist for the Admin blacklist feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllBlacklist(query: AdminBlacklistQueryDto): Promise<AdminCorePaginatedResult<AdminBlacklistedMemberDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchKPIs for the Admin blacklist feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findBlacklistKpis(query: AdminBlacklistQueryDto): Promise<AdminBlacklistKPIDataDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toKpiResponse(snapshot);
  }
}
