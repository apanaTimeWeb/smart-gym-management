// RESPONSIBILITY: Registers the white-labeling feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminWhiteLabelingDomainsQueryController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-domains-query.controller';
import { SuperadminWhiteLabelingDomainsCommandController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-domains-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminWhiteLabelingEntity } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.entity';
import { SuperadminWhiteLabelingRepository } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.repository';
import { SuperadminWhiteLabelingQueryController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-query.controller';
import { SuperadminWhiteLabelingCommandController } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling-command.controller';
import { SuperadminWhiteLabelingListService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-list.service';
import { SuperadminWhiteLabelingFindService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-find.service';
import { SuperadminWhiteLabelingCreateService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-create.service';
import { SuperadminWhiteLabelingUpdateService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-update.service';
import { SuperadminWhiteLabelingDeleteService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-delete.service';
import { SuperadminWhiteLabelDomainStatusService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-status.service';
import { SuperadminWhiteLabelingDomainsService } from '@/backend_superadmin/superadmin_modules/white-labeling/white-labeling_services/superadmin-white-labeling-domains.service';
/**
 * Primary Intent: Defines SuperadminWhiteLabelingModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminWhiteLabelingEntity])],
  controllers: [SuperadminWhiteLabelingDomainsCommandController, SuperadminWhiteLabelingDomainsQueryController, SuperadminWhiteLabelingCommandController, SuperadminWhiteLabelingQueryController],
  providers: [SuperadminWhiteLabelingDomainsService, SuperadminWhiteLabelDomainStatusService, SuperadminWhiteLabelingRepository, SuperadminWhiteLabelingListService, SuperadminWhiteLabelingFindService, SuperadminWhiteLabelingCreateService, SuperadminWhiteLabelingUpdateService, SuperadminWhiteLabelingDeleteService],
  exports: [SuperadminWhiteLabelingRepository],
})
/**
 * Primary Intent: Defines SuperadminWhiteLabelingModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminWhiteLabelingModule {}
