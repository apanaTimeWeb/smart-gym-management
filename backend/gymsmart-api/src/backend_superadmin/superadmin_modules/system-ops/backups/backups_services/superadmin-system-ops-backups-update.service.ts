// RESPONSIBILITY: Executes partial update business flow for the backups feature.
// FLOW: CommandController -> SuperadminSystemOpsBackupsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminSystemOpsBackupsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.repository';
import { SuperadminSystemOpsBackupsMapper } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.mapper';
import type { SuperadminBackupsDomainModel, SuperadminBackupsUpdateInput } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces';
/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsUpdateService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsUpdateService {
  constructor(private readonly repository: SuperadminSystemOpsBackupsRepository) {}
/**
 * Primary Intent: Executes the updateBackups use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the updateBackups use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async updateBackups(id: string, input: SuperadminBackupsUpdateInput): Promise<SuperadminBackupsDomainModel> { return SuperadminSystemOpsBackupsMapper.toDomain(await this.repository.updateBackupsById(id, input)); }
}
