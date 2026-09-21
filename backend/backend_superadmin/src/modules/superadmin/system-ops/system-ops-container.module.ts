// RESPONSIBILITY: Groups the Superadmin system-ops business features under the frontend-mirrored system-ops container.
// FLOW: AppModule -> SystemOps container -> summary/backups/infrastructure/jobs/migrations features.
import { Module } from '@nestjs/common';
import { SystemOpsModule } from '@/modules/superadmin/system-ops/system-ops.module';
import { BackupsModule } from '@/modules/superadmin/system-ops/backups/backups.module';
import { InfrastructureModule } from '@/modules/superadmin/system-ops/infrastructure/infrastructure.module';
import { JobsModule } from '@/modules/superadmin/system-ops/jobs/jobs.module';
import { MigrationsModule } from '@/modules/superadmin/system-ops/migrations/migrations.module';

@Module({ imports: [SystemOpsModule, BackupsModule, InfrastructureModule, JobsModule, MigrationsModule] })
export class SuperadminSystemOpsContainerModule {}
