// RESPONSIBILITY: Validates mutation fields exposed by the Admin usage frontend contract.
// FLOW: HTTP request body â†’ AdminUsageMutationDto â†’ service business validation â†’ repository mutation.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

/**
 * @description Defines the AdminUsageMutationDto boundary for the admin_usage backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminUsageMutationDto {
@ApiPropertyOptional() @IsOptional()
  @IsUUID()
  id?: string;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageUsed?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  membersUsed?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  membersLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffUsed?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymsUsed?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymsLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  apiRequestsUsed?: number;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  apiRequestsLimit?: number;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  currentPlan?: string;

@ApiPropertyOptional() @IsOptional()
  @IsString()
  renewalDate?: string;

@ApiPropertyOptional() @IsOptional()
  @Type(() => Number)
  @IsNumber()
  usagePercent?: number;

@ApiProperty() @IsString()
  @MinLength(2)
  planName!: string;
}
