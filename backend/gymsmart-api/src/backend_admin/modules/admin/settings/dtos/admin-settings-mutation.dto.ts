// RESPONSIBILITY: Validates mutation fields exposed by the Admin settings frontend contract.
// FLOW: HTTP request body → AdminSettingsMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminSettingsMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsObject()
  profile?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  notifications?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  integration?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  gst?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  payment?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  general?: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;
}
