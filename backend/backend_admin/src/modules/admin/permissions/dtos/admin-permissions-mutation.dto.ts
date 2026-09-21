// RESPONSIBILITY: Validates mutation fields exposed by the Admin permissions frontend contract.
// FLOW: HTTP request body → AdminPermissionsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminPermissionsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsObject()
  roleDefaults?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  gymOverrides?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymId?: number;

  @IsOptional()
  @IsString()
  gymName?: string;

  @IsOptional()
  @IsObject()
  overrides?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
