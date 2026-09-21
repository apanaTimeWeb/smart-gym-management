// RESPONSIBILITY: Executes the soft-delete flow for the coupons feature.
// FLOW: CommandController -> CouponsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.repository';
@Injectable()
export class CouponsDeleteService {
  constructor(private readonly repository: CouponsRepository) {}
  /** Soft-deletes one coupons record. */
  async deleteCoupons(id: string): Promise<null> { await this.repository.deleteCouponsById(id); return null; }
}
