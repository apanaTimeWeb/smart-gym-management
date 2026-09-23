// RESPONSIBILITY: Performs status transitions for coupons records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
import { SuperadminCouponsMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.mapper';
import type { SuperadminCouponsDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/types/superadmin-saas-billing-coupons.interfaces';
@Injectable()
export class SuperadminCouponsStatusService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeCouponsStatus(id: string, status: string): Promise<SuperadminCouponsDomainModel> { return SuperadminCouponsMapper.toDomain(await this.repository.updateCouponsById(id, { status })); }
}