import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/plans.
// FLOW: HTTP payload -> PlansCreatePlanRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PlansCreatePlanRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  tier!: string;

  @IsNumber()
  @Type(() => Number)
  price1Month!: number;

  @IsNumber()
  @Type(() => Number)
  price3Month!: number;

  @IsNumber()
  @Type(() => Number)
  price6Month!: number;

  @IsNumber()
  @Type(() => Number)
  price12Month!: number;

  @IsArray()
  features!: string[];

  @IsBoolean()
  isActive!: boolean;

}
