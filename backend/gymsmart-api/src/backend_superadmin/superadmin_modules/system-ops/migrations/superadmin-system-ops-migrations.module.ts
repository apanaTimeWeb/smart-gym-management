// RESPONSIBILITY: Registers the migrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminMigrationsAdvancedCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-advanced-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminMigrationsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-query.controller';
import { SuperadminMigrationsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-command.controller';
import { SuperadminMigrationsListService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-list.service';
import { SuperadminMigrationsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-find.service';
import { SuperadminMigrationsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-create.service';
import { SuperadminMigrationsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-update.service';
import { SuperadminMigrationsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-delete.service';
import { SuperadminMigrationsStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-status.service';
import { SuperadminMigrationsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-trigger.service';
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminMigrationsEntity])],
  controllers: [SuperadminMigrationsQueryController, SuperadminMigrationsCommandController, SuperadminMigrationsAdvancedCommandController],
  providers: [SuperadminMigrationsTriggerService, SuperadminMigrationsRepository, SuperadminMigrationsListService, SuperadminMigrationsFindService, SuperadminMigrationsCreateService, SuperadminMigrationsUpdateService, SuperadminMigrationsDeleteService, SuperadminMigrationsStatusService],
  exports: [SuperadminMigrationsRepository],
})
export class SuperadminMigrationsModule {}