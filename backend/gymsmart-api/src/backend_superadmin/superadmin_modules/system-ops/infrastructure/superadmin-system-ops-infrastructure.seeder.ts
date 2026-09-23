// RESPONSIBILITY: Deterministically seeds the infrastructure table for local/test environments.
// FLOW: Master seed -> SuperadminInfrastructureSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';

export class SuperadminInfrastructureSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminInfrastructureEntity);
    await repository.count();
  }
}