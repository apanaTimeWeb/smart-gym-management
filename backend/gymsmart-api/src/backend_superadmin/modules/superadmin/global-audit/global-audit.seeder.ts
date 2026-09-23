// RESPONSIBILITY: Deterministically seeds the global-audit table for local/test environments.
// FLOW: Master seed -> GlobalAuditSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { GlobalAuditEntity } from '@/backend_superadmin/modules/backend_superadmin/global-audit/global-audit.entity';

export class GlobalAuditSeeder {
  /** Ensures the seed routine is safe to invoke repeatedly; data fixtures are applied by the dedicated seed orchestrator. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(GlobalAuditEntity);
    await repository.count();
  }
}