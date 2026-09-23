// RESPONSIBILITY: Persists the single authoritative backup schedule contract owned by the backups feature.
// FLOW: Controller -> SuperadminBackupsScheduleService -> SuperadminBackupScheduleContractSnapshotRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminBackupsScheduleDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-schedule.dto';
import { SuperadminBackupScheduleContractSnapshotRepository } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups-schedule-contract-snapshot.repository';

@Injectable()
export class SuperadminBackupsScheduleService {
  constructor(private readonly repository: SuperadminBackupScheduleContractSnapshotRepository) {}

  /** Upserts the requested schedule and returns the persisted frontend contract. */
  async updateBackupsSchedule(body: SuperadminBackupsScheduleDto): Promise<unknown> {
    if (!body.cronExpression?.trim() || body.retentionDays < 1) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'BACKUPS.SCHEDULE.INPUT_INVALID', message: { key: 'backups.ERRORS.BAD_REQUEST' } });
    const current = await this.repository.findLatest();
    const next = { ...(typeof current === 'object' && current !== null ? current as Record<string, unknown> : {}), ...body, updatedAt: new Date().toISOString() };
    await this.repository.upsert(next);
    return next;
  }

  /** Returns the persisted backup schedule contract. */
  async findBackupsSchedule(): Promise<unknown | null> { return this.repository.findLatest(); }
}