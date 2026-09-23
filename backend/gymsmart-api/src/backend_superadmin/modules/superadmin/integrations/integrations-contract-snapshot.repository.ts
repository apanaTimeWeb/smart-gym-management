// RESPONSIBILITY: Owns reads and named persistence operations for integrations frontend contract snapshots.
// FLOW: Integrations service -> IntegrationsContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/integrations/integrations-contract-snapshot.entity';

@Injectable()
export class IntegrationsContractSnapshotRepository {
  constructor(@InjectRepository(IntegrationsContractSnapshotEntity) private readonly repository: Repository<IntegrationsContractSnapshotEntity>) {}


  /** Upserts a deterministic contract snapshot by its stable seed id and kind. */
  async upsertSnapshot(id: string, kind: string, payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as never });
    if (existing) {
      await this.repository.update({ id } as never, { kind, payload, deletedAt: null } as never);
      return;
    }
    await this.repository.insert(this.repository.create({ id, kind, payload } as {}) as any);
  }

}