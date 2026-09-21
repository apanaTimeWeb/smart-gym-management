// RESPONSIBILITY: Registers the Landing feature's command controller, services, repositories, mappers, and transaction adapter.
// FLOW: AppModule → LandingModule → command controller → orchestrators → services → repositories.
import { Module } from '@nestjs/common';
import { LandingCommandController } from '@/modules/landing/landing-command.controller';
import { LandingCompatibilityController } from '@/modules/landing/landing-compatibility.controller';
import { LandingBookingMapper } from '@/modules/landing/mappers/landing-booking.mapper';
import { LandingContactMapper } from '@/modules/landing/mappers/landing-contact.mapper';
import { LandingBookingRepository } from '@/modules/landing/repositories/landing-booking.repository';
import { LandingContactRepository } from '@/modules/landing/repositories/landing-contact.repository';
import { LandingAuditLogRepository } from '@/modules/landing/repositories/landing-audit-log.repository';
import { LandingBookingService } from '@/modules/landing/services/landing-booking.service';
import { LandingContactService } from '@/modules/landing/services/landing-contact.service';
import { LandingBookingOrchestratorService } from '@/modules/landing/services/landing-booking-orchestrator.service';
import { LandingContactOrchestratorService } from '@/modules/landing/services/landing-contact-orchestrator.service';
import { IdempotencyModule } from '@/core/idempotency/idempotency.module';

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
  ],
})
export class LandingModule {}
