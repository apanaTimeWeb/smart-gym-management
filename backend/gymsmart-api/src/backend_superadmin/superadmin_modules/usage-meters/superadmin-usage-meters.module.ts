// RESPONSIBILITY: Registers the usage-meters feature's controllers, ORM entity, repository, and isolated use-case services.
// FLOW: Nest module graph -> controllers/services/repository -> PostgreSQL entity.
import { Module } from '@nestjs/common';
import { SuperadminUsageMetersAnalyticsQueryController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-analytics-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import { SuperadminUsageMetersRepository } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.repository';
import { SuperadminUsageMetersQueryController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-query.controller';
import { SuperadminUsageMetersCommandController } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters-command.controller';
import { SuperadminUsageMetersListService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-list.service';
import { SuperadminUsageMetersFindService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-find.service';
import { SuperadminUsageMetersCreateService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-create.service';
import { SuperadminUsageMetersUpdateService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-update.service';
import { SuperadminUsageMetersDeleteService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-delete.service';
import { SuperadminUsageMetersMainService } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_services/superadmin-usage-meters-main.service';
/**
 * Primary Intent: Defines SuperadminUsageMetersModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminUsageMetersEntity])],
  controllers: [SuperadminUsageMetersAnalyticsQueryController, SuperadminUsageMetersCommandController, SuperadminUsageMetersQueryController],
  providers: [SuperadminUsageMetersMainService, SuperadminUsageMetersRepository, SuperadminUsageMetersListService, SuperadminUsageMetersFindService, SuperadminUsageMetersCreateService, SuperadminUsageMetersUpdateService, SuperadminUsageMetersDeleteService],
  exports: [SuperadminUsageMetersRepository],
})
/**
 * Primary Intent: Defines SuperadminUsageMetersModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminUsageMetersModule {}
