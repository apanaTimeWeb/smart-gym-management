// RESPONSIBILITY: Restores one soft-deleted coupon through the owning repository.
// FLOW: Controller -> SuperadminCouponsRestoreService -> SuperadminCouponsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
@Injectable()
export class SuperadminCouponsRestoreService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Restores the selected coupon without a hard DELETE. */
  async restoreCoupon(id: string): Promise<unknown> { return this.repository.restoreCouponsById(id); }
}