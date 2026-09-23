// RESPONSIBILITY: Executes single-record retrieval for the coupons feature.
// FLOW: QueryController -> CouponsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.repository';
import { CouponsMapper } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/coupons.mapper';
import type { CouponsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/coupons/types/coupons.interfaces';
@Injectable()
export class CouponsFindService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Retrieves one active coupons record by UUID. */
  async findCouponsById(id: string): Promise<CouponsDomainModel> { return CouponsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}