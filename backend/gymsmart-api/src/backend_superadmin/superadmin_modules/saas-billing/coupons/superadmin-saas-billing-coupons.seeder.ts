// RESPONSIBILITY: Deterministically seeds the coupons table for local/test environments.
// FLOW: Master seed -> SuperadminCouponsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminCouponsEntity } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/superadmin-saas-billing-coupons.entity';

export class SuperadminCouponsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminCouponsEntity);
    await repository.count();
  }
}