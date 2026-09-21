// RESPONSIBILITY: Persists the single authoritative backup schedule contract owned by the backups feature.
// FLOW: Controller -> BackupsScheduleService -> BackupScheduleContractSnapshotRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { BackupScheduleContractSnapshotRepository } from '@/modules/superadmin/system-ops/backups/backup-schedule-contract-snapshot.repository';

@Injectable()
export class BackupsScheduleService {
  constructor(private readonly repository: BackupScheduleContractSnapshotRepository) {}

  /** Upserts the requested schedule and returns the persisted frontend contract. */
  async updateBackupsSchedule(body: Record<string, unknown>): Promise<unknown> {
    if (typeof body.schedule !== 'string' && typeof body.frequency !== 'string') throw new BadRequestException('schedule or frequency is required');
    const current = await this.repository.findLatest();
    const next = { ...(typeof current === 'object' && current !== null ? current as Record<string, unknown> : {}), ...body, updatedAt: new Date().toISOString() };
    await this.repository.upsert(next);
    return next;
  }

  /** Returns the persisted backup schedule contract. */
  async findBackupsSchedule(): Promise<unknown | null> { return this.repository.findLatest(); }
}
