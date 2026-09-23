// RESPONSIBILITY: Returns redemption records associated with one coupon.
// FLOW: Controller -> SuperadminCouponsRedemptionsService -> SuperadminCouponsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
@Injectable()
export class SuperadminCouponsRedemptionsService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Returns the active redemption projection for one coupon. */
  async findCouponsRedemptions(id: string): Promise<unknown> { return this.repository.findRedemptionsByCouponId(id); }
}