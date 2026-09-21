// RESPONSIBILITY: Registers the integrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationsContractSnapshotEntity } from '@/modules/superadmin/integrations/integrations-contract-snapshot.entity';
import { IntegrationsContractSnapshotRepository } from '@/modules/superadmin/integrations/integrations-contract-snapshot.repository';
import { IntegrationKeyEntity } from '@/modules/superadmin/integrations/integrations.entity';
import { IntegrationsRepository } from '@/modules/superadmin/integrations/integrations.repository';
import { IntegrationsQueryController } from '@/modules/superadmin/integrations/integrations-query.controller';
import { IntegrationsCommandController } from '@/modules/superadmin/integrations/integrations-command.controller';
import { IntegrationsListService } from '@/modules/superadmin/integrations/services/integrations-list.service';
import { IntegrationsFindService } from '@/modules/superadmin/integrations/services/integrations-find.service';
import { IntegrationsCreateService } from '@/modules/superadmin/integrations/services/integrations-create.service';
import { IntegrationsUpdateService } from '@/modules/superadmin/integrations/services/integrations-update.service';
import { IntegrationsDeleteService } from '@/modules/superadmin/integrations/services/integrations-delete.service';
import { IntegrationsStatusService } from '@/modules/superadmin/integrations/services/integrations-status.service';
import { IntegrationsMainService } from '@/modules/superadmin/integrations/services/integrations-main.service';
import { IntegrationsGenerateKeyService } from '@/modules/superadmin/integrations/services/integrations-generate-key.service';
import { IntegrationsSpecialController } from '@/modules/superadmin/integrations/integrations-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([IntegrationsContractSnapshotEntity, IntegrationKeyEntity])],
  controllers: [IntegrationsQueryController, IntegrationsCommandController, IntegrationsSpecialController],
  providers: [IntegrationsContractSnapshotRepository, IntegrationsMainService, IntegrationsGenerateKeyService, IntegrationsRepository, IntegrationsListService, IntegrationsFindService, IntegrationsCreateService, IntegrationsUpdateService, IntegrationsDeleteService, IntegrationsStatusService],
  exports: [IntegrationsRepository],
})
export class IntegrationsModule {}
