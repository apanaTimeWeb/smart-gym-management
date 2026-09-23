// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsArray, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

export class WorkoutCreateExerciseRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsArray()
  muscleGroup!: string[];

  @IsString()
  equipment!: string;

  @IsString()
  difficulty!: string;

  @IsOptional()
  @IsString()
  category!: string;

}
