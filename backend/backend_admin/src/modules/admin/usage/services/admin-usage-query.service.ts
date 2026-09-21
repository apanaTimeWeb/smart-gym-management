// RESPONSIBILITY: Owns read-side use cases for Admin usage; no write persistence occurs here.
// FLOW: AdminUsageQueryController → AdminUsageQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminUsageRepository } from '@/modules/admin/usage/repositories/admin-usage-repository';
import { AdminUsageMapper } from '@/modules/admin/usage/mappers/admin-usage.mapper';
import { AdminUsageQueryDto } from '@/modules/admin/usage/dtos/admin-usage-query.dto';
import { AdminUsageDataDto } from '@/modules/admin/usage/dtos/admin-usage-response.dto';

@Injectable()
export class AdminUsageQueryService {
  constructor(
    private readonly repository: AdminUsageRepository,
    private readonly mapper: AdminUsageMapper,
  ) {}


  /** @description Executes fetchUsage for the Admin usage feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchUsage(query: AdminUsageQueryDto): Promise<AdminUsageDataDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {}) as AdminUsageDataDto;
  }

  /** @description Executes fetchPlans for the Admin usage feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchPlans(query: AdminUsageQueryDto): Promise<unknown> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? snapshot.payload.plans ?? [] : [];
  }
}
