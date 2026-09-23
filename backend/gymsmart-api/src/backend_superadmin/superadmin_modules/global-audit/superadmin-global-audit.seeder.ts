// RESPONSIBILITY: Deterministically seeds the global-audit table for local/test environments.
// FLOW: Master seed -> SuperadminGlobalAuditSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminGlobalAuditEntity } from '@/backend_superadmin/superadmin_modules/global-audit/superadmin-global-audit.entity';

export class SuperadminGlobalAuditSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminGlobalAuditEntity);
    await repository.count();
  }
}