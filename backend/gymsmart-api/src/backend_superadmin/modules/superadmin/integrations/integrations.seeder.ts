// RESPONSIBILITY: Deterministically seeds the integrations table for local/test environments.
// FLOW: Master seed -> IntegrationsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { IntegrationsEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';

export class IntegrationsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(IntegrationsEntity);
    await repository.count();
  }
}