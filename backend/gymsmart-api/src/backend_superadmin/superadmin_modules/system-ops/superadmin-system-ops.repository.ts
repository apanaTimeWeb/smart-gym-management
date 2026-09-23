// RESPONSIBILITY: Owns persistence access for the system-ops summary contract only; it does not own child business features.
// FLOW: SuperadminSystemOpsSummaryService -> SuperadminSystemOpsRepository -> TypeORM -> PostgreSQL `system_ops_snapshots`.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperadminSystemOpsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.entity';

@Injectable()
export class SuperadminSystemOpsRepository {
  constructor(@InjectRepository(SuperadminSystemOpsEntity) private readonly repository: Repository<SuperadminSystemOpsEntity>) {}

  /** Returns the latest active summary contract payload. */
  async findSummary(): Promise<unknown | null> {
    const row = await this.repository.findOne({ where: { kind: 'summary', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    return row?.payload ?? null;
  }

  /** Upserts the deterministic system-ops summary used by development and test environments. */
  async upsertSummary(payload: unknown): Promise<void> {
    const existing = await this.repository.findOne({ where: { kind: 'summary', deletedAt: null } as never, order: { updatedAt: 'DESC' } as never });
    if (existing) { await this.repository.update({ id: existing.id } as never, { payload, updatedAt: new Date() } as never); return; }
    await this.repository.insert(this.repository.create({ kind: 'summary', payload } as {}) as any);
  }
}