// RESPONSIBILITY: Registers the team feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSnapshotEntity } from '@/backend_superadmin/modules/superadmin/team/team.entity';
import { TeamRepository } from '@/backend_superadmin/modules/superadmin/team/team.repository';
import { TeamQueryController } from '@/backend_superadmin/modules/superadmin/team/team-query.controller';
import { TeamCommandController } from '@/backend_superadmin/modules/superadmin/team/team-command.controller';
import { TeamListService } from '@/backend_superadmin/modules/superadmin/team/services/team-list.service';
import { TeamFindService } from '@/backend_superadmin/modules/superadmin/team/services/team-find.service';
import { TeamCreateService } from '@/backend_superadmin/modules/superadmin/team/services/team-create.service';
import { TeamUpdateService } from '@/backend_superadmin/modules/superadmin/team/services/team-update.service';
import { TeamDeleteService } from '@/backend_superadmin/modules/superadmin/team/services/team-delete.service';
import { TeamMainService } from '@/backend_superadmin/modules/superadmin/team/services/team-main.service';
import { TeamAlertsService } from '@/backend_superadmin/modules/superadmin/team/services/team-alerts.service';
import { TeamSpecialController } from '@/backend_superadmin/modules/superadmin/team/team-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([TeamSnapshotEntity])],
  controllers: [TeamQueryController, TeamCommandController, TeamSpecialController],
  providers: [TeamMainService, TeamAlertsService, TeamRepository, TeamListService, TeamFindService, TeamCreateService, TeamUpdateService, TeamDeleteService],
  exports: [TeamRepository],
})
export class TeamModule {}
