// RESPONSIBILITY: Registers the compliance feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminComplianceOverviewQueryController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-overview-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminComplianceEntity } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.entity';
import { SuperadminComplianceRepository } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.repository';
import { SuperadminComplianceQueryController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-query.controller';
import { SuperadminComplianceCommandController } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance-command.controller';
import { SuperadminComplianceListService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-list.service';
import { SuperadminComplianceFindService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-find.service';
import { SuperadminComplianceCreateService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-create.service';
import { SuperadminComplianceUpdateService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-update.service';
import { SuperadminComplianceDeleteService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-delete.service';
import { SuperadminComplianceMainService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-main.service';
/**
 * Primary Intent: Defines SuperadminComplianceModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminComplianceEntity])],
  controllers: [SuperadminComplianceQueryController, SuperadminComplianceCommandController, SuperadminComplianceOverviewQueryController],
  providers: [SuperadminComplianceMainService, SuperadminComplianceRepository, SuperadminComplianceListService, SuperadminComplianceFindService, SuperadminComplianceCreateService, SuperadminComplianceUpdateService, SuperadminComplianceDeleteService],
  exports: [SuperadminComplianceRepository],
})
/**
 * Primary Intent: Defines SuperadminComplianceModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminComplianceModule {}
