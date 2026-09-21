// RESPONSIBILITY: Owns read-side use cases for Admin coupons; no write persistence occurs here.
// FLOW: AdminCouponsQueryController â†’ AdminCouponsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminCouponsRepository } from '@/backend_admin/modules/admin/coupons/repositories/admin-coupons-repository';
import { AdminCouponsMapper } from '@/backend_admin/modules/admin/coupons/mappers/admin-coupons.mapper';
import { AdminCouponsQueryDto } from '@/backend_admin/modules/admin/coupons/dtos/admin-coupons-query.dto';
import { AdminCouponDto, AdminCouponsKPIDataDto } from '@/backend_admin/modules/admin/coupons/dtos/admin-coupons-response.dto';

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
  async fetchCoupons(query: AdminCouponsQueryDto): Promise<AdminCouponDto[]> {
    const result = await this.repository.findAll(query); 
    return result.items.map((entity) => this.mapper.toResponse(this.mapper.toDomain(entity))) as AdminCouponDto[];
  }
  /** @description Returns the persisted KPI snapshot required by the Admin coupons dashboard. @returns KPI data object. */
  async fetchKPIs(): Promise<AdminCouponsKPIDataDto> {
    const snapshot = await this.repository.findFirstSnapshot();
    return snapshot ? (snapshot.payload as AdminCouponsKPIDataDto) : {} as AdminCouponsKPIDataDto;
  }

}
