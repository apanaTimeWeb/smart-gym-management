// RESPONSIBILITY: Executes the soft-delete flow for the coupons feature.
// FLOW: CommandController -> SuperadminCouponsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminCouponsRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.repository';
@Injectable()
export class SuperadminCouponsDeleteService {
  constructor(private readonly repository: SuperadminCouponsRepository) {}
  /** Soft-deletes one coupons record. */
  async deleteCoupons(id: string): Promise<null> { await this.repository.deleteCouponsById(id); return null; }
}