// RESPONSIBILITY: Registers the usage-meters feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminUsageMetersAnalyticsQueryController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-analytics-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersQueryController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-query.controller';
import { SuperadminUsageMetersCommandController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-command.controller';
import { SuperadminUsageMetersListService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-list.service';
import { SuperadminUsageMetersFindService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-find.service';
import { SuperadminUsageMetersCreateService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-create.service';
import { SuperadminUsageMetersUpdateService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-update.service';
import { SuperadminUsageMetersDeleteService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-delete.service';
import { SuperadminUsageMetersMainService } from '@/backend_superadmin/superadmin_modules/usage-meters/services/superadmin-usage-meters-main.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminUsageMetersEntity])],
  controllers: [SuperadminUsageMetersQueryController, SuperadminUsageMetersCommandController, SuperadminUsageMetersAnalyticsQueryController],
  providers: [SuperadminUsageMetersMainService, SuperadminUsageMetersRepository, SuperadminUsageMetersListService, SuperadminUsageMetersFindService, SuperadminUsageMetersCreateService, SuperadminUsageMetersUpdateService, SuperadminUsageMetersDeleteService],
  exports: [SuperadminUsageMetersRepository],
})
export class SuperadminUsageMetersModule {}