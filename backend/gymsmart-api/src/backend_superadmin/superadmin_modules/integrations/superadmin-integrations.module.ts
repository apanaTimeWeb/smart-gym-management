// RESPONSIBILITY: Registers the integrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminIntegrationsAdvancedQueryController } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations-advanced-query.controller';
import { SuperadminIntegrationsAdvancedCommandController } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations-advanced-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminIntegrationsEntity } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.entity';
import { SuperadminIntegrationsRepository } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.repository';
import { SuperadminIntegrationsQueryController } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations-query.controller';
import { SuperadminIntegrationsCommandController } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations-command.controller';
import { SuperadminIntegrationsListService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-list.service';
import { SuperadminIntegrationsFindService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-find.service';
import { SuperadminIntegrationsCreateService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-create.service';
import { SuperadminIntegrationsUpdateService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-update.service';
import { SuperadminIntegrationsDeleteService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-delete.service';
import { SuperadminIntegrationKeyStatusService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-status.service';
import { SuperadminIntegrationsMainService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-main.service';
import { SuperadminIntegrationsGenerateKeyService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-generate-key.service';
/**
 * Primary Intent: Defines SuperadminIntegrationsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminIntegrationsEntity])],
  controllers: [SuperadminIntegrationsAdvancedCommandController, SuperadminIntegrationsAdvancedQueryController, SuperadminIntegrationsCommandController, SuperadminIntegrationsQueryController],
  providers: [SuperadminIntegrationsMainService, SuperadminIntegrationsGenerateKeyService, SuperadminIntegrationsRepository, SuperadminIntegrationsListService, SuperadminIntegrationsFindService, SuperadminIntegrationsCreateService, SuperadminIntegrationsUpdateService, SuperadminIntegrationsDeleteService, SuperadminIntegrationKeyStatusService],
  exports: [SuperadminIntegrationsRepository],
})
/**
 * Primary Intent: Defines SuperadminIntegrationsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminIntegrationsModule {}
