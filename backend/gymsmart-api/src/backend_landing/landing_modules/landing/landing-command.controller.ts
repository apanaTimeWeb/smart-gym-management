// RESPONSIBILITY: Accepts public Landing command requests and delegates immediately to micro-feature orchestrators.
// FLOW: HTTP POST â†’ DTO validation â†’ Landing orchestrator â†’ canonical response.
import { Body, Controller, Headers, Post, UseGuards, Version } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LandingRateLimitGuard } from '@/backend_landing/landing_core/landing_security/landing-rate-limit.guard';
import { RequireIdempotencyKey } from '@/backend_landing/landing_core/landing_security/landing-require-idempotency-key.decorator';
import { SetRateLimit } from '@/backend_landing/landing_core/landing_security/landing-rate-limit.decorator';

import { LandingCreateBookingDto } from '@/backend_landing/landing_modules/landing/landing_dtos/landing-create-booking.dto';
import { LandingCreateContactDto } from '@/backend_landing/landing_modules/landing/landing_dtos/landing-create-contact.dto';
import { LandingApiErrorResponseDto } from '@/backend_landing/landing_modules/landing/landing-api-error-response.dto';
import { LandingApiSuccessResponseDto } from '@/backend_landing/landing_modules/landing/landing-api-success-response.dto';
import { LandingBookingOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-orchestrator.service';
import { LandingContactOrchestratorService } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-orchestrator.service';

import type { LandingCommandResult } from '@/backend_landing/landing_core/landing_types/landing-command-result.types';


/**
 * Intent: Defines the LandingCommandController class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@ApiTags('landing')
@Controller('landing')
@UseGuards(LandingRateLimitGuard)
@RequireIdempotencyKey()
/**
 * Intent: Defines the landing command controller boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingCommandController {
  
  /**
   * Intent: Preserve the single responsibility of landing-command.controller.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly bookingOrchestrator: LandingBookingOrchestratorService,
    private readonly contactOrchestrator: LandingContactOrchestratorService,
  ) {}

  /**
   * Intent: Accept one validated public booking command and delegate it to the booking orchestrator.
   * Edge Cases: DTO validation and Rule 103 idempotency are enforced before orchestration; no direct persistence occurs here.
   * Side Effects: Delegates one transactional mutation to the booking orchestrator.
   * AI Notes: Preserve the exact request mapping and canonical response contract.
   * @param dto - Validated booking request DTO.
   * @param idempotencyKey - Required client retry identity.
   * @returns Transport-neutral command result; the global interceptor creates the canonical HTTP envelope.
   */
  // SLA: STANDARD
  @Post('booking')
  @Version('1')
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiOperation({ summary: 'Create a Landing booking request.' })
  @ApiBody({ type: LandingCreateBookingDto })
  @ApiHeader({ name: 'Idempotency-Key', required: true, description: 'Unique key for safe mutation retry and deduplication.' })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto, description: 'Booking accepted and stored.' })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
  @ApiConflictResponse({ type: LandingApiErrorResponseDto, description: 'Idempotency-Key is already in progress or was reused with a different request.' })
  async createBooking(
    @Body() dto: LandingCreateBookingDto,
    @Headers('idempotency-key') idempotencyKey: string,
  ): Promise<LandingCommandResult<null>> {
    return this.bookingOrchestrator.createBooking({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      date: new Date(dto.date),
      type: dto.type,
    }, idempotencyKey);
  }

  /**
   * Intent: Accept one validated public contact command and delegate it to the contact orchestrator.
   * Edge Cases: DTO validation and Rule 103 idempotency are enforced before orchestration; no direct persistence occurs here.
   * Side Effects: Delegates one transactional mutation to the contact orchestrator.
   * AI Notes: Preserve the exact request mapping and canonical response contract.
   * @param dto - Validated contact request DTO.
   * @param idempotencyKey - Required client retry identity.
   * @returns Transport-neutral command result; the global interceptor creates the canonical HTTP envelope.
   */
  // SLA: STANDARD
  @Post('contact')
  @Version('1')
  @SetRateLimit('PUBLIC_MUTATION')
  @ApiOperation({ summary: 'Create a Landing contact message.' })
  @ApiBody({ type: LandingCreateContactDto })
  @ApiHeader({ name: 'Idempotency-Key', required: true, description: 'Unique key for safe mutation retry and deduplication.' })
  @ApiCreatedResponse({ type: LandingApiSuccessResponseDto, description: 'Contact message accepted and stored.' })
  @ApiBadRequestResponse({ type: LandingApiErrorResponseDto, description: 'Validation failure using the canonical error envelope.' })
  @ApiConflictResponse({ type: LandingApiErrorResponseDto, description: 'Idempotency-Key is already in progress or was reused with a different request.' })
  async createContact(
    @Body() dto: LandingCreateContactDto,
    @Headers('idempotency-key') idempotencyKey: string,
  ): Promise<LandingCommandResult<null>> {
    return this.contactOrchestrator.createContact({
      name: dto.name,
      email: dto.email,
      message: dto.message,
    }, idempotencyKey);
  }
}
