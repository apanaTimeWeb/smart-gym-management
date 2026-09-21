// RESPONSIBILITY: Registers the usage-meters feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageMeterEntity } from '@/modules/superadmin/usage-meters/usage-meters.entity';
import { UsageMetersRepository } from '@/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersQueryController } from '@/modules/superadmin/usage-meters/usage-meters-query.controller';
import { UsageMetersCommandController } from '@/modules/superadmin/usage-meters/usage-meters-command.controller';
import { UsageMetersListService } from '@/modules/superadmin/usage-meters/services/usage-meters-list.service';
import { UsageMetersFindService } from '@/modules/superadmin/usage-meters/services/usage-meters-find.service';
import { UsageMetersCreateService } from '@/modules/superadmin/usage-meters/services/usage-meters-create.service';
import { UsageMetersUpdateService } from '@/modules/superadmin/usage-meters/services/usage-meters-update.service';
import { UsageMetersDeleteService } from '@/modules/superadmin/usage-meters/services/usage-meters-delete.service';
import { UsageMetersMainService } from '@/modules/superadmin/usage-meters/services/usage-meters-main.service';
import { UsageMetersSpecialController } from '@/modules/superadmin/usage-meters/usage-meters-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UsageMeterEntity])],
  controllers: [UsageMetersQueryController, UsageMetersCommandController, UsageMetersSpecialController],
  providers: [UsageMetersMainService, UsageMetersRepository, UsageMetersListService, UsageMetersFindService, UsageMetersCreateService, UsageMetersUpdateService, UsageMetersDeleteService],
  exports: [UsageMetersRepository],
})
export class UsageMetersModule {}
