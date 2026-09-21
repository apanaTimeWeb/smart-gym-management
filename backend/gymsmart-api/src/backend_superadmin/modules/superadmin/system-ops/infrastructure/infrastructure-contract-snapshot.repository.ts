// RESPONSIBILITY: Owns reads and named persistence operations for infrastructure frontend contract snapshots.
// FLOW: Infrastructure service -> InfrastructureContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InfrastructureContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/infrastructure-contract-snapshot.entity';

@Injectable()
export class InfrastructureContractSnapshotRepository {
  constructor(@InjectRepository(InfrastructureContractSnapshotEntity) private readonly repository: Repository<InfrastructureContractSnapshotEntity>) {}

  /** Returns the newest active payload for the requested frontend contract kind. */
  async findLatestByKind(kind: string): Promise<unknown | null> {
    const row = await this.repository.findOne({ where: { kind, deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row?.payload ?? null;
  }

  /** Upserts a deterministic contract snapshot by its stable seed id and kind. */
  async upsertSnapshot(id: string, kind: string, payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as never });
    if (existing) {
      await this.repository.update({ id } as never, { kind, payload, deletedAt: null } as never);
      return;
    }
    await this.repository.insert(this.repository.create({ id, kind, payload } as any));
  }
}
