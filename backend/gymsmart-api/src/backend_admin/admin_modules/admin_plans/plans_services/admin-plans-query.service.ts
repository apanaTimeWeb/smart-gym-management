// RESPONSIBILITY: Owns read-side use cases for Admin plans; no write persistence occurs here.
// FLOW: AdminPlansQueryController â†’ AdminPlansQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';

import { AdminPlansQueryDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-query.dto'
import { AdminPlanDto, AdminPlanRevenueRecordDto } from '@/backend_admin/admin_modules/admin_plans/plans_dtos/admin-plans-response.dto'
import { AdminPlansResponsePresenter } from '@/backend_admin/admin_modules/admin_plans/plans_mappers/admin-plans.response.presenter'
import { AdminPlansRepository } from '@/backend_admin/admin_modules/admin_plans/plans_repositories/admin-plans-repository'

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types'

@Injectable()
/**
 * @description Defines the AdminPlansQueryService boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansQueryService {
  constructor(
    private readonly repository: AdminPlansRepository,
    private readonly presenter: AdminPlansResponsePresenter,
  ) {}

  /** @description Executes fetchAllPlans for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllPlans(query: AdminPlansQueryDto): Promise<AdminCorePaginatedResult<AdminPlanDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }

  /** @description Executes fetchPlanById for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPlanById(id: string): Promise<AdminPlanDto> {
    const entity = await this.repository.findByIdOrThrow(id); return this.presenter.toResponse(entity) as any;
  }

  /** @description Executes fetchPlanRevenue for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findPlanRevenue(query: AdminPlansQueryDto): Promise<AdminPlanRevenueRecordDto[]> {
    const result = await this.repository.findAll(query);
    return result.items.flatMap((entity) => this.presenter.toRevenueRecords(entity));
  }
}
