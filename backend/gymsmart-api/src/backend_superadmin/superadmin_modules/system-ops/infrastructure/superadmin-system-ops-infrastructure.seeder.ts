// RESPONSIBILITY: Deterministically seeds the infrastructure table for local/test environments.
// FLOW: Master seed -> SuperadminSystemOpsInfrastructureSeeder -> PostgreSQL repository.
import { DataSource } from 'typeorm';
import { SuperadminSystemOpsInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureSeeder as the class-level contract for superadmin-system-ops-infrastructure.seeder.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureSeeder {
  /**
 * Primary Intent: Executes the seed use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(SuperadminSystemOpsInfrastructureEntity);
    await repository.count();
  }
}
