// RESPONSIBILITY: Groups the Superadmin system-ops business features under the frontend-mirrored system-ops container.
// FLOW: AppModule -> SystemOps container -> summary/backups/infrastructure/jobs/migrations features.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsModule } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.module';
import { SuperadminBackupsModule } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.module';
import { SuperadminInfrastructureModule } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.module';
import { SuperadminJobsModule } from '@/backend_superadmin/superadmin_modules/system-ops/jobs/superadmin-system-ops-jobs.module';
import { SuperadminMigrationsModule } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.module';

@Module({ imports: [SuperadminSystemOpsModule, SuperadminBackupsModule, SuperadminInfrastructureModule, SuperadminJobsModule, SuperadminMigrationsModule] })
export class SuperadminSystemOpsContainerModule {}