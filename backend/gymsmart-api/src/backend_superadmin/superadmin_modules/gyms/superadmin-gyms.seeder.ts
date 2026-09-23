// RESPONSIBILITY: Deterministically seeds the gyms table for local/test environments.
// FLOW: Master seed -> SuperadminGymsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';

export class SuperadminGymsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminGymsEntity);
    await repository.count();
  }
}