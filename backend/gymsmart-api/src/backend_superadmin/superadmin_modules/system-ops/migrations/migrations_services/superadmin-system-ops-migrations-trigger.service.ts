// RESPONSIBILITY: Creates a pending tenant migration record and returns its exact frontend mutation contract.
// FLOW: Controller -> SuperadminSystemOpsMigrationsTriggerService -> SuperadminSystemOpsMigrationsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminSystemOpsMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminSystemOpsMigrationsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.mapper';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_types/superadmin-system-ops-migrations.interfaces';
import { MigrationLogStatus } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.constants';
import { SuperadminSystemOpsMigrationsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_dtos/superadmin-system-ops-migrations-trigger.dto';
/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsTriggerService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsMigrationsTriggerService {
  constructor(private readonly repository: SuperadminSystemOpsMigrationsRepository) {}
/**
 * Primary Intent: Executes the triggerMigration use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the triggerMigration use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async triggerMigration(body: SuperadminSystemOpsMigrationsTriggerDto): Promise<SuperadminMigrationsDomainModel> {
    const version = body.targetVersion.trim();
    if (!version) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'MIGRATIONS.TARGET_VERSION.REQUIRED', message: { key: 'migrations.ERRORS.BAD_REQUEST' } });
    const entity = await this.repository.createMigrations({ version, description: body.description?.trim() || `Migration to ${version}`, appliedAt: null, status: MigrationLogStatus.PENDING, targetTenants: body.targetTenants ?? 'ALL_ACTIVE', durationMs: 0, errorLog: null, executedAt: null, executedBy: 'superadmin', errorDetails: null });
    return SuperadminSystemOpsMigrationsMapper.toDomain(entity);
  }
}
