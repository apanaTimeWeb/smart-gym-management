// RESPONSIBILITY: Registers the compliance feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminComplianceOverviewQueryController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-overview-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceQueryController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-query.controller';
import { SuperadminComplianceCommandController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-command.controller';
import { SuperadminComplianceListService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-list.service';
import { SuperadminComplianceFindService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-find.service';
import { SuperadminComplianceCreateService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-create.service';
import { SuperadminComplianceUpdateService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-update.service';
import { SuperadminComplianceDeleteService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-delete.service';
import { SuperadminComplianceMainService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-main.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminComplianceEntity])],
  controllers: [SuperadminComplianceQueryController, SuperadminComplianceCommandController, SuperadminComplianceOverviewQueryController],
  providers: [SuperadminComplianceMainService, SuperadminComplianceRepository, SuperadminComplianceListService, SuperadminComplianceFindService, SuperadminComplianceCreateService, SuperadminComplianceUpdateService, SuperadminComplianceDeleteService],
  exports: [SuperadminComplianceRepository],
})
export class SuperadminComplianceModule {}