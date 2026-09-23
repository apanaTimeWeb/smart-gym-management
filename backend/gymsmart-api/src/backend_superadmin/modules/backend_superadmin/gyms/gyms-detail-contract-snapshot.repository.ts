// RESPONSIBILITY: Owns reads and named persistence operations for gymdetail frontend contract snapshots.
// FLOW: GymDetail service -> GymsDetailContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GymsDetailContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/gyms/gyms-detail-contract-snapshot.entity';

@Injectable()
export class GymsDetailContractSnapshotRepository {
  constructor(@InjectRepository(GymsDetailContractSnapshotEntity) private readonly repository: Repository<GymsDetailContractSnapshotEntity>) {}


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