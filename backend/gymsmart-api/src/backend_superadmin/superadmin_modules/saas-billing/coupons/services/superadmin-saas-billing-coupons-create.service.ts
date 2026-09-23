// RESPONSIBILITY: Executes creation business flow for the coupons feature.
// FLOW: CommandController -> SuperadminCouponsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.mapper';
import type { SuperadminCouponsCreateInput, SuperadminCouponsDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';
@Injectable()
export class SuperadminCouponsCreateService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Creates a new coupons record. */
  async createCoupons(input: SuperadminCouponsCreateInput): Promise<SuperadminCouponsDomainModel> { return SuperadminCouponsMapper.toDomain(await this.repository.createCoupons(input)); }
}