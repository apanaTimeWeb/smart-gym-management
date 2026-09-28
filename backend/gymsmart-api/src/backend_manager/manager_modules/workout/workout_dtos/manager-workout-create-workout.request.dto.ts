// RESPONSIBILITY: Owns the Manager workout request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerWorkoutCreateWorkoutRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  level!: string;

  @IsArray()
  @ApiProperty()
  days!: number | string[];

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  exercises!: number;

  @IsString()
  @ApiProperty()
  focus!: string;

  @IsString()
  @ApiProperty()
  duration!: string;

  @IsArray()
  @ApiProperty()
  tags!: string[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  isActive!: boolean;

}

export { ManagerWorkoutCreateWorkoutRequestDto as WorkoutCreateWorkoutRequestDto };
