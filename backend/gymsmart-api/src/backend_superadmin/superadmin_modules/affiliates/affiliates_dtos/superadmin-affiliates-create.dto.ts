// RESPONSIBILITY: Validates client-owned affiliate creation input only.
// FLOW: HTTP -> SuperadminAffiliatesCreateDto -> create service -> repository; currency defaults centrally when omitted.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsObject, IsOptional, IsString, Length, Matches } from 'class-validator';

/**
 * Primary Intent: Defines the frontend-compatible create payload while allowing the server to apply the configured default currency.
 * Edge Cases: Unknown properties are rejected globally; currency is normalized by the service.
 * Side-Effects: None; this is a validation-only contract.
 * AI-Note: Do not add financial balance fields here; ledger state is server-controlled.
 */
export class SuperadminAffiliatesCreateDto {
  /** Primary Intent: Affiliate display name. Edge Cases: Length bounds are enforced at the API boundary. Side-Effects: None. AI-Note: Never use as a credential. */
  @ApiProperty() @IsString() @Length(2, 80) name!: string;
  /** Primary Intent: Affiliate email address. Edge Cases: Invalid formats are rejected. Side-Effects: May feed notifications. AI-Note: Never log raw email. */
  @ApiProperty() @IsEmail() email!: string;
  /** Primary Intent: Optional payout account metadata. Edge Cases: Only JSON objects are accepted. Side-Effects: Service encrypts it before persistence. AI-Note: Never persist plaintext credentials. */
  @ApiPropertyOptional({ type: Object, nullable: true }) @IsOptional() @IsObject() bankDetails!: Record<string, unknown> | null;
  /** Primary Intent: Optional ISO 4217 code. Edge Cases: When omitted, configured default currency is applied. Side-Effects: Governs subsequent ledger entries. AI-Note: Monetary responses always carry explicit currency. */
  @ApiPropertyOptional({ example: 'INR' }) @IsOptional() @IsString() @Length(3, 3) @Matches(/^[A-Z]{3}$/) currency?: string;
  /** Primary Intent: Referral code used for attribution. Edge Cases: Length bounds are enforced and the service treats it as a domain identifier. Side-Effects: None. AI-Note: Keep this field aligned with the frontend contract. */
  @ApiProperty() @IsString() @Length(4, 16) referralCode!: string;
}
