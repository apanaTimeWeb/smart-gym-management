// RESPONSIBILITY: Validates mutation fields exposed by the Admin plans frontend contract.
// FLOW: HTTP request body â†’ AdminPlansMutationDto â†’ service business validation â†’ repository mutation.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { Type, Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';

import { AdminCoreIsISO4217CurrencyCode } from '@/backend_admin/admin_core/admin_core_currency/admin-core-is-iso4217-currency-code.decorator.js';

import { AdminPlansTier } from '@/backend_admin/admin_modules/admin_plans/admin-plans.constants.js';

/**
 * @description Defines the AdminPlansMutationDto boundary for the admin_plans backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminPlansMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsEnum(AdminPlansTier)
  @ApiPropertyOptional({ enum: AdminPlansTier })
  tier?: AdminPlansTier;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  price1Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  price3Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  price6Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  price12Month?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  features?: string[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  freezeAllowed?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  joiningFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  ptSessionsIncluded?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional()
  taxRate?: number;
@ApiProperty() @IsString()
  @AdminCoreIsISO4217CurrencyCode()
  currency!: string;
}
