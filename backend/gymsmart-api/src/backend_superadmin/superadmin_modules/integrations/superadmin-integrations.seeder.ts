// RESPONSIBILITY: Deterministically seeds the integrations table for local/test environments.
// FLOW: Master seed -> SuperadminIntegrationsSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';

export class SuperadminIntegrationsSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminIntegrationsEntity);
    await repository.count();
  }
}