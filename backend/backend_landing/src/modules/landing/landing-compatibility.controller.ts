// RESPONSIBILITY: Preserves the unversioned frontend API namespace during the contract transition; no business logic.
// FLOW: POST /api/landing/* → compatibility controller → same Landing orchestrators as /api/v1.
// 
import { Body, Controller, Headers, HttpStatus, Post, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RateLimitGuard } from '@/core/security/rate-limit.guard';
import { RateLimitTier } from '@/core/security/rate-limit.decorator';
import type { ApiResponse as ApiEnvelope } from '@/core/types/api-response.types';
import { LandingCreateBookingDto } from '@/modules/landing/dtos/landing-create-booking.dto';
import { LandingCreateContactDto } from '@/modules/landing/dtos/landing-create-contact.dto';
import { LandingBookingOrchestratorService } from '@/modules/landing/services/landing-booking-orchestrator.service';
import { LandingContactOrchestratorService } from '@/modules/landing/services/landing-contact-orchestrator.service';

@ApiTags('landing-compatibility')
@Controller({ path: 'landing', version: VERSION_NEUTRAL })
@UseGuards(RateLimitGuard)
export class LandingCompatibilityController {
  constructor(
    private readonly bookingOrchestrator: LandingBookingOrchestratorService,
    private readonly contactOrchestrator: LandingContactOrchestratorService,
  ) {}

  // SLA: STANDARD
  @Post('booking')
  @Version(VERSION_NEUTRAL)
  @RateLimitTier('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createBooking(
    @Body() dto: LandingCreateBookingDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<ApiEnvelope<null>> {
    return this.bookingOrchestrator.createBooking({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      date: new Date(dto.date),
      type: dto.type,
    }, idempotencyKey);
  }

  // SLA: STANDARD
  @Post('bookings')
  @Version(VERSION_NEUTRAL)
  @RateLimitTier('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createBookingPluralAlias(
    @Body() dto: LandingCreateBookingDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<ApiEnvelope<null>> {
    return this.bookingOrchestrator.createBooking({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      date: new Date(dto.date),
      type: dto.type,
    }, idempotencyKey);
  }

  // SLA: STANDARD
  @Post('contact')
  @Version(VERSION_NEUTRAL)
  @RateLimitTier('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateContactDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED })
  async createContact(
    @Body() dto: LandingCreateContactDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<ApiEnvelope<null>> {
    return this.contactOrchestrator.createContact({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    }, idempotencyKey);
  }
}
