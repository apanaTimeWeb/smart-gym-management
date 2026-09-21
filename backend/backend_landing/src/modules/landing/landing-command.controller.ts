// RESPONSIBILITY: Accepts public Landing command requests and delegates immediately to micro-feature orchestrators.
// FLOW: HTTP POST → DTO validation → Landing orchestrator → canonical response.
import { Body, Controller, Headers, HttpStatus, Post, UseGuards, Version } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { ApiResponse } from '@/core/types/api-response.types';
import { RateLimitGuard } from '@/core/security/rate-limit.guard';
import { RateLimitTier } from '@/core/security/rate-limit.decorator';
import { LandingCreateBookingDto } from '@/modules/landing/dtos/landing-create-booking.dto';
import { LandingCreateContactDto } from '@/modules/landing/dtos/landing-create-contact.dto';
import { LandingBookingOrchestratorService } from '@/modules/landing/services/landing-booking-orchestrator.service';
import { LandingContactOrchestratorService } from '@/modules/landing/services/landing-contact-orchestrator.service';

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
  @RateLimitTier('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false, description: 'Optional retry key; recommended for duplicate-safe resubmission.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking accepted and stored.' })
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
  @RateLimitTier('PUBLIC_MUTATION')
  @ApiBody({ type: LandingCreateContactDto })
  @ApiHeader({ name: 'Idempotency-Key', required: false, description: 'Optional retry key; recommended for duplicate-safe resubmission.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Contact message accepted and stored.' })
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
