// RESPONSIBILITY: Registers the team feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSnapshotEntity } from '@/modules/superadmin/team/team.entity';
import { TeamRepository } from '@/modules/superadmin/team/team.repository';
import { TeamQueryController } from '@/modules/superadmin/team/team-query.controller';
import { TeamCommandController } from '@/modules/superadmin/team/team-command.controller';
import { TeamListService } from '@/modules/superadmin/team/services/team-list.service';
import { TeamFindService } from '@/modules/superadmin/team/services/team-find.service';
import { TeamCreateService } from '@/modules/superadmin/team/services/team-create.service';
import { TeamUpdateService } from '@/modules/superadmin/team/services/team-update.service';
import { TeamDeleteService } from '@/modules/superadmin/team/services/team-delete.service';
import { TeamMainService } from '@/modules/superadmin/team/services/team-main.service';
import { TeamAlertsService } from '@/modules/superadmin/team/services/team-alerts.service';
import { TeamSpecialController } from '@/modules/superadmin/team/team-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([TeamSnapshotEntity])],
  controllers: [TeamQueryController, TeamCommandController, TeamSpecialController],
  providers: [TeamMainService, TeamAlertsService, TeamRepository, TeamListService, TeamFindService, TeamCreateService, TeamUpdateService, TeamDeleteService],
  exports: [TeamRepository],
})
export class TeamModule {}
