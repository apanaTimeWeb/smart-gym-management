// RESPONSIBILITY: Validates mutation fields exposed by the Admin blacklist frontend contract.
// FLOW: HTTP request body â†’ AdminBlacklistMutationDto â†’ service business validation â†’ repository mutation.
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * @description Defines the AdminBlacklistMutationDto boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistMutationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  id?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  memberId?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  memberName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  memberPhone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  memberEmail?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  reason?: string;

  @IsOptional()
  @IsEnum(['global', 'specific'])
  @ApiPropertyOptional({ enum: ['global', 'specific'] })
  scope?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional()
  assignedGyms?: string[];
}
