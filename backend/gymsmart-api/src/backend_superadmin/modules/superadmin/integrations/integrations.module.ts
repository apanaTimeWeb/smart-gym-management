// RESPONSIBILITY: Registers the integrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationsContractSnapshotEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations-contract-snapshot.entity';
import { IntegrationsContractSnapshotRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations-contract-snapshot.repository';
import { IntegrationKeyEntity } from '@/backend_superadmin/modules/superadmin/integrations/integrations.entity';
import { IntegrationsRepository } from '@/backend_superadmin/modules/superadmin/integrations/integrations.repository';
import { IntegrationsQueryController } from '@/backend_superadmin/modules/superadmin/integrations/integrations-query.controller';
import { IntegrationsCommandController } from '@/backend_superadmin/modules/superadmin/integrations/integrations-command.controller';
import { IntegrationsListService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-list.service';
import { IntegrationsFindService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-find.service';
import { IntegrationsCreateService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-create.service';
import { IntegrationsUpdateService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-update.service';
import { IntegrationsDeleteService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-delete.service';
import { IntegrationsStatusService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-status.service';
import { IntegrationsMainService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-main.service';
import { IntegrationsGenerateKeyService } from '@/backend_superadmin/modules/superadmin/integrations/services/integrations-generate-key.service';
import { IntegrationsSpecialController } from '@/backend_superadmin/modules/superadmin/integrations/integrations-special.controller';
import { IntegrationsCompatibilityController } from '@/backend_superadmin/modules/superadmin/integrations/integrations-compatibility.controller';
@Module({
  imports: [TypeOrmModule.forFeature([IntegrationsContractSnapshotEntity, IntegrationKeyEntity])],
  controllers: [IntegrationsQueryController, IntegrationsCommandController, IntegrationsSpecialController, IntegrationsCompatibilityController],
  providers: [IntegrationsContractSnapshotRepository, IntegrationsMainService, IntegrationsGenerateKeyService, IntegrationsRepository, IntegrationsListService, IntegrationsFindService, IntegrationsCreateService, IntegrationsUpdateService, IntegrationsDeleteService, IntegrationsStatusService],
  exports: [IntegrationsRepository],
})
export class IntegrationsModule {}
