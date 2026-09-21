// RESPONSIBILITY: Validates mutation fields exposed by the Admin permissions frontend contract.
// FLOW: HTTP request body → AdminPermissionsMutationDto → service business validation → repository mutation.

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class AdminPermissionsMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  role?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  permissions?: Record<string, boolean>;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  gymId?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  overrides?: Record<string, boolean>;
}
