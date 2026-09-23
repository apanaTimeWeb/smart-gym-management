// RESPONSIBILITY: Persists the single authoritative backup schedule contract owned by the backups feature.
// FLOW: Controller -> BackupsScheduleService -> BackupScheduleContractSnapshotRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { BackupsScheduleDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-schedule.dto';
import { BackupScheduleContractSnapshotRepository } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/backups-schedule-contract-snapshot.repository';

@Injectable()
export class BackupsScheduleService {
  constructor(private readonly repository: BackupScheduleContractSnapshotRepository) {}

  /** Upserts the requested schedule and returns the persisted frontend contract. */
  async updateBackupsSchedule(body: BackupsScheduleDto): Promise<unknown> {
    if (!body.cronExpression?.trim() || body.retentionDays < 1) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'BACKUPS.SCHEDULE.INPUT_INVALID', message: { key: 'backups.ERRORS.BAD_REQUEST' } });
    const current = await this.repository.findLatest();
    const next = { ...(typeof current === 'object' && current !== null ? current as Record<string, unknown> : {}), ...body, updatedAt: new Date().toISOString() };
    await this.repository.upsert(next);
    return next;
  }

  /** Returns the persisted backup schedule contract. */
  async findBackupsSchedule(): Promise<unknown | null> { return this.repository.findLatest(); }
}