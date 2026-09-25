// RESPONSIBILITY: Validates mutation fields exposed by the Admin permissions frontend contract.
// FLOW: HTTP request body â†’ AdminPermissionsMutationDto â†’ service business validation â†’ repository mutation.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { IsObject, IsOptional, IsString } from 'class-validator';

/**
 * @description Defines the AdminPermissionsMutationDto boundary for the admin_permissions backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
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
