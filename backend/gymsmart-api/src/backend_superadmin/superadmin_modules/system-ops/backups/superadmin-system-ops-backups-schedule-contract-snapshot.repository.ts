// RESPONSIBILITY: Owns persistence for the backup schedule contract state.
// FLOW: Backup schedule service -> repository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { SuperadminBackupsSchedulePayload } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces';
import { SuperadminSystemOpsBackupsScheduleContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsScheduleContractSnapshotRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsBackupsScheduleContractSnapshotRepository {
  constructor(@InjectRepository(SuperadminSystemOpsBackupsScheduleContractSnapshotEntity) private readonly repository: Repository<SuperadminSystemOpsBackupsScheduleContractSnapshotEntity>) {}

  /**
 * Primary Intent: Executes the findLatest use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findLatest(): Promise<SuperadminBackupsSchedulePayload | null> { const row = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return row?.payload ?? null; }

  /**
 * Primary Intent: Executes the upsert use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async upsert(payload: SuperadminBackupsSchedulePayload): Promise<void> { const existing = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); if (existing) { await this.repository.update({ id: existing.id } as never, { payload, updatedAt: new Date() } as never); return; } await this.repository.insert(this.repository.create({ kind: 'schedule', payload })); }
}
