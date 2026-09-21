// RESPONSIBILITY: Validates and normalizes the frontend booking request body.
// FLOW: HTTP request → LandingCreateBookingDto → BookingOrchestrator.
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsISO8601, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LANDING_LIMITS } from '@/modules/landing/landing.constants';
import { LandingBookingType } from '@/modules/landing/enums/landing-booking-type.enum';

export class LandingCreateBookingDto {
  /** @description Removes HTML tags and surrounding whitespace from visitor text. @param value - Raw client value. @returns Sanitized text. */
  static sanitizeText(value: unknown): string {
    return String(value ?? '').replace(/<[^>]*>/g, '').trim();
  }
  @ApiProperty({ example: 'Member One' })
  @Transform(({ value }: { value: unknown }) => LandingCreateBookingDto.sanitizeText(value))
  @IsString()
  @Length(1, LANDING_LIMITS.NAME_MAX_LENGTH)
  name!: string;

  @ApiProperty({ example: 'member@example.org' })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail()
  @Length(3, LANDING_LIMITS.EMAIL_MAX_LENGTH)
  email!: string;

  @ApiProperty({ example: '9876543210' })
  @Transform(({ value }) => String(value).replace(/\s+/g, ''))
  @Matches(/^\d{10}$/, { message: 'phone must contain exactly 10 digits.' })
  phone!: string;

  @ApiProperty({ example: '2026-09-21T00:00:00.000Z', format: 'date-time' })
  @IsISO8601({ strict: true })
  date!: string;

  @ApiProperty({ enum: LandingBookingType, example: LandingBookingType.TRIAL })
  @IsEnum(LandingBookingType)
  type!: LandingBookingType;
}
