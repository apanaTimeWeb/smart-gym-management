// RESPONSIBILITY: Validates partial updates at the gyms HTTP boundary.
// FLOW: HTTP JSON -> SuperadminGymsUpdateDto -> Gyms service.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsISO4217CurrencyCode, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

import { TenantStatus as TenantStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';
/**
 * Primary Intent: Defines SuperadminGymsUpdateDto as the class-level contract for superadmin-gyms-update.dto.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsUpdateDto {@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(1, 120) name?: string;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(1, 120) ownerName?: string;@ApiPropertyOptional()

  @IsOptional() @IsEmail() adminEmail?: string;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(10, 20) phone?: string;@ApiPropertyOptional()

  @IsOptional() @IsEnum(TenantStatus) status?: TenantStatus;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(1, 128) plan?: string;@ApiPropertyOptional()

  @IsOptional() @IsString() @Length(8, 128) temporaryPassword?: string;@ApiPropertyOptional()

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
