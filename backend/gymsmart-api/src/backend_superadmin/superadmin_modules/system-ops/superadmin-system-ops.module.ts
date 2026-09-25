// RESPONSIBILITY: Registers only the system-ops landing summary feature; operational child features are registered by the container.
// FLOW: Container -> summary controller/service/repository -> PostgreSQL contract snapshot.
import { Module } from '@nestjs/common';
import { SuperadminSystemOpsSummaryQueryController } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops-summary-query.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperadminSystemOpsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.entity';
import { SuperadminSystemOpsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/superadmin-system-ops.repository';
import { SuperadminSystemOpsSummaryService } from '@/backend_superadmin/superadmin_modules/system-ops/system-ops_services/superadmin-system-ops-summary.service';

/**
 * Primary Intent: Defines SuperadminSystemOpsModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({
  imports: [TypeOrmModule.forFeature([SuperadminSystemOpsEntity])],
  controllers: [SuperadminSystemOpsSummaryQueryController],
  providers: [SuperadminSystemOpsRepository, SuperadminSystemOpsSummaryService],
  exports: [SuperadminSystemOpsRepository],
})
/**
 * Primary Intent: Defines SuperadminSystemOpsModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminSystemOpsModule {}
