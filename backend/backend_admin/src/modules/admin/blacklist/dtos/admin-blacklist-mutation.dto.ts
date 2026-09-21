// RESPONSIBILITY: Validates mutation fields exposed by the Admin blacklist frontend contract.
// FLOW: HTTP request body → AdminBlacklistMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminBlacklistMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  blacklistedBy?: number;

  @IsOptional()
  @IsString()
  blacklistedAt?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedGyms?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedGymNames?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsObject()
  history?: Record<string, unknown>;
}
