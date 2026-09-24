// RESPONSIBILITY: Validates standard Gym creation payloads for already-provisioned tenants without accepting server-managed fields.
// FLOW: HTTP POST /superadmin/gyms -> SuperadminGymsCreateDto -> creation service.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsISO4217CurrencyCode, IsOptional, IsString, Length, Min } from 'class-validator';

/**
 * Primary Intent: Defines SuperadminGymsCreateDto as the class-level contract for superadmin-gyms-create.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsCreateDto {@ApiProperty()

  @IsString() @Length(2, 120) name!: string;@ApiProperty()

  @IsString() @Length(2, 120) ownerName!: string;@ApiProperty()

  @IsEmail() adminEmail!: string;@ApiProperty()

  @IsString() @Length(7, 20) phone!: string;@ApiProperty()

  @IsString() plan!: string;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(1, 128) acquisitionSource?: string;@ApiPropertyOptional()

  /** Primary Intent: ISO 4217 currency governing gym monetary fields, including acquisitionCostMinor. Edge Cases: Omitted values use the configured default currency. Side-Effects: None. AI-Note: Never infer currency from a symbol. */
  @ApiPropertyOptional({ description: 'ISO 4217 currency for monetary gym fields.' })
  @IsOptional() @IsISO4217CurrencyCode() currency?: string;

  @IsOptional() @IsInt() @Min(0) acquisitionCostMinor?: number;@ApiPropertyOptional()

  /** Primary Intent: Optional ISO 4217 currency for acquisitionCostMinor; defaults to the gym/application currency when omitted. Edge Cases: Must be an uppercase supported currency code. Side-Effects: None. AI-Note: Never infer currency from a symbol. */
  @ApiPropertyOptional({ description: 'ISO 4217 currency for acquisitionCostMinor.' })
  @IsOptional() @IsISO4217CurrencyCode() acquisitionCostCurrency?: string;

  @IsOptional() @IsInt() @Min(0) taxRateBasisPoints?: number;
}
