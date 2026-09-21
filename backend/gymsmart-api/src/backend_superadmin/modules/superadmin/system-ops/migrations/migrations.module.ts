// RESPONSIBILITY: Registers the migrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationLogEntity } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.entity';
import { MigrationsRepository } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationsQueryController } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations-query.controller';
import { MigrationsCommandController } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations-command.controller';
import { MigrationsListService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-list.service';
import { MigrationsFindService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-find.service';
import { MigrationsCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-create.service';
import { MigrationsUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-update.service';
import { MigrationsDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-delete.service';
import { MigrationsStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-status.service';
import { MigrationsTriggerService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-trigger.service';
import { MigrationsSpecialController } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([MigrationLogEntity])],
  controllers: [MigrationsQueryController, MigrationsCommandController, MigrationsSpecialController],
  providers: [MigrationsTriggerService, MigrationsRepository, MigrationsListService, MigrationsFindService, MigrationsCreateService, MigrationsUpdateService, MigrationsDeleteService, MigrationsStatusService],
  exports: [MigrationsRepository],
})
export class MigrationsModule {}
