// RESPONSIBILITY: Owns persistence access for the system-ops summary contract only; it does not own child business features.
// FLOW: SuperadminSystemOpsSummaryService -> SuperadminSystemOpsRepository -> TypeORM -> PostgreSQL `system_ops_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminSystemOpsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.entity';

/**
 * Primary Intent: Defines SuperadminSystemOpsRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminSystemOpsRepository {
  constructor(@InjectRepository(SuperadminSystemOpsEntity) private readonly repository: Repository<SuperadminSystemOpsEntity>) {}

  /**
 * Primary Intent: Executes the findSummary use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findSummary(): Promise<unknown | null> {
    const row = await this.repository.findOne({ where: { kind: 'summary', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row?.payload ?? null;
  }

  /**
 * Primary Intent: Executes the upsertSummary use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async upsertSummary(payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { kind: 'summary', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    if (existing) { await this.repository.update({ id: existing.id } as never, { payload, updatedAt: new Date() } as never); return; }
    await this.repository.insert(this.repository.create({ kind: 'summary', payload }));
  }
}
