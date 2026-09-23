// RESPONSIBILITY: Owns reads and named persistence operations for jobs frontend contract snapshots.
// FLOW: Jobs service -> JobsContractSnapshotRepository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsContractSnapshotEntity } from '@/backend_superadmin/modules/backend_superadmin/system-ops/jobs/jobs-contract-snapshot.entity';

@Injectable()
export class JobsContractSnapshotRepository {
  constructor(@InjectRepository(JobsContractSnapshotEntity) private readonly repository: Repository<JobsContractSnapshotEntity>) {}


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