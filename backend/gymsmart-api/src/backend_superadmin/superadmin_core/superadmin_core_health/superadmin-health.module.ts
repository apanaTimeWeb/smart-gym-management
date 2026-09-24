// RESPONSIBILITY: Registers health probe endpoints.
// FLOW: AppModule -> SuperadminHealthModule -> health controller.
import { Module } from '@nestjs/common';
import { SuperadminHealthController } from '@/backend_superadmin/superadmin_core/superadmin_core_health/superadmin-health.controller';
/**
 * Primary Intent: Defines SuperadminHealthModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Module({ controllers: [SuperadminHealthController] })
export class SuperadminHealthModule {}
