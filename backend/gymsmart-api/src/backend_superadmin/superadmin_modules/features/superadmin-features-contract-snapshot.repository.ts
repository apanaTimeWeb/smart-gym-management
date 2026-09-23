// RESPONSIBILITY: Owns reads and named persistence operations for features frontend contract snapshots.
// FLOW: Features service -> SuperadminFeaturesContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminFeaturesContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-contract-snapshot.entity';

@Injectable()
export class SuperadminFeaturesContractSnapshotRepository {
  constructor(@InjectRepository(SuperadminFeaturesContractSnapshotEntity) private readonly repository: Repository<SuperadminFeaturesContractSnapshotEntity>) {}


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