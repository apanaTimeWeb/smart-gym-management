// RESPONSIBILITY: Registers the Landing feature's command controllers, business services, repositories, mappers, and seed boundary.
// FLOW: AppModule -> LandingCoreModule -> LandingLandingModule -> command controller -> orchestrator -> service -> repository.
import { Module } from '@nestjs/common';

import { LandingCoreModule } from '@/backend_landing/landing_core/landing-core.module';

import { LandingBookingMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-booking.mapper';
import { LandingContactMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-contact.mapper';
import { LandingCommandController } from '@/backend_landing/landing_modules/landing/landing-command.controller';
import { LandingCompatibilityController } from '@/backend_landing/landing_modules/landing/landing-compatibility.controller';
import { LandingAuditLogRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-audit-log.repository';
import { LandingBookingRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-booking.repository';
import { LandingContactRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-contact.repository';
import { LandingBookingOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-orchestrator.service';
import { LandingBookingService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking.service';
import { LandingContactOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-orchestrator.service';
import { LandingContactService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact.service';
import { LandingLandingSeeder } from '@/backend_landing/landing_modules/landing/landing-landing.seeder';

/**
 * Intent: Compose only the Landing feature providers and the already-defined core infrastructure contracts.
 * Edge Cases: Core infrastructure remains global; no sibling business module is imported here.
 * Side Effects: Registers controllers and providers with the NestJS dependency-injection container.
 * AI Notes: Do not add cross-role business dependencies; use the declared event boundary when architecture requires a runtime dependency.
 */
@Module({
  imports: [LandingCoreModule],
  controllers: [LandingCommandController, LandingCompatibilityController],
  providers: [
    LandingBookingMapper,
    LandingContactMapper,
    LandingBookingRepository,
    LandingContactRepository,
    LandingAuditLogRepository,
    LandingBookingService,
    LandingContactService,
    LandingBookingOrchestratorService,
    LandingContactOrchestratorService,
    LandingLandingSeeder,
  ],
  exports: [LandingLandingSeeder],
})
/**
 * Intent: Defines the landing module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingLandingModule {}
