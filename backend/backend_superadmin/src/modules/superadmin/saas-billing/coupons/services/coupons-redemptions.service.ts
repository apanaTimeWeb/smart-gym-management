// RESPONSIBILITY: Returns redemption records associated with one coupon.
// FLOW: Controller -> CouponsRedemptionsService -> CouponsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/modules/superadmin/saas-billing/coupons/coupons.repository';
@Injectable()
export class CouponsRedemptionsService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Returns the active redemption projection for one coupon. */
  async findCouponsRedemptions(id: string): Promise<unknown> { return this.repository.findRedemptionsByCouponId(id); }
}
