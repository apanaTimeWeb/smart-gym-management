// RESPONSIBILITY: Validates mutable affiliate profile and configuration fields; financial balances are server-controlled.
// FLOW: HTTP PATCH -> strict DTO -> update service -> encrypted repository mutation.
// This DTO intentionally excludes commission/balance counters because those values are owned by domain events and the immutable ledger.
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AffiliateStatus } from '@/backend_superadmin/superadmin_modules/affiliates/superadmin-affiliates.constants';
import { IsDate, IsEmail, IsEnum, IsObject, IsOptional, IsString, Length, Matches } from 'class-validator';

/**
 * Primary Intent: Accepts only affiliate profile/configuration changes that the Superadmin frontend actually submits.
 * Edge Cases: Unknown fields are rejected globally; encrypted bank metadata is transformed in the service.
 * Side-Effects: Successful updates are audited by the mutation infrastructure.
 * AI-Note: Never re-add monetary balance fields to this DTO; payout and commission state follow ledger rules.
 */
export class SuperadminAffiliatesUpdateDto {
  /** Primary Intent: Affiliate name. Edge Cases: Enforces the same length contract as create. Side-Effects: Updates display state. AI-Note: No financial effect. */
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(2, 80) name?: string;
  /** Primary Intent: Affiliate email. Edge Cases: Must be a valid email when supplied. Side-Effects: May affect communications. AI-Note: Never log raw email. */
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
  /** Primary Intent: Affiliate phone. Edge Cases: Canonical formatting is handled at validation/integration boundaries. Side-Effects: None. AI-Note: Never log raw phone. */
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  /** Primary Intent: Referral code. Edge Cases: Length is bounded to the frontend contract. Side-Effects: Attribution changes may affect future referral events. AI-Note: Audit this change. */
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(4, 16) referralCode?: string;
  /** Primary Intent: Optional structured payout metadata. Edge Cases: Object-only input; null clears the protected value. Side-Effects: Service encrypts before persistence. AI-Note: Never persist plaintext. */
  @ApiPropertyOptional({ type: Object, nullable: true }) @IsOptional() @IsObject() bankDetails?: Record<string, unknown> | null;
  /** Primary Intent: ISO 4217 currency override for future affiliate financial events. Edge Cases: Exactly three uppercase letters. Side-Effects: Changes currency provenance for future events. AI-Note: Do not alter historical ledger rows. */
  @ApiPropertyOptional({ example: 'INR' }) @IsOptional() @IsString() @Length(3, 3) @Matches(/^[A-Z]{3}$/) currency?: string;
  /** Primary Intent: Affiliate lifecycle status when explicitly changed by an authorized action. Edge Cases: Must match the domain enum. Side-Effects: Controls referral activity. AI-Note: Keep status transitions audited. */
  @ApiPropertyOptional({ enum: AffiliateStatus }) @IsOptional() @IsEnum(AffiliateStatus) status?: AffiliateStatus;
  /** Primary Intent: Optional join date correction. Edge Cases: Parsed to UTC Date before persistence. Side-Effects: Reporting only. AI-Note: Do not use for payout accounting. */
  @ApiPropertyOptional({ type: String, format: 'date-time' }) @IsOptional() @Type(() => Date) @IsDate() joinedAt?: Date;
}
