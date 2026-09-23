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
import { SuperadminIntegrationsListService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-list.service';
import { SuperadminIntegrationsFindService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-find.service';
import { SuperadminIntegrationsCreateService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-create.service';
import { SuperadminIntegrationsUpdateService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-update.service';
import { SuperadminIntegrationsDeleteService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-delete.service';
import { SuperadminIntegrationsStatusService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-status.service';
import { SuperadminIntegrationsMainService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-main.service';
import { SuperadminIntegrationsGenerateKeyService } from '@/backend_superadmin/superadmin_modules/integrations/services/superadmin-integrations-generate-key.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminIntegrationsEntity])],
  controllers: [SuperadminIntegrationsQueryController, SuperadminIntegrationsCommandController, SuperadminIntegrationsAdvancedQueryController, SuperadminIntegrationsAdvancedCommandController],
  providers: [SuperadminIntegrationsMainService, SuperadminIntegrationsGenerateKeyService, SuperadminIntegrationsRepository, SuperadminIntegrationsListService, SuperadminIntegrationsFindService, SuperadminIntegrationsCreateService, SuperadminIntegrationsUpdateService, SuperadminIntegrationsDeleteService, SuperadminIntegrationsStatusService],
  exports: [SuperadminIntegrationsRepository],
})
export class SuperadminIntegrationsModule {}