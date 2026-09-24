// RESPONSIBILITY: Performs status transitions for migrations records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSystemOpsMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminSystemOpsMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_types/superadmin-system-ops-migrations.interfaces';
/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationLogStatusService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsMigrationLogStatusService {
  constructor(private readonly repository: SuperadminSystemOpsMigrationsRepository) {}
/**
 * Primary Intent: Executes the changeMigrationLogStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the changeMigrationLogStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async changeMigrationLogStatus(id: string, status: string): Promise<SuperadminMigrationsDomainModel> { return SuperadminSystemOpsMigrationsMapper.toDomain(await this.repository.updateMigrationsById(id, { status })); }
}
