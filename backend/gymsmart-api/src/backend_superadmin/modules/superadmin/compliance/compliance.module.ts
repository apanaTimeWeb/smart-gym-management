// RESPONSIBILITY: Registers the compliance feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceSnapshotEntity } from '@/backend_superadmin/modules/superadmin/compliance/compliance.entity';
import { ComplianceRepository } from '@/backend_superadmin/modules/superadmin/compliance/compliance.repository';
import { ComplianceQueryController } from '@/backend_superadmin/modules/superadmin/compliance/compliance-query.controller';
import { ComplianceCommandController } from '@/backend_superadmin/modules/superadmin/compliance/compliance-command.controller';
import { ComplianceListService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-list.service';
import { ComplianceFindService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-find.service';
import { ComplianceCreateService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-create.service';
import { ComplianceUpdateService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-update.service';
import { ComplianceDeleteService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-delete.service';
import { ComplianceMainService } from '@/backend_superadmin/modules/superadmin/compliance/services/compliance-main.service';
import { ComplianceSpecialController } from '@/backend_superadmin/modules/superadmin/compliance/compliance-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ComplianceSnapshotEntity])],
  controllers: [ComplianceQueryController, ComplianceCommandController, ComplianceSpecialController],
  providers: [ComplianceMainService, ComplianceRepository, ComplianceListService, ComplianceFindService, ComplianceCreateService, ComplianceUpdateService, ComplianceDeleteService],
  exports: [ComplianceRepository],
})
export class ComplianceModule {}
