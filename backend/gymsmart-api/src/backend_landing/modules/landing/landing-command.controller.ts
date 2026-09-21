// RESPONSIBILITY: Accepts public Landing command requests and delegates immediately to micro-feature orchestrators.
// FLOW: HTTP POST â†’ DTO validation â†’ Landing orchestrator â†’ canonical response.
import { Body, Controller, Headers, Post, UseGuards, Version } from '@nestjs/common';

import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger';

import { RateLimitGuard } from '@/backend_landing/core/security/rate-limit.guard';

import { SetRateLimit } from '@/backend_landing/core/security/rate-limit.decorator';

import { LandingCreateBookingDto } from '@/backend_landing/modules/landing/dtos/landing-create-booking.dto';

import { LandingCreateContactDto } from '@/backend_landing/modules/landing/dtos/landing-create-contact.dto';

import { LandingApiErrorResponseDto } from '@/backend_landing/modules/landing/landing-api-error-response.dto';
import { LandingApiSuccessResponseDto } from '@/backend_landing/modules/landing/landing-api-success-response.dto';

import { LandingBookingOrchestratorService } from '@/backend_landing/modules/landing/services/landing-booking-orchestrator.service';

import { LandingContactOrchestratorService } from '@/backend_landing/modules/landing/services/landing-contact-orchestrator.service';

import type { ApiResponse } from '@/backend_landing/core/types/api-response.types';


@ApiTags('landing')
@Controller('landing')
@UseGuards(RateLimitGuard)
export class LandingCommandController {
  constructor(
    private readonly bookingOrchestrator: LandingBookingOrchestratorService,
    private readonly contactOrchestrator: LandingContactOrchestratorService,
  ) {}

  // SLA: STANDARD
  @Post('booking')
  @Version('1')
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false, description: 'Optional retry key; recommended for duplicate-safe resubmission.' })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto, description: 'Booking accepted and stored.' })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
  async createBooking(
    @Body() dto: LandingCreateBookingDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<ApiResponse<null>> {
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
  @Version('1')
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateContactDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false, description: 'Optional retry key; recommended for duplicate-safe resubmission.' })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto, description: 'Contact message accepted and stored.' })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
  async createContact(
    @Body() dto: LandingCreateContactDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ): Promise<ApiResponse<null>> {
    return this.contactOrchestrator.createContact({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    }, idempotencyKey);
  }
}
