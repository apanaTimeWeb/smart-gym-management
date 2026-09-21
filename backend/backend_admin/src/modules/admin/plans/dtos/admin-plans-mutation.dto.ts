// RESPONSIBILITY: Validates mutation fields exposed by the Admin plans frontend contract.
// FLOW: HTTP request body → AdminPlansMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminPlansMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  tier?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price1Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price3Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price6Month?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price12Month?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  freezeAllowed?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  joiningFee?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ptSessionsIncluded?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  taxRate?: number;
}
