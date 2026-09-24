// RESPONSIBILITY: Registers the team feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminTeamAdministrationQueryController } from '@/backend_superadmin/superadmin_modules/team/superadmin-team-administration-query.controller';
import { SuperadminTeamAlertsCommandController } from '@/backend_superadmin/superadmin_modules/team/superadmin-team-alerts-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminTeamEntity } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.entity';
import { SuperadminTeamRepository } from '@/backend_superadmin/superadmin_modules/team/superadmin-team.repository';
import { SuperadminTeamQueryController } from '@/backend_superadmin/superadmin_modules/team/superadmin-team-query.controller';
import { SuperadminTeamCommandController } from '@/backend_superadmin/superadmin_modules/team/superadmin-team-command.controller';
import { SuperadminTeamListService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-list.service';
import { SuperadminTeamFindService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-find.service';
import { SuperadminTeamCreateService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-create.service';
import { SuperadminTeamUpdateService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-update.service';
import { SuperadminTeamDeleteService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-delete.service';
import { SuperadminTeamMainService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-main.service';
import { SuperadminTeamAlertsService } from '@/backend_superadmin/superadmin_modules/team/team_services/superadmin-team-alerts.service';
/**
 * Primary Intent: Defines SuperadminTeamModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminTeamEntity])],
  controllers: [SuperadminTeamQueryController, SuperadminTeamCommandController, SuperadminTeamAdministrationQueryController, SuperadminTeamAlertsCommandController],
  providers: [SuperadminTeamMainService, SuperadminTeamAlertsService, SuperadminTeamRepository, SuperadminTeamListService, SuperadminTeamFindService, SuperadminTeamCreateService, SuperadminTeamUpdateService, SuperadminTeamDeleteService],
  exports: [SuperadminTeamRepository],
})
/**
 * Primary Intent: Defines SuperadminTeamModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminTeamModule {}
