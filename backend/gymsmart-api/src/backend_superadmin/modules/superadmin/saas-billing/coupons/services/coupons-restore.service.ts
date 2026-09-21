// RESPONSIBILITY: Restores one soft-deleted coupon through the owning repository.
// FLOW: Controller -> CouponsRestoreService -> CouponsRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.repository';
@Injectable()
export class CouponsRestoreService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Restores the selected coupon without a hard DELETE. */
  async restoreCoupon(id: string): Promise<unknown> { return this.repository.restoreCouponsById(id); }
}
