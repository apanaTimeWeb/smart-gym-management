// RESPONSIBILITY: Owns persistence for the backup schedule contract state.
// FLOW: Backup schedule service -> repository -> TypeORM -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminBackupScheduleContractSnapshotEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.entity';

@Injectable()
export class SuperadminBackupScheduleContractSnapshotRepository {
  constructor(@InjectRepository(SuperadminBackupScheduleContractSnapshotEntity) private readonly repository: Repository<SuperadminBackupScheduleContractSnapshotEntity>) {}

  /** Returns the newest non-deleted schedule snapshot. */
  async findLatest(): Promise<unknown | null> { const row = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); return row?.payload ?? null; }

  /** Upserts the single authoritative schedule snapshot. */
  async upsert(payload: unknown): Promise<void> { const existing = await this.repository.findOne({ where: { kind: 'schedule', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never }); if (existing) { await this.repository.update({ id: existing.id } as never, { payload, updatedAt: new Date() } as never); return; } await this.repository.insert(this.repository.create({ kind: 'schedule', payload }) as any); }
}