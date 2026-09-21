// RESPONSIBILITY: Executes partial update business flow for the coupons feature.
// FLOW: CommandController -> CouponsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/modules/superadmin/saas-billing/coupons/coupons.repository';
import { CouponsMapper } from '@/modules/superadmin/saas-billing/coupons/coupons.mapper';
import type { CouponsDomainModel, CouponsUpdateInput } from '@/modules/superadmin/saas-billing/coupons/types/coupons.interfaces';
@Injectable()
export class CouponsUpdateService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Updates a coupons record by UUID. */
  async updateCoupons(id: string, input: CouponsUpdateInput): Promise<CouponsDomainModel> { return CouponsMapper.toDomain(await this.repository.updateCouponsById(id, input)); }
}
