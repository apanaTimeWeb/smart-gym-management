// RESPONSIBILITY: Creates a pending tenant migration record and returns its exact frontend mutation contract.
// FLOW: Controller -> MigrationsTriggerService -> MigrationsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationLogStatus } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.entity';
import { MigrationsTriggerDto } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/dtos/migrations-trigger.dto';
@Injectable()
export class MigrationsTriggerService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Queues a migration target without running blocking tenant work in the HTTP thread. */
  async triggerMigration(body: MigrationsTriggerDto): Promise<unknown> {
    const version = body.targetVersion.trim();
    if (!version) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'MIGRATIONS.TARGET_VERSION.REQUIRED', message: { key: 'migrations.ERRORS.BAD_REQUEST' } });
    return this.repository.createMigrations({ version, description: body.description?.trim() || `Migration to ${version}`, appliedAt: null, status: MigrationLogStatus.PENDING, targetTenants: body.targetTenants ?? 'ALL_ACTIVE', durationMs: 0, errorLog: null, executedAt: null, executedBy: 'superadmin', errorDetails: null });
  }
}