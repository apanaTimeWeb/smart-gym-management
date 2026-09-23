// RESPONSIBILITY: Creates a pending tenant migration record and returns its exact frontend mutation contract.
// FLOW: Controller -> SuperadminMigrationsTriggerService -> SuperadminMigrationsRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { MigrationLogStatus } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import { SuperadminMigrationsTriggerDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-trigger.dto';
@Injectable()
export class SuperadminMigrationsTriggerService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Queues a migration target without running blocking tenant work in the HTTP thread. */
  async triggerMigration(body: SuperadminMigrationsTriggerDto): Promise<unknown> {
    const version = body.targetVersion.trim();
    if (!version) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'MIGRATIONS.TARGET_VERSION.REQUIRED', message: { key: 'migrations.ERRORS.BAD_REQUEST' } });
    return this.repository.createMigrations({ version, description: body.description?.trim() || `Migration to ${version}`, appliedAt: null, status: MigrationLogStatus.PENDING, targetTenants: body.targetTenants ?? 'ALL_ACTIVE', durationMs: 0, errorLog: null, executedAt: null, executedBy: 'superadmin', errorDetails: null });
  }
}