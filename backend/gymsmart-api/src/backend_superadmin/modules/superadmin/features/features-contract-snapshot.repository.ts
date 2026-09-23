// RESPONSIBILITY: Owns reads and named persistence operations for features frontend contract snapshots.
// FLOW: Features service -> FeaturesContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeaturesContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/features/features-contract-snapshot.entity';

@Injectable()
export class FeaturesContractSnapshotRepository {
  constructor(@InjectRepository(FeaturesContractSnapshotEntity) private readonly repository: Repository<FeaturesContractSnapshotEntity>) {}


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