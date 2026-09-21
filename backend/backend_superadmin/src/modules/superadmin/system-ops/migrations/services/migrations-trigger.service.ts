// RESPONSIBILITY: Creates a pending tenant migration record and returns its exact frontend mutation contract.
// FLOW: Controller -> MigrationsTriggerService -> MigrationsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationLogStatus } from '@/modules/superadmin/system-ops/migrations/migrations.entity';
@Injectable()
export class MigrationsTriggerService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Queues a migration target without running blocking tenant work in the HTTP thread. */
  async triggerMigration(body: Record<string, unknown>): Promise<unknown> {
    const version = typeof body.targetVersion === 'string' ? body.targetVersion : typeof body.version === 'string' ? body.version : '';
    if (!version) throw new BadRequestException('targetVersion is required');
    return this.repository.createMigrations({ version, description: String(body.description ?? `Migration to ${version}`), appliedAt: null, status: MigrationLogStatus.PENDING, targetTenants: body.targetTenants ?? 'ALL_ACTIVE', durationMs: 0, errorLog: null, executedAt: null, executedBy: String(body.executedBy ?? 'superadmin'), errorDetails: null });
  }
}
