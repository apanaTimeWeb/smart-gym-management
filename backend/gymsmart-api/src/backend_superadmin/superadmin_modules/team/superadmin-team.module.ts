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
import { SuperadminTeamListService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-list.service';
import { SuperadminTeamFindService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-find.service';
import { SuperadminTeamCreateService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-create.service';
import { SuperadminTeamUpdateService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-update.service';
import { SuperadminTeamDeleteService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-delete.service';
import { SuperadminTeamMainService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-main.service';
import { SuperadminTeamAlertsService } from '@/backend_superadmin/superadmin_modules/team/services/superadmin-team-alerts.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminTeamEntity])],
  controllers: [SuperadminTeamQueryController, SuperadminTeamCommandController, SuperadminTeamAdministrationQueryController, SuperadminTeamAlertsCommandController],
  providers: [SuperadminTeamMainService, SuperadminTeamAlertsService, SuperadminTeamRepository, SuperadminTeamListService, SuperadminTeamFindService, SuperadminTeamCreateService, SuperadminTeamUpdateService, SuperadminTeamDeleteService],
  exports: [SuperadminTeamRepository],
})
export class SuperadminTeamModule {}