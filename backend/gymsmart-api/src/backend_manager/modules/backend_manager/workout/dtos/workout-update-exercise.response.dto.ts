// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

export class WorkoutUpdateExerciseResponseDto {
  @ApiProperty()
  difficulty!: string;

  @ApiProperty()
  equipment!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  muscleGroup!: string[];

  @ApiProperty()
  name!: string;

}
