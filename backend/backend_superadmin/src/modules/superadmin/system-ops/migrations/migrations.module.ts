// RESPONSIBILITY: Registers the migrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationLogEntity } from '@/modules/superadmin/system-ops/migrations/migrations.entity';
import { MigrationsRepository } from '@/modules/superadmin/system-ops/migrations/migrations.repository';
import { MigrationsQueryController } from '@/modules/superadmin/system-ops/migrations/migrations-query.controller';
import { MigrationsCommandController } from '@/modules/superadmin/system-ops/migrations/migrations-command.controller';
import { MigrationsListService } from '@/modules/superadmin/system-ops/migrations/services/migrations-list.service';
import { MigrationsFindService } from '@/modules/superadmin/system-ops/migrations/services/migrations-find.service';
import { MigrationsCreateService } from '@/modules/superadmin/system-ops/migrations/services/migrations-create.service';
import { MigrationsUpdateService } from '@/modules/superadmin/system-ops/migrations/services/migrations-update.service';
import { MigrationsDeleteService } from '@/modules/superadmin/system-ops/migrations/services/migrations-delete.service';
import { MigrationsStatusService } from '@/modules/superadmin/system-ops/migrations/services/migrations-status.service';
import { MigrationsTriggerService } from '@/modules/superadmin/system-ops/migrations/services/migrations-trigger.service';
import { MigrationsSpecialController } from '@/modules/superadmin/system-ops/migrations/migrations-special.controller';
@Module({
  imports: [TypeOrmModule.forFeature([MigrationLogEntity])],
  controllers: [MigrationsQueryController, MigrationsCommandController, MigrationsSpecialController],
  providers: [MigrationsTriggerService, MigrationsRepository, MigrationsListService, MigrationsFindService, MigrationsCreateService, MigrationsUpdateService, MigrationsDeleteService, MigrationsStatusService],
  exports: [MigrationsRepository],
})
export class MigrationsModule {}
