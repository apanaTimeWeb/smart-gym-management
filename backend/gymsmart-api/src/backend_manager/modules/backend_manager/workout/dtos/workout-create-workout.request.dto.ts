// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class WorkoutCreateWorkoutRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  level!: string;

  @IsArray()
  days!: number | string[];

  @IsNumber()
  @Type(() => Number)
  exercises!: number;

  @IsString()
  focus!: string;

  @IsString()
  duration!: string;

  @IsArray()
  tags!: string[];

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;

}
