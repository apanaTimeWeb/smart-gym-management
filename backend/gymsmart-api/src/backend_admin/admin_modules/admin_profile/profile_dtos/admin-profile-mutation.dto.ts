// RESPONSIBILITY: Validates mutation fields exposed by the Admin profile frontend contract.
// FLOW: HTTP request body â†’ AdminProfileMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @description Defines the AdminProfileMutationDto boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  name?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  email?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  phone?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  role?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  branchName?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  joinedAt?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  avatarInitial?: string;
@ApiPropertyOptional() @IsOptional()
  @IsString()
  password?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  currentPassword?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  confirmPassword?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  newPassword?: string;
}
