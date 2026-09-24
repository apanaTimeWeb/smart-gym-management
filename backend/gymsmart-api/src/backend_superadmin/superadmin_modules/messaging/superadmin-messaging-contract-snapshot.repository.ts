// RESPONSIBILITY: Owns reads and named persistence operations for messaging frontend contract snapshots.
// FLOW: Messaging service -> SuperadminMessagingContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminMessagingContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging-contract-snapshot.entity';

/**
 * Primary Intent: Defines SuperadminMessagingContractSnapshotRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminMessagingContractSnapshotRepository {
  constructor(@InjectRepository(SuperadminMessagingContractSnapshotEntity) private readonly repository: Repository<SuperadminMessagingContractSnapshotEntity>) {}

  /**
 * Primary Intent: Executes the upsertSnapshot use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async upsertSnapshot(id: string, kind: string, payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } });
    if (existing) {
      await this.repository.update({ id }, { kind, payload, deletedAt: null } as any);
      return;
    }
    await this.repository.save(this.repository.create({ id, kind, payload }));
  }

}
