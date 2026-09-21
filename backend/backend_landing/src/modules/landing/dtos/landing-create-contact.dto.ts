// RESPONSIBILITY: Validates and normalizes the frontend contact request body.
// FLOW: HTTP request → LandingCreateContactDto → ContactOrchestrator.
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LANDING_LIMITS } from '@/modules/landing/landing.constants';

export class LandingCreateContactDto {
  /** @description Removes HTML tags and surrounding whitespace from visitor text. @param value - Raw client value. @returns Sanitized text. */
  static sanitizeText(value: unknown): string {
    return String(value ?? '').replace(/<[^>]*>/g, '').trim();
  }
  @ApiProperty({ example: 'Member One' })
  @Transform(({ value }: { value: unknown }) => LandingCreateContactDto.sanitizeText(value))
  @IsString()
  @Length(1, LANDING_LIMITS.NAME_MAX_LENGTH)
  name!: string;

  @ApiProperty({ example: 'member@example.org' })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsEmail()
  @Length(3, LANDING_LIMITS.EMAIL_MAX_LENGTH)
  email!: string;

  @ApiProperty({ example: 'I would like to know more about memberships.' })
  @Transform(({ value }) => String(value).replace(/<[^>]*>/g, '').trim())
  @IsString()
  @Length(1, LANDING_LIMITS.MESSAGE_MAX_LENGTH)
  message!: string;
}
