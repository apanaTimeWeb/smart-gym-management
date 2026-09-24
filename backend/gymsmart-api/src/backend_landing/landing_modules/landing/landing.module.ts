// RESPONSIBILITY: Registers the Landing feature's command controller, services, repositories, mappers, and transaction adapter.
// FLOW: AppModule â†’ LandingModule â†’ command controller â†’ orchestrators â†’ services â†’ repositories.
import { Module } from '@nestjs/common';

import { IdempotencyModule } from '@/backend_landing/landing_core/landing_idempotency/idempotency.module';

import { LandingCommandController } from '@/backend_landing/landing_modules/landing/landing-command.controller';

import { LandingCompatibilityController } from '@/backend_landing/landing_modules/landing/landing-compatibility.controller';

import { LandingBookingMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-booking.mapper';

import { LandingContactMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-contact.mapper';

import { LandingBookingRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-booking.repository';

import { LandingContactRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-contact.repository';

import { LandingAuditLogRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-audit-log.repository';

import { LandingBookingService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking.service';

import { LandingContactService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact.service';

import { LandingBookingOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-orchestrator.service';

import { LandingContactOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-orchestrator.service';

import { LandingSeeder } from '@/backend_landing/landing_modules/landing/landing.seeder';


import { LandingCoreModule } from '@/backend_landing/landing_core/landing-core.module';

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
    LandingSeeder,
  ],
  exports: [LandingSeeder],
})
export class LandingModule {}
