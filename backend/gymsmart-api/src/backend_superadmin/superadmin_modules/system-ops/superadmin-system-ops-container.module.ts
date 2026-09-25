// RESPONSIBILITY: Groups the Superadmin system-ops business features under the frontend-mirrored system-ops container.
// FLOW: AppModule -> SystemOps container -> summary/backups/infrastructure/jobs/migrations features.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsModule } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.module';
import { SuperadminSystemOpsBackupsModule } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.module';
import { SuperadminSystemOpsInfrastructureModule } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.module';
import { SuperadminSystemOpsJobsModule } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.module';
import { SuperadminSystemOpsMigrationsModule } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.module';

/**
 * Primary Intent: Defines SuperadminSystemOpsContainerModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({ imports: [SuperadminSystemOpsModule, SuperadminSystemOpsBackupsModule, SuperadminSystemOpsInfrastructureModule, SuperadminSystemOpsJobsModule, SuperadminSystemOpsMigrationsModule] })
export class SuperadminSystemOpsContainerModule {}
