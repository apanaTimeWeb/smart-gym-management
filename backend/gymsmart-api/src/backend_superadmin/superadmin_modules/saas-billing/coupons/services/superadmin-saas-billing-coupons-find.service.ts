// RESPONSIBILITY: Executes single-record retrieval for the coupons feature.
// FLOW: QueryController -> SuperadminCouponsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.mapper';
import type { SuperadminCouponsDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';
@Injectable()
export class SuperadminCouponsFindService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Retrieves one active coupons record by UUID. */
  async findCouponsById(id: string): Promise<SuperadminCouponsDomainModel> { return SuperadminCouponsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}