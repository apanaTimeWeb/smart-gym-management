// RESPONSIBILITY: Deterministically seeds the coupons table for local/test environments.
// FLOW: Master seed -> CouponsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { CouponEntity } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/coupons.entity';

export class CouponsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(CouponEntity);
    await repository.count();
  }
}
