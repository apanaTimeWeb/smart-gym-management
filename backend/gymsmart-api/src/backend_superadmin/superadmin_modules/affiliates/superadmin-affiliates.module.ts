// RESPONSIBILITY: Registers the affiliates feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminAffiliatesEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.entity';
import { SuperadminAffiliatesRepository } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.repository';
import { SuperadminAffiliatesQueryController } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-query.controller';
import { SuperadminAffiliatesCommandController } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-command.controller';
import { SuperadminAffiliatesListService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-list.service';
import { SuperadminAffiliatesFindService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-find.service';
import { SuperadminAffiliatesCreateService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-create.service';
import { SuperadminAffiliatesUpdateService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-update.service';
import { SuperadminAffiliatesDeleteService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-delete.service';
import { SuperadminAffiliatesStatusService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-status.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-payout.service';
import { SuperadminAffiliatesPayoutOrchestratorService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-payout-orchestrator.service';
import { SuperadminAffiliatesLedgerEntity } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates-ledger.entity';
import { SuperadminAffiliatesLedgerRepository } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_repositories/superadmin-affiliates-ledger.repository';
/**
 * Primary Intent: Defines SuperadminAffiliatesModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminAffiliatesEntity, SuperadminAffiliatesLedgerEntity])],
  controllers: [SuperadminAffiliatesCommandController, SuperadminAffiliatesQueryController],
  providers: [SuperadminAffiliatesStatusService, SuperadminAffiliatesPayoutService, SuperadminAffiliatesPayoutOrchestratorService, SuperadminAffiliatesLedgerRepository, SuperadminAffiliatesRepository, SuperadminAffiliatesListService, SuperadminAffiliatesFindService, SuperadminAffiliatesCreateService, SuperadminAffiliatesUpdateService, SuperadminAffiliatesDeleteService],
  exports: [SuperadminAffiliatesRepository],
})
/**
 * Primary Intent: Defines SuperadminAffiliatesModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminAffiliatesModule {}
