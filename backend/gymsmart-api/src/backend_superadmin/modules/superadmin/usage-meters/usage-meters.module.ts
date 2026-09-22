// RESPONSIBILITY: Registers the usage-meters feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageMeterEntity } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.entity';
import { UsageMetersRepository } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters.repository';
import { UsageMetersQueryController } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters-query.controller';
import { UsageMetersCommandController } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters-command.controller';
import { UsageMetersListService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-list.service';
import { UsageMetersFindService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-find.service';
import { UsageMetersCreateService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-create.service';
import { UsageMetersUpdateService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-update.service';
import { UsageMetersDeleteService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-delete.service';
import { UsageMetersMainService } from '@/backend_superadmin/modules/superadmin/usage-meters/services/usage-meters-main.service';
import { UsageMetersSpecialController } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters-special.controller';
import { UsageMetersCompatibilityController } from '@/backend_superadmin/modules/superadmin/usage-meters/usage-meters-compatibility.controller';
@Module({
  imports: [TypeOrmModule.forFeature([UsageMeterEntity])],
  controllers: [UsageMetersQueryController, UsageMetersCommandController, UsageMetersSpecialController, UsageMetersCompatibilityController],
  providers: [UsageMetersMainService, UsageMetersRepository, UsageMetersListService, UsageMetersFindService, UsageMetersCreateService, UsageMetersUpdateService, UsageMetersDeleteService],
  exports: [UsageMetersRepository],
})
export class UsageMetersModule {}
