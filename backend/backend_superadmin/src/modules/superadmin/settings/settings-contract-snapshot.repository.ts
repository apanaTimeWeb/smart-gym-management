// RESPONSIBILITY: Owns reads and named persistence operations for settings frontend contract snapshots.
// FLOW: Settings service -> SettingsContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsContractSnapshotEntity } from '@/modules/superadmin/settings/settings-contract-snapshot.entity';

@Injectable()
export class SettingsContractSnapshotRepository {
  constructor(@InjectRepository(SettingsContractSnapshotEntity) private readonly repository: Repository<SettingsContractSnapshotEntity>) {}

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
    await this.repository.insert(this.repository.create({ id, kind, payload }));
  }
}
