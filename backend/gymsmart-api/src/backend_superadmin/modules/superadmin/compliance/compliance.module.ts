// RESPONSIBILITY: Registers the compliance feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { ComplianceOverviewQueryController } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-overview-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceEntity } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.entity';
import { ComplianceRepository } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance.repository';
import { ComplianceQueryController } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-query.controller';
import { ComplianceCommandController } from '@/backend_superadmin/modules/backend_superadmin/compliance/compliance-command.controller';
import { ComplianceListService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-list.service';
import { ComplianceFindService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-find.service';
import { ComplianceCreateService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-create.service';
import { ComplianceUpdateService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-update.service';
import { ComplianceDeleteService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-delete.service';
import { ComplianceMainService } from '@/backend_superadmin/modules/backend_superadmin/compliance/services/compliance-main.service';
@Module({
  imports: [TypeOrmModule.forFeature([ComplianceEntity])],
  controllers: [ComplianceQueryController, ComplianceCommandController, ComplianceOverviewQueryController],
  providers: [ComplianceMainService, ComplianceRepository, ComplianceListService, ComplianceFindService, ComplianceCreateService, ComplianceUpdateService, ComplianceDeleteService],
  exports: [ComplianceRepository],
})
export class ComplianceModule {}