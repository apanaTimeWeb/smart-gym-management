// RESPONSIBILITY: Validates mutation fields exposed by the Admin settings frontend contract.
// FLOW: HTTP request body â†’ AdminSettingsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @description Defines the AdminSettingsMutationDto boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  profile?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  notifications?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  integration?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  gst?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  payment?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsObject()
  general?: Record<string, unknown>;

@ApiPropertyOptional() @IsOptional()
  @IsBoolean()
  twoFactorEnabled?: boolean;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  currentPassword?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  verificationCode?: string;
}
