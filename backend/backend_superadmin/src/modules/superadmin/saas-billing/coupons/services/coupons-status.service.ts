// RESPONSIBILITY: Performs status transitions for coupons records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/modules/superadmin/saas-billing/coupons/coupons.repository';
import { CouponsMapper } from '@/modules/superadmin/saas-billing/coupons/coupons.mapper';
import type { CouponsDomainModel } from '@/modules/superadmin/saas-billing/coupons/types/coupons.interfaces';
@Injectable()
export class CouponsStatusService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeCouponsStatus(id: string, status: string): Promise<CouponsDomainModel> { return CouponsMapper.toDomain(await this.repository.updateCouponsById(id, { status })); }
}
