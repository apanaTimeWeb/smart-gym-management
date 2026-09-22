// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutUpdateExerciseResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
