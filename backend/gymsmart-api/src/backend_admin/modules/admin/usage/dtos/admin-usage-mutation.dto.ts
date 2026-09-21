// RESPONSIBILITY: Validates mutation fields exposed by the Admin usage frontend contract.
// FLOW: HTTP request body â†’ AdminUsageMutationDto â†’ service business validation â†’ repository mutation.

import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class AdminUsageMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageUsed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  storageLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  membersUsed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  membersLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffUsed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  staffLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymsUsed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gymsLimit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  apiRequestsUsed?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  apiRequestsLimit?: number;

  @IsOptional()
  @IsString()
  currentPlan?: string;

  @IsOptional()
  @IsString()
  renewalDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  usagePercent?: number;

  @IsString()
  @MinLength(2)
  planName!: string;
}
