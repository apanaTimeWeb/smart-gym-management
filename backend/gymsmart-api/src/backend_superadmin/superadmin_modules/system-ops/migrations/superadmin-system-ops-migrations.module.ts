// RESPONSIBILITY: Registers the migrations feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsMigrationsAdvancedCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-advanced-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import { SuperadminSystemOpsMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
import { SuperadminSystemOpsMigrationsQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-query.controller';
import { SuperadminSystemOpsMigrationsCommandController } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations-command.controller';
import { SuperadminSystemOpsMigrationsListService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-list.service';
import { SuperadminSystemOpsMigrationsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-find.service';
import { SuperadminSystemOpsMigrationsCreateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-create.service';
import { SuperadminSystemOpsMigrationsUpdateService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-update.service';
import { SuperadminSystemOpsMigrationsDeleteService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-delete.service';
import { SuperadminSystemOpsMigrationLogStatusService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-status.service';
import { SuperadminSystemOpsMigrationsTriggerService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_services/superadmin-system-ops-migrations-trigger.service';
/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsMigrationsEntity])],
  controllers: [SuperadminSystemOpsMigrationsQueryController, SuperadminSystemOpsMigrationsCommandController, SuperadminSystemOpsMigrationsAdvancedCommandController],
  providers: [SuperadminSystemOpsMigrationsTriggerService, SuperadminSystemOpsMigrationsRepository, SuperadminSystemOpsMigrationsListService, SuperadminSystemOpsMigrationsFindService, SuperadminSystemOpsMigrationsCreateService, SuperadminSystemOpsMigrationsUpdateService, SuperadminSystemOpsMigrationsDeleteService, SuperadminSystemOpsMigrationLogStatusService],
  exports: [SuperadminSystemOpsMigrationsRepository],
})
/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSystemOpsMigrationsModule {}
