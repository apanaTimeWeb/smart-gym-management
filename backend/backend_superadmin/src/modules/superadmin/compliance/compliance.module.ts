// RESPONSIBILITY: Registers the compliance feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceSnapshotEntity } from '@/modules/superadmin/compliance/compliance.entity';
import { ComplianceRepository } from '@/modules/superadmin/compliance/compliance.repository';
import { ComplianceQueryController } from '@/modules/superadmin/compliance/compliance-query.controller';
import { ComplianceCommandController } from '@/modules/superadmin/compliance/compliance-command.controller';
import { ComplianceListService } from '@/modules/superadmin/compliance/services/compliance-list.service';
import { ComplianceFindService } from '@/modules/superadmin/compliance/services/compliance-find.service';
import { ComplianceCreateService } from '@/modules/superadmin/compliance/services/compliance-create.service';
import { ComplianceUpdateService } from '@/modules/superadmin/compliance/services/compliance-update.service';
import { ComplianceDeleteService } from '@/modules/superadmin/compliance/services/compliance-delete.service';
import { ComplianceMainService } from '@/modules/superadmin/compliance/services/compliance-main.service';
import { ComplianceSpecialController } from '@/modules/superadmin/compliance/compliance-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ComplianceSnapshotEntity])],
  controllers: [ComplianceQueryController, ComplianceCommandController, ComplianceSpecialController],
  providers: [ComplianceMainService, ComplianceRepository, ComplianceListService, ComplianceFindService, ComplianceCreateService, ComplianceUpdateService, ComplianceDeleteService],
  exports: [ComplianceRepository],
})
export class ComplianceModule {}
