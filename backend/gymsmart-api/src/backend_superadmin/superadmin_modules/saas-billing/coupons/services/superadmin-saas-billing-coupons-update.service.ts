// RESPONSIBILITY: Executes partial update business flow for the coupons feature.
// FLOW: CommandController -> SuperadminCouponsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.mapper';
import type { SuperadminCouponsDomainModel, SuperadminCouponsUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';
@Injectable()
export class SuperadminCouponsUpdateService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Updates a coupons record by UUID. */
  async updateCoupons(id: string, input: SuperadminCouponsUpdateInput): Promise<SuperadminCouponsDomainModel> { return SuperadminCouponsMapper.toDomain(await this.repository.updateCouponsById(id, input)); }
}