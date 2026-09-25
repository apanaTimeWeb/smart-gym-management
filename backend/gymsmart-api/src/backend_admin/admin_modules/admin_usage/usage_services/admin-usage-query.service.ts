// RESPONSIBILITY: Owns read-side use cases for Admin usage; no write persistence occurs here.
// FLOW: AdminUsageQueryController â†’ AdminUsageQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminUsageQueryDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-query.dto'
import { AdminUsageDataDto } from '@/backend_admin/admin_modules/admin_usage/usage_dtos/admin-usage-response.dto'
import { AdminUsageResponsePresenter } from '@/backend_admin/admin_modules/admin_usage/usage_mappers/admin-usage.response.presenter'
import { AdminUsageRepository } from '@/backend_admin/admin_modules/admin_usage/usage_repositories/admin-usage-repository'

@Injectable()
/**
 * @description Defines the AdminUsageQueryService boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageQueryService {
  constructor(
    private readonly repository: AdminUsageRepository,
    private readonly presenter: AdminUsageResponsePresenter,
  ) {}

  /** @description Executes fetchUsage for the Admin usage feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findUsage(query: AdminUsageQueryDto): Promise<AdminUsageDataDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as unknown as AdminUsageDataDto;
  }

  /** @description Executes fetchPlans for the Admin usage feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPlans(query: AdminUsageQueryDto): Promise<Array<{ id: string; name: string; tier: string; currency: string; monthlyPrice: number }>> {
    const snapshot = await this.repository.findLatestSnapshot(query);
    if (!snapshot) return [];
    return this.presenter.toPlanOptions(snapshot) as any;
  }
}
