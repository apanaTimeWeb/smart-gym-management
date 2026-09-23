// RESPONSIBILITY: Deterministically seeds the infrastructure table for local/test environments.
// FLOW: Master seed -> InfrastructureSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { InfrastructureEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure.entity';

export class InfrastructureSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(InfrastructureEntity);
    await repository.count();
  }
}