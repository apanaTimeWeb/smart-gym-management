// RESPONSIBILITY: Owns read-side use cases for Admin coupons; no write persistence occurs here.
// FLOW: AdminCouponsQueryController → AdminCouponsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminCouponsRepository } from '@/modules/admin/coupons/repositories/admin-coupons-repository';
import { AdminCouponsMapper } from '@/modules/admin/coupons/mappers/admin-coupons.mapper';
import { AdminCouponsQueryDto } from '@/modules/admin/coupons/dtos/admin-coupons-query.dto';

@Injectable()
export class AdminCouponsQueryService {
  constructor(
    private readonly repository: AdminCouponsRepository,
    private readonly mapper: AdminCouponsMapper,
  ) {}


  /** @description Executes fetchCoupons for the Admin coupons feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchCoupons(query: AdminCouponsQueryDto): Promise<Record<string, unknown>[]> {
    const result = await this.repository.findAll(query); return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity)));
  }
  /** @description Returns the persisted KPI snapshot required by the Admin coupons dashboard. @returns KPI data object. */
  async fetchKPIs(): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot();
    return snapshot ? (snapshot.payload as Record<string, unknown>) : {};
  }

}
