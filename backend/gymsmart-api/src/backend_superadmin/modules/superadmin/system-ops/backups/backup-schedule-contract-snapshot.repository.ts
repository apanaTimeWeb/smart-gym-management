// RESPONSIBILITY: Owns persistence for the backup schedule contract state.
// FLOW: Backup schedule service -> repository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupScheduleContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.entity';

@Injectable()
export class BackupScheduleContractSnapshotRepository {
  constructor(@InjectRepository(BackupScheduleContractSnapshotEntity) private readonly repository: Repository<BackupScheduleContractSnapshotEntity>) {}

  /** Returns the newest non-deleted schedule snapshot. */
  async findLatest(): Promise<unknown | null> { const row = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return row?.payload ?? null; }

  /** Upserts the single authoritative schedule snapshot. */
  async upsert(payload: unknown): Promise<void> { const existing = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); if (existing) { await this.repository.update({ id: existing.id } as never, { payload, updatedAt: new Date() } as never); return; } await this.repository.insert(this.repository.create({ kind: 'schedule', payload })); }
}
