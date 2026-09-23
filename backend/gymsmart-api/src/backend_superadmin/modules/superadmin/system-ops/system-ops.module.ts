// RESPONSIBILITY: Registers only the system-ops landing summary feature; operational child features are registered by the container.
// FLOW: Container -> summary controller/service/repository -> PostgreSQL contract snapshot.
import { Module } from '@nestjs/common';
import { SystemOpsSummaryQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops-summary-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemOpsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops.entity';
import { SystemOpsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops.repository';
import { SystemOpsSummaryService } from '@/backend_superadmin/modules/superadmin/system-ops/services/system-ops-summary.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemOpsEntity])],
  controllers: [SystemOpsSummaryQueryController],
  providers: [SystemOpsRepository, SystemOpsSummaryService],
  exports: [SystemOpsRepository],
})
export class SystemOpsModule {}