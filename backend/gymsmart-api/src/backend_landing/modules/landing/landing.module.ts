// RESPONSIBILITY: Registers the Landing feature's command controller, services, repositories, mappers, and transaction adapter.
// FLOW: AppModule → LandingModule → command controller → orchestrators → services → repositories.
import { Module } from '@nestjs/common';

import { IdempotencyModule } from '@/backend_landing/core/idempotency/idempotency.module';

import { LandingCommandController } from '@/backend_landing/modules/landing/landing-command.controller';

import { LandingCompatibilityController } from '@/backend_landing/modules/landing/landing-compatibility.controller';

import { LandingBookingMapper } from '@/backend_landing/modules/landing/mappers/landing-booking.mapper';

import { LandingContactMapper } from '@/backend_landing/modules/landing/mappers/landing-contact.mapper';

import { LandingBookingRepository } from '@/backend_landing/modules/landing/repositories/landing-booking.repository';

import { LandingContactRepository } from '@/backend_landing/modules/landing/repositories/landing-contact.repository';

import { LandingAuditLogRepository } from '@/backend_landing/modules/landing/repositories/landing-audit-log.repository';

import { LandingBookingService } from '@/backend_landing/modules/landing/services/landing-booking.service';

import { LandingContactService } from '@/backend_landing/modules/landing/services/landing-contact.service';

import { LandingBookingOrchestratorService } from '@/backend_landing/modules/landing/services/landing-booking-orchestrator.service';

import { LandingContactOrchestratorService } from '@/backend_landing/modules/landing/services/landing-contact-orchestrator.service';

import { LandingSeeder } from '@/backend_landing/modules/landing/landing.seeder';


@Module({
  imports: [IdempotencyModule],
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
