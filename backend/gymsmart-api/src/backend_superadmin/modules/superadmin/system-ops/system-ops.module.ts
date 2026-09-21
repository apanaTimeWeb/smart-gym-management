// RESPONSIBILITY: Registers only the system-ops landing summary feature; operational child features are registered by the container.
// FLOW: Container -> summary controller/service/repository -> PostgreSQL contract snapshot.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemOpsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops.entity';
import { SystemOpsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops.repository';
import { SystemOpsSummaryService } from '@/backend_superadmin/modules/superadmin/system-ops/services/system-ops-summary.service';
import { SystemOpsSpecialController } from '@/backend_superadmin/modules/superadmin/system-ops/system-ops-special.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemOpsContractSnapshotEntity])],
  controllers: [SystemOpsSpecialController],
  providers: [SystemOpsRepository, SystemOpsSummaryService],
  exports: [SystemOpsRepository],
})
export class SystemOpsModule {}
