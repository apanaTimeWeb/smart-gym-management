// RESPONSIBILITY: Registers only the system-ops landing summary feature; operational child features are registered by the container.
// FLOW: Container -> summary controller/service/repository -> PostgreSQL contract snapshot.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsSummaryQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops-summary-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.entity';
import { SuperadminSystemOpsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.repository';
import { SuperadminSystemOpsSummaryService } from '@/backend_superadmin/superadmin_modules/system-ops/services/superadmin-system-ops-summary.service';

@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsEntity])],
  controllers: [SuperadminSystemOpsSummaryQueryController],
  providers: [SuperadminSystemOpsRepository, SuperadminSystemOpsSummaryService],
  exports: [SuperadminSystemOpsRepository],
})
export class SuperadminSystemOpsModule {}