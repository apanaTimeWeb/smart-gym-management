// RESPONSIBILITY: Executes creation business flow for the coupons feature.
// FLOW: CommandController -> CouponsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.repository';
import { CouponsMapper } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.mapper';
import type { CouponsCreateInput, CouponsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/types/coupons.interfaces';
@Injectable()
export class CouponsCreateService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Creates a new coupons record. */
  async createCoupons(input: CouponsCreateInput): Promise<CouponsDomainModel> { return CouponsMapper.toDomain(await this.repository.createCoupons(input)); }
}