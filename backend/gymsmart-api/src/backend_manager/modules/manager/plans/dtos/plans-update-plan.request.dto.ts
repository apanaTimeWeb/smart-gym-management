import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/plans/:id.
// FLOW: HTTP payload -> PlansUpdatePlanRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PlansUpdatePlanRequestDto extends CoreRequestDto {
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
