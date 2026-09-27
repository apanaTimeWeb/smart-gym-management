// RESPONSIBILITY: Owns the Manager workout request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsArray, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

export class ManagerWorkoutUpdateExerciseRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsArray()
  @ApiProperty()
  muscleGroup!: string[];

  @IsString()
  @ApiProperty()
  equipment!: string;

  @IsString()
  @ApiProperty()
  difficulty!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  category!: string;

}

export { ManagerWorkoutUpdateExerciseRequestDto as WorkoutUpdateExerciseRequestDto };
