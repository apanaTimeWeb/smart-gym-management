// RESPONSIBILITY: Owns read-side use cases for Admin plans; no write persistence occurs here.
// FLOW: AdminPlansQueryController → AdminPlansQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminPlansRepository } from '@/modules/admin/plans/repositories/admin-plans-repository';
import { AdminPlansMapper } from '@/modules/admin/plans/mappers/admin-plans.mapper';
import { AdminPlansQueryDto } from '@/modules/admin/plans/dtos/admin-plans-query.dto';
import { AdminPlanDto, AdminPlanRevenueRecordDto } from '@/modules/admin/plans/dtos/admin-plans-response.dto';

@Injectable()
export class AdminPlansQueryService {
  constructor(
    private readonly repository: AdminPlansRepository,
    private readonly mapper: AdminPlansMapper,
  ) {}


  /** @description Executes fetchAllPlans for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchAllPlans(query: AdminPlansQueryDto): Promise<AdminPlanDto[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)) as AdminPlanDto);
  }

  /** @description Executes fetchPlanById for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPlanById(id: string): Promise<AdminPlanDto> {
    const entity = await this.repository.findByIdOrThrow(id); return this.mapper.toResponse(this.mapper.toDomain(entity)) as AdminPlanDto;
  }

  /** @description Executes fetchPlanRevenue for the Admin plans feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPlanRevenue(_query?: AdminPlansQueryDto): Promise<AdminPlanRevenueRecordDto[]> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.revenue ?? []) as AdminPlanRevenueRecordDto[] : [];
  }
}
