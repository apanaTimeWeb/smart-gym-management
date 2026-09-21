// RESPONSIBILITY: Preserves the unversioned frontend API namespace during the contract transition; no business logic.
// FLOW: POST /api/landing/* â†’ compatibility controller â†’ same Landing orchestrators as /api/v1.
// 
import { Body, Controller, Headers, Post, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';

import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';

import { RateLimitGuard } from '@/backend_landing/core/security/rate-limit.guard';

import { SetRateLimit } from '@/backend_landing/core/security/rate-limit.decorator';

import { LandingApiErrorResponseDto } from '@/backend_landing/modules/landing/landing-api-error-response.dto';
import { LandingApiSuccessResponseDto } from '@/backend_landing/modules/landing/landing-api-success-response.dto';

import { LandingCreateBookingDto } from '@/backend_landing/modules/landing/dtos/landing-create-booking.dto';

import { LandingCreateContactDto } from '@/backend_landing/modules/landing/dtos/landing-create-contact.dto';

import { LandingBookingOrchestratorService } from '@/backend_landing/modules/landing/services/landing-booking-orchestrator.service';

import { LandingContactOrchestratorService } from '@/backend_landing/modules/landing/services/landing-contact-orchestrator.service';

import type { ApiResponse as ApiEnvelope } from '@/backend_landing/core/types/api-response.types';


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
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
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
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
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
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateContactDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
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
