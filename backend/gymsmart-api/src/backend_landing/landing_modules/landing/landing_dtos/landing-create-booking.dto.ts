// RESPONSIBILITY: Validates and normalizes the frontend booking request body.
// FLOW: HTTP request â†’ LandingCreateBookingDto â†’ BookingOrchestrator.
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsISO8601, IsString, Length, Matches } from 'class-validator';

import { LANDING_LIMITS } from '@/backend_landing/landing_modules/landing/landing-landing.constants';
import { LandingBookingType } from '@/backend_landing/landing_modules/landing/landing_enums/landing-booking-type.enum';


/**
 * Intent: Represents one public Landing booking request and performs deterministic sanitization/validation before business logic.
 * Edge Cases: Unexpected types are rejected by validation; strings are trimmed and free-text markup is removed.
 * Side Effects: No persistence; transforms only affect the request DTO instance.
 * AI Notes: Keep validation and sanitization here; do not move business persistence rules into the DTO.
 */
export class LandingCreateBookingDto {
  /** @description Removes HTML tags and surrounding whitespace from visitor text. @param value - Raw client value. @returns Sanitized text. */
  
  /**
   * Intent: Preserve the single responsibility of landing-create-booking.dto.sanitizeText at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
static sanitizeText(value: unknown): string {
    return String(value ?? '').replace(/<[^>]*>/g, '').trim();
  }
  @ApiProperty({ example: 'Member One' })
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? LandingCreateBookingDto.sanitizeText(value) : value)
  @IsString()
  @Length(1, LANDING_LIMITS.NAME_MAX_LENGTH)
  name!: string;

  @ApiProperty({ example: 'member@example.org' })
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  @IsEmail()
  @Length(3, LANDING_LIMITS.EMAIL_MAX_LENGTH)
  email!: string;

  @ApiProperty({ example: '9876543210' })
  @Transform(({ value }: { value: unknown }) => typeof value === 'string' ? value.replace(/\s+/g, '') : value)
  @Matches(/^\d{10}$/, { message: 'phone must contain exactly 10 digits.' })
  phone!: string;

  @ApiProperty({ example: '2026-09-21T00:00:00.000Z', format: 'date-time' })
  @IsISO8601({ strict: true })
  date!: string;

  @ApiProperty({ enum: LandingBookingType, example: LandingBookingType.TRIAL })
  @IsEnum(LandingBookingType)
  type!: LandingBookingType;
}
