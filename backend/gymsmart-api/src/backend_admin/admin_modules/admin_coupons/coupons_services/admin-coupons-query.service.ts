// RESPONSIBILITY: Owns read-side use cases for Admin coupons; no write persistence occurs here.
// FLOW: AdminCouponsQueryController â†’ AdminCouponsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminCouponsQueryDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-query.dto.js';
import { AdminCouponDto, AdminCouponsKPIDataDto } from '@/backend_admin/admin_modules/admin_coupons/coupons_dtos/admin-coupons-response.dto.js';
import { AdminCouponsResponsePresenter } from '@/backend_admin/admin_modules/admin_coupons/coupons_mappers/admin-coupons.response.presenter.js';
import { AdminCouponsRepository } from '@/backend_admin/admin_modules/admin_coupons/coupons_repositories/admin-coupons-repository.js';

import type { AdminCorePaginatedResult } from '@/backend_admin/admin_core/admin_core_types/admin-core-api-response.types.js';

@Injectable()
/**
 * @description Defines the AdminCouponsQueryService boundary for the admin_coupons backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCouponsQueryService {
  constructor(
    private readonly repository: AdminCouponsRepository,
    private readonly presenter: AdminCouponsResponsePresenter,
  ) {}

  /** @description Executes fetchCoupons for the Admin coupons feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findAllCoupons(query: AdminCouponsQueryDto): Promise<AdminCorePaginatedResult<AdminCouponDto>> {
    const result = await this.repository.findAll(query);
    return { items: (result.items.map((entity) => this.presenter.toResponse(entity))) as any, meta: result.meta };
  }
  /** @description Returns the persisted KPI snapshot required by the Admin coupons dashboard. @returns KPI data object. */
  async findCouponKpis(query: AdminCouponsQueryDto): Promise<AdminCouponsKPIDataDto> {
    const snapshot = await this.repository.findLatestReadModel(query);
    if (!snapshot) throw new NotFoundException('COUPONS.READ_MODEL.NOT_FOUND');
    return this.presenter.toKpiResponse(snapshot);
  }

}
